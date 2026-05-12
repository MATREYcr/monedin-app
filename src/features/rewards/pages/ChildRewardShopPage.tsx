import { useState } from 'react'
import { CheckCircle2, Coins, Gift, ShoppingBag, Star } from 'lucide-react'
import { useRewards } from '../hooks/useRewards'
import { useRedeemReward } from '../hooks/useRewardMutations'
import { useChildMe } from '@/features/children/hooks/useChildMe'
import type { Reward } from '../types'

const D = "'Fredoka One', cursive"
const B = "'Nunito', sans-serif"

const TEAL      = '#0BC5EA'
const TEAL_DARK = '#0894b0'
const GREEN     = '#48BB78'
const GREEN_DARK= '#2F855A'
const GOLD      = '#FFD700'
const GOLD_DARK = '#CC9900'
const ORANGE    = '#FF8C00'
const ORANGE_DK = '#CC5500'
const TEXT      = '#1a202c'
const TEXT_SEC  = '#4a5568'
const GRAD      = 'linear-gradient(135deg, #0BC5EA 0%, #48BB78 100%)'

const CARD_COLORS = [TEAL, GREEN, ORANGE, '#9B59B6', '#E91E8C', GOLD]
const CARD_DARKS  = [TEAL_DARK, GREEN_DARK, ORANGE_DK, '#7D3C98', '#C2185B', GOLD_DARK]

function RewardCard({
  reward,
  coins,
  balance,
  index,
}: {
  reward: Reward
  coins: number
  balance: number
  index: number
}) {
  const { mutate: redeem, isPending } = useRedeemReward()
  const [redeemed, setRedeemed] = useState(false)
  const canAfford = balance >= coins
  const color = CARD_COLORS[index % CARD_COLORS.length]
  const dark  = CARD_DARKS[index % CARD_DARKS.length]

  function handleRedeem() {
    redeem(reward.id, {
      onSuccess: () => setRedeemed(true),
    })
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      borderTop: `5px solid ${color}`,
      padding: '20px 20px 18px',
      boxShadow: '0 4px 20px rgba(11,197,234,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      {reward.image ? (
        <div style={{ position: 'relative', width: '100%', height: 140, borderRadius: 16, overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={reward.image}
            alt={reward.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {redeemed && (
            <div style={{
              position: 'absolute', inset: 0,
              background: `${GREEN}cc`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircle2 size={40} color="#fff" strokeWidth={2.5} />
            </div>
          )}
        </div>
      ) : (
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: `${color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {redeemed
            ? <CheckCircle2 size={28} color={color} strokeWidth={2} />
            : <Gift size={28} color={color} strokeWidth={2} />
          }
        </div>
      )}

      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: D, fontSize: 17, color: TEXT, lineHeight: 1.2 }}>{reward.title}</div>
        {reward.description && (
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 12, color: TEXT_SEC, marginTop: 4 }}>
            {reward.description}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: D,
          fontSize: 16,
          background: `linear-gradient(145deg, #FFE066, ${GOLD})`,
          color: TEXT,
          padding: '5px 14px',
          borderRadius: 9999,
          boxShadow: `0 3px 0 ${GOLD_DARK}`,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
        }}>
          {coins} <Coins size={13} color="#7A5A00" />
        </span>

        <button
          disabled={!canAfford || isPending || redeemed}
          onClick={handleRedeem}
          style={{
            fontFamily: D,
            fontSize: 14,
            padding: '8px 18px',
            borderRadius: 9999,
            border: 'none',
            background: redeemed
              ? GREEN
              : canAfford
                ? `linear-gradient(135deg, ${color}, ${dark})`
                : '#e2e8f0',
            color: redeemed ? '#fff' : canAfford ? '#fff' : TEXT_SEC,
            cursor: canAfford && !redeemed ? 'pointer' : 'not-allowed',
            boxShadow: canAfford && !redeemed ? `0 4px 0 ${dark}` : 'none',
            transition: '0.15s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {redeemed ? (
            <><CheckCircle2 size={14} /> Solicitado</>
          ) : !canAfford ? (
            'Sin monedas'
          ) : (
            <><ShoppingBag size={14} /> Canjear</>
          )}
        </button>
      </div>
    </div>
  )
}

export function ChildRewardShopPage() {
  const { data: profile } = useChildMe()
  const { data: rewards = [] } = useRewards()

  const myRewards = rewards
    .filter((r) => r.isActive && r.assignments.some((a) => a.childId === profile?.id))

  const balance = profile?.coins ?? 0

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
          <Gift size={26} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontFamily: D, fontSize: 32, color: TEXT, lineHeight: 1.1 }}>Tienda</div>
          <div style={{ fontFamily: B, fontSize: 14, color: TEXT_SEC, fontWeight: 700 }}>
            {myRewards.length} {myRewards.length === 1 ? 'premio disponible' : 'premios disponibles'}
          </div>
        </div>

        <div style={{ marginLeft: 'auto' }}>
          <div className="animate-child-pulse" style={{
            background: 'linear-gradient(145deg, #FFE066, #FFD700)',
            borderRadius: 16,
            padding: '10px 20px',
            boxShadow: `0 4px 0 ${GOLD_DARK}`,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Coins size={18} color="#7A5A00" />
            <span style={{ fontFamily: D, fontSize: 22, color: TEXT }}>{balance}</span>
            <span style={{ fontFamily: B, fontSize: 12, color: '#7A5A00', fontWeight: 700 }}>monedas</span>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div style={{
        background: `${TEAL}15`,
        border: `1.5px solid ${TEAL}44`,
        borderRadius: 16,
        padding: '12px 18px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <Star size={18} color={TEAL} />
        <span style={{ fontFamily: B, fontWeight: 700, fontSize: 13, color: TEAL_DARK }}>
          Cuando canjees un premio, tu papá o mamá lo aprobará y se descontarán tus monedas.
        </span>
      </div>

      {/* Grid */}
      {myRewards.length === 0 ? (
        <div style={{
          background: '#fff',
          borderRadius: 24,
          padding: '60px 20px',
          boxShadow: '0 4px 20px rgba(11,197,234,0.1)',
          textAlign: 'center',
        }}>
          <Gift size={48} color={`${TEAL}88`} strokeWidth={1.5} style={{ margin: '0 auto 16px' }} />
          <div style={{ fontFamily: D, fontSize: 20, color: TEXT_SEC }}>Aún no hay premios disponibles</div>
          <div style={{ fontFamily: B, fontWeight: 600, fontSize: 14, color: TEXT_SEC, marginTop: 6 }}>
            ¡Sigue completando tareas y acumulando monedas!
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {myRewards.map((reward, i) => {
            const assignment = reward.assignments.find((a) => a.childId === profile?.id)
            return (
              <RewardCard
                key={reward.id}
                reward={reward}
                coins={assignment?.coins ?? 0}
                balance={balance}
                index={i}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
