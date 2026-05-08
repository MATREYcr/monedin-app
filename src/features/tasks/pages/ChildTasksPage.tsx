import { useState } from 'react'
import { CheckCircle2, Circle, ClipboardList, Coins, XCircle } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { useCompleteTask } from '../hooks/useTaskMutations'
import type { Task, TaskStatus } from '../types'

const D = "'Fredoka One', cursive"
const B = "'Nunito', sans-serif"

const TEAL      = '#0BC5EA'
const TEAL_DARK = '#0894b0'
const GREEN     = '#48BB78'
const GREEN_LT  = '#C6F6D5'
const GOLD      = '#FFD700'
const GOLD_DARK = '#CC9900'
const ORANGE    = '#FF8C00'
const ORANGE_DK = '#CC5500'
const RED       = '#FF5252'
const TEXT      = '#1a202c'
const TEXT_SEC  = '#4a5568'
const GRAD      = 'linear-gradient(135deg, #0BC5EA 0%, #48BB78 100%)'

const STATUS_BG: Record<TaskStatus, string> = {
  PENDING:   '#e8faf8',
  COMPLETED: GREEN_LT,
  APPROVED:  GREEN_LT,
  REJECTED:  '#ffe5e5',
}
const STATUS_BORDER: Record<TaskStatus, string> = {
  PENDING:   ORANGE,
  COMPLETED: GREEN,
  APPROVED:  GREEN,
  REJECTED:  RED,
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const label: Record<TaskStatus, string> = {
    PENDING:   'Pendiente',
    COMPLETED: 'Completada',
    APPROVED:  'Aprobada',
    REJECTED:  'Rechazada',
  }
  const colors: Record<TaskStatus, { bg: string; color: string }> = {
    PENDING:   { bg: `${ORANGE}22`, color: ORANGE_DK },
    COMPLETED: { bg: `${GREEN}22`,  color: GREEN },
    APPROVED:  { bg: `${TEAL}22`,   color: TEAL_DARK },
    REJECTED:  { bg: `${RED}22`,    color: RED },
  }
  const c = colors[status]
  return (
    <span style={{
      fontFamily: D,
      fontSize: 11,
      background: c.bg,
      color: c.color,
      padding: '3px 10px',
      borderRadius: 9999,
    }}>
      {label[status]}
    </span>
  )
}

function TaskItem({ task }: { task: Task }) {
  const { mutate: complete, isPending } = useCompleteTask()
  const done = task.status === 'COMPLETED' || task.status === 'APPROVED'
  const canComplete = task.status === 'PENDING'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 16px',
        background: STATUS_BG[task.status],
        borderRadius: 20,
        borderLeft: `4px solid ${STATUS_BORDER[task.status]}`,
        opacity: done ? 0.75 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      <button
        disabled={!canComplete || isPending}
        onClick={() => complete(task.id)}
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `2.5px solid ${done ? GREEN : GOLD}`,
          background: done ? GREEN : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canComplete ? 'pointer' : 'default',
          flexShrink: 0,
          transition: '0.15s',
        }}
      >
        {done
          ? <CheckCircle2 size={18} color="#fff" strokeWidth={2.5} />
          : task.status === 'REJECTED'
            ? <XCircle size={18} color={RED} strokeWidth={2.5} />
            : <Circle size={18} color={GOLD_DARK} strokeWidth={2} />
        }
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: B,
          fontWeight: 700,
          fontSize: 16,
          color: TEXT,
          textDecoration: done ? 'line-through' : 'none',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {task.title}
        </div>
        {task.description && (
          <div style={{ fontFamily: B, fontSize: 13, color: TEXT_SEC, marginTop: 2 }}>
            {task.description}
          </div>
        )}
        {task.dueDate && (
          <div style={{ fontFamily: B, fontSize: 12, color: TEXT_SEC, marginTop: 3 }}>
            Vence: {new Date(task.dueDate).toLocaleDateString('es', { day: 'numeric', month: 'long' })}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <span style={{
          fontFamily: D,
          fontSize: 14,
          background: GOLD,
          color: TEXT,
          padding: '4px 12px',
          borderRadius: 9999,
          boxShadow: `0 3px 0 ${GOLD_DARK}`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          whiteSpace: 'nowrap',
        }}>
          +{task.coins} <Coins size={12} color="#7A5A00" />
        </span>
        <StatusBadge status={task.status} />
      </div>
    </div>
  )
}

export function ChildTasksPage() {
  const { data: tasks = [] } = useTasks()
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all')

  const pending   = tasks.filter((t) => t.status === 'PENDING' || t.status === 'REJECTED')
  const done      = tasks.filter((t) => t.status === 'COMPLETED' || t.status === 'APPROVED')
  const totalCoins = done.reduce((acc, t) => acc + t.coins, 0)

  const sorted = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const filtered =
    filter === 'pending' ? sorted.filter((t) => t.status === 'PENDING' || t.status === 'REJECTED') :
    filter === 'done'    ? sorted.filter((t) => t.status === 'COMPLETED' || t.status === 'APPROVED') :
    sorted

  return (
    <div className="animate-fadeIn" style={{ padding: '28px 0 40px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 0 ${TEAL_DARK}`,
          flexShrink: 0,
        }}>
          <ClipboardList size={26} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontFamily: D, fontSize: 32, color: TEXT, lineHeight: 1.1 }}>Mis Tareas</div>
          <div style={{ fontFamily: B, fontSize: 14, color: TEXT_SEC, fontWeight: 700 }}>
            {pending.length} pendientes · {done.length} completadas
          </div>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <div style={{
            background: 'linear-gradient(145deg, #FFE066, #FFD700)',
            borderRadius: 16,
            padding: '10px 20px',
            boxShadow: `0 4px 0 ${GOLD_DARK}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Coins size={18} color="#7A5A00" />
            <span style={{ fontFamily: D, fontSize: 20, color: TEXT }}>{totalCoins}</span>
            <span style={{ fontFamily: B, fontSize: 12, color: '#7A5A00', fontWeight: 700 }}>ganadas</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['all', 'pending', 'done'] as const).map((f) => {
          const labels = { all: 'Todas', pending: 'Pendientes', done: 'Completadas' }
          const active = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: D,
                fontSize: 14,
                padding: '8px 20px',
                borderRadius: 9999,
                border: `2px solid ${active ? TEAL : '#e2e8f0'}`,
                background: active ? TEAL : '#fff',
                color: active ? '#fff' : TEXT_SEC,
                cursor: 'pointer',
                boxShadow: active ? `0 4px 0 ${TEAL_DARK}` : '0 2px 6px rgba(0,0,0,0.06)',
                transition: '0.12s',
              }}
            >
              {labels[f]}
            </button>
          )
        })}
      </div>

      {/* Task list */}
      <div style={{ background: '#fff', borderRadius: 24, padding: 20, boxShadow: '0 4px 20px rgba(11,197,234,0.1)' }}>
        {filtered.length === 0 ? (
          <div style={{ fontFamily: B, fontWeight: 700, fontSize: 15, color: TEXT_SEC, textAlign: 'center', padding: '40px 0' }}>
            No hay tareas aquí todavía
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
