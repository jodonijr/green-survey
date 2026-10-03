import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { SurveyStepProps } from "@/types/survey"

const SERVICES = [
  "Corte de grama",
  "Poda de árvores e arbustos",
  "Paisagismo",
  "Plantio",
  "Replantio",
  "Irrigação",
  "Controle de pragas",
]

export function StepAbout({ data, updateData }: SurveyStepProps) {
  const toggleService = (service: string) => {
    const newServices = data.services.includes(service)
      ? data.services.filter((s) => s !== service)
      : [...data.services, service]
    updateData({ services: newServices })
  }

  return (
    <Card className="border-zinc-200 bg-white text-zinc-900 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-green-700">
          Etapa 1: Sobre o serviço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="gardener-name" className="font-medium text-zinc-800">
            Nome do jardineiro
          </Label>
          <Input
            id="gardener-name"
            placeholder="Quem realizou o serviço?"
            value={data.gardenerName}
            onChange={(e) => updateData({ gardenerName: e.target.value })}
            className="border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400"
          />
        </div>

        <div className="space-y-3">
          <Label className="font-medium text-zinc-800">
            Serviços realizados
          </Label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {SERVICES.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={data.services.includes(service)}
                  onCheckedChange={() => toggleService(service)}
                  className="border-zinc-400 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                />
                <Label
                  htmlFor={service}
                  className="cursor-pointer font-normal text-zinc-700"
                >
                  {service}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label className="font-medium text-zinc-800">Data do serviço</Label>
          <Popover>
            <PopoverTrigger
              className={cn(
                buttonVariants({ variant: "outline" }),
                // Botão forçadamente branco e com hover cinza
                "w-full justify-start !border-zinc-300 !bg-white text-left font-normal hover:!bg-zinc-50 sm:w-[280px]",
                data.date ? "!text-zinc-900" : "!text-zinc-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 !text-zinc-600" />
              {data.date ? (
                format(data.date, "dd/MM/yyyy")
              ) : (
                <span>Selecione uma data</span>
              )}
            </PopoverTrigger>

            <PopoverContent className="/* Força o Popover a ser Branco com texto Escuro */ /* Força dias da semana (Dom, Seg) para cinza */ /* Força botões normais para texto escuro e fundo cinza claro no hover */ /* Força o dia de Hoje (Shadcn aplica .bg-accent nele) a não ficar preto */ /* BLINDAGEM DO DIA SELECIONADO: Verde e Branco sob qualquer condição */ w-auto border-zinc-200 !bg-white p-0 !text-zinc-900 [&_.bg-accent]:!bg-zinc-100 [&_.text-accent-foreground]:!text-zinc-900 [&_button]:!text-zinc-900 [&_button:hover]:!bg-zinc-100 [&_button[aria-selected=true]]:!bg-green-600 [&_button[aria-selected=true]]:!text-white [&_button[aria-selected=true]:hover]:!bg-green-700 [&_th]:!text-zinc-500">
              <Calendar
                mode="single"
                selected={data.date}
                onSelect={(date) => updateData({ date })}
                locale={ptBR}
                className="!bg-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
