import Title from "./Title";
import trustIndicatorsData from "../../data/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

export default function TrustIndicators() {
  const industries = [
    "Banking & Finance",
    "Real Estate",
    "Technology & Startups",
    "Manufacturing",
    "Energy & Natural Resources",
    "Hospitality & Tourism",
    "International Trade",
    "Construction",
  ];
  return (
    <section className="relative mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <Title
          title="Industries We Serve"
          description="Our firm provides legal expertise across a wide range of industries. We understand the unique regulatory and commercial challenges faced 
by each sector and deliver practical legal solutions tailored to our clients needs."
          align="center"
        />
        {/* LOGO MARQUEE */}
        <div className="border-y border-border mt-4">
          <div className="max-w-6xl mx-auto px-6">
            <div className="w-full overflow-hidden py-4">
              <div className="flex gap-8 items-center animate-marquee whitespace-nowrap">
                {industries.concat(industries).map((industry, i) => (
                  <span
                    key={i}
                    className=" bg-transparent border py-1 px-4 rounded-full mx-6 text-sm md:text-base font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-2 bg-gray-100 dark:bg-white/5 mt-12 py-6 max-md:py-4 rounded-xl text-primary">
          <div className="grid grid-cols-1 gap-0 items-center">
            {trustIndicatorsData.map(
              (
                indicator: {
                  title: string;
                  description: string;
                },
                i: number,
              ) => (
                <Card
                  key={i}
                  className={`flex flex-col gap-1 rounded-t-xl rounded-b-none px-2 
                    bg-white dark:bg-white/10 dark:text-gray-100 text-gray-900 border-gray-200 dark:border-white/10 py-3 ${
                      i === 2 ? "rounded-b-xl rounded-t-none border-t-0" : ""
                    } ${i === 1 ? "rounded-t-none rounded-b-none border-y-0" : ""}`}
                >
                  <CardHeader className="max-sm:p-4">
                    <CardTitle className="text-sm font-semibold max-md:text-center max-md:text-base text-gray-900 dark:text-gray-100">
                      {indicator.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-[11px] text-gray-600 dark:text-gray-400 max-md:text-xs max-md:text-center max-md:text-center max-sm:px-3">
                    {indicator.description}
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
