import { InMemoryCache, makeVar } from '@apollo/client';
import { IUser } from '#/generated/schemas';
import { DeepPartial } from '#/shared/utils/type';

export const userVar = makeVar<DeepPartial<IUser>>({});

export const cache: InMemoryCache = new InMemoryCache();
