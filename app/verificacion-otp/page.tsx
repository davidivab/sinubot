"use client"

import Link from "next/link"
import { useState, useRef, useEffect, useCallback } from "react"
import { Mail, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ProgressBar } from "@/components/skymatch/progress-bar"

export default function OTPPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [seconds, setSeconds] = useState(272) // 4:32
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (seconds <= 0) return
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [seconds])

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }, [otp])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }, [otp])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
  }

  const isComplete = otp.every((d) => d !== "")

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              SM
            </div>
            <span className="font-display text-lg font-bold text-foreground">SkyMatch</span>
          </Link>
        </div>

        <ProgressBar value={66} label="Paso 2 de 3 - Verificacion" variant="primary" />

        <Card className="border border-border">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="font-display text-xl">Verificacion OTP</CardTitle>
            <CardDescription>
              Ingresa el codigo de 6 digitos enviado a tu telefono
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* OTP inputs */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-12 rounded-lg border border-border bg-background text-center text-2xl font-bold text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                  aria-label={`Digito ${i + 1}`}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-center">
              {seconds > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Codigo expira en{" "}
                  <span className="font-mono font-semibold text-foreground">{formatTime(seconds)}</span>
                </p>
              ) : (
                <p className="text-sm text-destructive font-medium">Codigo expirado</p>
              )}
            </div>

            <Button
              className="w-full"
              size="lg"
              disabled={!isComplete}
              asChild={isComplete ? true : undefined}
            >
              {isComplete ? (
                <Link href="/dashboard">Verificar</Link>
              ) : (
                <span>Verificar</span>
              )}
            </Button>

            {/* Resend */}
            <div className="space-y-2 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSeconds(272)}
                disabled={seconds > 0}
              >
                Reenviar codigo
              </Button>
              <p className="text-xs text-muted-foreground">o</p>
              <Button variant="link" size="sm" className="text-xs">
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Enviar codigo por email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
