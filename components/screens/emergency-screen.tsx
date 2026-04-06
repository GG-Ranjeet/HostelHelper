"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, Shield, Phone, MapPin, Users, 
  AlertTriangle, Radio, Navigation, Siren
} from "lucide-react"

interface EmergencyScreenProps {
  onBack: () => void
}

export function EmergencyScreen({ onBack }: EmergencyScreenProps) {
  const [isSOSActive, setIsSOSActive] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [sosTriggered, setSOSTriggered] = useState(false)

  useEffect(() => {
    if (isSOSActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isSOSActive && countdown === 0) {
      setSOSTriggered(true)
      setIsSOSActive(false)
    }
  }, [isSOSActive, countdown])

  const cancelSOS = () => {
    setIsSOSActive(false)
    setCountdown(3)
  }

  const nearbyHelpers = [
    { name: "Security Post A", distance: "50m", type: "security" },
    { name: "Warden Office", distance: "120m", type: "warden" },
    { name: "Medical Room", distance: "200m", type: "medical" },
  ]

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden relative">
      {/* Animated Background for Emergency */}
      {(isSOSActive || sosTriggered) && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-emergency/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-4 border-emergency/30 rounded-full animate-ping"
                style={{ 
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: "2s"
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <h1 className="font-bold text-lg text-foreground">Shadow Guard</h1>
            <p className="text-xs text-muted-foreground">Emergency response system</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 relative z-10">
        {!sosTriggered ? (
          <>
            {/* Giant SOS Button */}
            <div className="relative mb-8">
              {isSOSActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full border-4 border-emergency/50 animate-ping" />
                </div>
              )}
              <button
                onMouseDown={() => { setIsSOSActive(true); setCountdown(3); }}
                onMouseUp={cancelSOS}
                onMouseLeave={cancelSOS}
                onTouchStart={() => { setIsSOSActive(true); setCountdown(3); }}
                onTouchEnd={cancelSOS}
                className={`
                  relative w-44 h-44 rounded-full flex flex-col items-center justify-center
                  bg-emergency transition-all
                  ${isSOSActive ? "emergency-glow scale-110" : "hover:scale-105"}
                `}
              >
                <Siren className={`w-16 h-16 text-emergency-foreground mb-2 ${isSOSActive ? "animate-bounce" : ""}`} />
                {isSOSActive ? (
                  <span className="text-4xl font-bold text-emergency-foreground">{countdown}</span>
                ) : (
                  <span className="text-2xl font-bold text-emergency-foreground">SOS</span>
                )}
              </button>
            </div>

            <p className="text-sm text-muted-foreground text-center mb-6 max-w-[250px]">
              {isSOSActive 
                ? "Keep holding to send emergency alert"
                : "Press and hold for 3 seconds to trigger emergency SOS"
              }
            </p>

            {/* Quick Actions */}
            <div className="w-full grid grid-cols-2 gap-3 mb-6">
              <button className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Call Warden</p>
                  <p className="text-xs text-muted-foreground">Direct line</p>
                </div>
              </button>
              <button className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-warning" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Security</p>
                  <p className="text-xs text-muted-foreground">24/7 helpline</p>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* SOS Triggered State */}
            <div className="w-24 h-24 rounded-full bg-emergency/20 flex items-center justify-center mb-6 emergency-glow">
              <AlertTriangle className="w-12 h-12 text-emergency animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Alert Sent!</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Help is on the way. Stay calm and remain where you are.
            </p>
            <div className="glass rounded-2xl p-4 w-full mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-foreground">Security notified</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-foreground">Location shared</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                <span className="text-sm text-foreground">Warden en route...</span>
              </div>
            </div>
            <Button 
              onClick={() => { setSOSTriggered(false); setCountdown(3); }}
              variant="secondary"
              className="w-full h-12 rounded-2xl"
            >
              Cancel Alert
            </Button>
          </>
        )}
      </div>

      {/* Live Map - Nearby Help */}
      {!sosTriggered && (
        <div className="px-5 pb-6 relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Nearby Help</span>
            <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-[10px] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </div>

          {/* Mini Map */}
          <div className="glass rounded-3xl p-4 relative overflow-hidden">
            <div className="aspect-video rounded-2xl bg-secondary/50 relative mb-3 overflow-hidden">
              {/* Map Grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="border border-border/30" />
                ))}
              </div>
              
              {/* You indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Navigation className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>

              {/* Nearby points */}
              <div className="absolute top-4 right-8 w-4 h-4 rounded-full bg-warning" />
              <div className="absolute bottom-8 left-12 w-4 h-4 rounded-full bg-success" />
              <div className="absolute top-12 left-20 w-4 h-4 rounded-full bg-destructive" />
            </div>

            {/* Helper List */}
            <div className="space-y-2">
              {nearbyHelpers.map((helper, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      helper.type === "security" ? "bg-warning/20" :
                      helper.type === "warden" ? "bg-success/20" : "bg-destructive/20"
                    }`}>
                      <Users className={`w-4 h-4 ${
                        helper.type === "security" ? "text-warning" :
                        helper.type === "warden" ? "text-success" : "text-destructive"
                      }`} />
                    </div>
                    <span className="text-sm text-foreground">{helper.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{helper.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
