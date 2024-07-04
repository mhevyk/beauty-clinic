import { ISO_DATE_PATTERN } from "@/constants/index";
import { FilterPrimitiveKeys } from "@type-helpers";
import { StateCreator, create } from "zustand";
import { PersistOptions, createJSONStorage, persist } from "zustand/middleware";

// Deserialise Date object correctly
const createStorage = <TState>() =>
  createJSONStorage<TState>(() => localStorage, {
    reviver: (_, value) => {
      if (typeof value === "string" && ISO_DATE_PATTERN.test(value)) {
        return new Date(value);
      }

      return value;
    },
  });

type FieldsToPersist<TState> = Partial<
  Record<FilterPrimitiveKeys<TState>, true>
>;

type CustomPersistOptions<TState> = Omit<
  PersistOptions<TState>,
  "storage" | "partialize"
> & {
  fieldsToPersist?: FieldsToPersist<TState>;
};

export default function createPersistedStore<TState>(
  initializer: StateCreator<TState>,
  options: CustomPersistOptions<TState>
) {
  return create<TState>()(
    persist(initializer, {
      storage: createStorage<TState>(),
      partialize: (state) => {
        if (!options.fieldsToPersist) {
          return state;
        }

        const result = {} as TState;

        for (const [key, value] of Object.entries(options.fieldsToPersist)) {
          if (!value) {
            continue;
          }

          const typedKey = key as keyof TState;
          result[typedKey] = state[typedKey];
        }

        return result;
      },
      ...options,
    })
  );
}
