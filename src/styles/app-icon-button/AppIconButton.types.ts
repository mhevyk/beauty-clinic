import { IconProps, IconifyIconProps } from "@iconify/react";
import { ComponentPropsWithoutRef } from "react";

export type AppIconButtonProps = {
  icon: IconifyIconProps["icon"];
  iconProps?: Omit<IconProps, "icon" | "width" | "height" | "fontSize">;
  size?: number;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;
