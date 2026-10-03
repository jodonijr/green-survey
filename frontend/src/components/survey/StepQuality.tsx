import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LeafRating } from "./LeafRating"
import type { SurveyStepProps } from "@/types/survey"

const QUALITY_ITEMS = [
  {
    id: "punctuality",
    label: "Pontualidade",
    desc: "Chegou no horário combinado",
  },
  {
    id: "quality",
    label: "Qualidade do serviço",
    desc: "Corte, poda e acabamento",
  },
  {
    id: "cleanliness",
    label: "Limpeza após o serviço",
    desc: "Folhas, galhos e resíduos recolhidos",
  },
  {
    id: "care",
    label: "Cuidado com as plantas",
    desc: "Respeito a canteiros e mudas",
  },
  { id: "communication", label: "Comunicação", desc: "Clareza e cordialidade" },
  { id: "valueForMoney", label: "Custo-benefício", desc: "O valor foi justo" },
] as const

export function StepQuality({ data, updateData }: SurveyStepProps) {
  const handleRatingChange = (
    category: keyof typeof data.ratings,
    value: number
  ) => {
    updateData({ ratings: { ...data.ratings, [category]: value } })
  }

  return (
    <Card className="border-zinc-200 bg-white text-zinc-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-green-700">
          Etapa 2: Como foi o atendimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {QUALITY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between gap-2 border-b border-zinc-100 pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center"
          >
            <div>
              <h4 className="font-medium text-zinc-900">{item.label}</h4>
              <p className="text-sm text-zinc-500">{item.desc}</p>
            </div>
            <LeafRating
              value={data.ratings[item.id]}
              onChange={(val) => handleRatingChange(item.id, val)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
