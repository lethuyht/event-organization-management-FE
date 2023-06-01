import { GraphQLErrors } from '@apollo/client/errors';
import { ErrorMessage } from '#/shared/utils/type';
import { clearToken, clearRefreshToken } from '#/shared/utils/token';
import { showError } from '../utils/tools';

interface RequestErrorProps {
  graphQLErrors: GraphQLErrors;
}
export const handleRequestError = ({ graphQLErrors }: RequestErrorProps) => {
  const errMsg = graphQLErrors?.[0]?.message;
  if (errMsg === ErrorMessage.Unauthorized) {
    clearToken();
    clearRefreshToken();
  }
  showError(errMsg);
};
