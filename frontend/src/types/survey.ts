export interface SurveyRatings {
  punctuality: number
  quality: number
  cleanliness: number
  care: number
  communication: number
  valueForMoney: number
}

export interface SurveyData {
  gardenerName: string
  services: string[]
  date: Date | undefined
  ratings: SurveyRatings
  nps: number | null
  hireAgain: string
  improvements: string
  contact: string
}

export interface SurveyStepProps {
  data: SurveyData
  updateData: (updates: Partial<SurveyData>) => void
}
