import { useState } from "react";
import { Header } from "@/components/Header";
import { PrescriptionInput } from "@/components/PrescriptionInput";
import { PrescriptionOutput } from "@/components/PrescriptionOutput";
import { HistoryPanel } from "@/components/HistoryPanel";
import { AccessibilityToggle } from "@/components/AccessibilityToggle";
import {
  type Language,
  type SimplifiedPrescription,
  type HistoryEntry,
  simplifyPrescription,
} from "@/lib/prescription-engine";

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [result, setResult] = useState<SimplifiedPrescription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [accessible, setAccessible] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleGenerate = async (text: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate processing delay for UX
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
      const output = simplifyPrescription(text, language);
      setResult(output);

      // Add to history (keep last 3)
      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        input: text,
        output,
        language,
        timestamp: new Date(),
      };
      setHistory((prev) => [entry, ...prev].slice(0, 3));
    } catch {
      setError("Something went wrong. Please try again.");
      // Fallback: generate basic response
      setResult({
        morning: ["Follow your doctor's instructions"],
        afternoon: [],
        night: [],
        warnings: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (entry: HistoryEntry) => {
    setResult(entry.output);
    setLanguage(entry.language);
  };

  return (
    <div
      className={`min-h-screen bg-background transition-all ${accessible ? "accessible-text" : ""} ${highContrast ? "high-contrast" : ""}`}
    >
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="container max-w-3xl py-8 px-4 space-y-6">
        <PrescriptionInput onGenerate={handleGenerate} loading={loading} />

        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-destructive text-sm animate-fade-in">
            {error}
          </div>
        )}

        {(result || loading) && (
          <PrescriptionOutput
            result={result}
            loading={loading}
            language={language}
          />
        )}

        {history.length > 0 && (
          <HistoryPanel history={history} onSelect={handleHistorySelect} />
        )}

        <AccessibilityToggle
          accessible={accessible}
          onAccessibleChange={setAccessible}
          highContrast={highContrast}
          onHighContrastChange={setHighContrast}
        />
      </main>
    </div>
  );
};

export default Index;
