import React, { useEffect, useMemo, useState } from "react";
import "./Game.css";

/* ===== EN ↔ TH WORD BANK ===== */
const WORDS = [
  // Occupations
  { en: "Accountant", th: "นักบัญชี", cat: "occupation" },
  { en: "Activist", th: "นักเคลื่อนไหว, นักกิจกรรม", cat: "occupation" },
  { en: "Anthropologist", th: "นักมานุษยวิทยา", cat: "occupation" },
  { en: "Archaeologist", th: "นักโบราณคดี", cat: "occupation" },
  { en: "Architect", th: "สถาปนิก", cat: "occupation" },
  { en: "Astronomer", th: "นักดาราศาสตร์", cat: "occupation" },
  { en: "Auctioneer", th: "ผู้ขายทอดตลาด", cat: "occupation" },
  { en: "Biologist", th: "นักชีววิทยา", cat: "occupation" },
  { en: "Chairman", th: "ประธาน", cat: "occupation" },
  { en: "Chemist", th: "นักเคมี", cat: "occupation" },
  { en: "Clerk", th: "เสมียน", cat: "occupation" },
  { en: "Client", th: "ลูกค้า", cat: "occupation" },
  { en: "Composer", th: "นักแต่งเพลง", cat: "occupation" },
  { en: "Conservationist", th: "นักอนุรักษ์ (ธรรมชาติ)", cat: "occupation" },
  { en: "Contractor", th: "ผู้รับเหมา", cat: "occupation" },
  { en: "Detective", th: "นักสืบ", cat: "occupation" },
  { en: "Ecologist", th: "นักนิเวศวิทยา", cat: "occupation" },
  { en: "Educator", th: "นักการศึกษา", cat: "occupation" },
  { en: "Electrician", th: "ช่างไฟฟ้า", cat: "occupation" },
  { en: "Engineer", th: "วิศวกร", cat: "occupation" },
  { en: "Entrepreneur", th: "นักธุรกิจ", cat: "occupation" },
  { en: "Geographer", th: "นักภูมิศาสตร์", cat: "occupation" },
  { en: "Immigrant", th: "ผู้อพยพ", cat: "occupation" },
  { en: "Interpreter", th: "ล่าม", cat: "occupation" },
  { en: "Investor", th: "นักลงทุน", cat: "occupation" },
  { en: "Janitor", th: "นักการภารโรง", cat: "occupation" },
  { en: "Journalist", th: "นักหนังสือพิมพ์", cat: "occupation" },
  { en: "Judge", th: "ผู้พิพากษา", cat: "occupation" },
  { en: "Landowner", th: "เจ้าของที่ดิน", cat: "occupation" },
  { en: "Lawyer", th: "นักกฎหมาย", cat: "occupation" },
  { en: "Librarian", th: "บรรณารักษ์", cat: "occupation" },
  { en: "Master of ceremony", th: "พิธีกร", cat: "occupation" },
  { en: "Merchant", th: "พ่อค้า", cat: "occupation" },
  { en: "Narrator", th: "ผู้บรรยาย", cat: "occupation" },
  { en: "Pharmacist", th: "เภสัชกร", cat: "occupation" },
  { en: "Philosopher", th: "นักปรัชญา", cat: "occupation" },
  { en: "Physician", th: "แพทย์", cat: "occupation" },
  { en: "Politician", th: "นักการเมือง", cat: "occupation" },
  { en: "Priest", th: "นักบวช", cat: "occupation" },
  { en: "Psychiatrist", th: "จิตแพทย์", cat: "occupation" },
  { en: "Receptionist", th: "พนักงานต้อนรับ", cat: "occupation" },
  { en: "Researcher", th: "นักวิจัย", cat: "occupation" },
  { en: "Scientist", th: "นักวิทยาศาสตร์", cat: "occupation" },
  { en: "Secretary", th: "เลขานุการ", cat: "occupation" },
  { en: "Sociologist", th: "นักสังคมวิทยา", cat: "occupation" },
  { en: "Subscriber", th: "ผู้สมัครสมาชิก", cat: "occupation" },
  { en: "Surgeon", th: "ศัลยแพทย์", cat: "occupation" },
  { en: "Tenant", th: "ผู้เช่า", cat: "occupation" },
  { en: "Terrorist", th: "ผู้ก่อการร้าย", cat: "occupation" },
  { en: "Translator", th: "นักแปล", cat: "occupation" },
  // Subjects
  { en: "Anatomy", th: "กายวิภาคศาสตร์", cat: "subject" },
  { en: "Anthropology", th: "มนุษยวิทยา", cat: "subject" },
  { en: "Archaeology", th: "โบราณคดีวิทยา", cat: "subject" },
  { en: "Astrology", th: "โหราศาสตร์", cat: "subject" },
  { en: "Astronomy", th: "ดาราศาสตร์", cat: "subject" },
  { en: "Biology", th: "ชีววิทยา", cat: "subject" },
  { en: "Botany", th: "พฤกษศาสตร์", cat: "subject" },
  { en: "Cardiology", th: "หัวใจวิทยา", cat: "subject" },
  { en: "Chemistry", th: "เคมี", cat: "subject" },
  { en: "Computer science", th: "วิทยาศาสตร์คอมพิวเตอร์", cat: "subject" },
  { en: "Criminology", th: "อาชญาวิทยา", cat: "subject" },
  { en: "Dermatology", th: "โรคผิวหนังวิทยา", cat: "subject" },
  { en: "Entomology", th: "กีฏวิทยา", cat: "subject" },
  { en: "Epidemiology", th: "ระบาดวิทยา", cat: "subject" },
  { en: "Geography", th: "ภูมิศาสตร์", cat: "subject" },
  { en: "Geology", th: "ธรณีวิทยา", cat: "subject" },
  { en: "Geometry", th: "เรขาคณิต", cat: "subject" },
  { en: "History", th: "ประวัติศาสตร์", cat: "subject" },
  { en: "Literature", th: "วรรณคดี", cat: "subject" },
  { en: "Mathematics", th: "คณิตศาสตร์", cat: "subject" },
  { en: "Mythology", th: "การศึกษาเกี่ยวกับเทพปกรณัม", cat: "subject" },
  { en: "Neurology", th: "ประสาทวิทยา", cat: "subject" },
  { en: "Oncology", th: "เนื้องอกวิทยา", cat: "subject" },
  { en: "Paleontology", th: "บรรพชีวินวิทยา", cat: "subject" },
  { en: "Pathology", th: "พยาธิวิทยา", cat: "subject" },
  { en: "Philosophy", th: "ปรัชญา", cat: "subject" },
  { en: "Physical education", th: "พลศึกษา", cat: "subject" },
  { en: "Physical science", th: "วิทยาศาสตร์กายภาพ", cat: "subject" },
  { en: "Physics", th: "ฟิสิกส์", cat: "subject" },
  { en: "Psychology", th: "จิตวิทยา", cat: "subject" },
  { en: "Radiology", th: "รังสีวิทยา", cat: "subject" },
  { en: "Social studies", th: "สังคมศาสตร์", cat: "subject" },
  { en: "Sociology", th: "สังคมวิทยา", cat: "subject" },
  { en: "Theology", th: "ศาสนศาสตร์, เทววิทยา", cat: "subject" },
  { en: "Zoology", th: "สัตววิทยา", cat: "subject" },
];

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

/* ===== component ===== */
export default function WordMatchingGame() {
  const [cat, setCat] = useState("all");
  const [count, setCount] = useState(12);
  const [direction, setDirection] = useState("EN→TH");
  const [started, setStarted] = useState(false);

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
        setLeft((arr) => shuffle(arr));
        setRight((arr) => shuffle(arr));
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
          />
          <CardColumn
            title={direction === "EN→TH" ? "ภาษาไทย" : "ENGLISH"}
            items={right}
            selected={selectedRight}
            matched={matched}
            onPick={(id) => tryMatch("R", id)}
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
function CardColumn({ title, items, selected, matched, onPick }) {
  return (
    <div>
      <div className="mb-2 text-slate-500 uppercase tracking-wide text-xs">
        {title}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it) => {
          const isMatched = matched.has(it.id);
          const isSelected = selected === it.id;
          return (
            <button
              key={it.id + it.label}
              disabled={isMatched}
              onClick={() => onPick(it.id)}
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
