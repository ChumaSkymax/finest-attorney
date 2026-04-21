import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ConsultationsCTA from "@/components/web/consultationsCTA";
import getPreviewText from "@/components/web/getPreviewText";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceData } from "../page";

function PractiseAreasDetailsSkeleton() {
  return (
    <div className="mt-28 mb-20 max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <Skeleton className="h-10 w-52" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* LEFT */}
        <div className="w-full md:w-[35%]">
          <div className="rounded-lg shadow-sm overflow-hidden mb-6">
            <Skeleton className="w-full aspect-[4/3]" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[65%] mb-8">
          <Skeleton className="h-9 w-3/4 mb-4" />
          <div className="space-y-3 p-4 pl-0">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="mt-8">
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <div className="mt-8">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden border flex flex-col">
              <Skeleton className="w-full h-[200px] rounded-none" />
              <div className="p-6 flex flex-col justify-between h-[210px]">
                <div>
                  <Skeleton className="h-5 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </div>
                <Skeleton className="h-4 w-24 mt-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{
    id: Id<"services">;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const service = await fetchQuery(api.services.getServiceById, { id });

  if (!service) {
    return {
      title: "Practice Area Not Found | Finest Attorneys",
    };
  }

  const description = getPreviewText(service.description, 160);

  return {
    title: `${service.title} | Practice Areas | Finest Attorneys`,
    description: description,
    openGraph: {
      title: service.title,
      description: description,
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function PractiseAreasDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch both in parallel for faster page load
  const [service, services] = await Promise.all([
    fetchQuery(api.services.getServiceById, { id }),
    fetchQuery(api.services.getServices),
  ]);

  if (service === null) return notFound();

  // Filter out the current service to show other practice areas
  const otherServices = services.filter((s: ServiceData) => s._id !== id);

  return (
    <div className="mt-28 mb-20 max-w-6xl mx-auto px-4">
      <Button asChild className="mb-6 bg-muted text-primary hover:bg-muted/80">
        <Link href="/practise-areas" className="flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Practice Areas
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* LEFT */}
        <div className="w-full md:w-[35%]">
          <div className="rounded-lg shadow-sm overflow-hidden mb-6">
            <img
              src={service.image || ""}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[65%] mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>

            <div className="p-4 pl-0 text-muted-foreground text-sm space-y-4">
              {service.description
                .trim()
                .split("\n\n")
                .map((paragraph: string, index: number) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
          <ConsultationsCTA />
        </div>
      </div>

      <Separator className="my-10" />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-8">Explore More Practice Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {otherServices.slice(0, 4).map((s: ServiceData) => (
            <Link
              href={`/practise-areas/${s._id}`}
              key={s._id}
              className="group flex flex-col rounded-xl overflow-hidden border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform"
            >
              <div className="relative overflow-hidden w-full h-[200px]">
                <img
                  src={s.image || ""}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-6 flex flex-col justify-between h-[210px] flex-grow">
                <div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {s.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {getPreviewText(s.description, 100)}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 text-sm font-semibold text-primary group-hover:underline">
                  Learn More <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
