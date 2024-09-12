import { MessageCircleMore, Radio } from "lucide-react";

const data = [
  {
    title: "Collect Q&A",
    icon: MessageCircleMore,
    description:
      "Allow your audience to ask questions during your presentations and let them upvote the most requested ones.",
  },
  {
    title: "Real-time Polls",
    icon: Radio,
    description:
      "Get instant feedback from your audience with real-time polls and make data-driven decisions.",
  },
];

export function ValueProposition() {
  return (
    <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 px-4 gap-8 mt-4">
      {data.map(({ title, icon: Icon, description }) => (
        <div key={title} className="flex flex-col items-start gap-y-2">
          <div className="inline-flex items-center gap-x-2">
            <Icon size={24} className="stroke-blue-600" />
            <h2 className="text-xl font-bold text-pretty">{title}</h2>
          </div>
          <p className="text-muted-foreground text-sm text-pretty">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
