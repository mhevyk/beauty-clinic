type SerializablePrimitive = string | number | boolean | null | undefined;

// Gets keys, which value if serializable primitive
export type FilterPrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends SerializablePrimitive ? K : never;
}[keyof T];

// Source: https://www.youtube.com/shorts/2lCCKiWGlC0
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
