import Link from "next/link"
import { Building2, ClipboardList, Map, Shield, Lock, Landmark, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SinuBot } from "@/components/skymatch/sinu-bot"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              SM
            </div>
            <span className="font-display text-lg font-bold text-foreground">SkyMatch</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesion</Link>
            </Button>
            <Button asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="bg-primary/5 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Plataforma GovTech ZIDA
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                Gestion territorial integrada para Bogota
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                SkyMatch conecta moradores, empresarios y la Secretaria Distrital de Planeacion
                para una gestion urbana transparente, participativa y basada en datos.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/registro">
                    Registrarse como Morador
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Iniciar Sesion</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="mt-3 text-muted-foreground">
            Herramientas disenadas para cada actor del proceso de desarrollo urbano
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Building2 className="h-6 w-6" />}
            title="Registra tu Predio"
            description="Registra tus predios con el codigo CHIP, documenta la propiedad y expresa tu intencion sobre el futuro de tu territorio."
          />
          <FeatureCard
            icon={<ClipboardList className="h-6 w-6" />}
            title="Caracterizacion Social"
            description="Participa en la evaluacion social de tu comunidad. Tu voz es fundamental para el calculo del Indice de Construccion Sostenible."
          />
          <FeatureCard
            icon={<Map className="h-6 w-6" />}
            title="Mapa ZIDA"
            description="Explora el mapa interactivo de la zona ZIDA. Visualiza predios, intenciones y estadisticas por localidad."
          />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatItem value="1,247" label="Moradores registrados" />
            <StatItem value="834" label="Predios documentados" />
            <StatItem value="456" label="Desean asociarse" />
            <StatItem value="5" label="Escenarios activos" />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
            Seguridad y confianza
          </h2>
        </div>
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <TrustBadge icon={<Shield className="h-5 w-5" />} label="Ley 1581 de Proteccion de Datos" />
          <TrustBadge icon={<Lock className="h-5 w-5" />} label="Conexion Segura SSL" />
          <TrustBadge icon={<Landmark className="h-5 w-5" />} label="Secretaria Distrital de Planeacion" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>SkyMatch - Plataforma GovTech ZIDA</p>
          <p className="mt-1">Secretaria Distrital de Planeacion - Alcaldia de Bogota</p>
        </div>
      </footer>

      <SinuBot contextModule="landing" />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border border-border hover:shadow-md transition-shadow">
      <CardContent className="flex flex-col items-start gap-3 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  )
}
