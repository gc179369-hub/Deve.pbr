import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  variant?: 'red' | 'green' | 'default';
  delay?: number;
}

export default function InfoCard({ icon, title, children, variant = 'default', delay = 0 }: InfoCardProps) {
  const getStyles = () => {
    switch (variant) {
      case 'red':
        return {
          border: '1px solid rgba(220, 38, 38, 0.15)',
          iconBg: 'linear-gradient(135deg, var(--red-primary), var(--red-dark))',
          glow: 'rgba(220, 38, 38, 0.05)'
        };
      case 'green':
        return {
          border: '1px solid rgba(22, 163, 74, 0.15)',
          iconBg: 'linear-gradient(135deg, var(--green-primary), var(--green-dark))',
          glow: 'rgba(22, 163, 74, 0.05)'
        };
      default:
        return {
          border: '1px solid rgba(255,255,255,0.06)',
          iconBg: 'linear-gradient(135deg, var(--red-primary), var(--green-primary))',
          glow: 'transparent'
        };
    }
  };

  const styles = getStyles();

  return (
    <ScrollReveal direction="up" delay={delay}>
      <motion.div
        whileHover={{ y: -4, borderColor: variant === 'red' ? 'rgba(220, 38, 38, 0.3)' : variant === 'green' ? 'rgba(22, 163, 74, 0.3)' : 'rgba(255,255,255,0.1)' }}
        style={{
          borderRadius: '16px',
          padding: '28px',
          background: `linear-gradient(135deg, var(--bg-card), ${styles.glow})`,
          border: styles.border,
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: styles.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: variant === 'red' ? '0 4px 15px rgba(220,38,38,0.3)' : variant === 'green' ? '0 4px 15px rgba(22,163,74,0.3)' : '0 4px 15px rgba(220,38,38,0.2)'
          }}>
            {icon}
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            {title}
          </h3>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8' }}>
          {children}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}
