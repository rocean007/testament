import Image from "next/image";

export function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Image
        src="/background.webp"
        alt=""
        fill
        priority={false}
        className="object-cover object-bottom opacity-25 brightness-110 contrast-110"
        sizes="100vw"
      />
    </div>
  );
}
