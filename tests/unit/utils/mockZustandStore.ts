import { StoreApi, UseBoundStore } from "zustand";

export default function mockZustandStore<Store>(
  useStoreHook: UseBoundStore<StoreApi<Store>>,
  data: Partial<Store>
) {
  (useStoreHook as unknown as jest.Mock).mockImplementationOnce(fn => {
    return fn(data);
  });
}
