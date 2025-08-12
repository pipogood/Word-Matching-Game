import React, { useEffect, useMemo, useState } from "react";
import "./Game.css";
import WORDS from "./assets/words";

/* ===== utils ===== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function useTimer(active) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [active]);
  return sec;
}

// Web Speech helper
function speak(text, opts = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = opts.lang || "en-US";
  u.rate = opts.rate ?? 0.95;
  u.pitch = opts.pitch ?? 1;
  window.speechSynthesis.cancel(); // stop anything already speaking
  window.speechSynthesis.speak(u);
}

/* ===== component ===== */
export default function WordMatchingGame() {
  const [cat, setCat] = useState("all");
  const [count, setCount] = useState(12);
  const [direction, setDirection] = useState("EN→TH");
  const [started, setStarted] = useState(false);
  const [ttsOn, setTtsOn] = useState(true);

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const pool = useMemo(
    () => (cat === "all" ? WORDS : WORDS.filter((w) => w.cat === cat)),
    [cat]
  );
  const time = useTimer(started && matched.size < left.length);

  const startGame = () => {
    const sample = shuffle(pool).slice(0, Math.min(count, pool.length));
    const pairs = sample.map((w, idx) => ({ id: idx, en: w.en, th: w.th }));

    const leftSide =
      direction === "EN→TH"
        ? pairs.map((p) => ({ id: p.id, label: p.en }))
        : pairs.map((p) => ({ id: p.id, label: p.th }));

    const rightSide =
      direction === "EN→TH"
        ? pairs.map((p) => ({ id: p.id, label: p.th }))
        : pairs.map((p) => ({ id: p.id, label: p.en }));

    setLeft(shuffle(leftSide));
    setRight(shuffle(rightSide));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched(new Set());
    setMoves(0);
    setMistakes(0);
    setStarted(true);
  };

  const tryMatch = (side, id) => {
    if (!started || matched.has(id)) return;
    if (side === "L") setSelectedLeft(id === selectedLeft ? null : id);
    else setSelectedRight(id === selectedRight ? null : id);
  };

  useEffect(() => {
    if (selectedLeft == null || selectedRight == null) return;
    setMoves((m) => m + 1);

    if (selectedLeft === selectedRight) {
      const next = new Set(matched);
      next.add(selectedLeft);
      setMatched(next);
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setMistakes((e) => e + 1);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 350);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeft, selectedRight]);

  const allMatched = started && matched.size === left.length && left.length > 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800 p-6 md:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Word Matching Game — EN↔TH
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600">
          เลือกหมวด จำนวนคำ และทิศทาง แล้วเริ่มเล่นได้เลย!
        </p>

        {/* Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-2xl border p-2 bg-white shadow-sm"
            >
              <option value="all">All (ทั้งหมด)</option>
              <option value="occupation">Occupations (อาชีพ)</option>
              <option value="subject">Subjects (สาขาวิชา)</option>
              <option value="verbs">Verbs (กริยา)</option>
              <option value="adjective">Adjective (Adj.)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Pairs
            </label>
            <input
              type="range"
              min={6}
              max={20}
              step={2}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <div className="text-sm">{count} pairs</div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Direction
            </label>
            <div className="flex gap-2">
              {["EN→TH", "TH→EN"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`px-3 py-2 rounded-2xl border shadow-sm ${
                    direction === d ? "bg-slate-900 text-white" : "bg-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={startGame}
              className="w-full px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:shadow-md transition"
            >
              {started ? "Restart" : "Start"}
            </button>

            <button
              onClick={() => setTtsOn(v => !v)}
              className={`px-3 py-2 rounded-2xl border shadow-sm ${ttsOn ? "bg-white" : "bg-white"}`}
              title="Toggle English text-to-speech"
            >
              {ttsOn ? "🔈 Voice ON" : "🔇 Voice OFF"}
            </button>

          </div>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Time: {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Moves: {moves}
          </span>
          <span className="px-3 py-1 rounded-full bg-white shadow">
            Mistakes: {mistakes}
          </span>
          {allMatched && (
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white shadow">
              🎉 Completed!
            </span>
          )}
        </div>

        {/* Game board */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardColumn
            title={direction === "EN→TH" ? "ENGLISH" : "ภาษาไทย"}
            items={left}
            selected={selectedLeft}
            matched={matched}
            onPick={(id) => tryMatch("L", id)}
            isEnglish={direction === "EN→TH"}
            ttsOn={ttsOn}
          />

          <CardColumn
            title={direction === "EN→TH" ? "ภาษาไทย" : "ENGLISH"}
            items={right}
            selected={selectedRight}
            matched={matched}
            onPick={(id) => tryMatch("R", id)}
            isEnglish={direction !== "EN→TH"}
            ttsOn={ttsOn}
          />
        </div>

        {/* Glossary */}
        <details className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <summary className="font-semibold cursor-pointer">
            Full glossary (คลังคำศัพท์ทั้งหมด)
          </summary>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {WORDS.map((w, i) => (
              <div
                key={i}
                className="flex justify-between gap-2 bg-slate-50 rounded-xl p-2"
              >
                <span className="font-medium">{w.en}</span>
                <span className="text-slate-600">{w.th}</span>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}

/* column */
function CardColumn({
  title,
  items,
  selected,
  matched,
  onPick,
  isEnglish = false,
  ttsOn = true,
}) {
  return (
    <div>
      <div className="mb-2 text-slate-500 uppercase tracking-wide text-xs">{title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it) => {
          const isMatched = matched.has(it.id);
          const isSelected = selected === it.id;
          return (
            <button
              key={it.id + it.label}
              disabled={isMatched}
              onClick={() => {
                if (isEnglish && ttsOn) speak(it.label);
                onPick(it.id);
              }}
              className={`text-left rounded-2xl p-3 shadow border transition active:scale-95 ${
                isMatched
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : isSelected
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

