import { act, fireEvent } from "@testing-library/react";

export default async function typeIntoInput(
  input: Parameters<typeof fireEvent.change>[0],
  value: string | number
) {
  await act(async () => {
    fireEvent.change(input, { target: { value } });
  });
}
