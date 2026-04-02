import React, { useState } from "react";
import { Sun, CloudSun, Moon, Volume2, AlertTriangle, Loader2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type Language,
  type SimplifiedPrescription,
  prescriptionToText,
} from "@/lib/prescription-engine";

interface PrescriptionOutputProps {
  result: SimplifiedPrescription | null;
  loading: boolean;
  language: Language;
}

const TimeBlock = React.forwardRef<
  HTMLDivElement,
  {
    icon: React.ElementType;
    label: string;
    items: string[];
    color: string;
  }
>(({ icon: Icon, label, items, color }, ref) => {
  if (items.length === 0) return null;
  return (
    <div ref={ref} className={`rounded-lg border p-4 space-y-2 ${color}`}>
      <div className="flex items-center gap-2 font-semibold text-sm">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
TimeBlock.displayName = "TimeBlock";

const TIME_LABELS: Record<Language, { morning: string; afternoon: string; night: string }> = {
  en: { morning: "Morning", afternoon: "Afternoon", night: "Night" },
  hi: { morning: "सुबह", afternoon: "दोपहर", night: "रात" },
  bn: { morning: "সকাল", afternoon: "দুপুর", night: "রাত" },
};

const LANG_MAP: Record<Language, string> = {
  en: "en-US",
  hi: "hi-IN",
  bn: "bn-IN",
};

export const PrescriptionOutput = React.forwardRef<HTMLDivElement, PrescriptionOutputProps>(
  ({ result, loading, language }, ref) => {
    const [speaking, setSpeaking] = useState(false);
    const labels = TIME_LABELS[language];

    const handleSpeak = () => {
      if (!result) return;

      // Stop if already speaking
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }

      const text = prescriptionToText(result, language);
      if (!text.trim()) return;

      // Cancel any ongoing speech first
      window.speechSynthesis.cancel();

      // Small delay to ensure cancel completes (Chrome bug workaround)
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = LANG_MAP[language];
        utterance.rate = 0.85;
        utterance.pitch = 1;

        // Try to find a matching voice
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find((v) => v.lang.startsWith(LANG_MAP[language].split("-")[0]));
        if (matchingVoice) utterance.voice = matchingVoice;

        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setSpeaking(true);

        // Chrome pauses long utterances after ~15s; this workaround keeps it alive
        const keepAlive = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            clearInterval(keepAlive);
            setSpeaking(false);
            return;
          }
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }, 10000);

        utterance.onend = () => {
          clearInterval(keepAlive);
          setSpeaking(false);
        };
        utterance.onerror = () => {
          clearInterval(keepAlive);
          setSpeaking(false);
        };
      }, 100);
    };

    if (loading) {
      return (
        <div ref={ref} className="rounded-xl border bg-card p-8 shadow-card flex flex-col items-center gap-3 animate-fade-in">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Simplifying your prescription…</p>
        </div>
      );
    }

    if (!result) return null;

    return (
      <div ref={ref} className="rounded-xl border bg-card p-6 shadow-card animate-fade-in space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">
            Your Simple Schedule
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeak}
            className="gap-1.5"
          >
            {speaking ? (
              <>
                <Square className="h-3.5 w-3.5 text-destructive" />
                Stop
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Play Audio
              </>
            )}
          </Button>
        </div>

        {result.warnings.length > 0 && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 flex items-start gap-3 animate-fade-in">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive text-sm">⚠ Consult Doctor Immediately</p>
              {result.warnings.map((w, i) => (
                <p key={i} className="text-sm text-destructive/80 mt-1">{w}</p>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-3">
          <TimeBlock
            icon={Sun}
            label={labels.morning}
            items={result.morning}
            color="bg-warning/5 border-warning/20 text-warning"
          />
          <TimeBlock
            icon={CloudSun}
            label={labels.afternoon}
            items={result.afternoon}
            color="bg-accent/5 border-accent/20 text-accent"
          />
          <TimeBlock
            icon={Moon}
            label={labels.night}
            items={result.night}
            color="bg-primary/5 border-primary/20 text-primary"
          />
        </div>
      </div>
    );
  }
);
PrescriptionOutput.displayName = "PrescriptionOutput";
