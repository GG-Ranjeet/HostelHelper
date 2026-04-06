"use client"

import { useState } from "react"
import { OnboardingScreen } from "@/components/screens/onboarding-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import { LostFoundScreen } from "@/components/screens/lost-found-screen"
import { LaundryScreen } from "@/components/screens/laundry-screen"
import { EmergencyScreen } from "@/components/screens/emergency-screen"
import { RewardsScreen } from "@/components/screens/rewards-screen"
import { MaintenanceScreen } from "@/components/screens/maintenance-screen"
import { MessMenuScreen } from "@/components/screens/mess-menu-screen"

export type AppScreen = "onboarding" | "dashboard" | "lostfound" | "laundry" | "emergency" | "rewards" | "maintenance" | "messmenu"

export default function HostelHelp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("onboarding")
  const [rewardData, setRewardData] = useState({ points: 0, action: "" })

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen)
  }

  const handleReward = (points: number, action: string) => {
    setRewardData({ points, action })
    setCurrentScreen("rewards")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Mobile Phone Frame */}
      <div className="relative w-full max-w-[390px] h-[844px] bg-background rounded-[3rem] overflow-hidden shadow-2xl border-4 border-secondary">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-4 pb-2">
          <span className="text-xs font-medium text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-1 rounded-full bg-foreground" />
              <div className="w-1 h-1.5 rounded-full bg-foreground" />
              <div className="w-1 h-2 rounded-full bg-foreground" />
              <div className="w-1 h-2.5 rounded-full bg-foreground" />
            </div>
            <svg className="w-4 h-4 text-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div className="w-6 h-3 rounded-sm border border-foreground ml-1 relative">
              <div className="absolute inset-0.5 right-1 bg-primary rounded-sm" />
              <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-foreground rounded-r" />
            </div>
          </div>
        </div>

        {/* Dynamic Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50" />

        {/* Screen Content */}
        <div className="h-full overflow-hidden pt-12 pb-2">
          {currentScreen === "onboarding" && (
            <OnboardingScreen onComplete={() => navigateTo("dashboard")} />
          )}
          {currentScreen === "dashboard" && (
            <DashboardScreen 
              onNavigate={navigateTo}
            />
          )}
          {currentScreen === "lostfound" && (
            <LostFoundScreen 
              onBack={() => navigateTo("dashboard")}
              onSubmit={() => handleReward(30, "Lost Item Reported")}
            />
          )}
          {currentScreen === "laundry" && (
            <LaundryScreen 
              onBack={() => navigateTo("dashboard")}
              onBook={() => handleReward(50, "Laundry Slot Booked")}
            />
          )}
          {currentScreen === "emergency" && (
            <EmergencyScreen 
              onBack={() => navigateTo("dashboard")}
            />
          )}
          {currentScreen === "rewards" && (
            <RewardsScreen 
              points={rewardData.points}
              action={rewardData.action}
              onDashboard={() => navigateTo("dashboard")}
              onContinue={() => navigateTo("dashboard")}
            />
          )}
          {currentScreen === "maintenance" && (
            <MaintenanceScreen 
              onBack={() => navigateTo("dashboard")}
              onSubmit={() => handleReward(25, "Maintenance Request Submitted")}
            />
          )}
          {currentScreen === "messmenu" && (
            <MessMenuScreen 
              onBack={() => navigateTo("dashboard")}
              onSubmitFeedback={() => handleReward(15, "Mess Feedback Submitted")}
            />
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/30 rounded-full" />
      </div>
    </div>
  )
}
