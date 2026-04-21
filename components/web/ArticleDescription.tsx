"use client";

import { useState } from "react";
import getPreviewText from "./getPreviewText";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ArticleDescriptionProps {
  description: string;
}

export default function ArticleDescription({ description }: ArticleDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Only show "Read More" if the text is actually long enough (e.g., > 300 chars)
  const isLong = description.length > 500;

  if (!isLong) {
    return (
      <div className="p-4 text-muted-foreground text-sm space-y-4">
        {description
          .trim()
          .split("\n\n")
          .map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
      </div>
    );
  }

  return (
    <div className="p-4 text-muted-foreground text-sm space-y-4">
      {isExpanded ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
          {description
            .trim()
            .split("\n\n")
            .map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-1 text-primary font-semibold hover:underline mt-2"
          >
            Show Less <ChevronUp size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="leading-relaxed">
            {getPreviewText(description, 500)}
          </p>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-1 text-primary font-semibold hover:underline mt-2"
          >
            Read More <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
