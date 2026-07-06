import { Badge } from "../../../shared/ui/Badge";
import { SegmentedControl } from "../../../shared/ui/SegmentedControl";
import { SegmentedControlItem } from "../../../shared/ui/SegmentedControlItem";

interface PatientFilterSelectorProps {
  value: "all" | "favorites";
  totalCount: number;
  favoriteCount: number;
  onChange: (value: "all" | "favorites") => void;
}

export function PatientFilterSelector({
  value,
  totalCount,
  favoriteCount,
  onChange,
}: PatientFilterSelectorProps) {
  return (
    <SegmentedControl>
      <SegmentedControlItem
        active={value === "all"}
        onClick={() => onChange("all")}
      >
        All patients
        <Badge variant={value === "all" ? "primary" : "neutral"}>
          {totalCount}
        </Badge>
      </SegmentedControlItem>

      <SegmentedControlItem
        active={value === "favorites"}
        onClick={() => onChange("favorites")}
      >
        Favorites
        <Badge variant={value === "favorites" ? "primary" : "neutral"}>
          {favoriteCount}
        </Badge>
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
