# 🧪 Guía de Desarrollo Local y Testing - SkyMatch Demo

Esta guía te ayudará a configurar el ambiente de desarrollo local y ejecutar el demo de SkyMatch.

---

## 🚀 Setup Inicial

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 20.x o superior ([Descargar aquí](https://nodejs.org/))
- **npm** 9.x o superior (incluido con Node.js)
- **Git** ([Descargar aquí](https://git-scm.com/))
- **Editor de código** (recomendamos [VS Code](https://code.visualstudio.com/))

Verifica las versiones:

```bash
node --version  # Debe mostrar v20.x.x o superior
npm --version   # Debe mostrar 9.x.x o superior
git --version   # Cualquier versión reciente
```

---

## 📥 Clonar el Repositorio

```bash
# Opción 1: HTTPS
git clone https://github.com/tu-usuario/skymatch-demo.git

# Opción 2: SSH (si tienes SSH key configurada)
git clone git@github.com:tu-usuario/skymatch-demo.git

# Entrar al directorio
cd skymatch-demo
```

---

## 📦 Instalar Dependencias

### Con npm (recomendado para este proyecto)

```bash
npm install
```

### Con pnpm (alternativa más rápida)

```bash
# Si no tienes pnpm instalado:
npm install -g pnpm

# Instalar dependencias
pnpm install
```

Esto instalará todas las dependencias listadas en `package.json`.

---

## ⚙️ Configurar Variables de Entorno

1. **Copiar archivo de ejemplo**:

```bash
cp .env.example .env.local
```

2. **Editar `.env.local`** con tus valores:

```env
# Application
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=SkyMatch
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_TRAZABILIDAD=true
NEXT_PUBLIC_ENABLE_TRANSPARENCIA_ALGORITMICA=true
NEXT_PUBLIC_ENABLE_PROTECCION_DATOS=true
```

**Nota**: El archivo `.env.local` está en `.gitignore` y NO se subirá a Git (es seguro para secretos).

---

## 🏃 Ejecutar en Desarrollo

### Iniciar servidor de desarrollo

```bash
npm run dev
```

Esto iniciará el servidor en `http://localhost:3000`

Verás un mensaje similar a:

```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Ready in 2.1s
```

### Características del modo desarrollo

- ✅ **Hot Reload**: Los cambios se reflejan automáticamente sin recargar
- ✅ **Source Maps**: Errores muestran el código original
- ✅ **Fast Refresh**: Preserva el estado de React entre cambios
- ✅ **TypeScript Checking**: Errores de tipos en tiempo real

### Puertos alternativos

Si el puerto 3000 está ocupado:

```bash
npm run dev -- -p 3001
```

---

## 🧪 Testing del Demo

### Usuarios de Prueba

El demo incluye usuarios de prueba pre-configurados:

#### Morador
- **Email**: `carlos.ramirez@email.com`
- **Contraseña**: `demo123`
- **Acceso a**: Dashboard morador, gestión de predios, caracterización

#### Empresario
- **Email**: `ana.martinez@constructora.com`
- **Contraseña**: `demo123`
- **Acceso a**: Dashboard empresario, creación de escenarios, catálogo de oportunidades

#### SDP (Admin)
- **Email**: `pedro.lopez@sdp.gov.co`
- **Contraseña**: `demo123`
- **Acceso a**: Panel de administración, revisión de escenarios, gestión de usuarios, auditoría

### Flujo de Prueba Completo

#### Flujo 1: Morador Registra Predio

1. Iniciar sesión como morador
2. Ir a `/dashboard`
3. Clic en `Agregar predio`
4. Llenar formulario con código CHIP (ej: `AAA-0010-WXYZ`)
5. Completar caracterización social
6. Verificar que aparece en el mapa

#### Flujo 2: Empresario Crea Escenario

1. Iniciar sesión como empresario
2. Ir a `/empresario/dashboard`
3. Clic en `Nuevo Escenario`
4. **Paso 1**: Información básica
   - Nombre: "Renovación Urbana Test"
   - Tipo: "Renovación Urbana"
   - Inversión: $15,000,000,000
5. **Paso 2**: Selección de predios
   - Verificar criterios de agrupación (contigüidad)
   - Ver área total y familias afectadas
6. **Paso 3**: Validación ICS
   - Pasar cursor sobre cada índice para ver fórmula completa
   - Verificar transparencia algorítmica
7. **Paso 4**: Simulación
   - Ver vistas diferenciadas por actor
   - Revisar logs de auditoría SHA-256
8. Confirmar y enviar

#### Flujo 3: SDP Revisa Escenario

1. Iniciar sesión como SDP
2. Ir a `/sdp/dashboard`
3. Ver "Escenarios Pendientes de Revisión"
4. Clic en un escenario para revisar
5. Ver:
   - Logs de auditoría completos
   - Índices calculados con trazabilidad
   - Datos de moradores (protegidos)
6. Aprobar o rechazar con comentarios

---

## 🔍 Verificar Funcionalidades Implementadas

### Checklist de Funcionalidades

Verifica que cada funcionalidad esté funcionando:

#### ✅ Caso de Uso 1: Selección y Agrupación

- [ ] Criterios de agrupación explícitos (contigüidad)
- [ ] Cálculo de área total del englobe
- [ ] Detección de familias afectadas
- [ ] Restricciones detectadas (EEP, parques)
- [ ] TEXTO en pantalla: "Agrupación con criterio explícito: no es una caja negra"

**Probar en**: `/empresario/escenarios/nuevo` → Paso 2

#### ✅ Caso de Uso 2: Simulación con Indicadores Transparentes

- [ ] ICS con tooltip que muestra fórmula completa
- [ ] CJ con desglose metodológico
- [ ] TM con datos de entrada
- [ ] BL con escalado transparente
- [ ] Ficha PDF descargable con memoria de cálculo

**Probar en**: `/empresario/escenarios/nuevo` → Paso 3

#### ✅ Caso de Uso 3: Vistas Diferenciadas

- [ ] Vista Empresario: Datos anonimizados
- [ ] Vista SDP: Mapa de calor, alertas, logs
- [ ] Vista Morador: Estado, pedagogía, buzón
- [ ] Protección anti-presión (límite 3 ofertas/año)
- [ ] Logs SHA-256 inmutables

**Probar en**: `/empresario/escenarios/nuevo` → Paso 4

#### ✅ Trazabilidad Completa

- [ ] Cada acción genera un log con timestamp
- [ ] Hash SHA-256 visible en cada registro
- [ ] Verificación de integridad
- [ ] Metadata expandible en logs

**Probar en**: Cualquier dashboard → Ver logs de auditoría

#### ✅ Protección de Datos

- [ ] Datos de moradores ocultos para empresarios
- [ ] Badges de protección visibles
- [ ] Consentimientos registrados (Ley 1581)
- [ ] Anonimización automática

**Probar en**: Vista empresario vs vista SDP (comparar acceso a datos)

---

## 🏗️ Build para Producción

### Build local

```bash
npm run build
```

Esto generará:
- Carpeta `out/` con el sitio estático
- Optimización de imágenes
- Minificación de JS/CSS
- Tree shaking

### Preview del build

```bash
npm run preview
```

Esto sirve la carpeta `out/` en `http://localhost:8080`

---

## 🧹 Comandos Útiles

### Linting

```bash
npm run lint
```

Muestra errores de ESLint y TypeScript.

### Limpiar cache y reinstalar

```bash
rm -rf node_modules .next out
npm install
npm run dev
```

### Verificar tipos de TypeScript

```bash
npx tsc --noEmit
```

### Ver árbol de dependencias

```bash
npm list --depth=0
```

---

## 🐛 Troubleshooting Local

### Error: "Port 3000 already in use"

**Solución 1**: Usar otro puerto
```bash
npm run dev -- -p 3001
```

**Solución 2**: Matar proceso que usa el puerto
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Error: "Module not found"

**Causa**: Dependencias no instaladas

**Solución**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "TypeScript errors in production build"

**Causa**: Errores de tipos no resueltos

**Solución temporal** (no recomendado para producción):
```typescript
// next.config.mjs
export default {
  typescript: {
    ignoreBuildErrors: true, // Solo para desarrollo
  },
}
```

**Solución correcta**: Arreglar los errores de tipos

### Hot Reload no funciona

**Solución**:
1. Verifica que no tengas archivos con caracteres especiales
2. Reinicia el servidor de desarrollo
3. Limpia caché: `rm -rf .next`

---

## 📱 Testing en Móvil (Local Network)

### Configurar acceso desde móvil

1. Obtén tu IP local:

```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

Ejemplo: `192.168.1.45`

2. Inicia el servidor permitiendo conexiones externas:

```bash
npm run dev -- -H 0.0.0.0
```

3. En tu móvil (conectado a la misma WiFi), abre:

```
http://192.168.1.45:3000
```

### Testing responsive

Usa las DevTools de Chrome:

1. F12 para abrir DevTools
2. Click en el ícono de móvil (Toggle device toolbar)
3. Selecciona dispositivos: iPhone 14, Samsung Galaxy, iPad

---

## 🔐 Variables de Entorno por Ambiente

### Desarrollo (`.env.local`)

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### Staging (`.env.staging`)

```env
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging.skymatch-demo.pages.dev
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Producción (`.env.production`)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://skymatch-demo.pages.dev
NEXT_PUBLIC_ENABLE_DEBUG=false
```

---

## 📊 Monitoreo en Desarrollo

### Ver logs estructurados

El demo usa `console.log` para debugging. En producción, estos se eliminan automáticamente.

Para ver logs detallados:

```bash
# En app/layout.tsx o _app.tsx
if (process.env.NODE_ENV === 'development') {
  console.log('🚀 SkyMatch iniciado en modo desarrollo')
}
```

---

## ✅ Checklist de Pre-Deployment

Antes de hacer deployment:

- [ ] `npm run build` sin errores
- [ ] `npm run lint` sin warnings
- [ ] Todos los componentes probados manualmente
- [ ] Usuarios de prueba funcionan correctamente
- [ ] Formularios validan inputs correctamente
- [ ] Navegación entre páginas funciona
- [ ] Protección de datos implementada
- [ ] Logs de auditoría generándose
- [ ] Tooltips de fórmulas mostrándose
- [ ] Datos anonimizados en vistas de empresario
- [ ] README actualizado

---

## 🎯 Próximos Pasos

Una vez que tengas el demo funcionando localmente:

1. **Prueba todas las funcionalidades** con los 3 usuarios de prueba
2. **Revisa la auditoría** en `/gerencia/iyata/propuestas/ciudad_aeroportuaria/propuesta_retroalimentacion/AUDITORIA_Retroalimentacion_vs_Documentos_Generados.md`
3. **Haz deployment a Cloudflare Pages** siguiendo `DEPLOYMENT.md`
4. **Comparte el enlace** con el equipo y Great Boost

---

## 📞 Soporte

Si tienes problemas ejecutando el demo localmente:

1. Revisa la [documentación de Next.js](https://nextjs.org/docs)
2. Busca en [GitHub Issues](https://github.com/tu-usuario/skymatch-demo/issues)
3. Contacta al equipo: **info@iyata.com.co**

---

**Última actualización**: 23 de febrero de 2026  
**Mantenido por**: IYATA | Equipo SkyMatch  
**Versión del demo**: 1.0.0 (TRL5)
