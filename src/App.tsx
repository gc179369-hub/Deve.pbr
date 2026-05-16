import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader';
import CodeBlock from './components/CodeBlock';
import VideoPlayer from './components/VideoPlayer';
import LightTable from './components/LightTable';
import SchemaCard from './components/SchemaCard';
import InfoCard from './components/InfoCard';
import ScrollReveal from './components/ScrollReveal';

const lightingGlobalJson = `{
    "format_version": "1.26.0",
    "minecraft:lighting_settings": {
        "description": {
            "identifier": "my_pack:default_lighting"
        },
        "directional_lights": {
            "orbital": {
                "sun": {
                    "illuminance": {
                        "0.0": 109880.0,
                        "0.25": 20000.0,
                        "0.35": 400.0,
                        "0.5": 1.0,
                        "0.65": 400.0,
                        "0.75": 20000.0,
                        "1.0": 109880.0
                    },
                    "color": [ 255.0, 255.0, 255.0 ]
                },
                "moon": { 
                    "illuminance": 0.27,
                    "color": "#ffffff"
                }, 
                "orbital_offset_degrees": 3.0
            },
            "flash": {
                "illuminance": 5.0,
                "color": [ 255.0, 255.0, 255.0 ]
            }
        },
        "emissive": {
            "desaturation": 0.1
        },
        "ambient": {
            "illuminance": 0.02,
            "color": "#ffffff"
        },
        "sky": {
            "intensity": 1.0
        }
    }
}`;

const lightingSchemaJson = `{
    string "format_version", // The 3-part schema version for parsing these lighting settings.
    object "minecraft:lighting_settings"
    {
        object "description"
        {
            string "identifier" // The identifier for these lighting settings. The identifier must include a namespace.
        },
        object "directional_lights"
        {
            object "orbital" {
                object "sun"
                {
                    float "illuminance" : optkeyframe, // How bright the sun is, measured in lux (lx)
                    color "color" : optkeyframe // The RGB color that the sun contributes to direct surface lighting
                },
                object "moon"
                {
                    float "illuminance" : optkeyframe,  // How bright the moon is; measured in lux (lx)
                    color "color" : optkeyframe // The RGB color that the moon contributes to direct surface lighting
                },
                float "orbital_offset_degrees" : optkeyframe // The rotational offset of the sun and moon
            },
            object "flash" {
                float "illuminance", // The peak brightness of the End flash, measured in lux (lx)
                color "color" // The RGB color that the End flash contributes to surface lighting
            }
        },
        object "emissive"
        {
            float "desaturation" // Values range from [0.0, 1.0]
        },
        object "ambient"
        {
            float "illuminance" : optkeyframe,  // How bright the ambient light is; measured in lux (lx)
            color "color" : optkeyframe // The RGB color that the ambient light contributes
        },
        object "sky"
        {
            float "intensity" : optkeyframe // Scales how much energy the sky contributes to lighting; values range from [0.1, 1.0]
        }
    }
}`;

const localLightingJson = `{
    "format_version": "1.21.120",
    "minecraft:local_light_settings": {
        "minecraft:torch": {
            "light_color": "#EFE39D",
            "light_type": "point_light"
        }
    }
}`;

const localLightingSchemaJson = `{
    string "format_version", // The 3-part schema version
    object "minecraft:local_light_settings"
    {
        object "block identifier" // namespace-qualified block name eg. minecraft:torch
        {
            light_color: color, // Optional. Supports RGB array or HEX string
            light_type: "static_light" or "point_light"
        },
        ...
    }
}`;

const pointLightsDeprecatedJson = `{
    "format_version": "1.21.40",
    "minecraft:minecraft:point_light_settings": {
        "colors": { 
           "minecraft:soul_torch": "#FFFFFF"
        }
    }
}`;

const pbrGlobalJson = `{
    "format_version": "1.21.40",
    "minecraft:pbr_fallback_settings": {
        "blocks": {
            "global_metalness_emissive_roughness_subsurface": [0.0, 0.0, 255.0, 0.0]
        },
        "actors": {
            "global_metalness_emissive_roughness_subsurface": [0.0, 0.0, 255.0, 0.0]
        },
        "particles": {
            "global_metalness_emissive_roughness_subsurface": [0.0, 0.0, 255.0, 0.0]
        },
        "items": {
            "global_metalness_emissive_roughness_subsurface": [0.0, 0.0, 255.0, 0.0]
        }
    }
}`;

const pbrSchemaJson = `{
    string "format_version", // The 3-part schema version
    object "minecraft:pbr_fallback_settings"
    {
        object "blocks"
        {
            color "global_metalness_emissive_roughness_subsurface" // Default MERS for blocks
        },
        object "actors"
        {
            color "global_metalness_emissive_roughness_subsurface" // Default MERS for actors/mobs
        },
        object "particles"
        {
            color "global_metalness_emissive_roughness_subsurface" // Default MERS for particles
        },
        object "items"
        {
            color "global_metalness_emissive_roughness_subsurface" // Default MERS for items
        }
    }
}`;

export default function App() {
  return (
    <div className="grain-overlay" style={{ minHeight: '100vh' }}>
      <Navigation />
      <Hero />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* ==================== GLOBAL LIGHTING ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="global-lighting"
            badge="Seção 01"
            title="Iluminação Global"
            subtitle={'Isso cobre os objetos "directional lights", "emissive", "ambient" e "sky" em lighting/global.json.'}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>}
          />

          {/* Directional Lights */}
          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></svg>}
            title="Luzes Direcionais"
            variant="red"
          >
            <p style={{ marginBottom: '16px' }}>
              O objeto <code style={{ color: 'var(--red-glow)', background: 'rgba(220,38,38,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>directional_lights</code> é dividido na seção <strong style={{ color: 'var(--text-primary)' }}>orbital</strong>, que contém propriedades para o sol e a lua, e a seção <strong style={{ color: 'var(--text-primary)' }}>flash</strong>, que contém propriedades para o flash de luz do End.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Essas propriedades afetam a intensidade de suas respectivas contribuições de luz, as cores que projetam nas superfícies que iluminam e o ângulo em que projetam sombras. Elas também influenciam a cor do céu por meio de cálculos de dispersão atmosférica.
            </p>
            <p style={{ marginBottom: '16px' }}>
              O sol e a lua são assumidos como estando em pontos opostos em sua órbita no céu o tempo todo. Quando ambos os corpos celestes estão visíveis, ambos contribuem com luz para a cena.
            </p>
            <p>
              A pipeline do Vibrant Visuals lida com valores de iluminância que correspondem a valores do mundo real. Por exemplo, o sol ao meio-dia em um dia limpo mede até <strong style={{ color: 'var(--text-primary)' }}>100.000 lux</strong>, enquanto a lua registra menos de um. Os valores de cor podem ser expressos como uma matriz de três valores numéricos no intervalo de 0–255, ou como uma sequência hexadecimal de seis dígitos.
            </p>
          </InfoCard>

          <div style={{ height: '32px' }} />

          {/* Emissive */}
          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /><circle cx="12" cy="12" r="4" /></svg>}
            title="Fontes de Luz Emissiva"
            variant="green"
          >
            <p style={{ marginBottom: '16px' }}>
              A propriedade <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>emissive</code> permite algum controle sobre como as fontes de luz emissiva se comportam. Isso pode ser especialmente útil para ajustar fontes de luz emissiva para certos tipos de tone mapping.
            </p>
            <p>
              Atualmente, as fontes de luz emissiva possuem apenas uma propriedade, <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>desaturation</code>. Este é um fator de <strong style={{ color: 'var(--text-primary)' }}>0.0 a 1.0</strong> que controla o quanto o albedo de um determinado pixel é dessaturado ao calcular a cor da luz emissiva. Um valor de 0.0 resulta em nenhuma dessaturação, enquanto 1.0 resulta em dessaturação completa.
            </p>
          </InfoCard>

          <div style={{ height: '32px' }} />

          {/* Ambient */}
          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
            title="Luz Ambiente"
            variant="red"
          >
            <p style={{ marginBottom: '16px' }}>
              O objeto <code style={{ color: 'var(--red-glow)', background: 'rgba(220,38,38,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>ambient</code> controla como as superfícies são iluminadas quando não há outras fontes de luz disponíveis. Imagine uma cena sem fontes de luz direta ou indireta, como uma caverna escura sem tochas ou lava.
            </p>
            <p style={{ marginBottom: '16px' }}>
              O valor de <code style={{ color: 'var(--red-glow)', background: 'rgba(220,38,38,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>illuminance</code> corresponde à intensidade, em lux (lx), da luz ambiente, e deve ser mantido bastante baixo em geral. O intervalo permitido para este valor é <strong style={{ color: 'var(--text-primary)' }}>0.0 - 5.0</strong>.
            </p>
            <p>
              Se não fornecido, uma cor padrão de <code style={{ color: 'var(--red-glow)', background: 'rgba(220,38,38,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>#FFFFFF</code> e iluminância de <strong style={{ color: 'var(--text-primary)' }}>0.02</strong> serão usados. A partir da versão 1.26.0, tanto color quanto illuminance podem ser especificados usando keyframes.
            </p>
          </InfoCard>

          <div style={{ height: '32px' }} />

          {/* Sky */}
          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></svg>}
            title="Céu"
            variant="green"
          >
            <p style={{ marginBottom: '16px' }}>
              O objeto <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>sky</code> controla algumas propriedades do céu em termos de sua contribuição como fonte de luz. O céu contribui significativamente para a iluminação indireta, tanto difusa (luz refletida do céu) quanto especular (reflexos do céu e nuvens).
            </p>
            <p>
              O valor de <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '13px' }}>intensity</code> é um fator de <strong style={{ color: 'var(--text-primary)' }}>0.1 a 1.0</strong> que controla o quanto a luz do céu é considerada no termo indireto. Um valor de 1.0 faz o céu contribuir mais para a luz indireta, resultando em sombras menos escuras. O valor padrão, se não fornecido, é 1.0.
            </p>
          </InfoCard>

          <div style={{ height: '48px' }} />

          {/* lighting/global.json example */}
          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(22,163,74,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red-glow)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Exemplo: lighting/global.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={lightingGlobalJson} filename="lighting/global.json" language="json" />
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== POINT LIGHTS ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="point-lights"
            badge="Seção 02"
            title="Luzes Pontuais"
            subtitle="Luzes pontuais aos seus blocos personalizados. Se incluir uma entrada para esse bloco no arquivo local_lighting/local_lighting.json do seu pacote."
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>}
          />

          {/* Static vs Point Lights Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <InfoCard
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>}
              title="Luzes Estáticas"
              variant="red"
            >
              <p>
                Uma luz estática faz parte de um sistema de iluminação mais simples que é incorporado à cena. Essas luzes não fornecem destaques especulares nem sombras dinâmicas e são fixas no espaço e no brilho. Todos os blocos emissores de luz que você conhece, como tochas, glowstone e lanternas, já usam iluminação estática.
              </p>
              <p style={{ marginTop: '12px' }}>
                Para alterar o alcance de uma luz estática, consulte a documentação dos componentes de bloco de emissão de luz. Para melhor desempenho, reutilize as mesmas cores em vários blocos sempre que possível.
              </p>
            </InfoCard>

            <InfoCard
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="11" /></svg>}
              title="Luzes Pontuais"
              variant="green"
            >
              <p>
                Uma luz pontual emite luz de um ponto singular no espaço no centro do bloco. Como as luzes direcionais, elas produzem efeitos de iluminação sofisticados, como destaques difusos e especulares e sombras dinâmicas. Essa modelagem funciona bem para blocos como tochas.
              </p>
              <p style={{ marginTop: '12px' }}>
                As luzes pontuais são uma técnica de iluminação "aditiva". Quando ativadas, elas não interrompem os visuais ou a iluminação fornecida pelos dados de textura Emissive. As luzes pontuais são consideravelmente mais pesadas em recursos do que a luz produzida por outros meios.
              </p>
            </InfoCard>
          </div>

          {/* Default Point Lights Table */}
          <ScrollReveal direction="up">
            <div style={{
              marginBottom: '24px',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(22,163,74,0.08), rgba(220,38,38,0.08))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Por padrão, o jogo tratará os seguintes blocos como luzes pontuais. <strong style={{ color: 'var(--red-glow)' }}>Essa funcionalidade não pode ser alterada.</strong> No entanto, você pode substituir a cor padrão deles ou aplicar luzes pontuais aos seus blocos personalizados, se incluir uma entrada para esse bloco no seu arquivo <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>local_lighting/local_lighting.json</code>.
              </p>
            </div>
          </ScrollReveal>

          <LightTable />

          <div style={{ height: '32px' }} />

          <ScrollReveal direction="up">
            <div style={{
              padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(22,163,74,0.08))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '32px'
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '12px' }}>
                Para alterar a intensidade de uma luz pontual, consulte a documentação dos componentes de bloco de emissão de luz. Observe que esse valor de emissão de luz é um conceito separado do valor <strong style={{ color: 'var(--text-primary)' }}>"Emissivo"</strong> descrito na documentação de PBR ou Conjunto de Texturas.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                O valor de <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>light_color</code> pode ser expresso como uma matriz de três valores numéricos RGB no intervalo de 0 a 255, ou como uma sequência hexadecimal RGB de seis dígitos.
              </p>
            </div>
          </ScrollReveal>

          {/* local_lighting/local_lighting.json example */}
          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(220,38,38,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-glow)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Exemplo: local_lighting/local_lighting.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={localLightingJson} filename="local_lighting/local_lighting.json" language="json" delay={0.1} />

          <div style={{ height: '32px' }} />

          {/* Deprecated point_lights */}
          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(22,163,74,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red-glow)" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>
                <span style={{ color: 'var(--red-glow)' }}>[OBSOLETO]</span> point_lights/global.json
              </span>
            </div>
          </ScrollReveal>
          <CodeBlock code={pointLightsDeprecatedJson} filename="point_lights/global.json [DEPRECATED]" language="json" delay={0.1} />
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== PBR ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="pbr"
            badge="Seção 03"
            title="PBR Uniformes"
            subtitle='O objeto "pbr" complementa a funcionalidade mais ampla do Conjunto de Texturas, atuando como um valor padrão ou de fallback quando os detalhes do conjunto de texturas não são fornecidos para determinados blocos, entidades, partículas ou itens.'
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-1.2 0-2.4.6-3.2 1.5C7.2 5.8 6.5 7.4 6.5 9c0 2.5 2 4.5 4.5 5.5V17h2v-2.5c2.5-1 4.5-3 4.5-5.5 0-1.6-.7-3.2-2.3-4.5C14.4 3.6 13.2 3 12 3z" /></svg>}
          />

          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>}
            title="Valores de Fallback PBR"
            variant="red"
          >
            <p style={{ marginBottom: '16px' }}>
              Por exemplo, se você fornecer conjuntos de texturas para porcos e creepers, mas nenhuma outra entidade, quando uma vaca for renderizada no jogo, o valor <code style={{ color: 'var(--red-glow)', background: 'rgba(220,38,38,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>global_metalness_emissive_roughness_subsurface</code> definido em <strong style={{ color: 'var(--text-primary)' }}>pbr/global.json</strong> será aplicado uniformemente em toda a superfície da vaca.
            </p>
            <p>
              Isso permite que você forneça rapidamente uma direção de arte geral sem precisar criar texturas para cada objeto do jogo inicialmente e adicione detalhes aos blocos/entidades iterativamente, conforme achar necessário. Os valores podem ser expressos como uma matriz de três valores numéricos no intervalo de 0 a 255 ou como uma sequência hexadecimal de seis dígitos.
            </p>
          </InfoCard>

          <div style={{ height: '48px' }} />

          {/* pbr/global.json example */}
          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(22,163,74,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red-glow)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Exemplo: pbr/global.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={pbrGlobalJson} filename="pbr/global.json" language="json" />
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== REFLECTIONS ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="reflections"
            badge="Seção 04"
            title="Reflexões"
            subtitle="O Vibrant Visuals calcula reflexos usando iluminação baseada em imagem (IBL) e reflexos em espaço de tela (SSR)."
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
          />

          <InfoCard
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>}
            title="Reflexões IBL e SSR"
            variant="green"
          >
            <p style={{ marginBottom: '16px' }}>
              A maioria das superfícies será capaz de transmitir reflexos convincentes, seja no subsolo, na superfície ou até mesmo no Nether. Certos cenários, como refletir objetos fora da tela ou espelhos em primeira pessoa, ainda não são possíveis.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Além disso, com exceção da água, geometrias transparentes como o <strong style={{ color: 'var(--text-primary)' }}>vidro não receberão SSR</strong>.
            </p>
            <p>
              Embora não seja possível controlar diretamente as propriedades de reflexão, você pode usar os parâmetros de <strong style={{ color: 'var(--text-primary)' }}>rugosidade</strong> e <strong style={{ color: 'var(--text-primary)' }}>metalicidade</strong> nos conjuntos de texturas para controlar como diferentes materiais geram reflexos. Os valores PBR padrão para blocos, atores, partículas e itens definidos em <code style={{ color: 'var(--green-glow)', background: 'rgba(22,163,74,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>pbr/global.json</code> também afetarão essa propriedade para objetos sem textura definida.
            </p>
          </InfoCard>
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== JSON SCHEMAS ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="schemas"
            badge="Seção 05"
            title="Schemas JSON de Iluminação"
            subtitle="Referência completa dos schemas JSON usados para configurar a iluminação no Vibrant Visuals."
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>}
          />

          {/* Schema Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <SchemaCard
              title="lighting/global.json"
              filePath="lighting/global.json"
              delay={0}
              versions={[
                { version: '1.26.0', updates: 'Adicionado suporte para quadros-chave nas configurações de céu e ambiente.' },
                { version: '1.21.80', updates: 'Adicionada compatibilidade para controlar o flash da luz de fim de curso.' },
                { version: '1.21.70', updates: 'Adicionado um novo objeto para controlar a intensidade do céu.' },
                { version: '1.21.60', updates: 'Alteramos o tipo de dados para os núcleos do sol e da lua de RGBA para RGB.' },
                { version: '1.21.40', updates: 'N/D' },
              ]}
            />
            <SchemaCard
              title="local_lighting/local_lighting.json"
              filePath="local_lighting/local_lighting.json"
              delay={0.15}
              versions={[
                { version: '1.21.120', updates: 'Renomeado point_lights/global.json para local_lighting/local_lighting.json. Adicionado suporte para light_type.' },
                { version: '1.21.40', updates: 'N/D' },
              ]}
            />
            <SchemaCard
              title="pbr/global.json"
              filePath="pbr/global.json"
              delay={0.3}
              versions={[
                { version: '1.21.40', updates: 'Schema inicial para configurações de fallback PBR.' },
              ]}
            />
          </div>

          {/* Schema Code Blocks */}
          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(22,163,74,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-glow)" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Schema: lighting/global.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={lightingSchemaJson} filename="lighting/global.json — Schema" language="json-schema" />

          <div style={{ height: '32px' }} />

          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(220,38,38,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red-glow)" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Schema: local_lighting/local_lighting.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={localLightingSchemaJson} filename="local_lighting/local_lighting.json — Schema" language="json-schema" delay={0.1} />

          <div style={{ height: '32px' }} />

          <ScrollReveal direction="up">
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(22,163,74,0.06))',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-glow)" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span style={{ fontWeight: '700', fontSize: '15px' }}>Schema: pbr/global.json</span>
            </div>
          </ScrollReveal>
          <CodeBlock code={pbrSchemaJson} filename="pbr/global.json — Schema" language="json-schema" delay={0.1} />
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== TUTORIAL ==================== */}
        <section style={{ padding: '80px 0' }}>
          <SectionHeader
            id="tutorial"
            badge="Tutorial"
            title="Como Criar Texturas PBR"
            subtitle="Aprenda como criar texturas PBR para visuais vibrantes no Minecraft usando o Blockbench! Assista ao tutorial completo no vídeo abaixo."
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>}
          />

          <div style={{ maxWidth: '800px' }}>
            <VideoPlayer
              videoId="IcZB4eXImIY"
              title="Como criar texturas PBR para visuais vibrantes no Minecraft usando o Blockbench!"
              description="Tutorial completo mostrando como criar texturas PBR de alta qualidade para o Vibrant Visuals do Minecraft Bedrock Edition usando o Blockbench. Aprenda a configurar normal maps, roughness maps e muito mais."
              delay={0.1}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider" />

        {/* ==================== FOOTER ==================== */}
        <footer style={{ padding: '60px 0 80px', textAlign: 'center' }}>
          <ScrollReveal direction="up">
            <div style={{
              padding: '48px 32px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(22,163,74,0.08))',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--red-primary), var(--green-primary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '24px',
                fontWeight: '800',
                color: 'white',
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.3), 0 0 60px rgba(22, 163, 74, 0.2)'
              }}>
                V
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '800',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, var(--red-glow), var(--green-glow))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Vibrant Visuals Guide
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '500px', margin: '0 auto 24px', lineHeight: '1.7' }}>
                Guia completo para desenvolvedores Minecraft Bedrock que desejam criar iluminação vibrante e cinematográfica usando o sistema Vibrant Visuals.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.a
                  href="https://learn.microsoft.com/en-us/minecraft/creator/documents/vibrantvisuals/lightingcustomization?view=minecraft-bedrock-stable&hl=pt-BR"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, var(--red-primary), var(--red-dark))',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Documentação Microsoft
                </motion.a>
                <motion.a
                  href="https://youtu.be/IcZB4eXImIY?si=oJQ-5k6Tx71z86FX"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, var(--green-primary), var(--green-dark))',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Tutorial YouTube
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade" delay={0.2}>
            <p style={{ marginTop: '32px', fontSize: '12px', color: 'var(--text-muted)' }}>
              Criado para a comunidade de desenvolvedores Minecraft Bedrock • Vibrant Visuals
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}
