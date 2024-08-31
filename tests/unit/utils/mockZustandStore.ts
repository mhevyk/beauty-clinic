import { StoreApi, UseBoundStore } from "zustand";

export default function mockZustandStore<Store>(
  useStoreHook: UseBoundStore<StoreApi<Store>>,
  data: Partial<Store>
) {
  (useStoreHook as unknown as jest.Mock).mockImplementation(fn => {
    return fn(data);
  });
}
