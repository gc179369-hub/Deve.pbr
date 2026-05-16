import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  delay?: number;
}

export default function CodeBlock({ code, filename, language = 'json', delay = 0 }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const highlightJson = (jsonStr: string) => {
    return jsonStr
      .replace(/\/\/.*$/gm, (match) => `<span class="json-comment">${match}</span>`)
      .replace(/"([^"]+)"(\s*:)/g, '<span class="json-key">"$1"</span>$2')
      .replace(/:\s*"([^"]+)"/g, ': <span class="json-string">"$1"</span>')
      .replace(/:\s*(\d+\.?\d*)/g, ': <span class="json-number">$1</span>')
      .replace(/:\s*(true|false|null)/g, ': <span class="json-bool">$1</span>')
      .replace(/([{}\[\]])/g, '<span class="json-bracket">$1</span>');
  };

  return (
    <ScrollReveal direction="up" delay={delay}>
      <div className="code-block-container group my-6">
        <div className="code-block-header">
          <div className="flex items-center gap-3">
            <div className="code-dots">
              <span style={{ background: '#ff5f57' }} />
              <span style={{ background: '#febc2e' }} />
              <span style={{ background: '#28c840' }} />
            </div>
            {filename && (
              <span style={{
                fontSize: '12px',
                color: '#8b949e',
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                {filename}
              </span>
            )}
            <span style={{
              fontSize: '10px',
              color: '#6e7681',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.04)',
              textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              {language}
            </span>
          </div>
          <motion.button
            className="copy-btn"
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copiado!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copiar código
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <div className="code-content">
          <pre dangerouslySetInnerHTML={{ __html: highlightJson(code) }} />
        </div>
      </div>
    </ScrollReveal>
  );
}
