import { useProductStore, type Section } from "@/store/useProductStore";
import { SCROLL_SECTIONS } from "@/utils/constants";

export function SectionNav() {
  const currentSection = useProductStore((state) => state.currentSection);
  const setCurrentSection = useProductStore((state) => state.setCurrentSection);
  const setCameraState = useProductStore((state) => state.setCameraState);

  const handleSectionClick = (section: Section) => {
    setCurrentSection(section);
    const sectionData = SCROLL_SECTIONS.find((s) => s.section === section);
    if (sectionData) {
      setCameraState(sectionData.camera);
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden md:block">
      <div className="flex flex-col gap-6">
        {SCROLL_SECTIONS.map(({ section }) => (
          <button
            key={section}
            onClick={() => handleSectionClick(section)}
            className="group relative flex items-center gap-3"
            aria-label={`Go to ${section} section`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                currentSection === section
                  ? "bg-text-primary scale-125"
                  : "bg-text-secondary group-hover:bg-text-primary group-hover:scale-110"
              }`}
            />
            <span
              className={`text-sm capitalize transition-all whitespace-nowrap ${
                currentSection === section
                  ? "text-text-primary opacity-100"
                  : "text-text-secondary opacity-0 group-hover:opacity-100"
              }`}
            >
              {section}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
