import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Phone } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import FaqSection from "@/components/sections/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import ArticleBody from "@/components/blog/ArticleBody";
import Button from "@/components/common/Button";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { card } from "@/components/ui/styles";
import { clinic, whatsappLink } from "@/data/clinic";
import { posts, getPost, formatDate, readingMinutes } from "@/data/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.seoTitle,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }],
    },
    twitter: { card: "summary_large_image", title: post.seoTitle, description: post.excerpt, images: [post.image.src] },
  };
}

export default async function BlogPostPage({ params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const minutes = readingMinutes(post);
  const sections = post.content.filter((b) => b.type === "h2");
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.seoTitle,
      description: post.excerpt,
      image: post.image.src,
      datePublished: post.date,
      author: { "@type": "Organization", name: clinic.name },
      publisher: { "@type": "Organization", name: clinic.name },
      mainEntityOfPage: `/blog/${post.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBanner eyebrow={post.category} title={post.title} highlight={post.highlight} description={post.excerpt}>
        <p className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            {minutes} min read
          </span>
        </p>
      </PageBanner>

      <Section aria-label="Article">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-16">
          <article className="mx-auto w-full max-w-[46rem] lg:mx-0">
            {/* The infographic has text on it, so it is always shown whole at its own 3:2 ratio. */}
            <figure className="mb-10 overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-line">
              <Image
                src={post.image.src}
                width={post.image.width}
                height={post.image.height}
                alt={post.image.alt}
                priority
                sizes="(min-width: 1024px) 736px, 100vw"
                className="h-auto w-full"
              />
            </figure>
            <ArticleBody blocks={post.content} />
            <p className="mt-10 border-t border-line pt-6 text-sm font-semibold text-secondary">
              {clinic.shortName} <span className="text-muted">| Healthy Smiles, Happy Lives</span>
            </p>
          </article>

          {/* Desktop only: contents and a booking card that stay in view while reading. */}
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <nav aria-label="In this article" className={card}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">In this article</p>
              <ul className="mt-4 space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-soft hover:text-primary"
                    >
                      {s.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`#${post.slug}-faq`}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-soft hover:text-primary"
                  >
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-6 rounded-[2rem] bg-secondary p-6 text-white md:p-8">
              <p className="text-h3 text-white">Worried about a loose tooth?</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Message or call us and we&apos;ll find a time to take a look.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={whatsappLink(post.cta.message)} external icon={WhatsAppIcon} variant="light">
                  Chat on WhatsApp
                </Button>
                <Button href={clinic.phone.tel} icon={Phone} variant="ghost">
                  {clinic.phone.display}
                </Button>
              </div>
            </div>
          </aside>
        </Container>
      </Section>

      <FaqSection id={`${post.slug}-faq`} eyebrow="FAQs" title="Frequently Asked Questions" items={post.faqs} />
      <CtaBanner bg="white" title={post.cta.title} description={post.cta.description} message={post.cta.message} />
    </SiteShell>
  );
}
