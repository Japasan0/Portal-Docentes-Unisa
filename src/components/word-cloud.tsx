import type { CSSProperties } from 'react';

// Lattes keywords render as a compact balloon-shaped cloud: list order is the
// relevance rank (first = most mentioned). The biggest terms sit in the centre
// and smaller ones are pushed outward to the edges, words packed tightly.
const TONES = ['blue', 'wine', 'gray'] as const;

function sizeFor(rank: number, total: number) {
  const t = total <= 1 ? 1 : 1 - rank / (total - 1);
  return Math.round(11 + t * t * 19);
}

// Interleave ranks so the most relevant end up in the middle of the sequence.
function centreOut<T>(items: T[]) {
  const out: T[] = [];
  items.forEach((item, i) => (i % 2 === 0 ? out.push(item) : out.unshift(item)));
  return out;
}

export function WordCloud({ words }: { words: string[] }) {
  const ranked = words.map((word, rank) => ({ word, rank }));
  const rows: typeof ranked[] = [[], [], [], [], []];
  // Centre row gets the top 3 terms, inner rows the next ones, outer rows the rest.
  ranked.forEach((item, i) => {
    const row = i < 3 ? 2 : i < 9 ? (i % 2 ? 1 : 3) : (i % 2 ? 0 : 4);
    rows[row]?.push(item);
  });
  return <div className="word-cloud" role="list">
    {rows.map((row, r) => <div key={r} className="word-cloud-row">
      {centreOut(row).map(({ word, rank }) => {
        const style: CSSProperties = { fontSize: sizeFor(rank, words.length) };
        return <span key={`${word}-${rank}`} role="listitem" className={`word-cloud-word word-cloud-${TONES[rank % TONES.length]}`} style={style} title={word}>{word}</span>;
      })}
    </div>)}
  </div>;
}

export function TagList({ words }: { words: string[] }) {
  return <ul className="tag-list">{words.map(w => <li key={w}>{w}</li>)}</ul>;
}
