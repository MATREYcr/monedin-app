import { useUIStore } from '@/store/ui.store'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RewardList } from '../components/RewardList'
import { RedemptionList } from '../components/RedemptionList'
import { CreateRewardDialog } from '../components/CreateRewardDialog'
import { EditRewardDialog } from '../components/EditRewardDialog'

export function RewardsPage() {
  const openCreateReward = useUIStore((s) => s.openCreateReward)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="rewards">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="redemptions">Solicitudes</TabsTrigger>
          </TabsList>
          <TabsContent value="rewards" className="mt-0">
            <Button size="lg" className="btn-brand" onClick={openCreateReward}>
              + Nueva recompensa
            </Button>
          </TabsContent>
        </div>

        <TabsContent value="rewards" className="mt-6">
          <RewardList />
        </TabsContent>

        <TabsContent value="redemptions" className="mt-6">
          <RedemptionList />
        </TabsContent>
      </Tabs>

      <CreateRewardDialog />
      <EditRewardDialog />
    </div>
  )
}
