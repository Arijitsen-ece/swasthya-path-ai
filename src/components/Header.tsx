import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Language, LANGUAGE_LABELS } from "@/lib/prescription-engine";

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  return (
    <header className="healthcare-gradient py-6 px-4 shadow-elevated">
      <div className="container max-w-3xl flex items-center justify-between">
        
        {/* LEFT SIDE (Logo + Name) */}
        <div className="flex items-center gap-3">
          
          {/* 🔥 Custom Logo */}
          <div className="rounded-xl bg-primary-foreground/20 p-2">
            <img src="/my-logo.png" alt="App Logo" className="h-7 w-7 object-contain" />
            
          </div>

          {/* 🔥 App Name */}
          <div>
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              My Health Companion
            </h1>
            <p className="text-xs text-primary-foreground/80">
              Smart Prescription Simplifier
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (Language Selector) */}
        <Select
          value={language}
          onValueChange={(v) => onLanguageChange(v as Language)}
        >
          <SelectTrigger className="w-[130px] border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
              <SelectItem key={lang} value={lang}>
                {LANGUAGE_LABELS[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}