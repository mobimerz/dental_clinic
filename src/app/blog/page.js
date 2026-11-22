import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { posts, formatDate, readingMinutes } from "@/data/blog";

export const metadata = {
  title: "Dental Health Blog",
  description:
    "Guides from A-Zee Dental & Implant Centre, Pai Layout, Bengaluru, on common dental problems, treatment options and what affects treatment cost.",
  alternates: { canonical: "/blog" },
};

function PostMeta({ post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
      <span className="inline-flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
        {readingMinutes(post)} min read
      </span>
    </p>
  );
}

// The whole card is one link. Images are 3:2 infographics with text, so they are never cropped.
function PostCard({ post, featured = false }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift hover:ring-accent ${
        featured ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : ""
      }`}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-soft">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 690px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
          className="object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-col p-6 md:p-8 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.category}</span>
        <h3 className={`mt-3 text-secondary ${featured ? "text-h3-lg" : "text-h3"}`}>
          {post.title} {post.highlight}
        </h3>
        <p className="mt-3 text-body text-muted">{post.excerpt}</p>
        <div className="mt-6">
          <PostMeta post={post} />
        </div>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read the article
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [latest, ...rest] = posts;

  return (
    <SiteShell>
      <PageBanner
        eyebrow="Dental Health Blog"
        title="Dental Tips &"
        highlight="Patient Guides."
        description="Clear answers to common dental problems: what causes them, how they're treated and what affects the cost."
      />

      <Section aria-labelledby="posts-title">
        <Container>
          <SectionHeading id="posts-title" eyebrow="Latest Articles" title="Read, Then Ask Us Anything." />
          <div className="header-gap">
            <PostCard post={latest} featured />
            {rest.length > 0 && (
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </Section>

      <CtaBanner title="Have a Question About Your Teeth?" />
    </SiteShell>
  );
}
