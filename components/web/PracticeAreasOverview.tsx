import { practiceAreaData } from "@/data/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Title from "./Title";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const PracticeAreasOverview = () => {
  return (
    <section className="relative mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <Title
          title="Our Areas of Practice"
          description="We work closely with our clients to understand their legal challenges and provide clear, effective solutions across key areas of legal practice."
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practiceAreaData.map((area, i) => (
            <Card
              key={i}
              className="group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
            >
              <CardHeader>
                <area.icon className="size-8 text-primary mb-2" />
                <CardTitle className="text-lg leading-snug font-semibold group-hover:text-primary transition-colors">
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[12px] text-gray-600 flex-1">
                {area.description}
              </CardContent>
              <CardFooter>
                <Link
                  href={"/practise-areas"}
                  className={
                    buttonVariants({ variant: "outline" }) +
                    " text-[10px] w-full bg-primary text-white"
                  }
                >
                  See How We Can Help
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasOverview;
