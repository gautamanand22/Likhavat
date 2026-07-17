import clsx from "clsx";
import { Reveal } from "./Motion";

export function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  heading: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className={clsx("eyebrow mb-3", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-magenta/60" />
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "text-balance text-3xl sm:text-4xl lg:text-[2.9rem]",
          light ? "text-paper" : "text-ink",
        )}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-paper/70" : "text-muted",
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
