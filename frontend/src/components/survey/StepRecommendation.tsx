import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { SurveyStepProps } from "@/types/survey"

export function StepRecommendation({ data, updateData }: SurveyStepProps) {
  return (
    <Card className="border-zinc-200 bg-white text-zinc-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-green-700">
          Etapa 3: Recomendação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <Label className="text-base font-medium text-zinc-800">
            De 0 a 10, quanto você recomendaria este jardineiro a um vizinho ou
            amigo?
          </Label>
          <div className="flex flex-wrap justify-between gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Button
                key={num}
                type="button"
                variant={data.nps === num ? "default" : "outline"}
                className={cn(
                  "h-10 w-10 rounded-full border-zinc-300 p-0 font-semibold",
                  data.nps === num
                    ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                    : "bg-white text-zinc-800 hover:bg-zinc-100"
                )}
                onClick={() => updateData({ nps: num })}
              >
                {num}
              </Button>
            ))}
          </div>
          <div className="flex justify-between px-1 text-sm text-zinc-500">
            <span>Nada provável</span>
            <span>Muito provável</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium text-zinc-800">
            Você contrataria este prestador novamente?
          </Label>
          <RadioGroup
            value={data.hireAgain}
            onValueChange={(val) => updateData({ hireAgain: val })}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="sim"
                id="r-sim"
                className="border-zinc-400 text-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor="r-sim" className="cursor-pointer text-zinc-700">
                Sim
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="talvez"
                id="r-talvez"
                className="border-zinc-400 text-green-600 data-[state=checked]:border-green-600"
              />
              <Label
                htmlFor="r-talvez"
                className="cursor-pointer text-zinc-700"
              >
                Talvez
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="nao"
                id="r-nao"
                className="border-zinc-400 text-green-600 data-[state=checked]:border-green-600"
              />
              <Label htmlFor="r-nao" className="cursor-pointer text-zinc-700">
                Não
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
