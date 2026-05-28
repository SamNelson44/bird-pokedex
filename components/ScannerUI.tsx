"use client";

interface Props {
  imagePreview: string;
  isScanning: boolean;
}

const SCAN_MESSAGES = [
  "Scanning avian database...",
  "Analyzing plumage patterns...",
  "Checking field markings...",
  "Cross-referencing LA species...",
  "Consulting ornithological records...",
];

export default function ScannerUI({ imagePreview, isScanning }: Props) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Scanner frame */}
      <div className="relative border-2 border-pokedex-red bg-black overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-pokedex-red z-20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-pokedex-red z-20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-pokedex-red z-20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-pokedex-red z-20" />

        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagePreview}
          alt="Scan target"
          className="w-full aspect-square object-cover"
        />

        {/* Scan line animation */}
        {isScanning && (
          <>
            <div
              className="scan-line absolute left-0 right-0 h-1 bg-pokedex-red/70 z-10"
              style={{ boxShadow: "0 0 12px 4px rgba(204,0,0,0.4)" }}
            />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(204,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,0,0.05) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Overlay tint */}
            <div className="absolute inset-0 bg-red-900/10 z-10 pointer-events-none" />
          </>
        )}
      </div>

      {/* Status text */}
      {isScanning && (
        <div className="mt-3 text-center">
          <p className="font-pixel text-[9px] text-pokedex-red">
            <span className="blink">▶</span>{" "}
            {SCAN_MESSAGES[Math.floor(Date.now() / 1500) % SCAN_MESSAGES.length]}
          </p>
        </div>
      )}
    </div>
  );
}
