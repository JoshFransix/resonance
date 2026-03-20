import { useProductStore, type ProductVariant } from "@/store/useProductStore";
import { VARIANT_COLORS, VARIANT_DISPLAY_NAMES } from "@/utils/constants";

export function VariantSelector() {
  const activeVariant = useProductStore((state) => state.activeVariant);
  const setActiveVariant = useProductStore((state) => state.setActiveVariant);

  const variants: ProductVariant[] = [
    "midnight-black",
    "silver-mist",
    "deep-navy",
  ];

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-surface/90 backdrop-blur-md rounded-2xl px-6 py-4 border border-accent shadow-2xl">
        <h3 className="text-text-primary font-medium text-sm mb-4 text-center">
          Color Variant
        </h3>
        <div className="flex items-center gap-4">
          {variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setActiveVariant(variant)}
              className={`group flex flex-col items-center gap-2 transition-transform hover:scale-110 ${
                activeVariant === variant ? "scale-110" : ""
              }`}
              aria-label={VARIANT_DISPLAY_NAMES[variant]}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 transition-all ${
                  activeVariant === variant
                    ? "border-text-primary shadow-lg"
                    : "border-accent hover:border-text-secondary"
                }`}
                style={{ backgroundColor: VARIANT_COLORS[variant].primary }}
              />
              <span
                className={`text-xs transition-colors ${
                  activeVariant === variant
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                }`}
              >
                {VARIANT_DISPLAY_NAMES[variant]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
