import Title from "@/components/web/Title";
import getServicesData from "@/data/servicesData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import getPreviewText from "@/components/web/getPreviewText";
import { motion } from "framer-motion";

export default function PractiseAreas() {
  const data = getServicesData();
  return (
    <div className="relative mt-28 mb-8">
      <div className="flex flex-col max-w-6xl mx-auto px-4">
        <Title
          title="Practice Areas"
          description="Professional legal services designed to help businesses
and individuals navigate complex legal matters."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((service) => (
            <div
              key={service._id}
              className="group rounded-xl overflow-hidden border
      hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <Link href={`/practise-areas/${service._id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
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
