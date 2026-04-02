import { useState } from "react";
import { Sparkles, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SAMPLE_PRESCRIPTION } from "@/lib/prescription-engine";

interface PrescriptionInputProps {
  onGenerate: (text: string) => void;
  loading: boolean;
}

export function PrescriptionInput({ onGenerate, loading }: PrescriptionInputProps) {
  const [text, setText] = useState("");

  const handleTrySample = () => {
    setText(SAMPLE_PRESCRIPTION);
  };

  return (
    <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-card-foreground">
          Enter Prescription
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTrySample}
          className="gap-1.5 text-xs"
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Try Sample
        </Button>
      </div>

      <Textarea
        placeholder="Paste or type your prescription here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="resize-none text-base"
      />

      <Button
        onClick={() => onGenerate(text)}
        disabled={!text.trim() || loading}
        className="w-full gap-2 healthcare-gradient border-0 text-primary-foreground font-semibold h-12 text-base"
      >
        {loading ? (
          <span className="animate-pulse-gentle">Processing…</span>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Simplify Prescription
          </>
        )}
      </Button>
    </div>
  );
}
