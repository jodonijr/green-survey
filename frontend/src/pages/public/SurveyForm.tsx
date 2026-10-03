import { useState } from "react"
import { useParams } from "react-router-dom"
import { Leaf } from "lucide-react"
import { StepAbout } from "@/components/survey/StepAbout"
import { StepQuality } from "@/components/survey/StepQuality"
import { StepRecommendation } from "@/components/survey/StepRecommendation"
import { StepComments } from "@/components/survey/StepComments"
import type { SurveyData } from "@/types/survey"

export function SurveyForm() {
  const { id } = useParams()

  const [formData, setFormData] = useState<SurveyData>({
    gardenerName: "",
    services: [],
    date: undefined,
    ratings: {
      punctuality: 0,
      quality: 0,
      cleanliness: 0,
      care: 0,
      communication: 0,
      valueForMoney: 0,
    },
    nps: null,
    hireAgain: "talvez",
    improvements: "",
    contact: "",
  })

  const updateFormData = (updates: Partial<SurveyData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="light flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      {/* Cabeçalho do Sistema */}
      <header className="bg-green-800 px-6 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-4xl items-center gap-2">
          <Leaf className="h-6 w-6 text-green-300" />
          <span className="text-xl font-bold tracking-tight">Green Survey</span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="mb-8 space-y-2 text-center">
            <p className="text-sm font-semibold tracking-wider text-green-700 uppercase">
              Pesquisa: {id}
            </p>
            <h1 className="text-3xl font-bold text-zinc-900">
              Como ficou seu jardim?
            </h1>
            <p className="text-zinc-600">
              Avalie o serviço de jardinagem que você recebeu. Suas respostas
              ajudam o prestador a melhorar e outros clientes a escolher com
              confiança.
            </p>
          </div>

          <StepAbout data={formData} updateData={updateFormData} />
          <StepQuality data={formData} updateData={updateFormData} />
          <StepRecommendation data={formData} updateData={updateFormData} />
          <StepComments data={formData} updateData={updateFormData} />
        </div>
      </main>
    </div>
  )
}
