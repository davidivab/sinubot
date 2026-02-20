"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { sinuBotGreeting } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/types"

interface SinuBotProps {
  userName?: string
  contextModule?: string
}

export function SinuBot({ userName = "Usuario", contextModule }: SinuBotProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([sinuBotGreeting])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = (text?: string) => {
    const msg = text || input.trim()
    if (!msg) return

    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: "user",
      content: msg,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `b${Date.now()}`,
        role: "assistant",
        content: getBotResponse(msg),
        timestamp: new Date().toISOString(),
        quickActions: ["Registrar predio", "Ver mapa", "Hablar con soporte"],
      }
      setMessages((prev) => [...prev, botMsg])
    }, 800)
  }

  return (
    <>
      {/* FAB */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-105"
          aria-label="Abrir asistente SinuBot"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <Bot className="h-6 w-6" />
            <div className="flex-1">
              <p className="text-sm font-semibold">SinuBot</p>
              <p className="text-[11px] opacity-80">Asistente ZIDA</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-primary-foreground hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {/* Quick actions */}
            {messages.length > 0 && messages[messages.length - 1].quickActions && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {messages[messages.length - 1].quickActions!.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSend(action)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 text-sm"
              />
              <Button type="submit" size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function getBotResponse(question: string): string {
  const q = question.toLowerCase()
  if (q.includes("predio") || q.includes("registr"))
    return "Para registrar tu predio, necesitas el codigo CHIP que encuentras en tu certificado de tradicion y libertad. Ve a 'Mis Predios' en el menu lateral y sigue los pasos del formulario."
  if (q.includes("mapa"))
    return "El Mapa Social te permite visualizar todos los predios de la zona ZIDA. Puedes filtrar por localidad, intencion y nivel de riesgo. Accede desde el menu lateral."
  if (q.includes("caracterizacion"))
    return "La Caracterizacion Social evalua tu vinculo con el territorio mediante 6 preguntas. Es fundamental para el calculo del Indice de Construccion Sostenible (ICS)."
  if (q.includes("soporte") || q.includes("ayuda"))
    return "Puedo conectarte con un agente de soporte de la SDP. El horario de atencion es de lunes a viernes, 8:00 AM a 5:00 PM. Deseas que registre tu solicitud?"
  return "Gracias por tu pregunta. Estoy aqui para ayudarte con cualquier tema relacionado con la plataforma ZIDA. Puedes preguntarme sobre registro de predios, caracterizacion social, el mapa, o solicitar soporte."
}
