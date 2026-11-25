// A stat number. It used to count up from 0 when scrolled into view; it now shows the final value
// as soon as the page loads. `duration` is accepted and ignored so existing callers keep working.
export default function Counter({ value, decimals = 0, suffix = "" }) {
  return (
    <span aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {Number(value).toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}
