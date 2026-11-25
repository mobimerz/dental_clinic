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
import { clinicImages } from "@/data/clinic";

export const metadata = {
  title: "Dental Health Blog",
  description:
    "Guides from A-Zee Dental & Implant Centre, Pai Layout, Bengaluru, on common dental problems, treatment options and what affects treatment cost.",
  alternates: { canonical: "/blog" },
};

function PostMeta({ post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        {readingMinutes(post)} min read
      </span>
    </p>
  );
}

// Compact card so several fit in a row and readers can scan by topic. The whole card is one link.
// Images are 3:2 infographics with text, so they are never cropped.
function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-line transition-[translate,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift hover:ring-accent"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-soft">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</span>
        <h3 className="mt-2 line-clamp-3 text-base font-bold leading-snug text-secondary">
          {post.title} {post.highlight}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
        <div className="mt-auto pt-4">
          <PostMeta post={post} />
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Read the article
            <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true" />
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
          <ul className="header-gap grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(15rem,17rem))] sm:justify-center">
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
