"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import ScannerUI from "@/components/ScannerUI";
import IdentificationResult from "@/components/IdentificationResult";
import type { IdentifyResponse } from "@/components/IdentificationResult";

type Stage = "idle" | "preview" | "scanning" | "result";

export default function IdentifyPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<IdentifyResponse | null>(null);
  const [error, setError] = useState<string>("");

  // Two separate inputs: one forces camera, one opens gallery
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setStage("preview");
      setError("");
    },
    []
  );

  const handleScan = useCallback(async () => {
    if (!selectedFile) return;
    setStage("scanning");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/identify", { method: "POST", body: formData });
      const data: IdentifyResponse = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Identification failed");
        setStage("preview");
        return;
      }
      setResult(data);
      setStage("result");
    } catch {
      setError("Network error. Please try again.");
      setStage("preview");
    }
  }, [selectedFile]);

  const handleTryAgain = useCallback(() => {
    setStage("idle");
    setImagePreview("");
    setSelectedFile(null);
    setResult(null);
    setError("");
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header — tall enough for easy tapping */}
      <div className="bg-pokedex-red border-b-4 border-pokedex-darkred px-4 flex justify-between items-center"
           style={{ paddingTop: 'env(safe-area-inset-top, 12px)', minHeight: 56 }}>
        <Link
          href="/pokedex"
          className="tap-target font-pixel text-white text-[10px] pr-4"
        >
          ◀ DEX
        </Link>
        <span className="font-pixel text-white text-[10px] tracking-widest">
          SCANNER
        </span>
        <div className="w-16" />
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        id="camera-input"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        id="gallery-input"
      />

      <div className="flex-1 flex flex-col px-4 py-6 max-w-lg mx-auto w-full">
        {/* ── IDLE ─────────────────────────────────────────────── */}
        {stage === "idle" && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-center mb-6">
              <p className="font-pixel text-xs text-white mb-2">SCAN A BIRD</p>
              <p className="font-pixel text-[8px] text-gray-500 leading-relaxed">
                Spot a bird? Take a photo or choose one from your gallery to
                identify it and add it to your LA BirdDex.
              </p>
            </div>

            {/* Two big action buttons — easy to tap outdoors */}
            <div className="flex flex-col gap-4">
              <label
                htmlFor="camera-input"
                className="flex flex-col items-center justify-center gap-3 w-full border-2 border-pokedex-red bg-pokedex-red/10 active:bg-pokedex-red/20 cursor-pointer"
                style={{ minHeight: 120 }}
              >
                <span className="text-5xl">📷</span>
                <span className="font-pixel text-[10px] text-pokedex-red">
                  TAKE PHOTO
                </span>
                <span className="font-pixel text-[7px] text-gray-600">
                  OPENS CAMERA
                </span>
              </label>

              <label
                htmlFor="gallery-input"
                className="flex flex-col items-center justify-center gap-3 w-full border-2 border-gray-600 bg-pokedex-screen active:bg-pokedex-screenlight cursor-pointer"
                style={{ minHeight: 100 }}
              >
                <span className="text-4xl">🖼️</span>
                <span className="font-pixel text-[10px] text-gray-300">
                  CHOOSE FROM GALLERY
                </span>
              </label>
            </div>

            <p className="font-pixel text-[7px] text-gray-700 text-center mt-6">
              20 SCANS PER DAY
            </p>
          </div>
        )}

        {/* ── PREVIEW ──────────────────────────────────────────── */}
        {stage === "preview" && imagePreview && (
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-pixel text-[9px] text-gray-400 text-center">
              READY TO SCAN
            </p>
            <ScannerUI imagePreview={imagePreview} isScanning={false} />
            {error && (
              <p className="font-pixel text-[8px] text-red-400 text-center">
                ⚠ {error}
              </p>
            )}
            {/* Buttons at the bottom where thumbs can reach */}
            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={handleScan}
                className="w-full font-pixel text-[11px] py-4 bg-pokedex-red text-white border-2 border-pokedex-darkred active:bg-pokedex-darkred"
                style={{ minHeight: 56 }}
              >
                ▶ ANALYZE
              </button>
              <button
                onClick={handleTryAgain}
                className="w-full font-pixel text-[10px] py-3 bg-transparent text-gray-400 border-2 border-gray-700 active:border-gray-500"
                style={{ minHeight: 48 }}
              >
                RETAKE
              </button>
            </div>
          </div>
        )}

        {/* ── SCANNING ─────────────────────────────────────────── */}
        {stage === "scanning" && imagePreview && (
          <div className="flex-1 flex flex-col gap-4 items-center justify-center">
            <p className="font-pixel text-[9px] text-pokedex-red text-center blink">
              ANALYZING...
            </p>
            <ScannerUI imagePreview={imagePreview} isScanning={true} />
          </div>
        )}

        {/* ── RESULT ───────────────────────────────────────────── */}
        {stage === "result" && result && (
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-pixel text-[9px] text-gray-400 text-center">
              SCAN COMPLETE
            </p>
            <IdentificationResult result={result} onTryAgain={handleTryAgain} />
          </div>
        )}
      </div>
    </div>
  );
}
