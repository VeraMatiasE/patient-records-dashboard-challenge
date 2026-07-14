import type { IconProps } from "../types";

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 17.3l-6.2 3.7 1.7-7.1L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.7 1.7 7.1z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
