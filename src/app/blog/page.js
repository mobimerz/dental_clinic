import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import PageBanner from "@/components/sections/PageBanner";
import CtaBanner from "@/components/sections/CtaBanner";
import SectionHeading from "@/components/common/SectionHeading";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import { posts, formatDate, readingMinutes } from "@/data/blog";
import { clinicImages } from "@/data/clinic";

export const metadata = {
  title: "Dental Health Blog",
  description:
    "Guides from A-Zee Dental & Implant Centre, Pai Layout, Bengaluru, on common dental problems, treatment options and what affects treatment cost.",
  alternates: { canonical: "/blog" },
};

// Card header: a clean brand gradient with the topic, instead of the dense infographic
// (which every post currently shares). The infographic stays on the article page.
function CardHeader({ category }) {
  return (
    <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-[#0e4252] to-primary px-6">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
      <div aria-hidden="true" className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-primary/40 blur-2xl" />
      <span className="relative text-center text-2xl font-extrabold tracking-[-0.02em] text-white transition-transform duration-700 ease-premium group-hover:scale-105">
        {category}
      </span>
    </div>
  );
}

// One link per card: topic header, category, title, short excerpt, then date and "Read more".
function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift hover:ring-accent"
    >
      <CardHeader category={post.category} />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{post.category}</span>
        <h3 className="mt-3 line-clamp-3 text-lg font-bold leading-snug text-secondary">
          {post.title} {post.highlight}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
          <span className="flex flex-wrap gap-x-1.5 text-muted">
            <time dateTime={post.date} className="whitespace-nowrap">{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">{readingMinutes(post)} min read</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-secondary transition-colors duration-500 group-hover:text-primary">
            Read more
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const longestRead = Math.max(...posts.map(readingMinutes));

  return (
    <SiteShell>
      <PageBanner
        eyebrow="Dental Health Blog"
        title="Dental Tips &"
        highlight="Patient Guides."
        description="Clear answers to common dental problems: what causes them, how they're treated and what affects the cost."
        image={clinicImages.treatmentRoomAlt}
        chips={[
          { icon: "smile", value: `${posts.length} Patient Guides`, label: "Implants, root canal & more" },
          { icon: "clock", value: "Quick Reads", label: `${longestRead} min or less each` },
        ]}
      />

      <Section aria-labelledby="posts-title">
        <Container>
          <SectionHeading id="posts-title" eyebrow="Latest Articles" title="Read, Then Ask Us Anything." />
          <ul className="header-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBanner title="Have a Question About Your Teeth?" />
    </SiteShell>
  );
}
