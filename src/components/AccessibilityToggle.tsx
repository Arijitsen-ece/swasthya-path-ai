import { Eye, ZoomIn } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AccessibilityToggleProps {
  accessible: boolean;
  onAccessibleChange: (v: boolean) => void;
  highContrast: boolean;
  onHighContrastChange: (v: boolean) => void;
}

export function AccessibilityToggle({
  accessible,
  onAccessibleChange,
  highContrast,
  onHighContrastChange,
}: AccessibilityToggleProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
      <h3 className="text-sm font-semibold text-card-foreground mb-3">
        Accessibility
      </h3>
      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <ZoomIn className="h-4 w-4" />
            Larger Text
          </span>
          <Switch checked={accessible} onCheckedChange={onAccessibleChange} />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            High Contrast
          </span>
          <Switch checked={highContrast} onCheckedChange={onHighContrastChange} />
        </label>
      </div>
    </div>
  );
}
