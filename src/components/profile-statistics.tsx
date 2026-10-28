import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Statistic = { label: string; value: number };
const shortLabels: Record<string, string> = {
  'Orientações de mestrado': 'Mestrado',
  'Orientações de doutorado': 'Doutorado',
  'Iniciação científica': 'Iniciação científica',
  'Disciplinas ministradas': 'Disciplinas',
};

export function SchoolStatistics({ data }: { data: Statistic[] }) {
  return <div className="school-statistics">
    <div className="school-chart" role="img" aria-label={`Estatística Escolar: ${data.map(item => `${item.label}: ${item.value}`).join('; ')}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 28, right: 8, bottom: 12, left: -20 }} accessibilityLayer>
          <CartesianGrid vertical={false} stroke="var(--border)"/>
          <XAxis dataKey="label" interval={0} tick={({ x, y, payload }) => <text x={x} y={y} textAnchor="middle" fill="var(--muted-foreground)" fontSize={10}>{(shortLabels[payload.value] ?? payload.value).split(' ').map((word: string, index: number) => <tspan key={word} x={x} dy={index === 0 ? 12 : 12}>{word}</tspan>)}</text>} axisLine={false} tickLine={false} height={40}/>
          <YAxis allowDecimals={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false}/>
          <Tooltip cursor={{ fill: 'var(--muted)' }} content={({ active, payload }) => {
            const item = payload?.[0]?.payload as Statistic | undefined;
            return active && item ? <div className="statistics-tooltip"><strong>{item.label}</strong><span>Total: {item.value}</span></div> : null;
          }}/>
          <Bar dataKey="value" name="Total" fill="var(--statistics-bar)" maxBarSize={46} radius={[3, 3, 0, 0]} isAnimationActive={false}>
            <LabelList dataKey="value" position="top" fill="var(--primary)" fontSize={12}/>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>;
}

export function FapespStatistics({ data }: { data: Statistic[] }) {
  return <div className="fapesp-statistics"><p className="fapesp-caption">Apoio FAPESP em números</p><dl className="fapesp-counters">{data.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div>;
}