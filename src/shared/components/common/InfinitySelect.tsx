import { TypedDocumentNode, DocumentNode, FetchPolicy } from '@apollo/client';
import { Select, SelectProps } from 'antd';
import { SelectValue } from 'antd/es/select';
import { uniqBy } from 'lodash-es';

import { useState } from 'react';
import {
  FormatDataResponse,
  useInfiniteLoadQuery,
} from '#/shared/hooks/useInfiniteLoadQuery';

import { QueryFilterDto } from '#/generated/schemas';
import { convertDataToSelectOptions } from '#/shared/utils/tools';

export interface InfinitySelectProps<Type, QueryVariables>
  extends SelectProps<SelectValue> {
  initValues?: Type[];
  variables?: QueryVariables;
  fetchPolicy?: FetchPolicy;
  mutateOtherFields?: (currentValue: SelectValue, data: Type[]) => void;
  fieldName?: string;
  modelName?: string;
  isFetchDefault?: boolean;
}
export interface Props<Query, QueryVariables, Type>
  extends SelectProps<SelectValue> {
  query: DocumentNode | TypedDocumentNode<Query, QueryVariables>;
  formatData: (e: Query) => FormatDataResponse | null | undefined;
  initValues?: Type[];
  convertDataToOptions?: (data: Type[]) => {
    value: string | React.ReactNode;
    label: unknown;
  }[];
  variables?: QueryVariables & {
    queryParams?: QueryFilterDto;
  };
  fetchPolicy?: FetchPolicy;
  mutateOtherFields?: (currentValue: SelectValue, data: Type[]) => void;
  isFetchDefault?: boolean;
  fieldName?: string;
  modelName?: string;
}
function InfinitySelect<Query, QueryVariables, Type>({
  query,
  formatData,
  initValues = [],
  convertDataToOptions,
  variables,
  fetchPolicy,
  value,
  onChange,
  mutateOtherFields,
  isFetchDefault,
  fieldName = 'name',
  modelName,
  ...rest
}: Props<Query, QueryVariables, Type>) {
  const { data, loading, loadMore, onSearch } = useInfiniteLoadQuery<
    Query,
    QueryVariables,
    Type
  >({
    query,
    formatData,
    variables,
    fetchPolicy,
    value,
    fieldName,
    modelName,
    isFetchDefault,
  });
  const [searchValue, setSearchValue] = useState<string>();
  const items = uniqBy([...initValues, ...data], 'id');
  const formattedData = convertDataToOptions
    ? convertDataToOptions(items)
    : convertDataToSelectOptions<Type>(items, 'id', 'name');
  const options = loading
    ? [...(formattedData as any), { value: null, label: 'Loading...' }]
    : formattedData;

  return (
    <Select
      onPopupScroll={loadMore}
      loading={loading}
      options={options}
      optionFilterProp="label"
      showArrow
      onSearch={value => {
        setSearchValue(value);
        onSearch(value);
      }}
      searchValue={searchValue}
      value={
        rest.mode && rest.mode === 'multiple'
          ? value
          : !value ||
            !options?.[0] ||
            options?.some(option => option.value === value)
          ? value
          : 'Giá trị hiện tại không hợp lệ hoặc đã xóa.'
      }
      autoClearSearchValue={true}
      onChange={value => {
        onChange?.(value, { label: '' });
        mutateOtherFields?.(value, data);
      }}
      {...rest}
    />
  );
}
export default InfinitySelect;
