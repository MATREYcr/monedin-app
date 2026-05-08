import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BookOpen, ClipboardList, Coins, Gift, Hand, Trophy } from 'lucide-react'
import { useChildMe } from '../hooks/useChildMe'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import type { TaskStatus } from '@/features/tasks/types'

const D = "'Fredoka One', cursive"
const B = "'Nunito', sans-serif"

const TEAL       = '#0BC5EA'
const TEAL_DARK  = '#0894b0'
const GREEN      = '#48BB78'
const GREEN_DARK = '#2F855A'
const GREEN_LT   = '#C6F6D5'
const GOLD       = '#FFD700'
const GOLD_DARK  = '#CC9900'
const ORANGE     = '#FF8C00'
const ORANGE_DK  = '#CC5500'
const GRAD       = 'linear-gradient(135deg, #0BC5EA 0%, #48BB78 100%)'
const TEXT       = '#1a202c'
const TEXT_SEC   = '#4a5568'

const TASK_BG: Record<TaskStatus, string> = {
  PENDING:   '#e8faf8',
  COMPLETED: GREEN_LT,
  APPROVED:  GREEN_LT,
  REJECTED:  '#ffe5e5',
}
const TASK_BORDER: Record<TaskStatus, string> = {
  PENDING:   ORANGE,
  COMPLETED: GREEN,
  APPROVED:  GREEN,
  REJECTED:  '#FF5252',
}

const QUICK = [
  { label: 'Mis Tareas', Icon: ClipboardList, bg: ORANGE,  shadow: ORANGE_DK, dark: false },
  { label: 'Premios',    Icon: Gift,          bg: TEAL,    shadow: TEAL_DARK, dark: false },
  { label: 'Retos',      Icon: Trophy,        bg: GREEN,   shadow: GREEN_DARK, dark: false, disabled: true },
  { label: 'Aprender',   Icon: BookOpen,      bg: GOLD,    shadow: GOLD_DARK,  dark: true,  disabled: true },
]

function CoinMascot() {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFF176, #FFD700 52%, #CC9900)',
        boxShadow: '0 5.76px 0 #B8860B, 0 7.2px 18px rgba(255,215,0,0.4), inset 0 -3.6px 7.2px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative' as const,
        marginBottom: 10,
      }}
    >
      <Coins size={30} color="#CC9900" strokeWidth={2.5} />
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '28%',
          height: '14%',
          background: 'rgba(255,255,255,0.45)',
          borderRadius: '50%',
          transform: 'rotate(-30deg)',
        }}
      />
    </div>
  )
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const raf = useRef<number | null>(null)
  useEffect(() => {
    if (target === 0) { setCount(0); return }
    let start: number | null = null
    function step(ts: number) {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => { if (raf.current) cancelAnimationFrame(raf.current) }
  }, [target, duration])
  return count
}

function QuickCard({ label, Icon, bg, shadow, dark = false, disabled = false }: typeof QUICK[number]) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: bg,
        border: 'none',
        borderRadius: 16,
        padding: '14px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: pressed ? `0 2px 0 ${shadow}` : `0 5px 0 ${shadow}`,
        transform: pressed ? 'scale(0.95) translateY(3px)' : 'scale(1)',
        transition: '0.12s cubic-bezier(0.34,1.56,0.64,1)',
        opacity: disabled ? 0.75 : 1,
      }}
    >
      <Icon size={28} color={dark ? TEXT : '#fff'} strokeWidth={2} />
      <span style={{ fontFamily: D, fontSize: 13, color: dark ? TEXT : '#fff' }}>{label}</span>
    </button>
  )
}

export function ChildHomePage() {
  const { data: profile } = useChildMe()
  const { data: tasks = [] } = useTasks()

  const coins     = useCountUp(profile?.coins ?? 0)
  const pending   = tasks.filter((t) => t.status === 'PENDING').length
  const recent    = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  if (!profile) return null

  return (
    <div className="animate-fadeIn" style={{ padding: '28px 0 40px' }}>

      {/* Row 1: Greeting + Coin card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, marginBottom: 24, alignItems: 'stretch' }}>

        {/* Greeting */}
        <div style={{ background: '#fff', borderRadius: 28, padding: '26px 28px', boxShadow: '0 4px 20px rgba(11,197,234,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Hand size={28} color={TEAL} strokeWidth={2} />
              <span style={{ fontFamily: D, fontSize: 34, color: TEXT, lineHeight: 1.1 }}>
                ¡Hola, {profile.user.name}!
              </span>
            </div>
            <div style={{ fontFamily: B, fontSize: 15, color: TEXT_SEC, fontWeight: 700, marginTop: 6 }}>
              {pending > 0 ? (
                <>Tienes <span style={{ color: ORANGE, fontWeight: 900 }}>{pending} {pending === 1 ? 'tarea' : 'tareas'}</span> pendientes para hoy</>
              ) : (
                'No tienes tareas pendientes por ahora'
              )}
            </div>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
            <button
              style={{
                fontFamily: D, fontSize: 15,
                background: GRAD, color: '#fff',
                padding: '11px 22px', borderRadius: 9999, border: 'none',
                boxShadow: `0 6px 0 ${TEAL_DARK}, 0 8px 24px rgba(11,197,234,.35)`,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              <ClipboardList size={16} />
              Ver tareas
            </button>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: D, fontSize: 15,
                background: 'rgb(240,255,254)', color: TEAL_DARK,
                padding: '11px 22px', borderRadius: 9999,
                border: `1.5px solid ${TEAL}`,
                boxShadow: `0 6px 0 ${TEAL_DARK}, 0 8px 20px ${TEAL_DARK}55`,
                cursor: 'pointer',
              }}
            >
              <Gift size={16} />
              Tienda
            </button>
          </div>
        </div>

        {/* Coin card */}
        <div
          style={{
            background: 'linear-gradient(145deg, #FFE066, #FFD700)',
            borderRadius: 28,
            padding: '26px 32px',
            boxShadow: `0 8px 0 ${GOLD_DARK}, 0 12px 32px rgba(255,215,0,0.3)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 200,
            textAlign: 'center',
          }}
        >
          <CoinMascot />
          <div className="animate-child-pulse" style={{ fontFamily: D, fontSize: 56, color: TEXT, lineHeight: 1 }}>
            {coins}
          </div>
          <div style={{ fontFamily: B, fontSize: 14, color: '#7A5A00', fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
            mis monedas <Coins size={14} color="#7A5A00" />
          </div>
        </div>
      </div>

      {/* Row 2: Reto Activo + ¿Qué hacemos hoy? */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Reto Activo */}
        <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 20px rgba(11,197,234,0.1)', borderTop: `5px solid ${TEAL}`, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Trophy size={22} color={TEAL} strokeWidth={2} />
            <span style={{ fontFamily: D, fontSize: 18, color: TEXT }}>Reto Activo</span>
            <span style={{
              fontFamily: D, fontSize: 13,
              background: TEAL, color: '#fff',
              padding: '4px 12px', borderRadius: 9999,
              boxShadow: `0 3px 0 ${TEAL_DARK}`,
            }}>0/100</span>
          </div>
          <div style={{ fontFamily: B, fontSize: 14, fontWeight: 700, color: TEXT_SEC, marginBottom: 10 }}>
            Los retos llegan pronto
          </div>
          <div style={{ height: 13, background: `${TEAL}33`, borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '0%', background: TEAL, borderRadius: 9999, transition: 'width 1s ease-out' }} />
          </div>
        </div>

        {/* ¿Qué hacemos hoy? */}
        <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 20px rgba(11,197,234,0.1)', borderTop: `5px solid ${GREEN}`, padding: 20 }}>
          <div style={{ fontFamily: D, fontSize: 18, color: TEXT, marginBottom: 14 }}>¿Qué hacemos hoy?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {QUICK.map((q) => <QuickCard key={q.label} {...q} />)}
          </div>
        </div>
      </div>

      {/* Row 3: Tasks */}
      <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 20px rgba(11,197,234,0.1)', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <ClipboardList size={20} color={TEAL} strokeWidth={2} />
          <span style={{ fontFamily: D, fontSize: 19, color: TEXT }}>Tareas de hoy</span>
        </div>

        {recent.length === 0 ? (
          <p style={{ fontFamily: B, fontWeight: 700, fontSize: 14, color: TEXT_SEC, textAlign: 'center', padding: '20px 0' }}>
            No hay tareas todavía
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recent.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  background: TASK_BG[task.status],
                  borderRadius: 16,
                  borderLeft: `4px solid ${TASK_BORDER[task.status]}`,
                  textDecoration: task.status === 'COMPLETED' || task.status === 'APPROVED' ? 'line-through' : 'none',
                  opacity: task.status === 'COMPLETED' || task.status === 'APPROVED' ? 0.7 : 1,
                }}
              >
                <span style={{ fontFamily: B, fontWeight: 700, fontSize: 18, color: TEXT, flex: 1 }}>{task.title}</span>
                <span style={{
                  fontFamily: D, fontSize: 13,
                  background: GOLD, color: TEXT,
                  padding: '4px 12px', borderRadius: 9999,
                  boxShadow: `0 3px 0 ${GOLD_DARK}`,
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  whiteSpace: 'nowrap',
                }}>
                  +{task.coins} <Coins size={12} color="#7A5A00" />
                </span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button
            style={{
              fontFamily: D, fontSize: 17,
              background: GRAD, color: '#fff',
              padding: '13px 28px', borderRadius: 9999, border: 'none',
              boxShadow: `0 6px 0 ${TEAL_DARK}, 0 8px 24px rgba(11,197,234,.35)`,
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            Ver todas <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
