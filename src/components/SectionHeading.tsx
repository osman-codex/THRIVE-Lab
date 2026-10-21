interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Small uppercase kicker shown above the title (e.g. "Our Science"). */
  label?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, label, id }: SectionHeadingProps) {
  return (
    <div className="section-heading" id={id}>
      {label && <p className="section-heading__label">{label}</p>}
      <span className="section-heading__accent" aria-hidden="true" />
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
