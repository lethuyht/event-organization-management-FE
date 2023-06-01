import { useState } from 'react';

interface UsePaginationProps {
  defaultCurrentPage?: number;
  defaultPageSize?: number;
}

function usePagination({
  defaultCurrentPage = 1,
  defaultPageSize = 10,
}: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState<number>(defaultCurrentPage);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  };
}

export default usePagination;
