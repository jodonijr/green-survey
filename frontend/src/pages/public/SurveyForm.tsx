import { useState } from "react"
import { useParams } from "react-router-dom"
import { Leaf, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { StepAbout } from "@/components/survey/StepAbout"
import { StepQuality } from "@/components/survey/StepQuality"
import { StepRecommendation } from "@/components/survey/StepRecommendation"
import { StepComments } from "@/components/survey/StepComments"
import type { SurveyData } from "@/types/survey"

export function SurveyForm() {
  const { id } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        date: formData.date ? format(formData.date, "yyyy-MM-dd") : null,
      }

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"

      const response = await fetch(`${apiUrl}/surveys/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Erro na requisicao")
      }

      setIsSuccess(true)
    } catch (error) {
      console.error(error)
      alert("Ocorreu um erro ao enviar sua avaliação. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="light flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
        <header className="bg-green-800 px-6 py-4 text-white shadow-md">
          <div className="mx-auto flex max-w-4xl items-center gap-2">
            <Leaf className="h-6 w-6 text-green-300" />
            <span className="text-xl font-bold tracking-tight">
              Green Survey
            </span>
          </div>
        </header>
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-zinc-900">
              Avaliação Enviada!
            </h2>
            <p className="text-zinc-600">
              Muito obrigado pelo seu tempo. Suas respostas nos ajudam a
              continuar melhorando.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="light flex min-h-screen flex-col bg-zinc-100 text-zinc-900">
      <header className="bg-green-800 px-6 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-4xl items-center gap-2">
          <Leaf className="h-6 w-6 text-green-300" />
          <span className="text-xl font-bold tracking-tight">Green Survey</span>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
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
          <StepComments
            data={formData}
            updateData={updateFormData}
            isSubmitting={isSubmitting}
          />
        </form>
      </main>
    </div>
  )
}
