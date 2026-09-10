import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const FadeUp = ({ children, delay = 0, className = "", y = 40, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0, inView = false, as: Tag = "h1", ...rest }) => (
  <Tag className={className} {...rest}>
    {lines.map((line, i) => (
      <motion.span
        key={i}
        className="block overflow-hidden pb-[0.08em] -mb-[0.08em]"
        initial="hidden"
        {...(inView
          ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
          : { animate: "show" })}
      >
        <motion.span
          className={`block will-change-transform ${lineClassName}`}
          variants={{
            hidden: { y: "115%" },
            show: { y: "0%", transition: { duration: 1.1, delay: delay + i * 0.13, ease: EASE } },
          }}
        >
          {line}
        </motion.span>
      </motion.span>
    ))}
  </Tag>
);

export const ChapterHeading = ({ number, title, className = "" }) => (
  <FadeUp className={`flex items-center gap-4 ${className}`}>
    <span className="text-xs font-bold tracking-[0.3em] text-sambal uppercase">{number}</span>
    <span className="h-px flex-1 bg-line" aria-hidden="true" />
    <span className="text-xs font-bold tracking-[0.3em] text-kopi uppercase">{title}</span>
  </FadeUp>
);
