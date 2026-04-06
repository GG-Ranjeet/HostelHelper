"use client"

import { useState, useEffect } from "react"
import { 
  WashingMachine, Wrench, Search, AlertTriangle, History, 
  Bell, ChevronRight, Star, Utensils, Droplets, TrendingUp
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { AppScreen } from "@/app/page"

interface DashboardScreenProps {
  onNavigate: (screen: AppScreen) => void
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const [messRating, setMessRating] = useState(4.2)
  const [activeLaundry, setActiveLaundry] = useState(12)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMessRating(prev => {
        const change = (Math.random() - 0.5) * 0.2
        return Math.max(3.5, Math.min(5, prev + change))
      })
      setActiveLaundry(prev => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(5, Math.min(20, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const services = [
    { icon: WashingMachine, label: "Laundry", color: "bg-primary", screen: "laundry" as AppScreen },
    { icon: Wrench, label: "Maintenance", color: "bg-warning", screen: "dashboard" as AppScreen },
    { icon: Search, label: "Lost & Found", color: "bg-accent", screen: "lostfound" as AppScreen },
    { icon: AlertTriangle, label: "Emergency", color: "bg-emergency", screen: "emergency" as AppScreen, isEmergency: true },
    { icon: History, label: "History", color: "bg-secondary", screen: "dashboard" as AppScreen },
    { icon: Utensils, label: "Mess Menu", color: "bg-success", screen: "dashboard" as AppScreen },
  ]

  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 border-2 border-primary">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">AS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-muted-foreground">Good evening</p>
            <h1 className="font-bold text-foreground">Arjun Singh</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
              <Bell className="w-5 h-5 text-foreground" />
            </button>
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emergency rounded-full flex items-center justify-center">
              <span className="text-[10px] text-emergency-foreground font-bold">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Room Badge */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl px-4 py-2 inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-foreground">Room A-302B</span>
        </div>
      </div>

      {/* Campus Pulse - Hero Card */}
      <div className="px-5 mb-5">
        <div className="glass rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Campus Pulse</span>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Mess Rating */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-warning" />
                </div>
                <span className="text-xs text-muted-foreground">Mess Rating</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">{messRating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">/5</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-[10px] text-success">+0.3 today</span>
              </div>
            </div>

            {/* Active Laundry */}
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Laundry Slots</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">{activeLaundry}</span>
                <span className="text-xs text-muted-foreground">active</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(activeLaundry / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Status */}
          <div className="mt-4 flex items-center justify-between glass rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <WashingMachine className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Your Slot: 4:00 PM</p>
                <p className="text-xs text-muted-foreground">Machine #3 - Ready in 45 min</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-5 mb-5">
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {services.map((service, i) => (
            <button
              key={service.label}
              onClick={() => onNavigate(service.screen)}
              className={`
                relative flex flex-col items-center justify-center p-4 rounded-2xl
                glass transition-all active:scale-95
                ${service.isEmergency ? "emergency-glow" : ""}
                animate-scale-in
              `}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`
                w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-2
                ${service.isEmergency ? "" : "bg-opacity-20"}
              `}>
                <service.icon className={`w-6 h-6 ${service.isEmergency ? "text-emergency-foreground" : "text-foreground"}`} />
              </div>
              <span className="text-xs font-medium text-foreground">{service.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="px-5 pb-6 flex-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Recent Alerts</h2>
          <button className="text-xs text-primary font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {[
            { title: "Water Supply Notice", desc: "Maintenance from 2-4 PM tomorrow", time: "2h ago", type: "info" },
            { title: "Lost: Blue Earbuds", desc: "Found near common room - Claim at office", time: "5h ago", type: "found" },
            { title: "Mess Menu Updated", desc: "Special dinner this weekend", time: "1d ago", type: "food" },
          ].map((alert, i) => (
            <div 
              key={i}
              className="glass rounded-2xl p-4 flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${alert.type === "info" ? "bg-primary/20" : alert.type === "found" ? "bg-success/20" : "bg-warning/20"}
              `}>
                {alert.type === "info" && <Bell className="w-5 h-5 text-primary" />}
                {alert.type === "found" && <Search className="w-5 h-5 text-success" />}
                {alert.type === "food" && <Utensils className="w-5 h-5 text-warning" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{alert.title}</p>
                <p className="text-xs text-muted-foreground truncate">{alert.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
