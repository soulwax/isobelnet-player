// File: src/components/PatternControls.tsx

"use client";

import { Layers, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { FlowFieldRenderer } from "./visualizers/FlowFieldRenderer";

interface PatternControlsProps {
  renderer: FlowFieldRenderer | null;
  onClose: () => void;
}

export default function PatternControls({
  renderer,
  onClose,
}: PatternControlsProps) {
  const [patternState, setPatternState] = useState<{
    currentPattern: string;
    nextPattern: string;
    patternDuration: number;
    transitionSpeed: number;
    transitionProgress: number;
    isTransitioning: boolean;
    fractalZoom: number;
    fractalOffsetX: number;
    fractalOffsetY: number;
    juliaC: { re: number; im: number };
    hueBase: number;
  } | null>(null);
  const [availablePatterns, setAvailablePatterns] = useState<string[]>([]);
  const [rawCurrentPattern, setRawCurrentPattern] = useState<string>("");

  // Get available patterns on mount
  useEffect(() => {
    if (!renderer) return;

    const patterns = renderer.getAllPatterns();
    setAvailablePatterns(patterns);
  }, [renderer]);

  // Update pattern state periodically
  useEffect(() => {
    if (!renderer) return;

    const updateState = () => {
      const state = renderer.getPatternState();
      setRawCurrentPattern(state.currentPattern);
      setPatternState({
        currentPattern: renderer.getFormattedPatternName(state.currentPattern),
        nextPattern: renderer.getFormattedPatternName(state.nextPattern),
        patternDuration: state.patternDuration,
        transitionSpeed: state.transitionSpeed,
        transitionProgress: state.transitionProgress,
        isTransitioning: state.isTransitioning,
        fractalZoom: state.fractalZoom,
        fractalOffsetX: state.fractalOffsetX,
        fractalOffsetY: state.fractalOffsetY,
        juliaC: state.juliaC,
        hueBase: state.hueBase,
      });
    };

    updateState();
    const interval = setInterval(updateState, 100); // Update 10 times per second

    return () => clearInterval(interval);
  }, [renderer]);

  if (!renderer || !patternState) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed bottom-24 left-1/2 z-50 w-full max-w-md -translate-x-1/2 rounded-lg border border-[rgba(244,178,102,0.18)] bg-[rgba(12,18,27,0.98)] shadow-2xl shadow-[rgba(5,10,18,0.8)] backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(244,178,102,0.12)] px-4 py-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[var(--color-accent)]" />
            <h3 className="font-semibold text-[var(--color-text)]">
              Pattern Controls
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-[var(--color-subtext)] transition hover:bg-[rgba(244,178,102,0.12)] hover:text-[var(--color-text)]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {/* Pattern Selection */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
              Select Pattern
            </label>
            <div className="relative">
              <select
                value={rawCurrentPattern}
                onChange={(e) => {
                  const pattern = e.target.value as any;
                  renderer.setPattern(pattern);
                }}
                className="w-full appearance-none rounded-lg border border-[rgba(244,178,102,0.18)] bg-[rgba(12,18,27,0.95)] px-4 py-2.5 pr-10 text-sm text-[var(--color-text)] transition hover:border-[rgba(244,178,102,0.3)] focus:border-[var(--color-accent)] focus:outline-none"
              >
                {availablePatterns.map((pattern) => (
                  <option key={pattern} value={pattern}>
                    {renderer.getFormattedPatternName(pattern)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-accent)]" />
            </div>
            {patternState.isTransitioning && (
              <div className="mt-2 text-xs text-[var(--color-subtext)]">
                Transitioning to: {patternState.nextPattern} (
                {Math.round(patternState.transitionProgress * 100)}%)
              </div>
            )}
          </div>

          {/* General Controls */}
          <div className="mb-6 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--color-text)]">
              General
            </h4>

            {/* Pattern Duration */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Pattern Duration
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.patternDuration.toFixed(0)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={patternState.patternDuration}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  renderer.setPatternDuration(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, patternDuration: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Transition Speed */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Transition Speed
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.transitionSpeed.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={patternState.transitionSpeed}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setTransitionSpeed(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, transitionSpeed: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Hue Base */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Hue Base
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {Math.round(patternState.hueBase)}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={patternState.hueBase}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  renderer.setHueBase(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, hueBase: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>
          </div>

          {/* Pattern-Specific Controls */}
          {rawCurrentPattern === "fractal" && (
            <div className="mb-6 space-y-4">
              <h4 className="text-sm font-semibold text-[var(--color-text)]">
                Fractal Controls
              </h4>

            {/* Fractal Zoom */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Zoom
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.fractalZoom.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={patternState.fractalZoom}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setFractalZoom(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, fractalZoom: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Fractal Offset X */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Offset X
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.fractalOffsetX.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={patternState.fractalOffsetX}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setFractalOffsetX(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, fractalOffsetX: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Fractal Offset Y */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Offset Y
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.fractalOffsetY.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={patternState.fractalOffsetY}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setFractalOffsetY(value);
                  setPatternState((prev) =>
                    prev ? { ...prev, fractalOffsetY: value } : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Julia C Real */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Julia C (Real)
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.juliaC.re.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={patternState.juliaC.re}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setJuliaC(value, patternState.juliaC.im);
                  setPatternState((prev) =>
                    prev
                      ? {
                          ...prev,
                          juliaC: { ...prev.juliaC, re: value },
                        }
                      : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>

            {/* Julia C Imaginary */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm text-[var(--color-subtext)]">
                  Julia C (Imaginary)
                </label>
                <span className="text-xs font-mono text-[var(--color-accent)]">
                  {patternState.juliaC.im.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.01"
                value={patternState.juliaC.im}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  renderer.setJuliaC(patternState.juliaC.re, value);
                  setPatternState((prev) =>
                    prev
                      ? {
                          ...prev,
                          juliaC: { ...prev.juliaC, im: value },
                        }
                      : null,
                  );
                }}
                className="accent-accent h-2 w-full cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.12)]"
              />
            </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

