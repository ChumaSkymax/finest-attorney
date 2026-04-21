import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ConsultationsCTA from "@/components/web/consultationsCTA";
import getPreviewText from "@/components/web/getPreviewText";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleData } from "../page";
import { fetchQuery } from "convex/nextjs";
import TrackView from "@/components/web/TrackView";
import ArticleDescription from "@/components/web/ArticleDescription";

function LegalUpdatesDetailsSkeleton() {
  return (
    <div className="mt-28 max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* LEFT */}
        <div className="w-full md:w-[35%]">
          <div className="rounded-lg shadow-sm overflow-hidden mb-6">
            <Skeleton className="w-full aspect-[4/3]" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[65%]">
          <div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="space-y-4 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="mt-8">
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
      <Separator />
      <div className="mt-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="block">
              <div className="rounded-lg shadow-sm overflow-hidden mb-6">
                <Skeleton className="w-full h-48" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-1 mb-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{
    id: Id<"legalupdates">;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await fetchQuery(api.legalupdates.getLegalUpdatesBySlug, {
    articleId: id,
  });

  if (!article) {
    return {
      title: "Article Not Found | Finest Attorneys",
    };
  }

  const description = getPreviewText(article.description, 160);

  return {
    title: `${article.title} | Finest Attorneys`,
    description: description,
    openGraph: {
      title: article.title,
      description: description,
      images: article.featuredImage ? [article.featuredImage] : [],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author || "Finest Attorneys"],
    },
  };
}

export default async function LegalUpdatesDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch both in parallel for faster page load
  const [article, articles] = await Promise.all([
    fetchQuery(api.legalupdates.getLegalUpdatesBySlug, { articleId: id }),
    fetchQuery(api.legalupdates.getLegalUpdate),
  ]);

  if (article === null) return notFound();

  return (
    <div className="mt-28 max-w-6xl mx-auto px-4">
      <TrackView articleId={id} />
      <Button asChild>
        <Link href="/legalupdates" className="mb-6 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Legal Updates
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* LEFT */}
        <div className="w-full md:w-[35%]">
          <div className="rounded-lg shadow-sm overflow-hidden mb-6">
            <img
              src={article.featuredImage || ""}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-muted text-primary">{article.author}</Badge>
            <Badge className="bg-muted text-primary">
              {article.publishedAt}
            </Badge>
            <Badge className="bg-muted text-primary">{article.readTime}</Badge>
            <Badge className="bg-muted text-primary">
              views{" "}
              {(article.views || 0) >= 1000
                ? ((article.views || 0) / 1000).toFixed(1) + "k"
                : article.views || 0}
            </Badge>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[65%]">
          <div>
            <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
            <ArticleDescription description={article.description} />
          </div>
          <ConsultationsCTA />
        </div>
      </div>
      <Separator />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find More Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {articles.map((item: ArticleData) => (
            <Link
              key={item._id}
              href={`/legalupdates/${item._id}`}
              className="block"
            >
              <div className="rounded-lg shadow-sm overflow-hidden mb-6">
                <img
                  src={item.featuredImage || ""}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {getPreviewText(item.description, 100)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
