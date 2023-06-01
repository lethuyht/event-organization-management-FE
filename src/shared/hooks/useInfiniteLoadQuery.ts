import {
  DocumentNode,
  TypedDocumentNode,
  useQuery,
  FetchPolicy,
} from '@apollo/client';
import { useState, useEffect } from 'react';
import { debounce, unionBy } from 'lodash-es';
import { LabeledValue, SelectValue } from 'antd/lib/select';

import {
  Maybe,
  MetaPaginationInterface,
  QueryFilterDto,
  QueryOperator,
} from '#/generated/schemas';
import { showError } from '../utils/tools';

export interface FormatDataResponse {
  meta?: Maybe<MetaPaginationInterface>;
  items?: Maybe<unknown>[] | null;
}
interface Props<TData, TVariables> {
  query: DocumentNode | TypedDocumentNode<TData, TVariables>;
  formatData: (e: TData) => FormatDataResponse | null | undefined;
  variables?: TVariables & {
    queryParams?: QueryFilterDto;
  };
  fetchPolicy?: FetchPolicy;
  skip?: boolean;
  value?: SelectValue | null;
  fieldName?: string;
  modelName?: string;
  isFetchDefault?: boolean;
}
const BROWSER_OFFSET = 10;
export const useInfiniteLoadQuery = <TData, TVariables, T>({
  query,
  variables,
  formatData,
  skip,
  fetchPolicy = 'cache-first',
  value,
  fieldName,
  modelName,
  isFetchDefault,
}: Props<TData, TVariables>) => {
  const [data, setData] = useState<unknown[]>([]);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    total: 10,
    totalPage: 1,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [defaultData, setDefaultData] = useState<unknown[]>([]);
  const { error, refetch, fetchMore } = useQuery<TData>(query, {
    variables: {
      queryParams: {
        page: 1,
        limit: 10,
        ...variables?.queryParams,
      },
    },
    skip,
    onCompleted(responseData) {
      setLoading(false);
      const formattedData = formatData(responseData);
      if (formattedData?.meta?.currentPage === 1) {
        setData(formattedData?.items ?? []);
        setPageNumber(2);
        setPagination({
          pageNumber: formattedData?.meta?.currentPage || 1,
          pageSize: formattedData?.meta?.itemsPerPage || 10,
          total: formattedData?.meta?.totalItems || 10,
          totalPage: formattedData?.meta?.totalPages || 1,
        });
      }
    },
    onError: () => {
      setLoading(false);
    },
    fetchPolicy,
  });
  useEffect(() => {
    if (isFetchDefault && !!value) {
      setLoading(true);
      fetchMore({
        variables: {
          queryParams: {
            page: 1,
            limit: 100,
            filters: [
              {
                field: `${modelName}.id`,
                operator: QueryOperator.In,
                data:
                  typeof value === 'string' || typeof value === 'number'
                    ? String(value)
                    : (value as LabeledValue[])?.join(','),
              },
            ],
          },
        },
      })
        .then(responseData => {
          const formattedData = formatData(responseData?.data);
          setDefaultData(formattedData?.items ?? []);
        })
        .catch(showError)
        .finally(() => setLoading(false));
    }
  }, [fetchMore, modelName, formatData, isFetchDefault, value]);
  const loadMore = (event: React.UIEvent) => {
    if (pagination.pageNumber >= pagination.totalPage) return;
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight <=
        target.scrollHeight + BROWSER_OFFSET &&
      target.scrollTop + target.offsetHeight >=
        target.scrollHeight - BROWSER_OFFSET
    ) {
      setLoading(true);
      refetch({
        queryParams: {
          ...variables?.queryParams,
          limit: 10,
          page: pageNumber,
        },
      })
        .then(data => {
          const formattedData = formatData(data.data);
          setPageNumber(currentPage => currentPage + 1);
          setData(oldData => [...oldData, ...(formattedData?.items || [])]);
          setPagination({
            pageNumber: formattedData?.meta?.currentPage || 1,
            pageSize: formattedData?.meta?.itemsPerPage || 10,
            total: formattedData?.meta?.totalItems || 10,
            totalPage: formattedData?.meta?.totalPages || 1,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const onSearch = debounce((value: string) => {
    setLoading(true);
    refetch({
      queryParams: {
        ...variables?.queryParams,
        page: 1,
        limit: 10,
        q: value.trim(),
        filters: [
          ...(variables?.queryParams?.filters ?? []),
          {
            field: `${modelName}.${fieldName}`,
            data: value,
            operator: QueryOperator.Like,
          },
        ],
      },
    })
      .then(data => {
        const formattedData = formatData(data.data);
        setPageNumber(1);
        setData(formattedData?.items ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 400);
  return {
    data: unionBy(defaultData, data) as T[],
    error,
    loading,
    onSearch,
    loadMore,
    setData,
    setPageNumber,
    setPagination,
    refetch,
    hasMore: pagination.pageNumber < pagination.totalPage,
    pageNumber,
  };
};
