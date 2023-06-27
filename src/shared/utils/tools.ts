import { notification } from 'antd';
import axios from 'axios';
import { get } from 'lodash';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';

export const showSuccess = (message: string) =>
  notification.success({
    message,
    placement: 'bottom',
  });

export const showError = (error: unknown | string) => {
  const message = (() => {
    if (typeof error === 'string') return error;
    return (
      (error as Error)?.message ?? 'Server Internal Error. Please try later.'
    );
  })();

  return notification.error({
    message,
  });
};

export const getFileNameFromUrl = (url: string) =>
  url
    .split('/')
    .pop()
    ?.split('.')
    .map((item, index) =>
      index ? item : item.split('-').slice(0, -1).join('-'),
    )
    .join('.');

export const getFileTypeFromFileName = (fileName: string) => {
  const fileNameArr = fileName?.split('.');
  return fileNameArr?.[fileNameArr?.length - 1];
};

export const formatFileName = (name: string | undefined) =>
  name?.replace(/_/g, '').toLowerCase();

export const downloadFile = (url: string) => {
  window.open(`${url}`);
};

export const getAssetURL = (url: string) => {
  if (!url) return undefined;
  return `${url}`;
};

export const convertToPercent = (percent = 0, maxRate = 1) =>
  percent ? Number(((percent / maxRate) * 100).toFixed(1)) : 0;

export const validateRegex = {
  phoneNumber:
    /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g,
  urlRegex:
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g,
  password: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/g,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  money: /\B(?=(\d{3})+(?!\d))/g,
};

export const convertToSlug = (text: string) => {
  let slug = text.toLowerCase().trim();
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  slug = slug.replace(
    /`|~|!|@|#|\||\$|%|\^|&|\*|\(|\)|\+|=|,|\.|\/|\?|>|<|'|"|:|;|_/gi,
    '',
  );
  slug = slug.replace(/ +/gi, ' ');
  slug = slug.replace(/ /gi, '-');
  slug = `@${slug}@`;
  slug = slug.replace(/@-|-@|@/gi, '');
  return slug;
};

export const getBusinessPath = (subpath: string) =>
  `https://${subpath || ''}.${import.meta.env.VITE_APP_BUSINESS_CONFIG_URL}`;

export const getFileKey = (url: string) =>
  url?.split('/')?.[3] ? url?.split('/')?.[4] : url;

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.toLocaleLowerCase().slice(1);

export const calculateTotalPrice = (gasUsed: number, gasPrice: number) =>
  Number((gasUsed * gasPrice * Math.pow(10, -18)).toFixed(8));

export const calculateTotalPayment = (
  gasUsed: number,
  gasPrice: number,
  value: number,
) =>
  Number(
    (
      gasUsed * gasPrice * Math.pow(10, -18) +
      value * Math.pow(10, -18)
    ).toFixed(8),
  );

export const maxSelectedItemFromArray = (
  length: number,
  coefficient: number,
) => {
  return Math.floor(length / coefficient) * coefficient;
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const uploadFile = async ({
  file,
  signedRequest,
  onUploadProgress,
}: {
  file: Blob;
  signedRequest: string;
  onUploadProgress?: (progressEvent: number) => void;
}) => {
  return axios({
    method: 'PUT',
    url: signedRequest,
    data: file,
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: function (progressEvent) {
      if (onUploadProgress) {
        onUploadProgress(
          Math.round((progressEvent.loaded * 100) / progressEvent.total),
        );
      }
    },
  });
};

export const omitDeep = function (obj: any, key: string): any {
  const keys = Object.keys(obj);
  const newObj: any = {};

  keys.forEach(function (i) {
    if (i !== key) {
      const val = obj[i];

      if (val instanceof Date) {
        newObj[i] = val;
      } else if (Array.isArray(val)) {
        newObj[i] = omitDeepArrayWalk(val, key);
      } else if (typeof val === 'object' && val !== null) {
        newObj[i] = omitDeep(val, key);
      } else {
        newObj[i] = val;
      }
    }
  });

  return newObj;
};

export const omitDeepArrayWalk = function (arr: any[], key: string): any[] {
  return arr.map(function (val) {
    if (Array.isArray(val)) {
      return function () {
        return omitDeepArrayWalk(val, key);
      };
    } else if (typeof val === 'object') {
      return omitDeep(val, key);
    }
    return val;
  });
};

export function convertDataToSelectOptions<T>(
  data: T[] | null,
  valueProp: string,
  labelProp: string,
): { value: any; label: any }[] | undefined {
  return data == null
    ? []
    : data.map(item => {
        return {
          value: get(item, valueProp),
          label: get(item, labelProp),
        };
      });
}

export const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getPopupContainer = (node: any, queries?: any) => {
  if (queries === undefined) {
    queries = ['.ant-modal', '.ant-drawer'];
  }

  var parent = document.querySelector(
    queries.find(function (e: any) {
      return document.querySelector(e);
    }),
  );

  if (node && parent !== null && parent.contains(node)) {
    return node.parentNode;
  }

  return document.body as HTMLElement;
};

interface TableData<T> {
  pageSize: number;
  onChange: (params: { current?: number; pageSize?: number }) => void;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  formatData: T[];
}

export function useTable<T>(
  data: T[] = [],
  defaultPageSize = 10,
): TableData<T> {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const formatData = useMemo(() => {
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [data, pageSize, currentPage]);

  const onChange = ({
    current,
    pageSize,
  }: {
    current?: number;
    pageSize?: number;
  }) => {
    setCurrentPage(current != null ? current : 1);
    setPageSize(pageSize != null ? pageSize : 10);
  };

  return {
    pageSize,
    onChange,
    setPageSize,
    currentPage,
    setCurrentPage,
    formatData,
  };
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const fomatDate = (date: string | Date) => {
  return dayjs(date).format('DD/MM/YYYY');
};
