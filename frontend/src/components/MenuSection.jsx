import { ArrowUpRight } from "lucide-react";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { MENU, EXTRA_DRINKS, LAUK, orderLink } from "../lib/site";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const MenuSection = () => (
  <section id="menu" data-testid="menu-section" className="py-20 sm:py-32 border-t border-line scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <ChapterHeading number="02" title="Menu Utama dan Daftar Harga" />

      <div className="mt-10 sm:mt-16 grid lg:grid-cols-12 gap-10 lg:gap-8 items-end">
        <MaskedLines
          inView
          as="h2"
          className="lg:col-span-7 font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl"
          lines={["Dari Dapur Kami", <span key="m">ke <em className="text-sambal">Meja Anda.</em></span>]}
        />
        <FadeUp delay={0.2} className="lg:col-span-4 lg:col-start-9">
          <p className="text-sm text-kopi leading-relaxed">
            Harga bersahabat, rasa tak pernah setengah — kuah kuning keemasan
            dimasak sejak subuh, diracik hangat begitu Anda tiba.
          </p>
        </FadeUp>
      </div>

      <div className="mt-14 sm:mt-20 grid lg:grid-cols-3 gap-10 lg:gap-14">
        {MENU.map((group, gi) => (
          <FadeUp key={group.category} delay={gi * 0.12} data-testid={`menu-group-${slug(group.category)}`}>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold">{group.category}</h3>
              <p className="mt-2 text-sm text-kopi leading-relaxed min-h-[3rem]">{group.note}</p>
              <div className="mt-6 border-t border-ink/20">
                {group.items.map((item) => (
                  <a
                    key={item.name + item.price}
                    href={orderLink(item.name, group.category, item.price)}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`menu-order-${slug(group.category)}-${slug(item.name)}`}
                    className="group flex items-baseline gap-3 py-5 border-b border-line hover:bg-ink/[0.03] transition-colors duration-300 px-1 -mx-1"
                  >
                    <span className="text-sm sm:text-base font-medium">{item.name}</span>
                    <span className="flex-1 border-b border-dotted border-kopi/40 translate-y-[-4px]" aria-hidden="true" />
                    <span className="font-serif text-lg sm:text-xl font-semibold">{item.price}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-sambal opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
              {gi === 2 && (
                <div className="mt-6">
                  <p className="text-[0.65rem] tracking-[0.25em] uppercase text-kopi/70 mb-3">Juga tersedia</p>
                  <div className="flex flex-wrap gap-2" data-testid="menu-extra-drinks">
                    {EXTRA_DRINKS.map((d) => (
                      <span key={d.name} className="text-xs px-3 py-1.5 border border-line text-kopi">
                        {d.name} · {d.price}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 sm:mt-20 pt-16 sm:pt-20 border-t border-line grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="overflow-hidden border border-line">
            <img
              src="/images/lauk-ayam.jpg"
              alt="Ayam kampung ungkep bumbu kuning — paha, kepala, ati ampela"
              data-testid="lauk-photo"
              className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-[0.65rem] tracking-[0.25em] uppercase text-kopi/70">
            Ayam kampung ungkep bumbu kuning
          </p>
        </div>
        <div className="lg:col-span-7" data-testid="menu-group-lauk-jajanan">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold">{LAUK.category}</h3>
          <p className="mt-2 text-sm text-kopi leading-relaxed">{LAUK.note}</p>
          <div className="mt-6 border-t border-ink/20 sm:grid sm:grid-cols-2 sm:gap-x-10">
            {LAUK.items.map((item) => (
              <a
                key={item.name}
                href={orderLink(item.name, LAUK.category, item.price)}
                target="_blank"
                rel="noreferrer"
                data-testid={`menu-order-lauk-jajanan-${slug(item.name)}`}
                className="group flex items-baseline gap-3 py-4 border-b border-line hover:bg-ink/[0.03] transition-colors duration-300 px-1 -mx-1"
              >
                <span className="text-sm sm:text-base font-medium">{item.name}</span>
                <span className="flex-1 border-b border-dotted border-kopi/40 translate-y-[-4px]" aria-hidden="true" />
                <span className="font-serif text-lg sm:text-xl font-semibold whitespace-nowrap">{item.price}</span>
                <ArrowUpRight
                  size={16}
                  className="text-sambal opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-kopi italic" data-testid="lauk-more-note">
            …dan lauk atau jajanan lainnya.
          </p>
        </div>
      </FadeUp>

      <FadeUp className="mt-16 sm:mt-24 grid lg:grid-cols-12 gap-8 items-center border border-line">
        <div className="lg:col-span-7 overflow-hidden">
          <img
            src="/images/soto-asli.jpg"
            alt="Soto Pisah Soto Saben — bihun, suwiran ayam kampung, tomat, dan perkedel"
            className="w-full aspect-[16/9] object-cover hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-5 p-8 sm:p-12">
          <p className="font-serif italic text-2xl sm:text-3xl leading-snug">
            "Nasi, kol, suwiran ayam & potongan daging sapi, taoge, tomat,
            perkedel, bihun, seledri — siap disiram kuah kuning sedikit bening
            yang mengepul."
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);
