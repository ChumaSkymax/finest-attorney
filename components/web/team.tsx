"use client";

import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedContent from "./AnimatedContent";
import Title from "./Title";
import { useQuery } from "convex/react";

function TeamMemberSkeleton() {
  return (
    <div className="flex flex-col border border-primary/20 rounded-lg p-6 shadow-lg">
      <Skeleton className="w-52 h-64 rounded-lg" />
      <Skeleton className="h-5 w-36 mt-3" />
      <Skeleton className="h-4 w-24 mt-2" />
    </div>
  );
}

export default function Team() {
  const data = useQuery(api.team.getTeamMembers);

  return (
    <div className="flex flex-col mt-12 gap-6">
      <Title
        title="Meet Our Team"
        description="Meet the legal minds behind Finest Attorneys, dedicated to providing expert legal solutions."
      />
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-6 mt-6">
        {!data
          ? [1, 2, 3, 4].map((i) => <TeamMemberSkeleton key={i} />)
          : data.map((member, index) => (
              <AnimatedContent
                delay={index * 0.1}
                key={member._id}
                className="flex flex-col border border-primary/20 rounded-lg p-6 shadow-lg"
              >
                <img
                  src={member.image || ""}
                  alt={member.name}
                  className="w-52 h-64 object-cover rounded-lg"
                />
                <h3 className="text-lg font-medium mt-2 text-foreground">
                  {member.name}
                </h3>
                <p className="text-muted-foreground">{member.position}</p>
              </AnimatedContent>
            ))}
      </div>
    </div>
  );
}
