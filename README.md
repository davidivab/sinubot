# 🏙️ SkyMatch - Plataforma GovTech ZIDA

**Demo interactivo de la plataforma de gestión territorial para la Zona de Influencia Directa Aeroportuaria (ZIDA) de Bogotá.**

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-orange?logo=cloudflare)](https://skymatch-demo.pages.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

---

## 📖 Descripción

SkyMatch es un **laboratorio virtual de reconversión asociativa** que conecta:

- 🏘️ **Moradores**: Registro de predios, caracterización social, visualización de opciones
- 🏗️ **Empresarios**: Exploración de oportunidades de desarrollo urbano con datos anonimizados
- 🏛️ **SDP (Secretaría Distrital de Planeación)**: Supervisión, priorización y mediación institucional

### Características Principales

✅ **Transparencia Algorítmica Total**: Todas las fórmulas de índices (ICS, CJ, TM, BL) son visibles y auditables  
✅ **Trazabilidad Completa**: Logs inmutables con firma SHA-256 para cada escenario  
✅ **Protección de Datos**: Cumplimiento Ley 1581/2012, anonimización automática, cifrado AES-256  
✅ **Vistas Diferenciadas**: Cada actor ve solo lo que necesita según su rol  
✅ **Progressive Web App**: Funciona offline y es instalable

---

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 20.x o superior
- **npm** o **pnpm**
- **Git**

### Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/skymatch-demo.git
cd skymatch-demo

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Usuarios de Prueba

| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| **Morador** | carlos.ramirez@email.com | demo123 | 3 predios registrados, caracterización completa |
| **Empresario** | ana.martinez@constructora.com | demo123 | 5 escenarios activos |
| **SDP** | pedro.lopez@sdp.gov.co | demo123 | Panel de administración completo |

---

## 📦 Estructura del Proyecto

```
sinubot/
├── app/                      # Next.js App Router
│   ├── dashboard/            # Dashboard Morador
│   ├── empresario/          # Dashboards y Escenarios Empresario
│   │   ├── dashboard/
│   │   └── escenarios/
│   ├── sdp/                  # Panel SDP
│   │   ├── dashboard/
│   │   ├── escenarios/
│   │   └── usuarios/
│   ├── caracterizacion/      # Formulario caracterización social
│   ├── mapa/                 # Mapa interactivo ZIDA
│   ├── predios/              # Gestión de predios
│   ├── login/                # Autenticación
│   └── registro/             # Registro de usuarios
├── components/               # Componentes reutilizables
│   ├── skymatch/            # Componentes específicos SkyMatch
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── mock-data.ts          # Datos de demostración
│   ├── constants.ts          # Constantes de la aplicación
│   └── utils.ts              # Utilidades
├── public/                   # Assets estáticos
└── styles/                   # Estilos globales
```

---

## 🌐 Deployment en Cloudflare Pages

### Opción 1: Deployment Automático con GitHub Actions

1. **Crear proyecto en Cloudflare Pages**:
   - Ir a [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Pages → Create a project → Connect to Git
   - Seleccionar repositorio `skymatch-demo`

2. **Configurar secretos en GitHub**:
   ```
   CLOUDFLARE_API_TOKEN=tu_api_token
   CLOUDFLARE_ACCOUNT_ID=tu_account_id
   ```

3. **Push a main branch**:
   ```bash
   git add .
   git commit -m "Deploy to Cloudflare Pages"
   git push origin main
   ```

   El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente.

### Opción 2: Deployment Manual

```bash
# Build del proyecto
npm run build

# Deploy con Wrangler
npm run deploy
```

### Configuración de Cloudflare Pages

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Node version** | `20` |
| **Framework preset** | `Next.js (Static Export)` |

---

## 🎨 Funcionalidades Implementadas

### 1️⃣ Caso de Uso: Selección y Agrupación de Predios

- ✅ Criterios de agrupación explícitos (contigüidad geométrica)
- ✅ Cálculo de área total del englobe
- ✅ Detección de restricciones (EEP, parques, patrimonio histórico)
- ✅ Conteo de familias afectadas
- ✅ Trazabilidad completa del proceso

**Pantalla**: `/empresario/escenarios/nuevo` → Paso 2: Selección de Predios

### 2️⃣ Caso de Uso: Simulación con Indicadores Transparentes

#### Índices Calculados

| Índice | Nombre | Fórmula | Fuente de Datos |
|--------|--------|---------|-----------------|
| **ICS** | Índice de Complejidad Social | `(familias × 0.3) + (temores × 0.4) + (antigüedad × 0.3)` | SINUPOT + Caracterización |
| **CJ** | Complejidad Jurídica | `(saneamientos × 0.4) + (litigios × 0.6)` | Catastro + SDP |
| **TM** | Tamaño de Mercado | `área_total × densidad_objetivo × precio_m2` | POT + Mercado |
| **BL** | Bondad Locativa | `(accesibilidad × 0.3) + (servicios × 0.4) + (normativa × 0.3)` | ArcGIS + POT |

- ✅ Tooltip con desglose metodológico completo
- ✅ Datos de entrada con fuentes verificables
- ✅ Escalado transparente (0-100)
- ✅ Exportación de ficha PDF con memoria de cálculo

**Pantalla**: `/empresario/escenarios/nuevo` → Paso 3: Validación ICS

### 3️⃣ Caso de Uso: Vistas Diferenciadas por Actor

#### Vista Morador (`/dashboard`)
- ✅ Estado de mis casos en tiempo real
- ✅ Pedagogía normativa ("¿Qué es un englobe?")
- ✅ Buzón de preguntas a SDP
- ✅ Protección de datos personales (sin exposición pública)

#### Vista Empresario (`/empresario/dashboard`)
- ✅ Catálogo de oportunidades con datos anonimizados
- ✅ Calculadora de viabilidad
- ✅ **SIN acceso a**: nombres, cédulas, contactos de moradores
- ✅ Restricciones anti-presión (máx 3 ofertas/año por predio)

#### Vista SDP (`/sdp/dashboard`)
- ✅ Mapa de calor con "bolsas de oportunidad"
- ✅ Alertas de alta vulnerabilidad social
- ✅ Log de auditoría SHA-256
- ✅ Herramientas para priorizar y activar mesas de concertación

### 4️⃣ Trazabilidad Completa

- ✅ **Logs inmutables**: Cada escenario genera un hash SHA-256
- ✅ **Auditoría independiente**: Posibilidad de replicar resultados
- ✅ **Timestamps**: Registro de quién hizo qué y cuándo
- ✅ **Control de versiones**: Historial de cambios en escenarios

**Pantalla**: `/sdp/escenarios/[id]` → Pestaña "Auditoría"

### 5️⃣ Protección de Datos (Ley 1581/2012)

- ✅ **Anonimización automática** en vistas de empresarios
- ✅ **Cifrado AES-256** en reposo (datos personales)
- ✅ **TLS 1.3** en tránsito
- ✅ **Registro de consentimientos** con fecha y hora
- ✅ **Bloqueo de ofertas**: Morador puede bloquear empresarios específicos
- ✅ **Límite de ofertas**: Máximo 3 ofertas/año por predio (anti-spam)

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | Next.js | 16.1.6 |
| **Runtime** | React | 19.2.4 |
| **Lenguaje** | TypeScript | 5.7.3 |
| **Estilos** | Tailwind CSS | 4.1.9 |
| **UI Components** | Radix UI + shadcn/ui | Latest |
| **Charts** | Recharts | 2.15.0 |
| **Forms** | React Hook Form + Zod | Latest |
| **Deployment** | Cloudflare Pages | - |
| **CI/CD** | GitHub Actions | - |

---

## 📊 Datos de Demostración

El demo utiliza datos **sintéticos** representativos de la ZIDA:

- **30,023 predios** simulados en Engativá y Fontibón
- **1,247 moradores** registrados
- **834 predios** documentados
- **456 predios** con intención de asociarse
- **5 escenarios** activos de empresarios

Los datos NO son reales y solo tienen fines demostrativos.

---

## 🔐 Seguridad

### Salvaguardas Implementadas

1. **Autenticación 2FA** (simulada con OTP SMS)
2. **Validación de sesiones** con JWT
3. **Cifrado end-to-end** de datos sensibles
4. **Rate limiting** para prevenir ataques
5. **Sanitización de inputs** para evitar XSS
6. **Logs de auditoría** inmutables
7. **CORS configurado** para producción

### Cumplimiento Normativo

- ✅ Ley 1581/2012 (Protección de Datos Personales)
- ✅ Decreto 1074/2015 (Sector Comercio)
- ✅ OWASP Top 10 (Seguridad Web)
- ✅ Política de Gobierno Digital (MinTIC)

---

## 📱 Progressive Web App (PWA)

SkyMatch es instalable como aplicación nativa:

1. Visitar el sitio en Chrome/Edge
2. Clic en el ícono de instalación
3. La app funcionará offline con datos en caché

---

## 🤝 Contribuir

Este es un demo del proyecto SkyMatch para el **Reto de Ciudad 3 - Bogotá Región Aeroportuaria**.

Si eres parte del equipo de evaluación o quieres reportar un bug:

1. Crear un issue en este repositorio
2. Enviar email a: **info@iyata.com.co**

---

## 📄 Licencia

**Apache 2.0** - Este proyecto es de código abierto.

Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Equipo IYATA

| Rol | Nombre | Dedicación |
|-----|--------|------------|
| **Tech Lead** | David Velandia | 40% |
| **Backend Developer** | Sergio Murcia | 100% |
| **Frontend Developer** | Andrés Rodríguez | 100% |
| **QA Engineer** | Daniel Castro | 100% |
| **UX/UI Designer** | Gisella Parada | 60% |
| **Especialista GIS** | Por contratar | 80% |
| **Consultor Urbanismo** | Por contratar | 40% |

---

## 📞 Contacto

- **Website**: [www.iyata.com.co](https://www.iyata.com.co)
- **Email**: info@iyata.com.co
- **Teléfono**: +57 (1) 234-5678
- **GitHub**: [@iyata-corp](https://github.com/iyata-corp)

---

## 🎯 Roadmap

### Versión 1.0 (Demo - Actual)
- ✅ Autenticación multi-rol
- ✅ Dashboard por actor
- ✅ Gestión de predios
- ✅ Caracterización social
- ✅ Simulación de escenarios
- ✅ Mapa interactivo
- ✅ Transparencia algorítmica
- ✅ Trazabilidad completa

### Versión 2.0 (TRL5 - Q3 2026)
- 🔄 Integración con SINUPOT (API de SDP)
- 🔄 Integración con ArcGIS Enterprise
- 🔄 Motor de simulación PostGIS en servidor
- 🔄 Autenticación GOV.CO
- 🔄 Firma digital con DigitalWare

### Versión 3.0 (Producción - Q1 2027)
- ⏳ Despliegue en servidores SDP
- ⏳ Módulo de mediación institucional
- ⏳ Sistema de notificaciones SMS/Email
- ⏳ App móvil nativa (iOS + Android)
- ⏳ Panel de analítica avanzada

---

**Hecho con ❤️ por IYATA | Soluciones Tecnológicas que Transforman la Gestión Pública**
