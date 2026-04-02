export type Language = "en" | "hi" | "bn";

export interface SimplifiedPrescription {
  morning: string[];
  afternoon: string[];
  night: string[];
  warnings: string[];
}

export interface HistoryEntry {
  id: string;
  input: string;
  output: SimplifiedPrescription;
  language: Language;
  timestamp: Date;
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  bn: "বাংলা",
};

export const SAMPLE_PRESCRIPTION =
  "Take one Paracetamol 500mg tablet after breakfast. Take cough syrup 10ml before sleep. Apply ointment on wound twice daily. If severe pain persists, consult doctor immediately.";

const EMERGENCY_KEYWORDS = [
  "severe", "emergency", "bleeding", "unconscious", "chest pain",
  "breathless", "seizure", "stroke", "heart attack", "poison",
  "overdose", "suicide", "critical", "immediately",
];

export function detectEmergency(text: string): string[] {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.filter((kw) => lower.includes(kw));
}

const TRANSLATIONS: Record<Language, {
  morning: string;
  afternoon: string;
  night: string;
  take: string;
  apply: string;
  before: string;
  after: string;
  food: string;
  sleep: string;
  breakfast: string;
  lunch: string;
  dinner: string;
}> = {
  en: { morning: "Morning", afternoon: "Afternoon", night: "Night", take: "Take", apply: "Apply", before: "before", after: "after", food: "food", sleep: "sleep", breakfast: "breakfast", lunch: "lunch", dinner: "dinner" },
  hi: { morning: "सुबह", afternoon: "दोपहर", night: "रात", take: "लें", apply: "लगाएं", before: "पहले", after: "बाद", food: "खाना", sleep: "सोने", breakfast: "नाश्ता", lunch: "दोपहर का खाना", dinner: "रात का खाना" },
  bn: { morning: "সকাল", afternoon: "দুপুর", night: "রাত", take: "নিন", apply: "লাগান", before: "আগে", after: "পরে", food: "খাবার", sleep: "ঘুম", breakfast: "সকালের নাস্তা", lunch: "দুপুরের খাবার", dinner: "রাতের খাবার" },
};

export function simplifyPrescription(
  text: string,
  language: Language
): SimplifiedPrescription {
  const t = TRANSLATIONS[language];
  const lines = text
    .split(/[.\n]+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const morning: string[] = [];
  const afternoon: string[] = [];
  const night: string[] = [];
  const warnings: string[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Check for emergency / warning lines
    const emergencyHits = detectEmergency(line);
    if (emergencyHits.length > 0) {
      warnings.push(line);
      continue;
    }

    // Determine timing
    const isMorning = /morning|breakfast|once daily|twice daily|daily/i.test(lower);
    const isNight = /night|sleep|bedtime|before bed/i.test(lower);
    const isAfternoon = /afternoon|lunch|noon|twice daily/i.test(lower);

    // Build simple instruction
    let simple = line;
    if (language !== "en") {
      // Basic translation for common patterns
      simple = simple
        .replace(/take/gi, t.take)
        .replace(/apply/gi, t.apply)
        .replace(/before/gi, t.before)
        .replace(/after/gi, t.after)
        .replace(/breakfast/gi, t.breakfast)
        .replace(/lunch/gi, t.lunch)
        .replace(/dinner/gi, t.dinner)
        .replace(/sleep/gi, t.sleep)
        .replace(/food/gi, t.food);
    }

    if (isMorning) morning.push(simple);
    if (isAfternoon) afternoon.push(simple);
    if (isNight) night.push(simple);
    if (/twice daily/i.test(lower)) {
      if (!morning.includes(simple)) morning.push(simple);
      if (!night.includes(simple)) night.push(simple);
    }
    if (!isMorning && !isAfternoon && !isNight && !/twice daily/i.test(lower)) {
      morning.push(simple);
    }
  }

  return { morning, afternoon, night, warnings };
}

export function speakText(text: string, lang: Language): SpeechSynthesisUtterance | null {
  if (!("speechSynthesis" in window)) return null;
  window.speechSynthesis.cancel();

  const langMap: Record<Language, string> = {
    en: "en-US",
    hi: "hi-IN",
    bn: "bn-IN",
  };

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langMap[lang];
  utterance.rate = 0.85;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function prescriptionToText(
  result: SimplifiedPrescription,
  language: Language
): string {
  const t = TRANSLATIONS[language];
  let text = "";
  if (result.morning.length) text += `${t.morning}: ${result.morning.join(". ")}. `;
  if (result.afternoon.length) text += `${t.afternoon}: ${result.afternoon.join(". ")}. `;
  if (result.night.length) text += `${t.night}: ${result.night.join(". ")}. `;
  return text;
}
