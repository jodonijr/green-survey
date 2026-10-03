import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { SurveyStepProps } from "@/types/survey"

interface StepCommentsProps extends SurveyStepProps {
  isSubmitting?: boolean
}

export function StepComments({
  data,
  updateData,
  isSubmitting,
}: StepCommentsProps) {
  return (
    <Card className="border-zinc-200 bg-white text-zinc-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-green-700">
          Etapa 4: Comentários finais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="improvements" className="font-medium text-zinc-800">
            O que poderia melhorar? (opcional)
          </Label>
          <Textarea
            id="improvements"
            placeholder="Deixe suas sugestões aqui..."
            className="min-h-[100px] border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
            value={data.improvements}
            onChange={(e) => updateData({ improvements: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact" className="font-medium text-zinc-800">
            Seu nome ou contato (opcional)
          </Label>
          <Input
            id="contact"
            placeholder="Email ou telefone"
            value={data.contact}
            onChange={(e) => updateData({ contact: e.target.value })}
            className="border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="h-14 w-full bg-green-600 text-lg text-white hover:bg-green-700 disabled:opacity-70"
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isSubmitting ? "Enviando..." : "Enviar avaliação"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
