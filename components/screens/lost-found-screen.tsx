"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Upload, Sparkles, Image as ImageIcon, X, Zap } from "lucide-react"

interface LostFoundScreenProps {
  onBack: () => void
  onSubmit: () => void
}

export function LostFoundScreen({ onBack, onSubmit }: LostFoundScreenProps) {
  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<string | null>(null)
  const [hasImage, setHasImage] = useState(false)
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  const handleAIScan = () => {
    setIsAnalyzing(true)
    setHasImage(true)
    setTimeout(() => {
      setAiResult("Blue Wireless Earbuds")
      setDescription("Blue wireless earbuds with charging case")
      setIsAnalyzing(false)
    }, 2500)
  }

  const handleSubmit = () => {
    if (description.length > 0) {
      onSubmit()
    }
  }

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="font-bold text-lg text-foreground">Lost & Found</h1>
          <p className="text-xs text-muted-foreground">Community action center</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="px-5 mb-5">
        <div className="glass rounded-2xl p-1 flex">
          <button
            onClick={() => setActiveTab("lost")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "lost" 
                ? "bg-primary text-primary-foreground neon-glow" 
                : "text-muted-foreground"
            }`}
          >
            Report Lost
          </button>
          <button
            onClick={() => setActiveTab("found")}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "found" 
                ? "bg-primary text-primary-foreground neon-glow" 
                : "text-muted-foreground"
            }`}
          >
            Found Item
          </button>
        </div>
      </div>

      {/* AI Image Recognition */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">AI Image Recognition</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-medium">Beta</span>
        </div>
        
        <div className="glass rounded-3xl p-5 relative overflow-hidden">
          {!hasImage ? (
            <div className="flex flex-col items-center py-6">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Take a photo and let AI identify the item automatically
              </p>
              <div className="flex gap-3 w-full">
                <Button 
                  onClick={handleAIScan}
                  className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button 
                  onClick={handleAIScan}
                  variant="secondary"
                  className="flex-1 h-12 rounded-2xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          ) : isAnalyzing ? (
            <div className="flex flex-col items-center py-8">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <div className="absolute inset-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-sm font-medium text-foreground">Analyzing image...</p>
              <p className="text-xs text-muted-foreground mt-1">AI is detecting the item</p>
            </div>
          ) : (
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-video mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <button 
                  onClick={() => { setHasImage(false); setAiResult(null); setDescription(""); }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
              {aiResult && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-success/10 border border-success/30">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-success font-medium">AI Detected</p>
                    <p className="text-sm font-bold text-foreground">{aiResult}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="px-5 flex-1 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Item Description</label>
          <Textarea
            placeholder="Describe the item in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[100px] rounded-2xl bg-secondary border-none resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            {activeTab === "lost" ? "Last Seen Location" : "Found Location"}
          </label>
          <Input
            placeholder="e.g., Common Room, Block A"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12 rounded-2xl bg-secondary border-none"
          />
        </div>

        {/* Recent Lost Items */}
        {activeTab === "lost" && (
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Similar Found Items</p>
            <div className="space-y-2">
              {[
                { item: "Blue Earbuds", location: "Library", time: "2h ago" },
                { item: "Water Bottle", location: "Gym", time: "5h ago" },
              ].map((found, i) => (
                <div key={i} className="glass rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{found.item}</p>
                      <p className="text-xs text-muted-foreground">{found.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{found.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="px-5 py-4">
        <Button 
          onClick={handleSubmit}
          disabled={description.length === 0}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold text-base neon-glow disabled:opacity-50 disabled:neon-glow-none"
        >
          {activeTab === "lost" ? "Report Lost Item" : "Submit Found Item"}
        </Button>
      </div>
    </div>
  )
}
