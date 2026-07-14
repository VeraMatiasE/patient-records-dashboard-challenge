import { Badge } from "~/shared/ui/badge/Badge";
import { SegmentedControl } from "~/shared/ui/segmented-control/SegmentedControl";
import { SegmentedControlItem } from "~/shared/ui/segmented-control/SegmentedControlItem";

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
