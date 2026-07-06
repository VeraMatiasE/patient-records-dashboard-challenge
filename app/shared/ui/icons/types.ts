import type { ComponentType, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export type IconComponent = ComponentType<IconProps>;

export type IconName =
  | "x"
  | "star"
  | "starFilled"
  | "edit"
  | "search"
  | "chevronDown";
