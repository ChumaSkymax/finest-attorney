import Image from "next/image";
import { ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import AnimatedContent from "@/components/web/AnimatedContent";
import { CoreValues } from "@/data/data";
import Title from "@/components/web/Title";
import getTeamData from "@/data/teamData";
import { Separator } from "@/components/ui/separator";

export default function () {
  const data = getTeamData();
  return (
    <div className="relative mt-28">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center mb-20">
          <Image
            src="/images/finest-banner2.jpg"
            alt=""
            width={800}
            height={500}
            className="rounded-md"
          />
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-col gap-2 bg-muted p-6 rounded-lg
             border border-border"
            >
              <h2 className="text-md font-semibold text-primary leading-[24px]">
                Our Establishment and Practice
              </h2>
              <p className="text-xs text-muted-foreground">
                Finest Attorneys (Advocates) is a specialized law firm based in
                Dar es Salaam, Tanzania, established in October 2014 to provide
                practical and professional legal services to businesses,
                investors, and individuals.
              </p>
            </div>
            <div
              className="flex flex-col gap-2 bg-primary/10 p-6 rounded-lg
             border border-border"
            >
              <h2 className="text-md font-semibold text-primary">
                Our Founder
              </h2>
              <p className="text-xs text-muted-foreground">
                The firm was founded by Mr. Moses Leon Kimaro, Advocate, an
                experienced legal practitioner with strong expertise in
                corporate, commercial, banking, finance, labour, and
                international trade and investment law.
              </p>
            </div>
            <div
              className="flex flex-col gap-2 bg-primary/20 p-6 rounded-lg
             border border-border"
            >
              <h2 className="text-md font-semibold text-primary">
                Our Professional Philosophy
              </h2>
              <p className="text-xs text-muted-foreground">
                Our practice is guided by professionalism, integrity, and
                confidentiality. We focus on delivering clear legal advice and
                effective representation that protects our clients’ legal and
                commercial interests.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-12">
          <div
            className="grid grid-cols-1 md:grid-cols-2  border-x 
          md:divide-x border-border divide-border max-w-6xl mx-auto items-center"
          >
            <div className="p-8 flex flex-col gap-2 md:sticky md:top-26">
              <div className="flex items-center gap-2 md:sticky md:top-26">
                <div className="bg-transparent w-12 h-12 rounded-full shadow-md">
                  <Target className="w-12 h-12 text-primary mb-4" />
                </div>
                <h2 className="text-2xl font-semibold text-primary">
                  Our Mission
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">
                  To provide reliable and practical legal services with
                  professionalism, integrity, and a strong commitment to our
                  clients’ interests.
                </p>
              </div>
              <AnimatedContent className="flex flex-col gap-2 mt-6 bg-primary p-8 rounded-lg shadow-md w-full">
                <h2 className="text-lg font-semibold text-white leading-[24px]">
                  Every matter is handled <br />
                  with diligence and a <br />
                  strong focus.
                </h2>
                <Link
                  href="/practise-areas"
                  className="text-white text-md flex items-center justify-center gap-2 mt-4 
                  bg-white/20 px-4 py-2 rounded-full w-fit"
                >
                  Explore Our Practice Areas
                  <ArrowRight className="rotate-300" />
                </Link>
              </AnimatedContent>
            </div>
            <div className="flex flex-col items-center mt-12">
              <h2 className="text-2xl font-semibold text-primary text-left">
                Core Values
              </h2>
              <p className="text-muted-foreground text-xs text-center px-10 mt-4">
                At Finest Attorneys (Advocates), our practice is guided by core
                values that shape how we work with clients and handle every
                legal matter:
              </p>
              <div className="p-4 pt-16 md:p-16 space-y-6">
                {CoreValues.map(
                  (
                    value: {
                      Icon: any;
                      title: string;
                      description: string;
                      cardBg: string;
                      iconBg: string;
                      iconColor: string;
                    },
                    index: number,
                  ) => {
                    const Icon = value.Icon;
                    return (
                      <AnimatedContent
                        key={index}
                        className={`${value.cardBg} flex flex-col items-start p-6 rounded-xl w-full md:sticky md:top-26`}
                      >
                        <div
                          className={`${value.iconBg} p-2 rounded-lg w-10 h-10 flex items-center justify-center`}
                        >
                          <Icon className={`w-8 h-8 ${value.iconColor}`} />
                        </div>
                        <p
                          className={`text-md font-semibold ${value.iconColor}`}
                        >
                          {value.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {value.description}
                        </p>
                      </AnimatedContent>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
        {/* team section  */}
        <div className="flex flex-col mt-12 gap-6 ">
          <Title
            title="Meet Our Team"
            description="Meet the legal minds behind Finest Attorneys, dedicated to providing expert legal solutions."
          />
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-6 mt-6">
            {data.map((member, index) => (
              <AnimatedContent
                delay={index * 0.1}
                key={index}
                className="flex flex-col border border-primary/20  rounded-lg p-6 shadow-lg "
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-52 h-64 object-cover rounded-lg"
                />
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.role}</p>
              </AnimatedContent>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-16 mb-8">
          <div className="relative shadow-2xl shadow-primary/40 rounded-2xl overflow-hidden shrink-0">
            <img
              className="max-w-md w-full object-cover rounded-2xl"
              src="/images/finestbanner.jpeg"
              alt=""
            />
          </div>
          <div className="text-muted-foreground max-w-lg">
            <h1 className="text-lg uppercase font-semibold text-foreground">
              Areas of Specialization
            </h1>
            <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-primary to-transparent"></div>
            <p className="mt-8 text-xs">
              Finest Attorneys provides specialized legal services across
              corporate, commercial, and dispute resolution matters. Our
              expertise includes corporate governance, company formation,
              regulatory compliance, banking and finance, capital markets, and
              securities law.
            </p>
            <p className="mt-4 text-xs">
              We represent clients in civil, criminal, and commercial litigation
              before the High Court and other courts in Tanzania, and we handle
              both domestic and international arbitration and mediation matters.
            </p>
            <p className="mt-4 text-xs">
              The firm also offers services in insolvency and debt recovery,
              real estate and conveyancing, labour law, intellectual property
              and trademarks, insurance law, and investment facilitation. We
              support both local and foreign clients with practical legal
              solutions tailored to their business and legal needs.
            </p>
            <Link
              href="/practise-areas"
              className="flex items-center w-max gap-2 mt-8 hover:-translate-y-0.5 transition bg-primary py-3 px-8 rounded-full text-white"
            >
              <span>Explore Our Practice Areas</span>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                  fill="#fff"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
