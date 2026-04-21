"use client";

import Title from "@/components/web/Title";
import { Skeleton } from "@/components/ui/skeleton";
import getPreviewText from "@/components/web/getPreviewText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface ServiceData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  createdBy?: string;
  createdAt?: number;
  updatedAt?: number;
}

function ServiceCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border flex flex-col">
      <Skeleton className="w-full h-[250px] rounded-none" />
      <div className="p-6 flex flex-col justify-between h-[210px]">
        <div>
          <Skeleton className="h-5 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-1" />
          <Skeleton className="h-4 w-2/3 mt-1" />
        </div>
        <Skeleton className="h-4 w-24 mt-5" />
      </div>
    </div>
  );
}

export default function PractiseAreas() {
  const services = useQuery(api.services.getServices);

  if (!services) {
    return (
      <div className="relative mt-8 mb-8">
        <div className="flex flex-col max-w-6xl mx-auto px-4">
          {/* <Title
            title="Practice Areas"
            description="Professional legal services designed to help businesses and individuals navigate complex legal matters."
            align="center"
          /> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-8 mb-8">
      <div className="flex flex-col max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: ServiceData) => (
            <div
              key={service._id}
              className="group rounded-xl overflow-hidden border
      hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <Link href={`/practise-areas/${service._id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={service.image || ""}
                    alt={service.title}
                    className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </Link>

              <div className="p-6 flex flex-col justify-between h-[210px]">
                <div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {getPreviewText(service.description, 100)}
                  </p>
                </div>

                <Link
                  href={`/practise-areas/${service._id}`}
                  className="flex items-center gap-2 mt-5 text-sm font-semibold text-primary hover:underline"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
