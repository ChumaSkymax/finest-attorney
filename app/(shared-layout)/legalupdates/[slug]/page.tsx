import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BookConsultation from "@/components/web/BookConsultation";
import BookConsultationButton from "@/components/web/BookConsultationButton";
import ConsultationsCTA from "@/components/web/consultationsCTA";
import getPreviewText from "@/components/web/getPreviewText";
import getLegalUpdatesData from "@/data/LegalUpdatesData";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegalUpdatesDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const updates = getLegalUpdatesData();
  const update = updates.find((update) => update.slug === slug);
  if (!update) return notFound();

  return (
    <div className="mt-28 max-w-6xl mx-auto px-4">
      <Button asChild>
        <Link href="/legalupdates" className="mb-6 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Legal Updates
        </Link>
      </Button>

      <div className=" flex flex-col md:flex-row gap-8 mb-8">
        {/* LEFT */}
        <div className="w-full md:w-[35%] ">
          <div className="rounded-lg shadow-sm overflow-hidden mb-6">
            <img
              src={update.featuredImage}
              alt={update.title}
              className="w-full h-full object-cover "
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-muted text-primary">{update.author}</Badge>
            <Badge className="bg-muted text-primary">
              {update.publishedAt}
            </Badge>
            <Badge className="bg-muted text-primary">{update.readTime}</Badge>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[65%]">
          <div>
            <h1 className="text-2xl font-bold mb-2">{update.title}</h1>

            <div className="p-4 text-muted-foreground text-sm space-y-4">
              {update.description
                .trim()
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
          <ConsultationsCTA />
        </div>
      </div>
      <Separator />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find More Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {updates.map((update) => (
            <Link
              key={update._id}
              href={`/legalupdates/${update.slug}`}
              className="block"
            >
              <div className="rounded-lg shadow-sm overflow-hidden mb-6">
                <img
                  src={update.featuredImage}
                  alt={update.title}
                  className="w-full h-full object-cover "
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{update.title}</h3>
              <p className="text-muted-foreground text-sm mb-6">
                {getPreviewText(update.description, 100)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
