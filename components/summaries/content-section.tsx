import { parseEmojiPoint, parsePoint } from "@/utils/summary-helper";
import React from "react";

const EmojiPoint = ({ point }: { point: string }) => {
  const parsed = parseEmojiPoint(point);
  if (!parsed) return null;

  const { emoji, text } = parsed;

  return (
    <div className="relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-2 my-4 rounded-xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">
          {emoji}
        </span>
        <p className="lg:text-lg text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-2 my-4 rounded-xl border border-gray-500/10 hover:shadow-lg transition-all">
      <div className="flex items-start gap-3">
          <p className="relative lg:text-lg text-muted-foreground/90 leading-relaxed text-left">
            {point}
          </p>
        </div>
    </div>
  );
};

const ContentSection = ({ points }: { points: string[] }) => {
  return (
    <div className="space-y-8">
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji) {
          return <EmojiPoint key={`point-${index}`} point={point} />;
        }
        return <RegularPoint key={`point-${index}`} point={point} />;
      })}
    </div>
  );
};

export default ContentSection;
