"use client"

import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { LostFoundScreen } from "@/components/screens/lost-found-screen"
import { LaundryScreen } from "@/components/screens/laundry-screen"
import { EmergencyScreen } from "@/components/screens/emergency-screen"
import { RewardsScreen } from "@/components/screens/rewards-screen"
import { MaintenanceScreen } from "@/components/screens/maintenance-screen"
import { MessMenuScreen } from "@/components/screens/mess-menu-screen"
import type { ReactNode } from "react"

export type AppScreen = "onboarding" | "dashboard" | "lostfound" | "laundry" | "emergency" | "rewards" | "maintenance" | "messmenu"

export default function HostelHelp() {
  const noop = () => {}

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Hostel Help Panel Flow</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            All product panels are shown on one desktop page in flow order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          <FlowPanel title="1. Onboarding">
            <OnboardingScreen onComplete={noop} />
          </FlowPanel>

          <FlowPanel title="2. Dashboard">
            <DashboardScreen onNavigate={noop} />
          </FlowPanel>

          <FlowPanel title="3. Lost & Found">
            <LostFoundScreen onBack={noop} onSubmit={noop} />
          </FlowPanel>

          <FlowPanel title="4. Laundry">
            <LaundryScreen onBack={noop} onBook={noop} />
          </FlowPanel>

          <FlowPanel title="5. Emergency">
            <EmergencyScreen onBack={noop} />
          </FlowPanel>

          <FlowPanel title="6. Rewards">
            <RewardsScreen
              points={50}
              action="Laundry Slot Booked"
              onDashboard={noop}
              onContinue={noop}
            />
          </FlowPanel>

          <FlowPanel title="7. Maintenance">
            <MaintenanceScreen onBack={noop} onSubmit={noop} />
          </FlowPanel>

          <FlowPanel title="8. Mess Menu">
            <MessMenuScreen onBack={noop} onSubmitFeedback={noop} />
          </FlowPanel>
        </div>
      </div>
    </div>
  )
}

function FlowPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[390px] rounded-3xl border border-border bg-card p-3 shadow-sm">
      <div className="mb-4 rounded-2xl bg-secondary px-4 py-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-foreground">{title}</h2>
      </div>
      <div className="rounded-2xl border border-border bg-background p-2">
        {children}
      </div>
    </section>
  )
}
