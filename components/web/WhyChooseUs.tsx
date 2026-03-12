import { OurProfessionalAdvantage } from "@/data/data";
import Title from "./Title";
import { ArrowRight } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className=" relative flex flex-col items-center justify-center mt-12 ">
      <Title
        title="What Sets Us Apart"
        description="Providing specialized legal services with integrity, confidentiality, and a commitment to client interests."
        align="center"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
        {OurProfessionalAdvantage.map((advantage, index) => (
          <div
            key={index}
            className="group w-52 h-64 mx-auto [perspective:1000px]"
          >
            <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div
                className="absolute w-full h-full [backface-visibility:hidden]
             flex items-center justify-center rounded-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 shadow-lg p-2"
              >
                <div>
                  <advantage.icon className="size-10 text-primary mb-2 mx-auto bg-primary/10 rounded-full p-2" />
                  <h2 className="text-primary text-center text-sm font-semibold leading-tight mb-4">
                    {advantage.title}
                  </h2>
                  {index == 0 && (
                    <p className="text-[12px] text-gray-600 dark:text-gray-400 flex-1 px-2 text-center">
                      A highly specialized law firm with deep...
                    </p>
                  )}
                  {index == 1 && (
                    <p className="text-[12px] text-gray-600 dark:text-gray-400 flex-1 px-2 text-center">
                      We handle every client matter...
                    </p>
                  )}
                  {index == 2 && (
                    <p className="text-[12px] text-gray-600 dark:text-gray-400 flex-1 px-2 text-center">
                      Our legal services are tailored to the...
                    </p>
                  )}
                  {index == 3 && (
                    <p className="text-[12px] text-gray-600 dark:text-gray-400 flex-1 px-2 text-center">
                      We advise both local and international clients...
                    </p>
                  )}
                  <p
                    className="text-center mt-6 bg-background dark:bg-white/5 rounded-lg border
                 border-gray-300 dark:border-white/10 p-2 w-fit mx-auto group-hover:bg-primary/10 hover:text-white cursor-pointer transition-colors"
                  >
                    <ArrowRight className="size-5 text-primary mx-auto" />
                  </p>
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]
             flex items-center justify-center rounded-md bg-primary dark:bg-zinc-950 border border-gray-200 dark:border-white/10 shadow-lg h-full"
              >
                <p className="text-[11px] text-gray-300 dark:text-gray-400 flex-1 px-2 text-center">
                  {advantage.details}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
