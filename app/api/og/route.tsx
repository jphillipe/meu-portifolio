import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(): Promise<Response> {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        color: '#f4f4f5',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.06), transparent 40%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 36,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 30,
            background: '#ffffff',
            color: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          &gt;_
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.05 }}>
            J.Phillipe
          </span>
          <span
            style={{
              marginTop: 14,
              fontSize: 28,
              color: '#a1a1aa',
              lineHeight: 1.2,
            }}
          >
            Full Stack Engineer
          </span>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
