import { USER_ROLES } from "@/constants";

export type Interval = ReturnType<typeof setInterval>;
export type Timer = ReturnType<typeof setInterval>;
export type NonEmptyArray<T> = [T, ...T[]];

type SerializablePrimitive = string | number | boolean | null | undefined;

// Gets keys, which value if serializable primitive
export type FilterPrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends SerializablePrimitive ? K : never;
}[keyof T];

// Source: https://www.youtube.com/shorts/2lCCKiWGlC0
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type UserRole = keyof typeof USER_ROLES;

export type PostPageParams = {
  postId: string;
};
