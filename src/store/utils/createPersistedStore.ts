import { ISO_DATE_PATTERN } from "@constants/index";
import { StateCreator, create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Deserialise Date object correctly
const storage = createJSONStorage<Storage>(() => localStorage, {
  reviver: (_, value) => {
    if (typeof value === "string" && ISO_DATE_PATTERN.test(value)) {
      return new Date(value);
    }
    
    return value;
  },
});

export default function createPersistedStore<TState>(
  key: string,
  initializer: StateCreator<TState>
) {
  return create<TState>()(
    persist(initializer, {
      name: key,
      storage,
    })
  );
}
