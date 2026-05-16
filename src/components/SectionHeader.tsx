import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ id, badge, title, subtitle, icon }: SectionHeaderProps) {
  return (
    <div id={id} style={{ scrollMarginTop: '100px', marginBottom: '48px' }}>
      <ScrollReveal direction="up">
        {badge && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(22,163,74,0.1))',
            border: '1px solid rgba(220,38,38,0.15)',
            marginBottom: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            {icon}
            {badge}
          </div>
        )}
      </ScrollReveal>
      <ScrollReveal direction="up" delay={0.1}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '16px',
          letterSpacing: '-0.01em'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--red-glow), var(--green-glow))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {title}
          </span>
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal direction="up" delay={0.2}>
          <p style={{
            fontSize: '17px',
            color: 'var(--text-muted)',
            maxWidth: '800px',
            lineHeight: '1.7'
          }}>
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
