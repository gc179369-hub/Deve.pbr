import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface SchemaVersion {
  version: string;
  updates: string;
}

interface SchemaCardProps {
  title: string;
  filePath: string;
  versions: SchemaVersion[];
  delay?: number;
}

export default function SchemaCard({ title, filePath, versions, delay = 0 }: SchemaCardProps) {
  return (
    <ScrollReveal direction="up" delay={delay}>
      <motion.div
        whileHover={{ y: -4, borderColor: 'rgba(220, 38, 38, 0.3)' }}
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'var(--bg-card)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(22,163,74,0.08))',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, var(--red-primary), var(--green-primary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {title}
            </h3>
          </div>
          <code style={{
            fontSize: '12px',
            color: 'var(--green-glow)',
            background: 'rgba(22, 163, 74, 0.1)',
            padding: '3px 10px',
            borderRadius: '6px',
            border: '1px solid rgba(22, 163, 74, 0.15)',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            {filePath}
          </code>
        </div>

        {/* Versions */}
        <div style={{ padding: '16px 24px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontWeight: '600' }}>
            Versões do Schema
          </div>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 4px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '6px 12px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>Versão</th>
                <th style={{ textAlign: 'left', padding: '6px 12px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>Atualizações</th>
              </tr>
            </thead>
            <tbody>
              {versions.map((v, i) => (
                <tr key={v.version}>
                  <td style={{ padding: '8px 12px' }}>
                    <span className="schema-badge" style={{
                      background: i === 0 ? 'rgba(22, 163, 74, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${i === 0 ? 'rgba(22, 163, 74, 0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: i === 0 ? 'var(--green-glow)' : 'var(--text-muted)'
                    }}>
                      {v.version}
                    </span>
                  </td>
                  <td style={{ padding: '8px 12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    {v.updates}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
