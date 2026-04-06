"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, WashingMachine, Clock, Users, ArrowRightLeft, Check, X } from "lucide-react"

interface LaundryScreenProps {
  onBack: () => void
  onBook: () => void
}

interface TimeSlot {
  time: string
  machine: number
  status: "available" | "booked" | "yours" | "swap"
  bookedBy?: string
}

export function LaundryScreen({ onBack, onBook }: LaundryScreenProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapRequested, setSwapRequested] = useState(false)

  const timeSlots: TimeSlot[] = [
    { time: "9:00 AM", machine: 1, status: "booked", bookedBy: "Rahul M." },
    { time: "9:00 AM", machine: 2, status: "available" },
    { time: "9:00 AM", machine: 3, status: "booked", bookedBy: "Priya K." },
    { time: "10:00 AM", machine: 1, status: "available" },
    { time: "10:00 AM", machine: 2, status: "swap", bookedBy: "Vikram S." },
    { time: "10:00 AM", machine: 3, status: "available" },
    { time: "11:00 AM", machine: 1, status: "booked", bookedBy: "Neha R." },
    { time: "11:00 AM", machine: 2, status: "available" },
    { time: "11:00 AM", machine: 3, status: "yours" },
    { time: "12:00 PM", machine: 1, status: "available" },
    { time: "12:00 PM", machine: 2, status: "available" },
    { time: "12:00 PM", machine: 3, status: "booked", bookedBy: "Amit P." },
  ]

  const uniqueTimes = [...new Set(timeSlots.map(s => s.time))]

  const handleBook = () => {
    if (selectedSlot) {
      onBook()
    }
  }

  const handleSwapRequest = () => {
    setSwapRequested(true)
    setTimeout(() => {
      setShowSwapModal(false)
      setSwapRequested(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="font-bold text-lg text-foreground">Laundry Booking</h1>
          <p className="text-xs text-muted-foreground">Select your time slot</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <WashingMachine className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">8 slots available</p>
              <p className="text-xs text-muted-foreground">Today, April 6</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">45 min/slot</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 mb-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span className="text-xs text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Swap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Yours</span>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="flex-1 px-5 overflow-y-auto pb-4">
        <div className="space-y-4">
          {uniqueTimes.map((time) => (
            <div key={time} className="glass rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{time}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots
                  .filter(s => s.time === time)
                  .map((slot, i) => {
                    const isSelected = selectedSlot?.time === slot.time && selectedSlot?.machine === slot.machine
                    const isDisabled = slot.status === "booked"
                    
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (slot.status === "swap") {
                            setSelectedSlot(slot)
                            setShowSwapModal(true)
                          } else if (!isDisabled && slot.status !== "yours") {
                            setSelectedSlot(isSelected ? null : slot)
                          }
                        }}
                        disabled={isDisabled}
                        className={`
                          relative p-3 rounded-xl transition-all
                          ${slot.status === "available" ? "glass hover:bg-success/10" : ""}
                          ${slot.status === "booked" ? "bg-muted/50 opacity-50" : ""}
                          ${slot.status === "yours" ? "bg-primary/20 border-2 border-primary" : ""}
                          ${slot.status === "swap" ? "bg-warning/20 border-2 border-warning" : ""}
                          ${isSelected ? "bg-success/20 border-2 border-success neon-glow" : ""}
                        `}
                      >
                        <div className="flex flex-col items-center">
                          <WashingMachine className={`w-6 h-6 mb-1 ${
                            slot.status === "yours" ? "text-primary" :
                            slot.status === "swap" ? "text-warning" :
                            slot.status === "available" ? "text-success" : "text-muted-foreground"
                          }`} />
                          <span className="text-xs font-medium text-foreground">#{slot.machine}</span>
                          {slot.bookedBy && (
                            <span className="text-[10px] text-muted-foreground truncate w-full text-center mt-1">
                              {slot.bookedBy}
                            </span>
                          )}
                          {slot.status === "swap" && (
                            <div className="flex items-center gap-1 mt-1">
                              <ArrowRightLeft className="w-3 h-3 text-warning" />
                              <span className="text-[10px] text-warning">Swap</span>
                            </div>
                          )}
                          {slot.status === "yours" && (
                            <span className="text-[10px] text-primary font-medium mt-1">Your slot</span>
                          )}
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                            <Check className="w-3 h-3 text-success-foreground" />
                          </div>
                        )}
                      </button>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <div className="px-5 py-4 border-t border-border">
        <Button 
          onClick={handleBook}
          disabled={!selectedSlot || selectedSlot.status !== "available"}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base neon-glow disabled:opacity-50"
        >
          {selectedSlot 
            ? `Book Machine #${selectedSlot.machine} at ${selectedSlot.time}` 
            : "Select a slot to book"}
        </Button>
      </div>

      {/* Swap Modal */}
      {showSwapModal && selectedSlot && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="w-full glass rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Swap Request</h3>
              <button 
                onClick={() => setShowSwapModal(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>
            </div>
            
            <div className="glass rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedSlot.bookedBy}</p>
                  <p className="text-xs text-muted-foreground">
                    Wants to swap {selectedSlot.time} - Machine #{selectedSlot.machine}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {selectedSlot.bookedBy} is offering to swap their slot. You&apos;ll exchange your current booking with theirs.
            </p>

            <div className="flex gap-3">
              <Button 
                variant="secondary"
                onClick={() => setShowSwapModal(false)}
                className="flex-1 h-12 rounded-2xl"
              >
                Decline
              </Button>
              <Button 
                onClick={handleSwapRequest}
                className="flex-1 h-12 rounded-2xl bg-warning text-warning-foreground"
              >
                {swapRequested ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <>
                    <ArrowRightLeft className="w-4 h-4 mr-2" />
                    Accept Swap
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
