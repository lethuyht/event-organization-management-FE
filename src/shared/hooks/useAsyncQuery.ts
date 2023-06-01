import {
  PresignedUrlDto,
  PresignedUrlS3Document,
  PresignedUrlS3Mutation,
  PresignedUrlS3MutationVariables,
} from '#/generated/schemas';
import { useApolloClient } from '@apollo/client';

const useAsyncQuery = () => {
  const client = useApolloClient();

  const getPresignedUrl = async (presignedUrlDto: PresignedUrlDto) =>
    client.mutate<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>({
      mutation: PresignedUrlS3Document,
      variables: {
        presignedUrlDto,
      },
    });

  return {
    getPresignedUrl,
  };
};

export default useAsyncQuery;
