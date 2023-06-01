// Date Related Types

export enum ReportType {
  Day = 'Day',
  Hour = 'Hour',
  Month = 'Month',
  Week = 'Week',
  Year = 'Year',
}

// Apollo Client Related Types

export enum Platform {
  Web = 'WEB',
}

export enum ErrorMessage {
  Unauthorized = 'translate.Unauthorized',
}

// Tab keys Related Types

export enum BusinessTabKey {
  AppRatings = 'app-ratings',
  WhiteLabelAppConfig = 'whiteLabel-app-config',
  BusinessConfig = 'business-config',
  Packages = 'packages',
  PackageTypes = 'package-types',
  Rooms = 'rooms',
  Services = 'services',
  BusinessUsers = 'business-users',
  Locations = 'locations',
}

export enum NewsAndEventsTabKey {
  Event = 'events',
  Banner = 'banners',
}

export enum SettingTabKey {
  ServiceCategories = 'service-categories',
  Services = 'services',
  ExtraServiceCategories = 'extra-service-categories',
  Amenity = 'amenities',
  Jobs = 'jobs',
  TransactionTypes = 'transaction-types',
  IncidentTypes = 'incident-types',
  Roles = 'roles',
  Permissions = 'permissions',
  MobileConfigs = 'mobile-configs',
  BusinessPlans = 'business-plans',
}

// Text Editor Upload Image Related Types
export type ProgressFn = (percent: number) => void;

export interface BlobInfo {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string | undefined;
}

export enum PaymentMethod {
  Stripe = 'Stripe',
  MetaMask = 'MetaMask',
}

export interface SubMenuItem {
  title?: string;
  icon?: JSX.Element;
  render?: () => JSX.Element;
  key: string;
  href?: string;
}

export enum ROLE {
  USER = 'User',
  EMPLOYER = 'Employer',
  ADMIN = 'Admin',
}

export interface MenuItem {
  href?: string;
  title: string;
  extraIcon?: JSX.Element;
  subMenu?: SubMenuItem[];
  activeHrefs?: string[];
}

export declare type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;
export declare type DeepPartial<T> = T extends Primitive
  ? T
  : {
      [P in keyof T]?: DeepPartial<T[P]>;
    };
export declare type Dictionary<T> = Record<string, T>;
