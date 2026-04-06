"use client"

import { useState } from "react"
import { 
  ArrowLeft, Wrench, Zap, Droplet, Sofa, Wind, Lightbulb,
  Camera, Upload, Send, Clock, CheckCircle2, AlertCircle, Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MaintenanceScreenProps {
  onBack: () => void
  onSubmit: () => void
}

type RequestStatus = "submitted" | "assigned" | "in-progress" | "resolved"

interface MaintenanceRequest {
  id: string
  category: string
  description: string
  status: RequestStatus
  date: string
  assignee?: string
}

const categories = [
  { id: "electrical", label: "Electrical", icon: Zap, color: "bg-warning/20 text-warning" },
  { id: "plumbing", label: "Plumbing", icon: Droplet, color: "bg-primary/20 text-primary" },
  { id: "furniture", label: "Furniture", icon: Sofa, color: "bg-accent/20 text-accent" },
  { id: "hvac", label: "AC/Fan", icon: Wind, color: "bg-success/20 text-success" },
  { id: "lighting", label: "Lighting", icon: Lightbulb, color: "bg-warning/20 text-warning" },
  { id: "other", label: "Other", icon: Wrench, color: "bg-secondary text-foreground" },
]

const mockRequests: MaintenanceRequest[] = [
  { id: "MT-882", category: "plumbing", description: "Tap leaking in bathroom", status: "in-progress", date: "Today", assignee: "Raju Kumar" },
  { id: "MT-871", category: "electrical", description: "Switch board sparking", status: "assigned", date: "Yesterday", assignee: "Mohan Singh" },
  { id: "MT-856", category: "furniture", description: "Chair broken", status: "resolved", date: "3 days ago" },
]

export function MaintenanceScreen({ onBack, onSubmit }: MaintenanceScreenProps) {
  const [view, setView] = useState<"form" | "history">("form")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [hasPhoto, setHasPhoto] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!selectedCategory || !description) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit()
    }, 1500)
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "submitted": return "bg-warning/20 text-warning"
      case "assigned": return "bg-primary/20 text-primary"
      case "in-progress": return "bg-accent/20 text-accent"
      case "resolved": return "bg-success/20 text-success"
    }
  }

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "submitted": return Clock
      case "assigned": return AlertCircle
      case "in-progress": return Loader2
      case "resolved": return CheckCircle2
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.icon || Wrench
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Maintenance</h1>
          <p className="text-xs text-muted-foreground">Report issues & track repairs</p>
        </div>
        <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <Wrench className="w-5 h-5 text-warning" />
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl p-1 flex">
          <button
            onClick={() => setView("form")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "form" ? "bg-warning text-warning-foreground" : "text-muted-foreground"
            }`}
          >
            New Request
          </button>
          <button
            onClick={() => setView("history")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              view === "history" ? "bg-warning text-warning-foreground" : "text-muted-foreground"
            }`}
          >
            My Requests
          </button>
        </div>
      </div>

      {view === "form" ? (
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Category Selection */}
          <div className="mb-5">
            <label className="text-sm font-medium text-foreground mb-3 block">Issue Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl transition-all
                    ${selectedCategory === cat.id 
                      ? "glass border-2 border-warning" 
                      : "glass border-2 border-transparent"
                    }
                  `}
                >
                  <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-2`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="text-sm font-medium text-foreground mb-3 block">Describe the Issue</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., The bathroom tap has been leaking since morning..."
              className="w-full h-28 glass rounded-2xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-warning"
            />
            <p className="text-xs text-muted-foreground mt-2">{description.length}/200 characters</p>
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-3 block">Upload Photo (Optional)</label>
            {!hasPhoto ? (
              <div className="glass rounded-2xl p-6 border-2 border-dashed border-muted-foreground/30">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-warning/20 flex items-center justify-center">
                    <Camera className="w-7 h-7 text-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Tap to take a photo or upload</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setHasPhoto(true)}
                      className="px-4 py-2 rounded-xl glass text-xs font-medium text-foreground flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Camera
                    </button>
                    <button 
                      onClick={() => setHasPhoto(true)}
                      className="px-4 py-2 rounded-xl glass text-xs font-medium text-foreground flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Gallery
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-3 flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-warning/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Photo uploaded</p>
                  <p className="text-xs text-muted-foreground">issue_photo.jpg</p>
                </div>
                <button 
                  onClick={() => setHasPhoto(false)}
                  className="text-xs text-destructive font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedCategory || !description || isSubmitting}
            className="w-full h-14 rounded-2xl bg-warning text-warning-foreground font-semibold text-base hover:bg-warning/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {/* Active Requests */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">Active Requests</h2>
            <div className="space-y-3">
              {mockRequests.filter(r => r.status !== "resolved").map((request, i) => {
                const StatusIcon = getStatusIcon(request.status)
                const CategoryIcon = getCategoryIcon(request.category)
                return (
                  <div 
                    key={request.id}
                    className="glass rounded-2xl p-4 animate-slide-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${categories.find(c => c.id === request.category)?.color} flex items-center justify-center`}>
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">#{request.id}</span>
                          <span className="text-xs text-muted-foreground">{request.date}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-2">{request.description}</p>
                        <div className="flex items-center justify-between">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${getStatusColor(request.status)}`}>
                            <StatusIcon className={`w-3 h-3 ${request.status === "in-progress" ? "animate-spin" : ""}`} />
                            <span className="text-xs font-medium capitalize">{request.status.replace("-", " ")}</span>
                          </div>
                          {request.assignee && (
                            <span className="text-xs text-muted-foreground">Assigned: {request.assignee}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-medium text-warning">
                          {request.status === "submitted" ? "25%" : request.status === "assigned" ? "50%" : "75%"}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-warning rounded-full transition-all duration-500"
                          style={{ 
                            width: request.status === "submitted" ? "25%" : 
                                   request.status === "assigned" ? "50%" : "75%" 
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] text-muted-foreground">Submitted</span>
                        <span className="text-[10px] text-muted-foreground">Assigned</span>
                        <span className="text-[10px] text-muted-foreground">Working</span>
                        <span className="text-[10px] text-muted-foreground">Resolved</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Completed Requests */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">Completed</h2>
            <div className="space-y-3">
              {mockRequests.filter(r => r.status === "resolved").map((request, i) => {
                const CategoryIcon = getCategoryIcon(request.category)
                return (
                  <div 
                    key={request.id}
                    className="glass rounded-2xl p-4 opacity-70"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center`}>
                        <CategoryIcon className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{request.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">#{request.id}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{request.date}</span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
