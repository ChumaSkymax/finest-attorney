export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
}

const getTeamData = (): TeamMember[] => {
  return [
    {
      _id: "t1",
      name: "Moses Leon Kimaro",
      image: "images/Moses.svg",
      position: "Managing Partner",
    },
    {
      _id: "t2",
      name: "Herry J. Kimaro",
      image: "images/Herry.svg",
      position: "Partner",
    },
    {
      _id: "t3",
      name: "Faisal Ally Seif",
      image: "images/Faisal.svg",
      position: "Advocate & Partner",
    },
    {
      _id: "t4",
      name: "James Oscar Malanda",
      image: "images/James.svg",
      position: "Advocate",
    },
    {
      _id: "t5",
      name: "Josephine Mutabirwa",
      image: "images/Josephine.svg",
      position: "Advocate",
    },
    {
      _id: "t6",
      name: "Godliver Chiola",
      image: "images/Godliver.svg",
      position: "Office Secretary",
    },
  ];
};

export default getTeamData;
