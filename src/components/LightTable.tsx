import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface LightEntry {
  block: string;
  color: string;
  note?: string;
}

const lightEntries: LightEntry[] = [
  { block: 'minecraft:torch', color: '#EFE39D' },
  { block: 'minecraft:redstone_torch', color: '#FF0000' },
  { block: 'minecraft:end_rod', color: '#FFFFFF' },
  { block: 'minecraft:lantern', color: '#CE8133' },
  { block: 'minecraft:soul_lantern', color: '#00FFFF' },
  { block: 'minecraft:soul_torch', color: '#00FFFF' },
  { block: 'minecraft:candle', color: '#EFE39D', note: 'Inclui todas as variantes de velas coloridas e bolos decorados com velas.' },
  { block: 'minecraft:sea_pickle', color: '#FFFFFF' },
  { block: 'minecraft:copper_torch', color: '#B8EF8D', note: 'Inclui todas as variantes enceradas, resistentes às intempéries e oxidadas.' },
  { block: 'minecraft:copper_lantern', color: '#B8EF8D', note: 'Inclui todas as variantes enceradas, resistentes às intempéries e oxidadas.' },
];

export default function LightTable() {
  return (
    <ScrollReveal direction="up">
      <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid rgba(220, 38, 38, 0.15)',
        background: 'var(--bg-card)'
      }}>
        {/* Table Header */}
        <div style={{
          padding: '16px 24px',
          background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(22,163,74,0.1))',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--red-primary), var(--green-primary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span style={{ fontWeight: '700', fontSize: '15px' }}>Luzes Pontuais Padrão do Jogo</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Bloco</th>
                <th>Cor da Luz</th>
                <th>Visualização</th>
                <th>Observação</th>
              </tr>
            </thead>
            <tbody>
              {lightEntries.map((entry, index) => (
                <motion.tr
                  key={entry.block}
                  initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false, margin: '-30px 0px -30px 0px' }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <td style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace' }}>
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td>
                    <code style={{
                      color: 'var(--green-glow)',
                      background: 'rgba(22, 163, 74, 0.1)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(22, 163, 74, 0.15)',
                      fontSize: '13px'
                    }}>
                      {entry.block}
                    </code>
                  </td>
                  <td>
                    <div className="color-swatch">
                      <div
                        className="dot"
                        style={{
                          background: entry.color,
                          boxShadow: `0 0 12px ${entry.color}40`
                        }}
                      />
                      <code style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '13px',
                        color: 'var(--text-primary)'
                      }}>
                        {entry.color}
                      </code>
                    </div>
                  </td>
                  <td>
                    <div style={{
                      width: '48px',
                      height: '24px',
                      borderRadius: '6px',
                      background: `linear-gradient(135deg, ${entry.color}, ${entry.color}80)`,
                      boxShadow: `0 0 15px ${entry.color}30`,
                      border: '1px solid rgba(255,255,255,0.1)'
                    }} />
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '13px', maxWidth: '300px' }}>
                    {entry.note || '—'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScrollReveal>
  );
}
