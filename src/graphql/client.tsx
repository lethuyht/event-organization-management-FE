import { RefreshResponse, RefreshTokenDocument } from '#/generated/schemas';
import {
  clearLocalStorage,
  getRefreshToken,
  getToken,
  setToken,
} from '#/shared/utils/token';
import { Platform } from '#/shared/utils/type';
import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  from,
  Observable,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

import { GraphQLError } from 'graphql';
import { cache } from './cache';
import { omitDeep } from '#/shared/utils/tools';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const withToken = setContext(async () => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  return { token, refreshToken };
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const { headers, token } = operation.getContext();
  operation.setContext({
    headers: {
      ...headers,
      platform: [Platform.Web],
      ...(token && {
        authorization: `Bearer ${token}`,
      }),
    },
  });
  return forward(operation);
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables && !operation.variables.file) {
    operation.variables = omitDeep(operation.variables, '__typename');
  }
  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.message) {
          case 'jwt expired':
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshToken') return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              observer => {
                // used an anonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      window.location.reload();
                      throw new GraphQLError('Empty AccessToken');
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              },
            );

            return observable;
        }
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);

export const client = new ApolloClient({
  cache,
  link: from([
    errorLink,
    cleanTypenameLink,
    withToken,
    authMiddleware,
    httpLink,
  ]),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
});

export const refreshToken = async () => {
  try {
    const refreshTokenResponse = await client.mutate<{
      refreshToken: RefreshResponse;
    }>({
      mutation: RefreshTokenDocument,
      variables: {
        input: {
          refreshToken: String(getRefreshToken()),
        },
      },
    });
    const accessToken = refreshTokenResponse.data?.refreshToken.accessToken;
    setToken(accessToken || '');
    return accessToken;
  } catch (error) {
    console.log(error);
    clearLocalStorage();
  }
};
