import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { BookOpen, ClipboardList, Coins, Gem, Gift, Home, Sparkles, Star, Trophy } from 'lucide-react'
import { signOut } from '@/lib/auth/client'
import { APP_NAME, ROUTES } from '@/constants'
import { useChildMe } from '@/features/children/hooks/useChildMe'

const DISPLAY = "'Fredoka One', cursive"

const NAV_TABS = [
  { label: 'Inicio',   icon: Home,          to: ROUTES.CHILD_HOME },
  { label: 'Tareas',   icon: ClipboardList, to: ROUTES.CHILD_TASKS },
  { label: 'Tienda',   icon: Gift,          to: ROUTES.CHILD_TIENDA },
  { label: 'Retos',    icon: Trophy,        to: null },
  { label: 'Aprender', icon: BookOpen,      to: null },
]

function CoinMascotNav() {
  return (
    <div
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFF176, #FFD700 52%, #CC9900)',
        boxShadow: '0 3.36px 0 #B8860B, 0 4.2px 10.5px rgba(255,215,0,0.4), inset 0 -2.1px 4.2px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative' as const,
        cursor: 'pointer',
      }}
    >
      <Coins size={18} color="#CC9900" strokeWidth={2.5} />
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

export function ChildLayout() {
  const navigate = useNavigate()
  const { location } = useRouterState()
  const { data: profile } = useChildMe()

  async function handleSignOut() {
    await signOut({ fetchOptions: { onSuccess: () => navigate({ to: ROUTES.SIGN_IN }) } })
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-linear-to-br from-primary/25 to-brand-green/25">

      {/* Floating decorations — same as AuthLayout */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
        <Coins className="absolute top-8 left-[10%] h-16 w-16 text-primary/40 animate-float-slow" />
        <Star className="absolute top-[20%] left-[4%] h-12 w-12 fill-yellow-400/50 text-yellow-400/50 animate-float-fast" style={{ animationDelay: '0.7s' }} />
        <Gem className="absolute top-[48%] left-[16%] h-14 w-14 text-brand-green/40 animate-float-slow" style={{ animationDelay: '1.2s' }} />
        <Sparkles className="absolute bottom-20 left-[6%] h-12 w-12 text-primary/35 animate-float-fast" style={{ animationDelay: '0.4s' }} />
        <Star className="absolute bottom-10 left-[24%] h-10 w-10 fill-amber-400/45 text-amber-400/45 animate-float-slow" style={{ animationDelay: '1.8s' }} />
        <Coins className="absolute top-[30%] left-[28%] h-10 w-10 text-brand-green/30 animate-float-fast" style={{ animationDelay: '2.1s' }} />
        <Gem className="absolute top-12 right-[8%] h-12 w-12 text-primary/30 animate-float-slow" style={{ animationDelay: '0.9s' }} />
        <Star className="absolute top-[55%] right-[5%] h-10 w-10 fill-yellow-400/35 text-yellow-400/35 animate-float-fast" style={{ animationDelay: '1.4s' }} />
        <Sparkles className="absolute right-[10%] bottom-28 h-11 w-11 text-brand-green/30 animate-float-slow" style={{ animationDelay: '0.6s' }} />
        <Coins className="absolute bottom-8 left-[38%] h-12 w-12 text-primary/25 animate-float-fast" style={{ animationDelay: '1.1s' }} />
      </div>

      {/* Nav */}
      <nav
        className="relative z-50"
        style={{
          background: 'linear-gradient(135deg, #0BC5EA 0%, #48BB78 100%)',
          boxShadow: '0 4px 24px rgba(11,197,234,0.35)',
          position: 'sticky',
          top: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 64,
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>M</span>
          </div>
          <span style={{ fontFamily: DISPLAY, fontSize: 22, color: '#fff', letterSpacing: '0.3px' }}>
            {APP_NAME}
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flex: 1, height: 64 }}>
          {NAV_TABS.map(({ label, icon: Icon, to }) => {
            const isActive = to !== null && location.pathname === to
            return (
              <button
                key={label}
                disabled={to === null}
                onClick={() => to && navigate({ to })}
                style={{
                  flex: 1,
                  border: 'none',
                  borderBottom: `4px solid ${isActive ? '#fff' : 'transparent'}`,
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  cursor: to === null ? 'default' : 'pointer',
                  transition: '0.15s',
                  padding: 0,
                }}
              >
                <Icon size={20} color="#fff" strokeWidth={2} style={{ opacity: isActive ? 1 : 0.7 }} />
                <span style={{ fontFamily: DISPLAY, fontSize: 11, color: '#fff', opacity: isActive ? 1 : 0.75 }}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Coin badge */}
        <div style={{ padding: '0 16px', flexShrink: 0 }}>
          <div
            className="animate-child-pulse"
            style={{
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              borderRadius: 9999,
              padding: '8px 18px',
              border: '1.5px solid rgba(255,255,255,0.4)',
              fontFamily: DISPLAY,
              fontSize: 17,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Coins size={18} />
            {profile?.coins ?? '—'}
          </div>
        </div>

        {/* Avatar / sign out */}
        <div style={{ padding: '0 20px 0 8px', flexShrink: 0 }}>
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', padding: 0 }}>
            <CoinMascotNav />
          </button>
        </div>
      </nav>

      {/* Main */}
      <main
        className="relative z-10"
        style={{
          flex: 1,
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          padding: '0 28px 48px',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
