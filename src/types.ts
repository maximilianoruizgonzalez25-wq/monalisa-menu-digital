/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  popular?: boolean;
  options?: string[]; // e.g. ["Clásica", "Doble"] or proteins
  image?: string;
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedOption?: string;
}

export interface Promotion {
  day: string;
  title: string;
  description: string;
  badge?: string;
  price?: string;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'get',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}
