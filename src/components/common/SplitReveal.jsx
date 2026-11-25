// Text block that used to split into words/lines and reveal on scroll. Content now shows as soon
// as the page loads, so it renders the text as-is. `mode` and `delay` are accepted and ignored so
// existing callers keep working.
export default function SplitReveal({ as: Tag = "div", mode, delay, className = "", children, ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
}
