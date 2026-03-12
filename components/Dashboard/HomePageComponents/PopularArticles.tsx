import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PopularArticles {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  views: number;
  featuredImage: string;
}

export const popularArticles: PopularArticles[] = [
  {
    _id: "a1",
    title: "Key Legal Requirements for Registering a Company in Tanzania",
    slug: "company-registration-tanzania",
    excerpt:
      "An overview of the legal procedures, documentation, and regulatory steps required to establish a company in Tanzania.",
    category: "Corporate Law",
    author: "Finest Attorneys",
    publishedAt: "2026-01-10",
    readTime: "5 min read",
    views: 1240,
    featuredImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format",
  },
  {
    _id: "a2",
    title: "Understanding Employment Termination Laws in Tanzania",
    slug: "employment-termination-laws",
    excerpt:
      "A guide for employers and employees on lawful termination procedures, notice requirements, and dispute resolution.",
    category: "Labour Law",
    author: "Finest Attorneys",
    publishedAt: "2026-01-22",
    readTime: "4 min read",
    views: 980,
    featuredImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format",
  },
  {
    _id: "a3",
    title: "How to Protect Your Trademark in Tanzania",
    slug: "protect-trademark-tanzania",
    excerpt:
      "Steps to register, maintain, and enforce trademark rights to safeguard your brand from infringement.",
    category: "Intellectual Property",
    author: "Finest Attorneys",
    publishedAt: "2026-02-05",
    readTime: "6 min read",
    views: 860,
    featuredImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format",
  },
  {
    _id: "a4",
    title: "Legal Considerations for Property Transactions",
    slug: "property-transaction-legal-guide",
    excerpt:
      "Important legal checks and procedures to follow when buying or transferring property ownership.",
    category: "Real Estate",
    author: "Finest Attorneys",
    publishedAt: "2026-02-12",
    readTime: "5 min read",
    views: 740,
    featuredImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format",
  },
  {
    _id: "a5",
    title: "Resolving Commercial Disputes Through Arbitration",
    slug: "commercial-arbitration-guide",
    excerpt:
      "An introduction to arbitration as an alternative to litigation for resolving business disputes efficiently.",
    category: "Arbitration",
    author: "Finest Attorneys",
    publishedAt: "2026-02-18",
    readTime: "7 min read",
    views: 690,
    featuredImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format",
  },
  {
    _id: "a6",
    title: "Legal Considerations for Property Transactions",
    slug: "property-transaction-legal-guide",
    excerpt:
      "Important legal checks and procedures to follow when buying or transferring property ownership.",
    category: "Real Estate",
    author: "Finest Attorneys",
    publishedAt: "2026-02-12",
    readTime: "5 min read",
    views: 740,
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    _id: "a7",
    title: "Resolving Commercial Disputes Through Arbitration",
    slug: "commercial-arbitration-guide",
    excerpt:
      "An introduction to arbitration as an alternative to litigation for resolving business disputes efficiently.",
    category: "Arbitration",
    author: "Finest Attorneys",
    publishedAt: "2026-02-18",
    readTime: "7 min read",
    views: 690,
    featuredImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  },
  {
    _id: "a6",
    title: "Legal Considerations for Property Transactions",
    slug: "property-transaction-legal-guide",
    excerpt:
      "Important legal checks and procedures to follow when buying or transferring property ownership.",
    category: "Real Estate",
    author: "Finest Attorneys",
    publishedAt: "2026-02-12",
    readTime: "5 min read",
    views: 740,
    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    _id: "a7",
    title: "Resolving Commercial Disputes Through Arbitration",
    slug: "commercial-arbitration-guide",
    excerpt:
      "An introduction to arbitration as an alternative to litigation for resolving business disputes efficiently.",
    category: "Arbitration",
    author: "Finest Attorneys",
    publishedAt: "2026-02-18",
    readTime: "7 min read",
    views: 690,
    featuredImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  },
];

export default function PopularArticles() {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Popular Articles</h1>
      <div className="flex flex-col gap-2">
        {popularArticles.slice(0, 6).map((item: PopularArticles) => (
          <Card
            key={item._id}
            className="flex-row items-center justify-between gap-4 p-4"
          >
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.featuredImage}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <Badge variant="secondary">{item.category}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.views / 1000}K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
