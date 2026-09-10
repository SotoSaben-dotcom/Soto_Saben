import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { ChapterHeading, FadeUp, MaskedLines } from "./Reveal";
import { FAQS } from "../lib/site";

export const Faq = () => (
  <section id="faq" data-testid="faq-section" className="py-20 sm:py-32 border-t border-line scroll-mt-20">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-5">
        <ChapterHeading number="08" title="Tanya Jawab" />
        <MaskedLines
          inView
          as="h2"
          className="mt-10 font-serif font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl"
          lines={["Sebelum", <span key="t">Anda <em className="text-sambal">Bertanya.</em></span>]}
        />
        <FadeUp delay={0.2}>
          <p className="mt-6 max-w-sm text-sm text-kopi leading-relaxed">
            Tidak menemukan jawaban? Tanyakan langsung lewat WhatsApp — kami
            balas secepat kuah soto mengepul.
          </p>
        </FadeUp>
      </div>

      <FadeUp delay={0.15} className="lg:col-span-7">
        <Accordion type="single" collapsible className="border-t border-line" data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-line">
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="py-6 text-left font-serif text-xl sm:text-2xl font-medium hover:text-sambal hover:no-underline transition-colors duration-300"
              >
                {f.q}
              </AccordionTrigger>
              <AccordionContent data-testid={`faq-content-${i}`} className="text-sm sm:text-base text-kopi leading-relaxed pb-6 max-w-xl">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeUp>
    </div>
  </section>
);
