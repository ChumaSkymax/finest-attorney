"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useRef } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function TrackView({
  articleId,
}: {
  articleId: Id<"legalupdates">;
}) {
  const incrementViews = useMutation(api.dashboard.incrementViews);
  const tracked = useRef(false);

  useEffect(() => {
    // We use a ref to ensure this only runs exactly once in React Strict Mode
    if (!tracked.current) {
      tracked.current = true;
      incrementViews({ id: articleId }).catch(console.error);
    }
  }, [articleId, incrementViews]);

  return null; // This component is invisible
}
