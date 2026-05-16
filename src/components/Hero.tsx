import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '100px 24px 80px'
      }}
    >
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(220, 38, 38, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(22, 163, 74, 0.1) 0%, transparent 50%)'
      }} />

      {/* Animated Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${60 + Math.random() * 40}%`,
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'rgba(220, 38, 38, 0.6)'
                : 'rgba(34, 197, 94, 0.6)',
              boxShadow: i % 2 === 0
                ? '0 0 10px rgba(220, 38, 38, 0.4)'
                : '0 0 10px rgba(34, 197, 94, 0.4)',
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.3), transparent)',
        animation: 'scanline 8s linear infinite',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, rgba(220,38,38,0.15), rgba(22,163,74,0.15))',
            border: '1px solid rgba(220,38,38,0.2)',
            marginBottom: '32px',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--green-glow)',
            animation: 'pulse-green 2s ease-in-out infinite'
          }} />
          <span style={{ color: 'var(--text-muted)' }}>Minecraft Bedrock Edition</span>
          <span style={{ color: 'var(--red-glow)' }}>•</span>
          <span style={{ color: 'var(--green-glow)' }}>Vibrant Visuals</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}
        >
          <span style={{ color: 'var(--text-primary)' }}>Guia Completo de</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, var(--red-glow), #ff6b6b, var(--green-glow), #4ade80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Iluminação Vibrant Visuals
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-muted)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}
        >
          Aprenda a personalizar iluminação global, luzes pontuais, PBR uniforms e reflexões
          para criar visuais vibrantes e cinematográficos no Minecraft Bedrock.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#global-lighting"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, var(--red-primary), var(--red-dark))',
              color: 'white',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Começar Agora
          </motion.a>
          <motion.a
            href="#tutorial"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Ver Tutorial
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Role para baixo
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '24px',
              height: '36px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px'
            }}
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '3px',
                height: '8px',
                borderRadius: '2px',
                background: 'var(--red-glow)'
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
