import React from "react";
import { Clock } from "lucide-react";
import { type HistoryEntry } from "@/lib/prescription-engine";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
}

export const HistoryPanel = React.forwardRef<HTMLDivElement, HistoryPanelProps>(
  ({ history, onSelect }, ref) => {
    return (
      <div ref={ref} className="rounded-xl border bg-card p-5 shadow-card animate-fade-in space-y-3">
        <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Recent History
        </h3>
        <div className="space-y-2">
          {history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="w-full text-left rounded-lg border bg-muted/30 p-3 text-sm hover:bg-muted/60 transition-colors"
            >
              <p className="truncate text-foreground">{entry.input}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {entry.timestamp.toLocaleTimeString()}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }
);
HistoryPanel.displayName = "HistoryPanel";
