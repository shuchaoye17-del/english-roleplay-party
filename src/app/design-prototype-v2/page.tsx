import Image from "next/image";

export default function DesignPrototypeV2Page() {
  return (
    <main className="flex min-h-screen justify-center bg-black">
      <h1 className="sr-only">
        English Roleplay Party design prototype v2. Prototype only - not
        production UI.
      </h1>
      <Image
        src="/design-prototype-v2/play-voice-acting-exact.webp"
        alt="English Roleplay Party voice acting play screen design prototype. Prototype only - not production UI."
        width={550}
        height={1176}
        priority
        unoptimized
        className="block h-[1176px] w-[550px] max-w-none"
      />
    </main>
  );
}
