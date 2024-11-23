import { ElementType } from "react";

export type PropsWithAs<T extends ElementType> = {
  as?: T;
};
