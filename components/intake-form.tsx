"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface IntakeFormProps {
  onGenerateIdeas: (formData: IntakeFormData) => void
}

export interface IntakeFormData {
  skills: string[]
  techStacks: string[]
  interests: string[]
  timeCommitment: string
  targetAudience: string
  revenueGoal: string
}

const POPULAR_SKILLS = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "Design",
  "Marketing",
  "Sales",
  "Writing",
  "Data Analysis",
  "Project Management",
]

const TECH_STACKS = [
  "Next.js",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Vercel",
]

const POPULAR_INTERESTS = [
  "AI/ML",
  "SaaS",
  "E-commerce",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Gaming",
  "Social Media",
  "Productivity",
  "Developer Tools",
]

export function IntakeForm({ onGenerateIdeas }: IntakeFormProps) {
  const [formData, setFormData] = useState<IntakeFormData>({
    skills: [],
    techStacks: [],
    interests: [],
    timeCommitment: "",
    targetAudience: "",
    revenueGoal: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [interestInput, setInterestInput] = useState("")

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
  }

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData((prev) => ({ ...prev, interests: [...prev.interests, interest] }))
    }
    setInterestInput("")
  }

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({ ...prev, interests: prev.interests.filter((i) => i !== interest) }))
  }

  const toggleTechStack = (stack: string) => {
    setFormData((prev) => ({
      ...prev,
      techStacks: prev.techStacks.includes(stack)
        ? prev.techStacks.filter((s) => s !== stack)
        : [...prev.techStacks, stack],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerateIdeas(formData)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-heading">Tell us about yourself</CardTitle>
          <CardDescription>Help us generate personalized startup ideas that match your unique profile</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Your Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill(skillInput)
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={() => addSkill(skillInput)}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR_SKILLS.filter((skill) => !formData.skills.includes(skill)).map((skill) => (
                  <Button
                    key={skill}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addSkill(skill)}
                    className="h-7 text-xs"
                  >
                    + {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tech Stacks */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Preferred Tech Stacks</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TECH_STACKS.map((stack) => (
                  <Button
                    key={stack}
                    type="button"
                    variant={formData.techStacks.includes(stack) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTechStack(stack)}
                    className="justify-center"
                  >
                    {stack}
                  </Button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Your Interests</Label>
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {formData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="px-3 py-1">
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an interest..."
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addInterest(interestInput)
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={() => addInterest(interestInput)}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR_INTERESTS.filter((interest) => !formData.interests.includes(interest)).map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addInterest(interest)}
                    className="h-7 text-xs"
                  >
                    + {interest}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Commitment */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Time Commitment</Label>
              <Select
                value={formData.timeCommitment}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, timeCommitment: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="How much time can you dedicate?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part-time">Part-time (10-20 hours/week)</SelectItem>
                  <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                  <SelectItem value="weekend">Weekends only</SelectItem>
                  <SelectItem value="evenings">Evenings (5-10 hours/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Audience */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Target Audience</Label>
              <Input
                placeholder="Who do you want to help? (e.g., small business owners, developers, students)"
                value={formData.targetAudience}
                onChange={(e) => setFormData((prev) => ({ ...prev, targetAudience: e.target.value }))}
              />
            </div>

            {/* Revenue Goal */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Revenue Goal</Label>
              <Select
                value={formData.revenueGoal}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, revenueGoal: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="What's your target monthly revenue?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1k">$1,000/month</SelectItem>
                  <SelectItem value="5k">$5,000/month</SelectItem>
                  <SelectItem value="10k">$10,000/month</SelectItem>
                  <SelectItem value="25k">$25,000/month</SelectItem>
                  <SelectItem value="50k">$50,000+/month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Generate Ideas
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
