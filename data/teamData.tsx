import teamDataSchema from "@/app/schema/teamDataSchema";
import z from "zod";

const getTeamData = (): z.infer<typeof teamDataSchema>[] => {
  return [
    {
      _id: "t1",
      name: "Moses Leon Kimaro",
      image: "images/Moses.svg",
      role: "Managing Partner",
    },
    {
      _id: "t2",
      name: "Herry J. Kimaro",
      image: "images/Herry.svg",
      role: "Partner",
    },
    {
      _id: "t3",
      name: "Faisal Ally Seif",
      image: "images/Faisal.svg",
      role: "Advocate & Partner",
    },
    {
      _id: "t4",
      name: "James Oscar Malanda",
      image: "images/James.svg",
      role: "Advocate",
    },
    {
      _id: "t5",
      name: "Josephine Mutabirwa",
      image: "images/Josephine.svg",
      role: "Advocate",
    },
    {
      _id: "t6",
      name: "Godliver Chiola",
      image: "images/Godliver.svg",
      role: "Office Secretary",
    },
  ];
};

export default getTeamData;
