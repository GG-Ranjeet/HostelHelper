"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, Sparkles, Star, Gift, ArrowRight, Home } from "lucide-react"

interface RewardsScreenProps {
  points: number
  action: string
  onDashboard: () => void
  onContinue: () => void
}

// Confetti component
function Confetti() {
  const colors = ["#00D9FF", "#00FFB2", "#FFD700", "#FF6B6B", "#A855F7"]
  const confettiPieces = [...Array(50)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 4 + Math.random() * 8,
    rotation: Math.random() * 360,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: piece.left,
            top: "-20px",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

export function RewardsScreen({ points, action, onDashboard, onContinue }: RewardsScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const totalCredits = 850 // Total hostel credits
  const newTotal = totalCredits + points

  // Animate points counting up
  useEffect(() => {
    const duration = 1500
    const steps = 30
    const increment = points / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= points) {
        setAnimatedPoints(points)
        clearInterval(timer)
      } else {
        setAnimatedPoints(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [points])

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  const progressPercent = (newTotal / 1000) * 100

  return (
    <div className="flex flex-col bg-background relative">
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-success/10 blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Success Badge */}
        <div className="relative mb-6 animate-scale-in">
          <div className="w-32 h-32 rounded-full bg-success/20 flex items-center justify-center neon-glow">
            <Trophy className="w-16 h-16 text-success" />
          </div>
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center animate-slide-up">
          Awesome Work!
        </h1>
        <p className="text-muted-foreground text-center mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {action}
        </p>

        {/* Points Earned Card */}
        <div className="w-full glass rounded-3xl p-6 mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-warning animate-pulse" />
            <span className="text-4xl font-bold text-foreground">+{animatedPoints}</span>
            <span className="text-lg text-muted-foreground">pts</span>
          </div>
          <p className="text-center text-sm text-muted-foreground">Hostel Credits Earned</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full glass rounded-3xl p-5 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Hostel Credit Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{newTotal}/1000</span>
          </div>
          
          {/* Progress Track */}
          <div className="relative h-4 bg-secondary rounded-full overflow-hidden mb-3">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
            {/* Glow effect */}
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full blur-sm opacity-50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Milestones */}
          <div className="flex justify-between text-xs">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${newTotal >= 250 ? "bg-success" : "bg-muted"}`} />
              <span className="text-muted-foreground mt-1">250</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${newTotal >= 500 ? "bg-success" : "bg-muted"}`} />
              <span className="text-muted-foreground mt-1">500</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${newTotal >= 750 ? "bg-success" : "bg-muted"}`} />
              <span className="text-muted-foreground mt-1">750</span>
            </div>
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${newTotal >= 1000 ? "bg-success" : "bg-muted"}`} />
              <span className="text-muted-foreground mt-1">1000</span>
            </div>
          </div>

          {/* Next Reward */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Next Reward</p>
                <p className="text-sm font-medium text-foreground">Free Laundry Token</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Points needed</p>
                <p className="text-sm font-bold text-primary">{Math.max(0, 1000 - newTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 space-y-3 relative z-10">
        <Button 
          onClick={onContinue}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base neon-glow"
        >
          Continue Earning
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button 
          onClick={onDashboard}
          variant="secondary"
          className="w-full h-12 rounded-2xl font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
