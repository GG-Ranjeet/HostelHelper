"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Scan, QrCode, ArrowRight, Sparkles, Building2, Check } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState<"welcome" | "scan" | "confirm">("welcome")
  const [roomCode, setRoomCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setRoomCode("A-302B")
      setIsScanning(false)
      setStep("confirm")
    }, 2000)
  }

  const handleManualEntry = () => {
    if (roomCode.length > 0) {
      setStep("confirm")
    }
  }

  return (
    <div className="h-full flex flex-col bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute top-60 -right-20 w-60 h-60 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-10 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {step === "welcome" && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 relative z-10 animate-slide-up">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center neon-glow">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Hostel Help</h1>
              <p className="text-xs text-muted-foreground">Campus Life Support</p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3 leading-tight text-balance">
                Your Campus Life,{" "}
                <span className="text-primary neon-text">Simplified</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Book laundry, report issues, find lost items, and connect with your hostel community.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {["Laundry", "Emergency", "Lost & Found", "Rewards"].map((feature, i) => (
                <div 
                  key={feature}
                  className="px-4 py-2 rounded-full glass text-xs font-medium text-foreground animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={() => setStep("scan")}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base neon-glow"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === "scan" && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 relative z-10 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Quick Room Scan</h2>
            <p className="text-sm text-muted-foreground">
              Scan your room QR code or enter manually
            </p>
          </div>

          {/* Scan Area */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="relative w-56 h-56 rounded-3xl glass flex items-center justify-center mb-8 group transition-all hover:scale-105"
            >
              {isScanning ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <span className="text-sm text-primary font-medium">Scanning...</span>
                </div>
              ) : (
                <>
                  <QrCode className="w-24 h-24 text-primary/40 group-hover:text-primary transition-colors" />
                  <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-2xl" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary/20 px-3 py-1 rounded-full">
                    <span className="text-xs text-primary font-medium">Tap to Scan</span>
                  </div>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Manual Entry */}
            <div className="w-full space-y-4">
              <Input
                placeholder="Enter Room Code (e.g., A-302B)"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="h-14 rounded-2xl bg-secondary border-none text-center text-lg font-mono tracking-wider"
              />
              <Button 
                onClick={handleManualEntry}
                disabled={roomCode.length === 0}
                variant="secondary"
                className="w-full h-12 rounded-2xl font-medium"
              >
                Verify Room Code
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="flex-1 flex flex-col px-6 pt-8 pb-6 relative z-10 animate-slide-up">
          {/* Success Animation */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-full bg-success/20 flex items-center justify-center neon-glow animate-scale-in">
                <Check className="w-14 h-14 text-success" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Room Verified!</h2>
            <p className="text-muted-foreground text-center mb-8">
              You&apos;re all set to join your hostel community
            </p>

            {/* Room Card */}
            <div className="w-full glass rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Room Number</span>
                <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="text-3xl font-bold text-primary font-mono tracking-wider mb-4">
                {roomCode}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Block A</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>3rd Floor</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>Room 2B</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={onComplete}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base neon-glow"
          >
            Enter Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
