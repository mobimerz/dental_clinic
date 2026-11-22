// Renders a blog post's content blocks (see data/blog.js) with the site's type scale.
// Server component: no motion, so long articles stay light.

// "**bold**" inside text becomes <strong>; everything else stays plain text.
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-secondary">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

function Block({ block }) {
  switch (block.type) {
    case "lead":
      return <p className="text-h3-lg text-secondary">{block.text}</p>;
    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-28 pt-6 text-h3-lg text-secondary md:pt-8">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-h3 text-secondary">{block.text}</h3>;
    case "list":
      return (
        <ul className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>
                {typeof item === "string" ? (
                  <Rich text={item} />
                ) : (
                  <>
                    <strong className="font-semibold text-secondary">{item.term}:</strong> {item.text}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        // Scrolls sideways inside its own frame on narrow screens instead of widening the page.
        <div className="overflow-x-auto rounded-[1.5rem] ring-1 ring-line">
          <table className="w-full min-w-[30rem] border-collapse text-left">
            <thead className="bg-soft">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([first, ...rest]) => (
                <tr key={first} className="border-t border-line">
                  <th scope="row" className="px-5 py-4 font-semibold text-secondary">
                    {first}
                  </th>
                  {rest.map((cell, i) => (
                    <td key={i} className="px-5 py-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return <p className="rounded-[1.5rem] bg-soft px-5 py-4 text-sm italic leading-relaxed">{block.text}</p>;
    default:
      return (
        <p>
          <Rich text={block.text} />
        </p>
      );
  }
}

export default function ArticleBody({ blocks }) {
  return (
    <div className="space-y-5 text-body text-muted">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
