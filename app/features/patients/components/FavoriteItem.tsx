import { Avatar } from "~/shared/ui/Avatar";
import type { Patient } from "~/features/patients/types/patient";
import { IconButton } from "~/shared/ui/buttons/IconButton";
import { Icon } from "~/shared/ui/icons/Icon";
import { useEffect, useRef, useState } from "react";

interface FavoriteItemProps {
  patient: Patient;
  onRemove: (id: string) => void;
  onClick: () => void;
}

export function FavoriteItem({
  patient,
  onRemove,
  onClick,
}: FavoriteItemProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const removedRef = useRef(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function handleRemove() {
    if (leaving) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      onRemove(patient.id);
      return;
    }

    setLeaving(true);
  }

  function handleTransitionEnd(e: React.TransitionEvent<HTMLLIElement>) {
    if (!leaving || e.target !== e.currentTarget) return;
    if (removedRef.current) return;

    removedRef.current = true;
    onRemove(patient.id);
  }

  const animationClass = leaving
    ? "opacity-0 scale-95 -translate-x-2"
    : !visible
      ? "opacity-0 scale-95 -translate-y-1.5"
      : "opacity-100 scale-100 translate-x-0 translate-y-0";

  return (
    <li
      onClick={onClick}
      onTransitionEnd={handleTransitionEnd}
      className={`flex cursor-pointer select-none items-center gap-2 px-1.5 py-1.5 rounded-[var(--radius-button)] hover:bg-surface-hover transition-[opacity,transform,background-color] duration-200 ease-out  ${
        animationClass
      }`}
    >
      <Avatar src={patient.avatar} name={patient.name} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text truncate">{patient.name}</p>
        <p className="text-[10px] text-text-muted">#{patient.id}</p>
      </div>
      <IconButton
        icon={<Icon name="x" className="h-4 w-4" />}
        ariaLabel={`Remove ${patient.name} from favorites`}
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className="flex-shrink-0 text-text-muted hover:text-danger"
      />
    </li>
  );
}
