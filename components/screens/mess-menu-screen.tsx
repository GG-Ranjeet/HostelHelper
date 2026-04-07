"use client"

import { useState } from "react"
import { 
  ArrowLeft, Utensils, Star, ThumbsUp, ThumbsDown, MessageSquare,
  Clock, ChefHat, Flame, Leaf, Send, TrendingUp, TrendingDown
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessMenuScreenProps {
  onBack: () => void
  onSubmitFeedback: () => void
}

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const menuData = {
  breakfast: {
    time: "7:30 - 9:30 AM",
    items: ["Poha", "Bread & Butter", "Boiled Eggs", "Tea/Coffee", "Milk"],
    rating: 4.1,
    trend: "up"
  },
  lunch: {
    time: "12:30 - 2:30 PM", 
    items: ["Dal Tadka", "Paneer Butter Masala", "Jeera Rice", "Roti", "Salad", "Raita"],
    rating: 4.3,
    trend: "up"
  },
  snacks: {
    time: "5:00 - 6:00 PM",
    items: ["Samosa", "Tea/Coffee"],
    rating: 3.8,
    trend: "down"
  },
  dinner: {
    time: "7:30 - 9:30 PM",
    items: ["Chole", "Mix Veg", "Rice", "Roti", "Sweet Dish", "Buttermilk"],
    rating: 4.0,
    trend: "up"
  }
}

const recentFeedback = [
  { user: "Rahul K.", rating: 5, comment: "Paneer was amazing today!", time: "2h ago", meal: "Lunch" },
  { user: "Priya S.", rating: 3, comment: "Rice was undercooked", time: "4h ago", meal: "Lunch" },
  { user: "Amit G.", rating: 4, comment: "Good breakfast variety", time: "8h ago", meal: "Breakfast" },
]

export function MessMenuScreen({ onBack, onSubmitFeedback }: MessMenuScreenProps) {
  const [selectedDay, setSelectedDay] = useState(3) // Thursday
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "snacks" | "dinner">("lunch")
  const [userRating, setUserRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  const currentMeal = menuData[selectedMeal]

  const handleSubmitFeedback = () => {
    if (userRating > 0) {
      setShowFeedbackForm(false)
      setUserRating(0)
      setFeedback("")
      onSubmitFeedback()
    }
  }

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Mess Menu</h1>
          <p className="text-xs text-muted-foreground">Today&apos;s meals & feedback</p>
        </div>
        <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <ChefHat className="w-5 h-5 text-success" />
        </div>
      </div>

      {/* Day Selector */}
      <div className="px-5 mb-4">
        <div className="glass rounded-2xl p-2 flex justify-between">
          {weekDays.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`
                flex flex-col items-center py-2 px-3 rounded-xl transition-all
                ${selectedDay === i ? "bg-success text-success-foreground" : "text-muted-foreground"}
              `}
            >
              <span className="text-[10px] font-medium uppercase">{day}</span>
              <span className={`text-sm font-bold ${selectedDay === i ? "" : "text-foreground"}`}>{7 + i}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-6">
        {/* Meal Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {(["breakfast", "lunch", "snacks", "dinner"] as const).map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              className={`
                flex flex-col items-center p-3 rounded-2xl transition-all
                ${selectedMeal === meal 
                  ? "glass border-2 border-success" 
                  : "glass border-2 border-transparent"
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-xl flex items-center justify-center mb-1
                ${selectedMeal === meal ? "bg-success/20" : "bg-secondary"}
              `}>
                {meal === "breakfast" && <Flame className={`w-4 h-4 ${selectedMeal === meal ? "text-success" : "text-muted-foreground"}`} />}
                {meal === "lunch" && <Utensils className={`w-4 h-4 ${selectedMeal === meal ? "text-success" : "text-muted-foreground"}`} />}
                {meal === "snacks" && <ChefHat className={`w-4 h-4 ${selectedMeal === meal ? "text-success" : "text-muted-foreground"}`} />}
                {meal === "dinner" && <Star className={`w-4 h-4 ${selectedMeal === meal ? "text-success" : "text-muted-foreground"}`} />}
              </div>
              <span className="text-[10px] font-medium text-foreground capitalize">{meal}</span>
            </button>
          ))}
        </div>

        {/* Current Meal Card */}
        <div className="glass rounded-3xl p-5 mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-foreground capitalize">{selectedMeal}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{currentMeal.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 glass px-3 py-2 rounded-xl">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-lg font-bold text-foreground">{currentMeal.rating}</span>
              {currentMeal.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {currentMeal.items.map((item, i) => (
              <div 
                key={item}
                className="flex items-center gap-3 glass rounded-xl p-3 animate-slide-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-success" />
                </div>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>

          {/* Quick Feedback */}
          {!showFeedbackForm && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3">Quick feedback for today&apos;s {selectedMeal}</p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowFeedbackForm(true)}
                  className="flex-1 flex items-center justify-center gap-2 glass rounded-xl py-3 hover:bg-success/10 transition-all"
                >
                  <ThumbsUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-foreground">Good</span>
                </button>
                <button 
                  onClick={() => setShowFeedbackForm(true)}
                  className="flex-1 flex items-center justify-center gap-2 glass rounded-xl py-3 hover:bg-destructive/10 transition-all"
                >
                  <ThumbsDown className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-foreground">Needs Improvement</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="glass rounded-3xl p-5 mb-5 animate-scale-in">
            <h3 className="text-sm font-semibold text-foreground mb-4">Rate Your Meal</h3>
            
            {/* Star Rating */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-10 h-10 transition-colors ${
                      star <= userRating 
                        ? "text-warning fill-warning" 
                        : "text-muted-foreground"
                    }`} 
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts (optional)..."
              className="w-full h-20 glass rounded-2xl p-4 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-success mb-4"
            />

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 h-12 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitFeedback}
                disabled={userRating === 0}
                className="flex-1 h-12 rounded-xl bg-success text-success-foreground hover:bg-success/90"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        )}

        {/* Recent Feedback */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Recent Feedback</h2>
            <button className="text-xs text-success font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {recentFeedback.map((fb, i) => (
              <div 
                key={i}
                className="glass rounded-2xl p-4 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{fb.user}</span>
                      <span className="text-xs text-muted-foreground">{fb.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{fb.comment}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-3 h-3 ${i < fb.rating ? "text-warning fill-warning" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{fb.meal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
