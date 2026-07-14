import { Icons } from "./index";
import type { IconName } from "./index";
import type { IconProps } from "./types";

interface Props extends IconProps {
  name: IconName;
}

export function Icon({ name, ...props }: Props) {
  const Component = Icons[name];
  return <Component {...props} />;
}
