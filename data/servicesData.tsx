import { serviceSchema } from "@/app/schema/serviceSchema";
import { z } from "zod";

const getServiceData = (): z.infer<typeof serviceSchema>[] => {
  return [
    {
      _id: "s1",
      title: "Corporate and Commercial Law",
      slug: "corporate-commercial-law",
      description:
        "We provide comprehensive legal support to businesses at every stage of their lifecycle, from incorporation to expansion and restructuring. Our services include company formation, drafting shareholder agreements, corporate governance advisory, and preparation of commercial contracts. We also assist with mergers, acquisitions, joint ventures, and regulatory compliance, ensuring that business operations align with applicable laws while protecting the interests of stakeholders.",
      image: "/images/Corporate.png",
    },
    {
      _id: "s2",
      title: "Banking and Finance",
      slug: "banking-finance",
      description:
        "Our banking and finance practice advises financial institutions, lenders, investors, and corporate borrowers on a wide range of financial transactions. We assist in structuring loan facilities, drafting securities documentation, guarantees, and other financial instruments. The firm also provides guidance on regulatory compliance, risk management, and enforcement of security interests in the event of default, ensuring that transactions are legally sound and commercially viable.",
      image: "/images/Banking.png",
    },
    {
      _id: "s3",
      title: "Litigation and Arbitration",
      slug: "litigation-arbitration",
      description:
        "We represent clients in civil, criminal, and commercial disputes before courts and arbitration tribunals at all levels. Our services include legal advisory, preparation of pleadings, evidence gathering, and courtroom advocacy. We also offer alternative dispute resolution through mediation and arbitration, providing efficient solutions that minimize costs and preserve business relationships while safeguarding our clients’ rights and interests.",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    },
    {
      _id: "s4",
      title: "Labour and Employment Law",
      slug: "labour-employment-law",
      description:
        "We assist employers and organizations in managing employment relationships in compliance with labour laws and workplace regulations. Our services include drafting employment contracts, developing workplace policies, advising on disciplinary procedures, termination processes, and retrenchment matters. We also represent clients in labour disputes before tribunals and courts, helping resolve conflicts while protecting organizational interests and employee rights.",
      image: "/images/Labour.png",
    },
    {
      _id: "s5",
      title: "Real Estate and Conveyancing",
      slug: "real-estate-conveyancing",
      description:
        "Our real estate and conveyancing services cover the legal aspects of property acquisition, transfer, leasing, and development. We conduct thorough due diligence to verify ownership, identify encumbrances, and ensure compliance with land regulations. The firm prepares conveyancing documents, facilitates registration of titles, and advises clients on secure property transactions, helping prevent disputes and protect long-term investments.",
      image: "/images/Realestate.png",
    },
    {
      _id: "s6",
      title: "Intellectual Property and Trademarks",
      slug: "intellectual-property-trademarks",
      description:
        "We provide legal services for the protection and enforcement of intellectual property rights, including trademarks, copyrights, and related assets. Our firm assists clients with registration, renewal, and licensing of intellectual property, as well as advisory services on brand protection strategies. We also represent clients in disputes involving infringement or unauthorized use, ensuring that valuable intangible assets are safeguarded.",
      image: "/images/trademark.png",
    },
    {
      _id: "s7",
      title: "Insolvency and Debt Recovery",
      slug: "insolvency-debt-recovery",
      description:
        "We offer legal assistance in insolvency proceedings, restructuring, and recovery of outstanding debts. Our services include representing creditors, financial institutions, and businesses in pursuing lawful recovery actions. We also advise distressed companies on restructuring options and compliance with insolvency regulations, aiming to achieve efficient recovery while minimizing financial losses.",
      image: "/images/Debt-Recovery.png",
    },
    {
      _id: "s8",
      title: "International Trade and Investment",
      slug: "international-trade-investment",
      description:
        "Our firm supports local and foreign investors in cross-border transactions and investment projects. We assist in establishing businesses, obtaining necessary licenses and permits, and complying with regulatory requirements. Our services include drafting international agreements, advising on trade regulations, and facilitating investment approvals, providing clients with a secure legal framework for operating in international markets.",
      image: "/images/International-Trade.png",
    },
  ];
};

export default getServiceData;
