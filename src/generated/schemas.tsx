import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateScalar: any;
  DateTime: any;
};

export type AddItemToCartDto = {
  amount?: Scalars['Float'];
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  serviceItemId: Scalars['ID'];
};

export enum ContractStatus {
  AdminCancel = 'AdminCancel',
  Cancel = 'Cancel',
  Completed = 'Completed',
  DepositPaid = 'DepositPaid',
  Draft = 'Draft',
  InProgress = 'InProgress',
  WaitingPaid = 'WaitingPaid'
}

export enum ContractType {
  Event = 'Event',
  Service = 'Service'
}

export type Cart = {
  cartItems?: Maybe<Array<CartItem>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type CartItem = {
  amount: Scalars['Float'];
  cart: Cart;
  cartId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isAvailable: Scalars['Boolean'];
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type CheckoutStripeResponse = {
  cancelUrl: Scalars['String'];
  checkoutUrl: Scalars['String'];
  successUrl: Scalars['String'];
};

export type CodeVerifyDto = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type ConfirmContractDeposit = {
  contractId: Scalars['ID'];
  isApproved?: Scalars['Boolean'];
};

export type Contract = {
  address: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  contractEvent?: Maybe<ContractEvent>;
  contractServiceItems: Array<ContractServiceItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  details: ContractDetail;
  fileUrl?: Maybe<Scalars['String']>;
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
  paymentIntentId?: Maybe<Scalars['String']>;
  status: ContractStatus;
  totalPrice: Scalars['Float'];
  type: ContractType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type ContractDetail = {
  contractCreatedDate: Scalars['Date'];
  contractName: Scalars['String'];
  customerInfo: CustomerInfo;
};

export type ContractDetailDto = {
  contractCreatedDate?: InputMaybe<Scalars['DateTime']>;
  contractName: Scalars['String'];
  customerInfo: CustomerInfoDto;
};

export type ContractEvent = {
  contract: Contract;
  contractEventServiceItems: Array<ContractEventServiceItem>;
  contractId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  event: Event;
  eventId: Scalars['ID'];
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ContractEventServiceItem = {
  amount: Scalars['Int'];
  contractEvent: ContractEvent;
  contractEventId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  price: Scalars['Float'];
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ContractServiceItem = {
  amount: Scalars['Float'];
  contract: Contract;
  contractId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
  price: Scalars['Float'];
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomerInfo = {
  address: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  representative?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CustomerInfoDto = {
  address: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  representative?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CustomizedEventServiceItemInput = {
  amount?: InputMaybe<Scalars['Float']>;
  serviceItemId?: InputMaybe<Scalars['ID']>;
};

export type DeleteFileDto = {
  url: Scalars['String'];
};

export type DepositContractDto = {
  cancelUrl: Scalars['String'];
  contractId: Scalars['ID'];
  successUrl: Scalars['String'];
};

export type DetailsStatistic = {
  date: Scalars['DateScalar'];
  eventNumber: Scalars['Float'];
  serviceNumber: Scalars['Float'];
};

export type Event = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  detail: Scalars['String'];
  eventServiceItems?: Maybe<Array<EventServiceItem>>;
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  isUsed: Scalars['Boolean'];
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EventRequestInput = {
  address: Scalars['String'];
  customizedServiceItems?: InputMaybe<Array<CustomizedEventServiceItemInput>>;
  details: ContractDetailDto;
  eventId: Scalars['ID'];
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  isCustomized?: Scalars['Boolean'];
};

export type EventServiceItem = {
  amount: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  event: Event;
  eventId: Scalars['ID'];
  id: Scalars['ID'];
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EventServiceItemInput = {
  amount?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['ID']>;
  serviceItemId?: InputMaybe<Scalars['ID']>;
};

export type FilterDto = {
  data?: InputMaybe<Scalars['String']>;
  field: Scalars['String'];
  operator: QueryOperator;
};

export type ICart = {
  cartItems?: Maybe<Array<CartItem>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type IContract = {
  address: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  contractEvent?: Maybe<ContractEvent>;
  contractServiceItems: Array<ContractServiceItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  details: ContractDetail;
  fileUrl?: Maybe<Scalars['String']>;
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
  paymentIntentId?: Maybe<Scalars['String']>;
  status: ContractStatus;
  totalPrice: Scalars['Float'];
  type: ContractType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type IContracts = {
  items: Array<IContract>;
  meta: MetaPaginationInterface;
};

export type IEvent = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  detail: Scalars['String'];
  eventServiceItems?: Maybe<Array<EventServiceItem>>;
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  isUsed: Scalars['Boolean'];
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IEvents = {
  items: Array<IEvent>;
  meta: MetaPaginationInterface;
};

export type IPreSignUrl = {
  fileType: Scalars['String'];
  pathFile: Scalars['String'];
  uploadUrl: Scalars['String'];
};

export type IRole = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IRoles = {
  items: Array<IRole>;
  meta: MetaPaginationInterface;
};

export type IService = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Scalars['String']>>;
  isPublished: Scalars['Boolean'];
  isUsed: Scalars['Boolean'];
  name: Scalars['String'];
  serviceItems?: Maybe<Array<ServiceItem>>;
  type: ServiceType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IServices = {
  items: Array<IService>;
  meta: MetaPaginationInterface;
};

export type IUser = {
  avatar?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: Role;
  roleId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LoginResponse = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  refreshToken: Scalars['String'];
  role: Role;
  token: Scalars['String'];
};

export type MetaPaginationInterface = {
  currentPage: Scalars['Float'];
  itemCount: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalItems: Scalars['Float'];
  totalPages: Scalars['Float'];
};

export type Mutation = {
  addItemToCart: ResponseMessageBase;
  changePassword: ResponseMessageBase;
  confirmContractDeposit: IContract;
  createEventRequest: IContract;
  deleteEvent: ResponseMessageBase;
  deleteFileS3: Scalars['String'];
  deleteService: ResponseMessageBase;
  presignedUrlS3: IPreSignUrl;
  presignedUrlS3Public: IPreSignUrl;
  publishService: IService;
  refreshToken: RefreshResponse;
  removeCartItem: ResponseMessageBase;
  requestCreateContract: IContract;
  signIn: LoginResponse;
  signOut: ResponseMessageBase;
  signUp: ResponseMessageBase;
  updateMe: IUser;
  updateStatusContract: IContract;
  upsertEvent: IEvent;
  upsertService: IService;
  verifyCode: LoginResponse;
};


export type MutationAddItemToCartArgs = {
  input: AddItemToCartDto;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationConfirmContractDepositArgs = {
  input: ConfirmContractDeposit;
};


export type MutationCreateEventRequestArgs = {
  input: EventRequestInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['String'];
};


export type MutationDeleteFileS3Args = {
  deleteFileDto: DeleteFileDto;
};


export type MutationDeleteServiceArgs = {
  id: Scalars['String'];
};


export type MutationPresignedUrlS3Args = {
  presignedUrlDto: PresignedUrlDto;
};


export type MutationPresignedUrlS3PublicArgs = {
  presignedUrlDto: PresignedUrlDto;
};


export type MutationPublishServiceArgs = {
  input: PublishServiceDto;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenDto;
};


export type MutationRemoveCartItemArgs = {
  cartItemId: Scalars['String'];
};


export type MutationRequestCreateContractArgs = {
  input: RequestContractDto;
};


export type MutationSignInArgs = {
  input: SignInDto;
};


export type MutationSignOutArgs = {
  input: SignOutDto;
};


export type MutationSignUpArgs = {
  input: SignUpDto;
};


export type MutationUpdateMeArgs = {
  input: UserUpdateInput;
};


export type MutationUpdateStatusContractArgs = {
  input: UpdateContractStatusDto;
};


export type MutationUpsertEventArgs = {
  input: UpsertEventDto;
};


export type MutationUpsertServiceArgs = {
  input: UpsertServiceDto;
};


export type MutationVerifyCodeArgs = {
  input: CodeVerifyDto;
};

export type PresignedUrlDto = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
  pathType: S3UploadType;
};

export type PublishServiceDto = {
  id: Scalars['ID'];
  isPublished?: Scalars['Boolean'];
  serviceItems: Array<PublishServiceItemDto>;
};

export type PublishServiceItemDto = {
  id: Scalars['ID'];
  isPublished?: Scalars['Boolean'];
};

export enum QueryOperator {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  IsNotNull = 'isNotNull',
  IsNull = 'isNull',
  Like = 'like',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  Nin = 'nin',
  UnaccentLike = 'unaccentLike'
}

export type Query = {
  checkoutRemainBillingContract: CheckoutStripeResponse;
  depositContract: CheckoutStripeResponse;
  generatePDF: ResponseMessageBase;
  getContract: IContract;
  getContracts: IContracts;
  getEvent: IEvent;
  getEvents: IEvents;
  getMe: IUser;
  getMyCart: ICart;
  getMyContracts: IContracts;
  getRole: IRole;
  getRoles: IRoles;
  getService: IService;
  getServices: IServices;
  statisticOfMonth: StatisticsOfMonth;
  testQuery: Scalars['String'];
};


export type QueryCheckoutRemainBillingContractArgs = {
  input: DepositContractDto;
};


export type QueryDepositContractArgs = {
  input: DepositContractDto;
};


export type QueryGetContractArgs = {
  id: Scalars['String'];
};


export type QueryGetContractsArgs = {
  queryParams: QueryFilterDto;
};


export type QueryGetEventArgs = {
  id: Scalars['ID'];
};


export type QueryGetEventsArgs = {
  queryParams: QueryFilterDto;
};


export type QueryGetMyContractsArgs = {
  queryParams: QueryFilterDto;
};


export type QueryGetRoleArgs = {
  id: Scalars['ID'];
};


export type QueryGetRolesArgs = {
  queryParams: QueryFilterDto;
};


export type QueryGetServiceArgs = {
  id: Scalars['String'];
};


export type QueryGetServicesArgs = {
  query: QueryFilterDto;
};


export type QueryStatisticOfMonthArgs = {
  input: StatisticsDto;
};

export type QueryFilterDto = {
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Enouvo"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Enouvo"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "EnouvoSpace,Enosta"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "EnouvoSpace,Enosta"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Enouvo"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']>;
};

export type RefreshResponse = {
  accessToken: Scalars['String'];
};

export type RefreshTokenDto = {
  refreshToken: Scalars['String'];
};

export type RequestContractDto = {
  address: Scalars['String'];
  cartItemIds: Array<Scalars['ID']>;
  details: ContractDetailDto;
};

export type ResponseMessageBase = {
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Revenue = {
  event: Scalars['Float'];
  service: Scalars['Float'];
};

export type Role = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum S3UploadType {
  Profile = 'Profile',
  Public = 'Public'
}

export type Service = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Scalars['String']>>;
  isPublished: Scalars['Boolean'];
  isUsed: Scalars['Boolean'];
  name: Scalars['String'];
  serviceItems?: Maybe<Array<ServiceItem>>;
  type: ServiceType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceItem = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  eventServiceItems?: Maybe<Array<EventServiceItem>>;
  id: Scalars['ID'];
  images?: Maybe<Array<Scalars['String']>>;
  isPublished: Scalars['Boolean'];
  isUsed: Scalars['Boolean'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  service: Service;
  serviceId: Scalars['ID'];
  totalQuantity?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum ServiceType {
  Device = 'Device',
  HumanResource = 'HumanResource'
}

export type SignInDto = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignOutDto = {
  refreshToken: Scalars['String'];
};

export type SignUpDto = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type StatisticsDto = {
  month: Scalars['Float'];
  year?: InputMaybe<Scalars['Float']>;
};

export type StatisticsOfMonth = {
  details?: Maybe<Array<DetailsStatistic>>;
  revenue: Revenue;
};

export type UpdateContractStatusDto = {
  contractId: Scalars['ID'];
  status: ContractStatus;
};

export type UpsertEventDto = {
  description?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  eventServiceItems?: InputMaybe<Array<EventServiceItemInput>>;
  id?: InputMaybe<Scalars['ID']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpsertServiceDto = {
  description?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  serviceItems?: InputMaybe<Array<UpsertServiceItemDto>>;
  type?: InputMaybe<ServiceType>;
};

export type UpsertServiceItemDto = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  totalQuantity?: InputMaybe<Scalars['Float']>;
};

export type User = {
  avatar?: Maybe<Scalars['String']>;
  cart?: Maybe<Cart>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: Role;
  roleId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export const MetaFragmentFragmentDoc = gql`
    fragment MetaFragment on MetaPaginationInterface {
  totalItems
  itemCount
  itemsPerPage
  totalPages
  currentPage
}
    `;
export const AddItemToCartDocument = gql`
    mutation addItemToCart($input: AddItemToCartDto!) {
  addItemToCart(input: $input) {
    message
    success
  }
}
    `;
export type AddItemToCartMutationFn = Apollo.MutationFunction<AddItemToCartMutation, AddItemToCartMutationVariables>;

/**
 * __useAddItemToCartMutation__
 *
 * To run a mutation, you first call `useAddItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToCartMutation, { data, loading, error }] = useAddItemToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToCartMutation, AddItemToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToCartMutation, AddItemToCartMutationVariables>(AddItemToCartDocument, options);
      }
export type AddItemToCartMutationHookResult = ReturnType<typeof useAddItemToCartMutation>;
export type AddItemToCartMutationResult = Apollo.MutationResult<AddItemToCartMutation>;
export type AddItemToCartMutationOptions = Apollo.BaseMutationOptions<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation changePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
    message
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateContractDocument = gql`
    mutation createContract($input: RequestContractDto!) {
  requestCreateContract(input: $input) {
    id
  }
}
    `;
export type CreateContractMutationFn = Apollo.MutationFunction<CreateContractMutation, CreateContractMutationVariables>;

/**
 * __useCreateContractMutation__
 *
 * To run a mutation, you first call `useCreateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContractMutation, { data, loading, error }] = useCreateContractMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContractMutation(baseOptions?: Apollo.MutationHookOptions<CreateContractMutation, CreateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContractMutation, CreateContractMutationVariables>(CreateContractDocument, options);
      }
export type CreateContractMutationHookResult = ReturnType<typeof useCreateContractMutation>;
export type CreateContractMutationResult = Apollo.MutationResult<CreateContractMutation>;
export type CreateContractMutationOptions = Apollo.BaseMutationOptions<CreateContractMutation, CreateContractMutationVariables>;
export const CreateEventRequestDocument = gql`
    mutation createEventRequest($input: EventRequestInput!) {
  createEventRequest(input: $input) {
    id
  }
}
    `;
export type CreateEventRequestMutationFn = Apollo.MutationFunction<CreateEventRequestMutation, CreateEventRequestMutationVariables>;

/**
 * __useCreateEventRequestMutation__
 *
 * To run a mutation, you first call `useCreateEventRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventRequestMutation, { data, loading, error }] = useCreateEventRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventRequestMutation, CreateEventRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventRequestMutation, CreateEventRequestMutationVariables>(CreateEventRequestDocument, options);
      }
export type CreateEventRequestMutationHookResult = ReturnType<typeof useCreateEventRequestMutation>;
export type CreateEventRequestMutationResult = Apollo.MutationResult<CreateEventRequestMutation>;
export type CreateEventRequestMutationOptions = Apollo.BaseMutationOptions<CreateEventRequestMutation, CreateEventRequestMutationVariables>;
export const DeleteEventDocument = gql`
    mutation deleteEvent($id: String!) {
  deleteEvent(id: $id) {
    message
    success
  }
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation deleteService($id: String!) {
  deleteService(id: $id) {
    message
    success
  }
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const ConfirmContractDepositDocument = gql`
    mutation confirmContractDeposit($input: ConfirmContractDeposit!) {
  confirmContractDeposit(input: $input) {
    id
    status
  }
}
    `;
export type ConfirmContractDepositMutationFn = Apollo.MutationFunction<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>;

/**
 * __useConfirmContractDepositMutation__
 *
 * To run a mutation, you first call `useConfirmContractDepositMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmContractDepositMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmContractDepositMutation, { data, loading, error }] = useConfirmContractDepositMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmContractDepositMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>(ConfirmContractDepositDocument, options);
      }
export type ConfirmContractDepositMutationHookResult = ReturnType<typeof useConfirmContractDepositMutation>;
export type ConfirmContractDepositMutationResult = Apollo.MutationResult<ConfirmContractDepositMutation>;
export type ConfirmContractDepositMutationOptions = Apollo.BaseMutationOptions<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>;
export const PresignedUrlS3Document = gql`
    mutation presignedUrlS3($presignedUrlDto: PresignedUrlDto!) {
  presignedUrlS3(presignedUrlDto: $presignedUrlDto) {
    fileType
    pathFile
    uploadUrl
  }
}
    `;
export type PresignedUrlS3MutationFn = Apollo.MutationFunction<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>;

/**
 * __usePresignedUrlS3Mutation__
 *
 * To run a mutation, you first call `usePresignedUrlS3Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePresignedUrlS3Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [presignedUrlS3Mutation, { data, loading, error }] = usePresignedUrlS3Mutation({
 *   variables: {
 *      presignedUrlDto: // value for 'presignedUrlDto'
 *   },
 * });
 */
export function usePresignedUrlS3Mutation(baseOptions?: Apollo.MutationHookOptions<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>(PresignedUrlS3Document, options);
      }
export type PresignedUrlS3MutationHookResult = ReturnType<typeof usePresignedUrlS3Mutation>;
export type PresignedUrlS3MutationResult = Apollo.MutationResult<PresignedUrlS3Mutation>;
export type PresignedUrlS3MutationOptions = Apollo.BaseMutationOptions<PresignedUrlS3Mutation, PresignedUrlS3MutationVariables>;
export const PresignedUrlS3PublicDocument = gql`
    mutation presignedUrlS3Public($presignedUrlDto: PresignedUrlDto!) {
  presignedUrlS3(presignedUrlDto: $presignedUrlDto) {
    fileType
    pathFile
    uploadUrl
  }
}
    `;
export type PresignedUrlS3PublicMutationFn = Apollo.MutationFunction<PresignedUrlS3PublicMutation, PresignedUrlS3PublicMutationVariables>;

/**
 * __usePresignedUrlS3PublicMutation__
 *
 * To run a mutation, you first call `usePresignedUrlS3PublicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePresignedUrlS3PublicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [presignedUrlS3PublicMutation, { data, loading, error }] = usePresignedUrlS3PublicMutation({
 *   variables: {
 *      presignedUrlDto: // value for 'presignedUrlDto'
 *   },
 * });
 */
export function usePresignedUrlS3PublicMutation(baseOptions?: Apollo.MutationHookOptions<PresignedUrlS3PublicMutation, PresignedUrlS3PublicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PresignedUrlS3PublicMutation, PresignedUrlS3PublicMutationVariables>(PresignedUrlS3PublicDocument, options);
      }
export type PresignedUrlS3PublicMutationHookResult = ReturnType<typeof usePresignedUrlS3PublicMutation>;
export type PresignedUrlS3PublicMutationResult = Apollo.MutationResult<PresignedUrlS3PublicMutation>;
export type PresignedUrlS3PublicMutationOptions = Apollo.BaseMutationOptions<PresignedUrlS3PublicMutation, PresignedUrlS3PublicMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($input: RefreshTokenDto!) {
  refreshToken(input: $input) {
    accessToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RemoveCartItemDocument = gql`
    mutation removeCartItem($cartItemId: String!) {
  removeCartItem(cartItemId: $cartItemId) {
    message
    success
  }
}
    `;
export type RemoveCartItemMutationFn = Apollo.MutationFunction<RemoveCartItemMutation, RemoveCartItemMutationVariables>;

/**
 * __useRemoveCartItemMutation__
 *
 * To run a mutation, you first call `useRemoveCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartItemMutation, { data, loading, error }] = useRemoveCartItemMutation({
 *   variables: {
 *      cartItemId: // value for 'cartItemId'
 *   },
 * });
 */
export function useRemoveCartItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument, options);
      }
export type RemoveCartItemMutationHookResult = ReturnType<typeof useRemoveCartItemMutation>;
export type RemoveCartItemMutationResult = Apollo.MutationResult<RemoveCartItemMutation>;
export type RemoveCartItemMutationOptions = Apollo.BaseMutationOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInDto!) {
  signIn(input: $input) {
    token
    refreshToken
    id
    email
    role {
      id
      name
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpDto!) {
  signUp(input: $input) {
    message
    success
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($input: UserUpdateInput!) {
  updateMe(input: $input) {
    avatar
    email
    firstName
    lastName
    id
    phoneNumber
    role {
      name
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UpdateContractStatusDocument = gql`
    mutation updateContractStatus($input: UpdateContractStatusDto!) {
  updateStatusContract(input: $input) {
    id
    status
  }
}
    `;
export type UpdateContractStatusMutationFn = Apollo.MutationFunction<UpdateContractStatusMutation, UpdateContractStatusMutationVariables>;

/**
 * __useUpdateContractStatusMutation__
 *
 * To run a mutation, you first call `useUpdateContractStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractStatusMutation, { data, loading, error }] = useUpdateContractStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContractStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContractStatusMutation, UpdateContractStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContractStatusMutation, UpdateContractStatusMutationVariables>(UpdateContractStatusDocument, options);
      }
export type UpdateContractStatusMutationHookResult = ReturnType<typeof useUpdateContractStatusMutation>;
export type UpdateContractStatusMutationResult = Apollo.MutationResult<UpdateContractStatusMutation>;
export type UpdateContractStatusMutationOptions = Apollo.BaseMutationOptions<UpdateContractStatusMutation, UpdateContractStatusMutationVariables>;
export const UpsertEventDocument = gql`
    mutation upsertEvent($input: UpsertEventDto!) {
  upsertEvent(input: $input) {
    id
    name
    description
    isPublic
    detail
    thumbnail
    updatedAt
    eventServiceItems {
      amount
      id
      serviceItemId
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpsertEventMutationFn = Apollo.MutationFunction<UpsertEventMutation, UpsertEventMutationVariables>;

/**
 * __useUpsertEventMutation__
 *
 * To run a mutation, you first call `useUpsertEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertEventMutation, { data, loading, error }] = useUpsertEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertEventMutation(baseOptions?: Apollo.MutationHookOptions<UpsertEventMutation, UpsertEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertEventMutation, UpsertEventMutationVariables>(UpsertEventDocument, options);
      }
export type UpsertEventMutationHookResult = ReturnType<typeof useUpsertEventMutation>;
export type UpsertEventMutationResult = Apollo.MutationResult<UpsertEventMutation>;
export type UpsertEventMutationOptions = Apollo.BaseMutationOptions<UpsertEventMutation, UpsertEventMutationVariables>;
export const UpsertServiceDocument = gql`
    mutation upsertService($input: UpsertServiceDto!) {
  upsertService(input: $input) {
    id
    name
    description
    images
    type
    detail
    isPublished
    createdAt
    updatedAt
    serviceItems {
      id
      name
      price
      isPublished
      serviceId
      description
      totalQuantity
      updatedAt
      createdAt
    }
  }
}
    `;
export type UpsertServiceMutationFn = Apollo.MutationFunction<UpsertServiceMutation, UpsertServiceMutationVariables>;

/**
 * __useUpsertServiceMutation__
 *
 * To run a mutation, you first call `useUpsertServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertServiceMutation, { data, loading, error }] = useUpsertServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpsertServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpsertServiceMutation, UpsertServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertServiceMutation, UpsertServiceMutationVariables>(UpsertServiceDocument, options);
      }
export type UpsertServiceMutationHookResult = ReturnType<typeof useUpsertServiceMutation>;
export type UpsertServiceMutationResult = Apollo.MutationResult<UpsertServiceMutation>;
export type UpsertServiceMutationOptions = Apollo.BaseMutationOptions<UpsertServiceMutation, UpsertServiceMutationVariables>;
export const VerifyCodeDocument = gql`
    mutation verifyCode($input: CodeVerifyDto!) {
  verifyCode(input: $input) {
    token
    refreshToken
    id
  }
}
    `;
export type VerifyCodeMutationFn = Apollo.MutationFunction<VerifyCodeMutation, VerifyCodeMutationVariables>;

/**
 * __useVerifyCodeMutation__
 *
 * To run a mutation, you first call `useVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCodeMutation, { data, loading, error }] = useVerifyCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyCodeMutation(baseOptions?: Apollo.MutationHookOptions<VerifyCodeMutation, VerifyCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyCodeMutation, VerifyCodeMutationVariables>(VerifyCodeDocument, options);
      }
export type VerifyCodeMutationHookResult = ReturnType<typeof useVerifyCodeMutation>;
export type VerifyCodeMutationResult = Apollo.MutationResult<VerifyCodeMutation>;
export type VerifyCodeMutationOptions = Apollo.BaseMutationOptions<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const CheckoutRemainBillingContractDocument = gql`
    query checkoutRemainBillingContract($input: DepositContractDto!) {
  checkoutRemainBillingContract(input: $input) {
    checkoutUrl
    cancelUrl
    successUrl
  }
}
    `;

/**
 * __useCheckoutRemainBillingContractQuery__
 *
 * To run a query within a React component, call `useCheckoutRemainBillingContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutRemainBillingContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutRemainBillingContractQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckoutRemainBillingContractQuery(baseOptions: Apollo.QueryHookOptions<CheckoutRemainBillingContractQuery, CheckoutRemainBillingContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutRemainBillingContractQuery, CheckoutRemainBillingContractQueryVariables>(CheckoutRemainBillingContractDocument, options);
      }
export function useCheckoutRemainBillingContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutRemainBillingContractQuery, CheckoutRemainBillingContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutRemainBillingContractQuery, CheckoutRemainBillingContractQueryVariables>(CheckoutRemainBillingContractDocument, options);
        }
export type CheckoutRemainBillingContractQueryHookResult = ReturnType<typeof useCheckoutRemainBillingContractQuery>;
export type CheckoutRemainBillingContractLazyQueryHookResult = ReturnType<typeof useCheckoutRemainBillingContractLazyQuery>;
export type CheckoutRemainBillingContractQueryResult = Apollo.QueryResult<CheckoutRemainBillingContractQuery, CheckoutRemainBillingContractQueryVariables>;
export function refetchCheckoutRemainBillingContractQuery(variables: CheckoutRemainBillingContractQueryVariables) {
      return { query: CheckoutRemainBillingContractDocument, variables: variables }
    }
export const DepositContractDocument = gql`
    query depositContract($input: DepositContractDto!) {
  depositContract(input: $input) {
    checkoutUrl
    cancelUrl
    successUrl
  }
}
    `;

/**
 * __useDepositContractQuery__
 *
 * To run a query within a React component, call `useDepositContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepositContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepositContractQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDepositContractQuery(baseOptions: Apollo.QueryHookOptions<DepositContractQuery, DepositContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepositContractQuery, DepositContractQueryVariables>(DepositContractDocument, options);
      }
export function useDepositContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepositContractQuery, DepositContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepositContractQuery, DepositContractQueryVariables>(DepositContractDocument, options);
        }
export type DepositContractQueryHookResult = ReturnType<typeof useDepositContractQuery>;
export type DepositContractLazyQueryHookResult = ReturnType<typeof useDepositContractLazyQuery>;
export type DepositContractQueryResult = Apollo.QueryResult<DepositContractQuery, DepositContractQueryVariables>;
export function refetchDepositContractQuery(variables: DepositContractQueryVariables) {
      return { query: DepositContractDocument, variables: variables }
    }
export const GetContractDocument = gql`
    query getContract($id: String!) {
  getContract(id: $id) {
    id
    address
    code
    user {
      email
      id
    }
    details {
      contractCreatedDate
      contractName
      customerInfo {
        address
        name
        phoneNumber
        representative
        type
      }
    }
    fileUrl
    hireDate
    hireEndDate
    status
    totalPrice
    paymentIntentId
    type
    createdAt
    updatedAt
    contractEvent {
      id
      contractId
      eventId
      event {
        id
        isPublic
        isUsed
        detail
        name
        description
        thumbnail
      }
      contractEventServiceItems {
        amount
        id
        contractEventId
        serviceItemId
        price
        serviceItem {
          id
          name
          price
          description
          totalQuantity
          service {
            id
            images
            type
          }
        }
      }
    }
    contractServiceItems {
      id
      amount
      hireDate
      hireEndDate
      serviceItemId
      price
      serviceItem {
        id
        name
        price
        totalQuantity
        description
        service {
          id
          images
        }
      }
    }
  }
}
    `;

/**
 * __useGetContractQuery__
 *
 * To run a query within a React component, call `useGetContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetContractQuery(baseOptions: Apollo.QueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
      }
export function useGetContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export type GetContractQueryHookResult = ReturnType<typeof useGetContractQuery>;
export type GetContractLazyQueryHookResult = ReturnType<typeof useGetContractLazyQuery>;
export type GetContractQueryResult = Apollo.QueryResult<GetContractQuery, GetContractQueryVariables>;
export function refetchGetContractQuery(variables: GetContractQueryVariables) {
      return { query: GetContractDocument, variables: variables }
    }
export const GetContractsDocument = gql`
    query getContracts($queryParams: QueryFilterDto!) {
  getContracts(queryParams: $queryParams) {
    meta {
      ...MetaFragment
    }
    items {
      id
      address
      code
      details {
        contractCreatedDate
        contractName
        customerInfo {
          address
          name
          phoneNumber
          representative
          type
        }
      }
      fileUrl
      hireDate
      hireEndDate
      status
      totalPrice
      paymentIntentId
      type
      createdAt
      updatedAt
    }
  }
}
    ${MetaFragmentFragmentDoc}`;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: Apollo.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;
export function refetchGetContractsQuery(variables: GetContractsQueryVariables) {
      return { query: GetContractsDocument, variables: variables }
    }
export const GetEventDocument = gql`
    query getEvent($input: ID!) {
  getEvent(id: $input) {
    id
    name
    description
    isPublic
    detail
    thumbnail
    isUsed
    eventServiceItems {
      id
      amount
      eventId
      serviceItemId
      serviceItem {
        id
        name
        price
        serviceId
        totalQuantity
        description
        isPublished
        images
        service {
          id
          images
          type
        }
      }
      createdAt
      updatedAt
    }
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventQuery(baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
      }
export function useGetEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventQuery, GetEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(GetEventDocument, options);
        }
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<typeof useGetEventLazyQuery>;
export type GetEventQueryResult = Apollo.QueryResult<GetEventQuery, GetEventQueryVariables>;
export function refetchGetEventQuery(variables: GetEventQueryVariables) {
      return { query: GetEventDocument, variables: variables }
    }
export const GetEventsDocument = gql`
    query getEvents($queryParams: QueryFilterDto!) {
  getEvents(queryParams: $queryParams) {
    meta {
      ...MetaFragment
    }
    items {
      id
      name
      description
      isPublic
      detail
      thumbnail
      isUsed
      eventServiceItems {
        id
        amount
        eventId
        serviceItemId
        serviceItem {
          id
          name
          price
          serviceId
          totalQuantity
          description
          isPublished
          images
        }
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
    }
  }
}
    ${MetaFragmentFragmentDoc}`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export function refetchGetEventsQuery(variables: GetEventsQueryVariables) {
      return { query: GetEventsDocument, variables: variables }
    }
export const GetMeDocument = gql`
    query getMe {
  getMe {
    avatar
    email
    firstName
    lastName
    id
    phoneNumber
    role {
      name
    }
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export function refetchGetMeQuery(variables?: GetMeQueryVariables) {
      return { query: GetMeDocument, variables: variables }
    }
export const GetMyCartDocument = gql`
    query getMyCart {
  getMyCart {
    id
    userId
    cartItems {
      id
      serviceItemId
      hireDate
      hireEndDate
      amount
      isAvailable
      serviceItem {
        id
        name
        price
        isPublished
        serviceId
        description
        totalQuantity
        updatedAt
        createdAt
        service {
          id
          images
          type
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMyCartQuery__
 *
 * To run a query within a React component, call `useGetMyCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCartQuery(baseOptions?: Apollo.QueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
      }
export function useGetMyCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyCartQuery, GetMyCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyCartQuery, GetMyCartQueryVariables>(GetMyCartDocument, options);
        }
export type GetMyCartQueryHookResult = ReturnType<typeof useGetMyCartQuery>;
export type GetMyCartLazyQueryHookResult = ReturnType<typeof useGetMyCartLazyQuery>;
export type GetMyCartQueryResult = Apollo.QueryResult<GetMyCartQuery, GetMyCartQueryVariables>;
export function refetchGetMyCartQuery(variables?: GetMyCartQueryVariables) {
      return { query: GetMyCartDocument, variables: variables }
    }
export const GetMyContractsDocument = gql`
    query getMyContracts($queryParams: QueryFilterDto!) {
  getMyContracts(queryParams: $queryParams) {
    meta {
      ...MetaFragment
    }
    items {
      id
      address
      code
      details {
        contractCreatedDate
        contractName
        customerInfo {
          address
          name
          phoneNumber
          representative
          type
        }
      }
      fileUrl
      hireDate
      hireEndDate
      status
      totalPrice
      paymentIntentId
      type
      createdAt
      updatedAt
    }
  }
}
    ${MetaFragmentFragmentDoc}`;

/**
 * __useGetMyContractsQuery__
 *
 * To run a query within a React component, call `useGetMyContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyContractsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetMyContractsQuery(baseOptions: Apollo.QueryHookOptions<GetMyContractsQuery, GetMyContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyContractsQuery, GetMyContractsQueryVariables>(GetMyContractsDocument, options);
      }
export function useGetMyContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyContractsQuery, GetMyContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyContractsQuery, GetMyContractsQueryVariables>(GetMyContractsDocument, options);
        }
export type GetMyContractsQueryHookResult = ReturnType<typeof useGetMyContractsQuery>;
export type GetMyContractsLazyQueryHookResult = ReturnType<typeof useGetMyContractsLazyQuery>;
export type GetMyContractsQueryResult = Apollo.QueryResult<GetMyContractsQuery, GetMyContractsQueryVariables>;
export function refetchGetMyContractsQuery(variables: GetMyContractsQueryVariables) {
      return { query: GetMyContractsDocument, variables: variables }
    }
export const GetServiceDocument = gql`
    query getService($id: String!) {
  getService(id: $id) {
    id
    name
    description
    images
    type
    detail
    isPublished
    createdAt
    updatedAt
    serviceItems {
      id
      name
      price
      isPublished
      isUsed
      serviceId
      description
      totalQuantity
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceQuery(baseOptions: Apollo.QueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
      }
export function useGetServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceQuery, GetServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceQuery, GetServiceQueryVariables>(GetServiceDocument, options);
        }
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<typeof useGetServiceLazyQuery>;
export type GetServiceQueryResult = Apollo.QueryResult<GetServiceQuery, GetServiceQueryVariables>;
export function refetchGetServiceQuery(variables: GetServiceQueryVariables) {
      return { query: GetServiceDocument, variables: variables }
    }
export const GetServicesDocument = gql`
    query getServices($query: QueryFilterDto!) {
  getServices(query: $query) {
    meta {
      ...MetaFragment
    }
    items {
      id
      name
      description
      images
      type
      detail
      isPublished
      createdAt
      updatedAt
      serviceItems {
        id
        name
        price
        isUsed
        isPublished
        serviceId
        description
        totalQuantity
        updatedAt
        createdAt
      }
    }
  }
}
    ${MetaFragmentFragmentDoc}`;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions: Apollo.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export function refetchGetServicesQuery(variables: GetServicesQueryVariables) {
      return { query: GetServicesDocument, variables: variables }
    }
export const StatisticOfMonthDocument = gql`
    query statisticOfMonth($input: StatisticsDto!) {
  statisticOfMonth(input: $input) {
    details {
      date
      eventNumber
      serviceNumber
    }
    revenue {
      event
      service
    }
  }
}
    `;

/**
 * __useStatisticOfMonthQuery__
 *
 * To run a query within a React component, call `useStatisticOfMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useStatisticOfMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStatisticOfMonthQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStatisticOfMonthQuery(baseOptions: Apollo.QueryHookOptions<StatisticOfMonthQuery, StatisticOfMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StatisticOfMonthQuery, StatisticOfMonthQueryVariables>(StatisticOfMonthDocument, options);
      }
export function useStatisticOfMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StatisticOfMonthQuery, StatisticOfMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StatisticOfMonthQuery, StatisticOfMonthQueryVariables>(StatisticOfMonthDocument, options);
        }
export type StatisticOfMonthQueryHookResult = ReturnType<typeof useStatisticOfMonthQuery>;
export type StatisticOfMonthLazyQueryHookResult = ReturnType<typeof useStatisticOfMonthLazyQuery>;
export type StatisticOfMonthQueryResult = Apollo.QueryResult<StatisticOfMonthQuery, StatisticOfMonthQueryVariables>;
export function refetchStatisticOfMonthQuery(variables: StatisticOfMonthQueryVariables) {
      return { query: StatisticOfMonthDocument, variables: variables }
    }
export type MetaFragmentFragment = { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number };

export type AddItemToCartMutationVariables = Exact<{
  input: AddItemToCartDto;
}>;


export type AddItemToCartMutation = { addItemToCart: { message?: string | null, success?: boolean | null } };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: { message?: string | null, success?: boolean | null } };

export type CreateContractMutationVariables = Exact<{
  input: RequestContractDto;
}>;


export type CreateContractMutation = { requestCreateContract: { id: string } };

export type CreateEventRequestMutationVariables = Exact<{
  input: EventRequestInput;
}>;


export type CreateEventRequestMutation = { createEventRequest: { id: string } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteEventMutation = { deleteEvent: { message?: string | null, success?: boolean | null } };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteServiceMutation = { deleteService: { message?: string | null, success?: boolean | null } };

export type ConfirmContractDepositMutationVariables = Exact<{
  input: ConfirmContractDeposit;
}>;


export type ConfirmContractDepositMutation = { confirmContractDeposit: { id: string, status: ContractStatus } };

export type PresignedUrlS3MutationVariables = Exact<{
  presignedUrlDto: PresignedUrlDto;
}>;


export type PresignedUrlS3Mutation = { presignedUrlS3: { fileType: string, pathFile: string, uploadUrl: string } };

export type PresignedUrlS3PublicMutationVariables = Exact<{
  presignedUrlDto: PresignedUrlDto;
}>;


export type PresignedUrlS3PublicMutation = { presignedUrlS3: { fileType: string, pathFile: string, uploadUrl: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenDto;
}>;


export type RefreshTokenMutation = { refreshToken: { accessToken: string } };

export type RemoveCartItemMutationVariables = Exact<{
  cartItemId: Scalars['String'];
}>;


export type RemoveCartItemMutation = { removeCartItem: { message?: string | null, success?: boolean | null } };

export type SignInMutationVariables = Exact<{
  input: SignInDto;
}>;


export type SignInMutation = { signIn: { token: string, refreshToken: string, id: string, email: string, role: { id: string, name: string } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignUpMutation = { signUp: { message?: string | null, success?: boolean | null } };

export type UpdateMeMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateMeMutation = { updateMe: { avatar?: string | null, email: string, firstName: string, lastName: string, id: string, phoneNumber?: string | null, role: { name: string } } };

export type UpdateContractStatusMutationVariables = Exact<{
  input: UpdateContractStatusDto;
}>;


export type UpdateContractStatusMutation = { updateStatusContract: { id: string, status: ContractStatus } };

export type UpsertEventMutationVariables = Exact<{
  input: UpsertEventDto;
}>;


export type UpsertEventMutation = { upsertEvent: { id: string, name: string, description: string, isPublic: boolean, detail: string, thumbnail?: string | null, updatedAt?: any | null, eventServiceItems?: Array<{ amount: number, id: string, serviceItemId: string, createdAt?: any | null, updatedAt?: any | null }> | null } };

export type UpsertServiceMutationVariables = Exact<{
  input: UpsertServiceDto;
}>;


export type UpsertServiceMutation = { upsertService: { id: string, name: string, description?: string | null, images?: Array<string> | null, type: ServiceType, detail?: string | null, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price?: number | null, isPublished: boolean, serviceId: string, description?: string | null, totalQuantity?: number | null, updatedAt?: any | null, createdAt?: any | null }> | null } };

export type VerifyCodeMutationVariables = Exact<{
  input: CodeVerifyDto;
}>;


export type VerifyCodeMutation = { verifyCode: { token: string, refreshToken: string, id: string } };

export type CheckoutRemainBillingContractQueryVariables = Exact<{
  input: DepositContractDto;
}>;


export type CheckoutRemainBillingContractQuery = { checkoutRemainBillingContract: { checkoutUrl: string, cancelUrl: string, successUrl: string } };

export type DepositContractQueryVariables = Exact<{
  input: DepositContractDto;
}>;


export type DepositContractQuery = { depositContract: { checkoutUrl: string, cancelUrl: string, successUrl: string } };

export type GetContractQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetContractQuery = { getContract: { id: string, address: string, code?: string | null, fileUrl?: string | null, hireDate: any, hireEndDate: any, status: ContractStatus, totalPrice: number, paymentIntentId?: string | null, type: ContractType, createdAt?: any | null, updatedAt?: any | null, user: { email: string, id: string }, details: { contractCreatedDate: any, contractName: string, customerInfo: { address: string, name: string, phoneNumber: string, representative?: string | null, type: string } }, contractEvent?: { id: string, contractId: string, eventId: string, event: { id: string, isPublic: boolean, isUsed: boolean, detail: string, name: string, description: string, thumbnail?: string | null }, contractEventServiceItems: Array<{ amount: number, id: string, contractEventId: string, serviceItemId: string, price: number, serviceItem: { id: string, name: string, price?: number | null, description?: string | null, totalQuantity?: number | null, service: { id: string, images?: Array<string> | null, type: ServiceType } } }> } | null, contractServiceItems: Array<{ id: string, amount: number, hireDate: any, hireEndDate: any, serviceItemId: string, price: number, serviceItem: { id: string, name: string, price?: number | null, totalQuantity?: number | null, description?: string | null, service: { id: string, images?: Array<string> | null } } }> } };

export type GetContractsQueryVariables = Exact<{
  queryParams: QueryFilterDto;
}>;


export type GetContractsQuery = { getContracts: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, address: string, code?: string | null, fileUrl?: string | null, hireDate: any, hireEndDate: any, status: ContractStatus, totalPrice: number, paymentIntentId?: string | null, type: ContractType, createdAt?: any | null, updatedAt?: any | null, details: { contractCreatedDate: any, contractName: string, customerInfo: { address: string, name: string, phoneNumber: string, representative?: string | null, type: string } } }> } };

export type GetEventQueryVariables = Exact<{
  input: Scalars['ID'];
}>;


export type GetEventQuery = { getEvent: { id: string, name: string, description: string, isPublic: boolean, detail: string, thumbnail?: string | null, isUsed: boolean, updatedAt?: any | null, createdAt?: any | null, eventServiceItems?: Array<{ id: string, amount: number, eventId: string, serviceItemId: string, createdAt?: any | null, updatedAt?: any | null, serviceItem: { id: string, name: string, price?: number | null, serviceId: string, totalQuantity?: number | null, description?: string | null, isPublished: boolean, images?: Array<string> | null, service: { id: string, images?: Array<string> | null, type: ServiceType } } }> | null } };

export type GetEventsQueryVariables = Exact<{
  queryParams: QueryFilterDto;
}>;


export type GetEventsQuery = { getEvents: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, name: string, description: string, isPublic: boolean, detail: string, thumbnail?: string | null, isUsed: boolean, updatedAt?: any | null, createdAt?: any | null, eventServiceItems?: Array<{ id: string, amount: number, eventId: string, serviceItemId: string, createdAt?: any | null, updatedAt?: any | null, serviceItem: { id: string, name: string, price?: number | null, serviceId: string, totalQuantity?: number | null, description?: string | null, isPublished: boolean, images?: Array<string> | null } }> | null }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { avatar?: string | null, email: string, firstName: string, lastName: string, id: string, phoneNumber?: string | null, role: { name: string } } };

export type GetMyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyCartQuery = { getMyCart: { id: string, userId: string, cartItems?: Array<{ id: string, serviceItemId: string, hireDate: any, hireEndDate: any, amount: number, isAvailable: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItem: { id: string, name: string, price?: number | null, isPublished: boolean, serviceId: string, description?: string | null, totalQuantity?: number | null, updatedAt?: any | null, createdAt?: any | null, service: { id: string, images?: Array<string> | null, type: ServiceType } } }> | null } };

export type GetMyContractsQueryVariables = Exact<{
  queryParams: QueryFilterDto;
}>;


export type GetMyContractsQuery = { getMyContracts: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, address: string, code?: string | null, fileUrl?: string | null, hireDate: any, hireEndDate: any, status: ContractStatus, totalPrice: number, paymentIntentId?: string | null, type: ContractType, createdAt?: any | null, updatedAt?: any | null, details: { contractCreatedDate: any, contractName: string, customerInfo: { address: string, name: string, phoneNumber: string, representative?: string | null, type: string } } }> } };

export type GetServiceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetServiceQuery = { getService: { id: string, name: string, description?: string | null, images?: Array<string> | null, type: ServiceType, detail?: string | null, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price?: number | null, isPublished: boolean, isUsed: boolean, serviceId: string, description?: string | null, totalQuantity?: number | null, updatedAt?: any | null, createdAt?: any | null }> | null } };

export type GetServicesQueryVariables = Exact<{
  query: QueryFilterDto;
}>;


export type GetServicesQuery = { getServices: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, name: string, description?: string | null, images?: Array<string> | null, type: ServiceType, detail?: string | null, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price?: number | null, isUsed: boolean, isPublished: boolean, serviceId: string, description?: string | null, totalQuantity?: number | null, updatedAt?: any | null, createdAt?: any | null }> | null }> } };

export type StatisticOfMonthQueryVariables = Exact<{
  input: StatisticsDto;
}>;


export type StatisticOfMonthQuery = { statisticOfMonth: { details?: Array<{ date: any, eventNumber: number, serviceNumber: number }> | null, revenue: { event: number, service: number } } };
