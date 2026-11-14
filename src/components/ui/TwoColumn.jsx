// Two-column layouts, built on the Home hero's grid.
//   layout="media"  – text beside a photo column, exactly like the hero: flexible text | 420px photo
//   layout="aside"  – a header column beside wider content (lists, FAQs, mosaics): 5fr | 7fr
//   reverse         – puts the second column first on desktop (photo on the left)
// Gap is the hero's: 48px stacked, 40px side by side. Columns are vertically centred by default;
// align="start" for sticky columns, align="stretch" when both columns must share top and bottom lines.
const columns = {
  media: "lg:grid-cols-[minmax(0,1fr)_420px]",
  mediaReverse: "lg:grid-cols-[420px_minmax(0,1fr)]",
  aside: "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]",
  asideReverse: "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
};

const aligns = {
  center: "lg:items-center",
  start: "lg:items-start",
  stretch: "lg:items-stretch",
};

export default function TwoColumn({ layout = "media", reverse = false, align = "center", className = "", children, ...rest }) {
  const key = `${layout}${reverse ? "Reverse" : ""}`;
  return (
    <div
      className={`grid gap-12 lg:gap-10 ${columns[key]} ${aligns[align]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
