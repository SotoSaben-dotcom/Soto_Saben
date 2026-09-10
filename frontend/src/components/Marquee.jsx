import { MARQUEE_ITEMS } from "../lib/site";

export const Marquee = () => {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      data-testid="marquee-section"
      className="overflow-hidden border-y border-line py-5 sm:py-7 select-none"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-serif italic text-2xl sm:text-4xl text-ink/80 whitespace-nowrap px-6 sm:px-10">
                  {item}
                </span>
                <span className="text-sambal text-lg sm:text-2xl">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
