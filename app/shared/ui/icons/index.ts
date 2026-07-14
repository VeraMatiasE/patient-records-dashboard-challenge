import { XIcon } from "./components/XIcon";
import { StarIcon } from "./components/StarIcon";
import { StarFilledIcon } from "./components/StarFilledIcon";
import { EditIcon } from "./components/EditIcon";
import { SearchIcon } from "./components/SearchIcon";
import { ChevronDownIcon } from "./components/ChevronDownIcon";
import { CheckIcon } from "./components/CheckIcon";

export const Icons = {
  x: XIcon,
  check: CheckIcon,
  star: StarIcon,
  starFilled: StarFilledIcon,
  edit: EditIcon,
  search: SearchIcon,
  chevronDown: ChevronDownIcon,
} as const;

export type IconName = keyof typeof Icons;
