import { AuthButtons } from "@/components/buttons/AuthButtons";
import { GetStartedButton } from "@/components/buttons/GetStartedButton";
import { Headline } from "@/components/Headline";
import { AuthLoader } from "@/components/Loader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ValueProposition } from "@/components/ValueProposition";
import Image from "next/image";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Landing() {
  return (
    <main className="px-4 flex flex-col min-h-screen items-start bg-gradient-to-br from-[#E8F0FF] to-[#BAD0EE]">
      <div className="absolute top-0 left-0 p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
          PULSE
        </h1>
      </div>
      <Suspense fallback={<AuthLoader className="ml-auto mt-6" />}>
        <AuthButtons className="ml-auto mt-6" />
      </Suspense>
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
