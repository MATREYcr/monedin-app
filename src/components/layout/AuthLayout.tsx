import { Outlet } from '@tanstack/react-router'
import { Coins, Gem, Shield, Smile, Sparkles, Star } from 'lucide-react'
import { APP_NAME } from '@/constants'

export function AuthLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-linear-to-br from-primary/25 to-brand-green/25">

      {/* Floating background icons */}
      <div className="pointer-events-none select-none">
        <Coins className="absolute top-8 left-[10%] w-16 h-16 text-primary/40 animate-float-slow" />
        <Star className="absolute top-[20%] left-[4%] w-12 h-12 text-yellow-400/50 fill-yellow-400/50 animate-float-fast" style={{ animationDelay: '0.7s' }} />
        <Gem className="absolute top-[48%] left-[16%] w-14 h-14 text-brand-green/40 animate-float-slow" style={{ animationDelay: '1.2s' }} />
        <Sparkles className="absolute bottom-20 left-[6%] w-12 h-12 text-primary/35 animate-float-fast" style={{ animationDelay: '0.4s' }} />
        <Star className="absolute bottom-10 left-[24%] w-10 h-10 text-amber-400/45 fill-amber-400/45 animate-float-slow" style={{ animationDelay: '1.8s' }} />
        <Coins className="absolute top-[30%] left-[28%] w-10 h-10 text-brand-green/30 animate-float-fast" style={{ animationDelay: '2.1s' }} />
        <Gem className="absolute top-12 right-[8%] w-12 h-12 text-primary/30 animate-float-slow" style={{ animationDelay: '0.9s' }} />
        <Star className="absolute top-[55%] right-[5%] w-10 h-10 text-yellow-400/35 fill-yellow-400/35 animate-float-fast" style={{ animationDelay: '1.4s' }} />
        <Sparkles className="absolute bottom-28 right-[10%] w-11 h-11 text-brand-green/30 animate-float-slow" style={{ animationDelay: '0.6s' }} />
        <Coins className="absolute bottom-8 left-[38%] w-12 h-12 text-primary/25 animate-float-fast" style={{ animationDelay: '1.1s' }} />
      </div>

      {/* Left column */}
      <div className="flex flex-1 flex-col px-14 py-10 md:pl-20 md:pr-8">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-auto">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-brand-green">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">{APP_NAME}</span>
        </div>

        {/* Hero content */}
        <div className="flex flex-col justify-center flex-1 max-w-lg space-y-8 py-12 ml-28">
          <div className="space-y-5">
            <h1 className="text-6xl font-black leading-tight text-gray-900">
              El futuro<br />
              <span className="bg-linear-to-r from-primary to-brand-green bg-clip-text text-transparent">financiero</span><br />
              empieza hoy.
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              La plataforma mágica donde los padres guían y los niños descubren el valor del dinero ganando recompensas divertidas.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-3">
              <Shield className="w-6 h-6 text-primary" />
              <p className="text-base font-semibold text-foreground">Para Padres</p>
              <p className="text-sm text-muted-foreground leading-snug">Control total, asignación de tareas y seguimiento del progreso.</p>
            </div>
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-3">
              <Smile className="w-6 h-6 text-primary" />
              <p className="text-base font-semibold text-foreground">Para Niños</p>
              <p className="text-sm text-muted-foreground leading-snug">Misiones divertidas, cofres y catálogo de recompensas.</p>
            </div>
          </div>
        </div>

        <div className="mb-auto" />
      </div>

      {/* Right column — card via Outlet */}
      <div className="flex w-[42%] shrink-0 flex-col items-center justify-center pr-44 pl-0 py-10">
        <div className="w-full bg-card rounded-3xl shadow-xl p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
