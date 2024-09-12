import { GetStartedButton } from "@/components/buttons/GetStartedButton";
import { Headline } from "@/components/Headline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ValueProposition } from "@/components/ValueProposition";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="px-4 flex flex-col min-h-screen items-start bg-gradient-to-br from-[#E8F0FF] to-[#BAD0EE]">
      {/* TODO: Add Navbar with User Authentication */}
      <div className="relative mx-auto w-full flex flex-col items-center gap-y-8 mt-10 lg:mt-16">
        <Headline />
        <GetStartedButton />
        <div className="w-full md:max-w-xl rounded-lg overflow-hidden">
          <AspectRatio ratio={16 / 9}>
            <Image
              fill
              alt="preview"
              objectFit="cover"
              src="/preview.webp"
              style={{ imageRendering: "crisp-edges" }}
            />
          </AspectRatio>
        </div>
        <ValueProposition />
      </div>
    </main>
  );
}
