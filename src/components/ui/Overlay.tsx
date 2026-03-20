import { useProductStore } from "@/store/useProductStore";
import { SECTION_CONTENT } from "@/utils/constants";
import { VariantSelector } from "./VariantSelector";
import { SectionNav } from "./SectionNav";

export function Overlay() {
  const currentSection = useProductStore((state) => state.currentSection);
  const content = SECTION_CONTENT[currentSection];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-text-primary font-semibold text-2xl tracking-tight">
            Resonance
          </div>
          <button className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
            Menu
          </button>
        </div>
      </header>

      <div className="fixed inset-0 pointer-events-none z-20">
        <div className="absolute left-8 md:left-16 bottom-24 md:bottom-32 max-w-xl pointer-events-auto">
          <div className="space-y-4">
            <p className="text-text-secondary text-sm md:text-base font-medium tracking-wide uppercase">
              {content.subtitle}
            </p>
            <h1 className="text-text-primary text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
              {content.title}
            </h1>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-md">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      <SectionNav />
      <VariantSelector />

      <footer className="fixed bottom-6 left-8 z-20 pointer-events-none">
        <div className="flex items-center gap-4 text-text-secondary text-xs">
          <span>Scroll to explore</span>
          <div className="w-6 h-10 border border-text-secondary/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-text-secondary/50 rounded-full animate-bounce" />
          </div>
        </div>
      </footer>
    </>
  );
}
