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
  DateTime: any;
  JSON: any;
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
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type CodeVerifyDto = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Contract = {
  address: Scalars['String'];
  contractServiceItems: Array<ContractServiceItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  details: Scalars['JSON'];
  fileUrl: Scalars['String'];
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
  status: ContractStatus;
  totalPrice: Scalars['Float'];
  type: ContractType;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type ContractDetailDto = {
  contractCreatedDate?: InputMaybe<Scalars['DateTime']>;
  contractName: Scalars['String'];
  customerInfo: CustomerInfoDto;
};

export type ContractServiceItem = {
  amount: Scalars['Float'];
  contract: Contract;
  contractId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  serviceItem: ServiceItem;
  serviceItemId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CustomerInfoDto = {
  address: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  representative?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
};

export type DeleteFileDto = {
  url: Scalars['String'];
};

export type Event = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  detail: Scalars['String'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EventRequest = {
  createdAt?: Maybe<Scalars['DateTime']>;
  event: Event;
  eventId: Scalars['ID'];
  eventRequestDetail: EventRequestDetail;
  id: Scalars['ID'];
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type EventRequestDetail = {
  address?: Maybe<Scalars['String']>;
  amountAttendee: Scalars['Float'];
  createdAt?: Maybe<Scalars['DateTime']>;
  customerName?: Maybe<Scalars['String']>;
  endHireDate: Scalars['DateTime'];
  eventRequest: EventRequest;
  eventRequestId: Scalars['ID'];
  id: Scalars['ID'];
  isAcceptedComboService: Scalars['Boolean'];
  phoneNumber?: Maybe<Scalars['String']>;
  startHireDate: Scalars['DateTime'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EventRequestDetailInput = {
  address?: InputMaybe<Scalars['String']>;
  amountAttendee?: InputMaybe<Scalars['Float']>;
  customerName?: InputMaybe<Scalars['String']>;
  endHireDate?: InputMaybe<Scalars['DateTime']>;
  isAcceptedComboService?: InputMaybe<Scalars['Boolean']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  startHireDate?: InputMaybe<Scalars['DateTime']>;
};

export enum EventRequestStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

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
  contractServiceItems: Array<ContractServiceItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  details: Scalars['JSON'];
  fileUrl: Scalars['String'];
  hireDate: Scalars['DateTime'];
  hireEndDate: Scalars['DateTime'];
  id: Scalars['ID'];
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
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IEventRequest = {
  createdAt?: Maybe<Scalars['DateTime']>;
  event: Event;
  eventId: Scalars['ID'];
  eventRequestDetail: EventRequestDetail;
  id: Scalars['ID'];
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['ID'];
};

export type IEventRequests = {
  items: Array<IEventRequest>;
  meta: MetaPaginationInterface;
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
  detail: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  isPublished: Scalars['Boolean'];
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
  deleteFileS3: Scalars['String'];
  presignedUrlS3: IPreSignUrl;
  presignedUrlS3Public: IPreSignUrl;
  publishService: IService;
  refreshToken: RefreshResponse;
  requestCreateContract: IContract;
  signIn: LoginResponse;
  signOut: ResponseMessageBase;
  signUp: ResponseMessageBase;
  updateEventRequestStatusByAdmin: IEventRequest;
  updateMe: IUser;
  upsertEvent: IEvent;
  upsertEventRequest: IEventRequest;
  upsertService: IService;
  verifyCode: LoginResponse;
};


export type MutationAddItemToCartArgs = {
  input: AddItemToCartDto;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationDeleteFileS3Args = {
  deleteFileDto: DeleteFileDto;
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


export type MutationUpdateEventRequestStatusByAdminArgs = {
  input: UpdateEventRequestStatusByAdminInput;
};


export type MutationUpdateMeArgs = {
  input: UserUpdateInput;
};


export type MutationUpsertEventArgs = {
  input: UpsertEventDto;
};


export type MutationUpsertEventRequestArgs = {
  input: UpsertEventRequestInput;
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
  getContract: IContract;
  getContracts: IContracts;
  getEvent: IEvent;
  getEventRequest: IEventRequest;
  getEventRequests: IEventRequests;
  getEvents: IEvents;
  getMe: IUser;
  getMyCart: ICart;
  getMyContracts: IContracts;
  getRole: IRole;
  getRoles: IRoles;
  getService: IService;
  getServices: IServices;
  testQuery: Scalars['String'];
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


export type QueryGetEventRequestArgs = {
  id: Scalars['ID'];
};


export type QueryGetEventRequestsArgs = {
  queryParams: QueryFilterDto;
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
  detail: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  isPublished: Scalars['Boolean'];
  name: Scalars['String'];
  serviceItems?: Maybe<Array<ServiceItem>>;
  type: ServiceType;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ServiceItem = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  isPublished: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Float'];
  service: Service;
  serviceId: Scalars['ID'];
  totalQuantity: Scalars['Float'];
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

export type UpdateEventRequestStatusByAdminInput = {
  id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<EventRequestStatus>;
};

export type UpsertEventDto = {
  description?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type UpsertEventRequestInput = {
  eventId?: InputMaybe<Scalars['ID']>;
  eventRequestDetail?: InputMaybe<EventRequestDetailInput>;
  id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<EventRequestStatus>;
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
export const GetEventDocument = gql`
    query getEvent($input: ID!) {
  getEvent(id: $input) {
    id
    name
    description
    isPublic
    detail
    thumbnail
    updatedAt
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
      detail
      isPublic
      thumbnail
      updatedAt
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
export type MetaFragmentFragment = { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { changePassword: { message?: string | null, success?: boolean | null } };

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

export type UpsertEventMutationVariables = Exact<{
  input: UpsertEventDto;
}>;


export type UpsertEventMutation = { upsertEvent: { id: string, name: string, description: string, isPublic: boolean, detail: string, thumbnail?: string | null, updatedAt?: any | null } };

export type UpsertServiceMutationVariables = Exact<{
  input: UpsertServiceDto;
}>;


export type UpsertServiceMutation = { upsertService: { id: string, name: string, description?: string | null, images: Array<string>, type: ServiceType, detail: string, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price: number, isPublished: boolean, serviceId: string, description: string, totalQuantity: number, updatedAt?: any | null, createdAt?: any | null }> | null } };

export type VerifyCodeMutationVariables = Exact<{
  input: CodeVerifyDto;
}>;


export type VerifyCodeMutation = { verifyCode: { token: string, refreshToken: string, id: string } };

export type GetEventQueryVariables = Exact<{
  input: Scalars['ID'];
}>;


export type GetEventQuery = { getEvent: { id: string, name: string, description: string, isPublic: boolean, detail: string, thumbnail?: string | null, updatedAt?: any | null } };

export type GetEventsQueryVariables = Exact<{
  queryParams: QueryFilterDto;
}>;


export type GetEventsQuery = { getEvents: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, name: string, description: string, detail: string, isPublic: boolean, thumbnail?: string | null, updatedAt?: any | null }> } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe: { avatar?: string | null, email: string, firstName: string, lastName: string, id: string, phoneNumber?: string | null, role: { name: string } } };

export type GetServiceQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetServiceQuery = { getService: { id: string, name: string, description?: string | null, images: Array<string>, type: ServiceType, detail: string, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price: number, isPublished: boolean, serviceId: string, description: string, totalQuantity: number, updatedAt?: any | null, createdAt?: any | null }> | null } };

export type GetServicesQueryVariables = Exact<{
  query: QueryFilterDto;
}>;


export type GetServicesQuery = { getServices: { meta: { totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number }, items: Array<{ id: string, name: string, description?: string | null, images: Array<string>, type: ServiceType, detail: string, isPublished: boolean, createdAt?: any | null, updatedAt?: any | null, serviceItems?: Array<{ id: string, name: string, price: number, isPublished: boolean, serviceId: string, description: string, totalQuantity: number, updatedAt?: any | null, createdAt?: any | null }> | null }> } };
