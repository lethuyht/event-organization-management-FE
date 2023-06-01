import {
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_ID,
} from './constant';

export const getToken = () => {
  if (localStorage) {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  }
};

export const setToken = (accessToken: string) => {
  if (localStorage) {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, accessToken);
  }
};

export const clearToken = () => {
  if (localStorage) {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  }
};

export const getRefreshToken = () => {
  if (localStorage) {
    return localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  }
};

export const setRefreshToken = (refreshToken: string) => {
  if (localStorage) {
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
  }
};
export const setUserId = (userId: string) => {
  if (localStorage) {
    localStorage.setItem(LOCAL_STORAGE_USER_ID, userId);
  }
};
export const getUserId = () => {
  if (localStorage) {
    return localStorage.getItem(LOCAL_STORAGE_USER_ID);
  }
};

export const clearRefreshToken = () => {
  if (localStorage) {
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
