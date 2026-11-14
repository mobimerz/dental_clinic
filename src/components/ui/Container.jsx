// The Home hero's container: max 1240px, 20px side padding (32px from 768px). Every section uses it.
export default function Container({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`container-page ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
