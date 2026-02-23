# 📘 Guía de Deployment - SkyMatch Demo

Esta guía te ayudará a desplegar el demo de SkyMatch en Cloudflare Pages desde cero.

---

## 🎯 Opciones de Deployment

### Opción 1: Deployment Automático con GitHub Actions (Recomendado)

#### Paso 1: Configurar Cloudflare Pages

1. **Crear proyecto en Cloudflare**:
   - Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Selecciona tu cuenta
   - Ve a `Pages` → `Create a project`
   - Selecciona `Connect to Git`

2. **Conectar repositorio**:
   - Autoriza GitHub
   - Selecciona el repositorio `skymatch-demo`
   - Autoriza el acceso de Cloudflare

3. **Configurar build**:
   ```
   Framework preset: Next.js (Static Export)
   Build command: npm run build
   Build output directory: out
   Node version: 20
   ```

4. **Variables de entorno** (opcional):
   ```
   NODE_ENV=production
   NEXT_PUBLIC_APP_NAME=SkyMatch
   ```

#### Paso 2: Obtener API Token de Cloudflare

1. Ve a `My Profile` → `API Tokens`
2. Clic en `Create Token`
3. Usa el template `Edit Cloudflare Workers`
4. Permisos necesarios:
   - Account → Cloudflare Pages → Edit
   - Account → Account Settings → Read
5. Copia el token generado (solo se muestra una vez)

#### Paso 3: Configurar Secretos en GitHub

1. Ve a tu repositorio en GitHub
2. `Settings` → `Secrets and variables` → `Actions`
3. Agrega los siguientes secretos:

   ```
   CLOUDFLARE_API_TOKEN=tu_api_token_aqui
   CLOUDFLARE_ACCOUNT_ID=tu_account_id_aqui
   ```

   Para obtener tu `CLOUDFLARE_ACCOUNT_ID`:
   - Ve a Cloudflare Dashboard
   - Selecciona cualquier sitio
   - Busca en la URL: `https://dash.cloudflare.com/{ACCOUNT_ID}/...`

#### Paso 4: Hacer Push para Desplegar

```bash
git add .
git commit -m "Deploy to Cloudflare Pages"
git push origin main
```

El workflow de GitHub Actions se ejecutará automáticamente y desplegará tu sitio.

---

### Opción 2: Deployment Manual con Wrangler CLI

#### Paso 1: Instalar Wrangler

```bash
npm install -g wrangler
```

#### Paso 2: Autenticar con Cloudflare

```bash
wrangler login
```

Se abrirá un navegador para que autorices el acceso.

#### Paso 3: Build del Proyecto

```bash
npm run build
```

Esto generará la carpeta `out/` con el sitio estático.

#### Paso 4: Desplegar

```bash
npm run deploy
```

O directamente:

```bash
wrangler pages deploy out --project-name=skymatch-demo
```

#### Paso 5: Configurar Dominio Personalizado (Opcional)

1. Ve a Cloudflare Pages
2. Selecciona tu proyecto `skymatch-demo`
3. Ve a `Custom domains`
4. Agrega tu dominio (ej: `demo.skymatch.gov.co`)
5. Cloudflare configurará automáticamente DNS y SSL

---

## 🔧 Configuración Avanzada

### Variables de Entorno en Producción

Para agregar variables de entorno en Cloudflare Pages:

1. Ve a tu proyecto en Cloudflare Pages
2. `Settings` → `Environment variables`
3. Agrega las variables:

   ```
   NEXT_PUBLIC_APP_URL=https://skymatch-demo.pages.dev
   NEXT_PUBLIC_API_URL=https://api.skymatch.gov.co
   NODE_ENV=production
   ```

4. Redeploy el proyecto para que tomen efecto

### Configurar Dominios por Ambiente

Cloudflare Pages soporta Preview Deployments:

- **Production**: `main` branch → `skymatch-demo.pages.dev`
- **Staging**: `develop` branch → `develop.skymatch-demo.pages.dev`
- **PRs**: Cada PR → `pr-{number}.skymatch-demo.pages.dev`

Configúralo en:
- Cloudflare Pages → Settings → Builds & deployments → Production branch

### Configurar Redirects y Headers

Crea un archivo `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-XSS-Protection: 1; mode=block
```

Crea un archivo `public/_redirects`:

```
# Redirect www to non-www
https://www.skymatch-demo.pages.dev/* https://skymatch-demo.pages.dev/:splat 301!

# Redirect old paths
/old-path /new-path 301
```

---

## 📊 Monitoreo y Analítica

### Cloudflare Web Analytics (Gratis)

1. Ve a `Analytics` → `Web Analytics`
2. Agrega tu sitio
3. Copia el snippet de código
4. Agrégalo en `app/layout.tsx`:

```tsx
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "tu_token_aqui"}'></script>
```

### Configurar Logs

Cloudflare Pages captura automáticamente:
- Build logs
- Deployment logs
- Error logs

Accede a ellos en:
- Cloudflare Pages → Deployments → View details

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Causa**: Dependencias faltantes o errores de TypeScript

**Solución**:
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar build local
npm run build
```

### Error: "API Token invalid"

**Causa**: Token expirado o sin permisos

**Solución**:
1. Genera un nuevo API Token en Cloudflare
2. Actualiza el secreto en GitHub
3. Re-ejecuta el workflow

### Error: "Out of memory during build"

**Causa**: Build muy pesado para el límite de Cloudflare

**Solución**:
```bash
# Reducir tamaño de build
# En next.config.mjs:
export default {
  ...otherConfig,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

### El sitio no se actualiza después de deployment

**Causa**: Caché del navegador

**Solución**:
1. Purge Cloudflare cache:
   - Cloudflare → Caching → Configuration → Purge Everything
2. O espera ~5 minutos para propagación

---

## 🔄 Rollback a Versión Anterior

Si algo sale mal:

1. Ve a Cloudflare Pages → Deployments
2. Encuentra el deployment anterior exitoso
3. Clic en `...` → `Rollback to this deployment`
4. Confirma

El rollback es instantáneo.

---

## 📈 Performance Optimization

### Enable HTTP/3

1. Cloudflare → Speed → Optimization
2. Enable `HTTP/3 (with QUIC)`

### Enable Auto Minify

1. Cloudflare → Speed → Optimization
2. Enable:
   - Auto Minify JavaScript
   - Auto Minify CSS
   - Auto Minify HTML

### Enable Brotli Compression

Habilitado por defecto en Cloudflare Pages ✅

### Configure Caching

Crea `public/_headers`:

```
# Cache static assets for 1 year
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

# Don't cache HTML
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## ✅ Checklist de Pre-Deployment

Antes de hacer deployment a producción:

- [ ] Todas las dependencias están instaladas (`npm install`)
- [ ] Build local exitoso (`npm run build`)
- [ ] Variables de entorno configuradas (.env.example → .env.local)
- [ ] Tests pasando (si existen)
- [ ] Lint sin errores (`npm run lint`)
- [ ] No hay console.logs en código de producción
- [ ] Todas las imágenes optimizadas
- [ ] README actualizado
- [ ] CHANGELOG actualizado con cambios
- [ ] Git tags creados para la versión

---

## 🎉 Post-Deployment

Después del deployment exitoso:

1. **Verificar sitio en producción**:
   - Abrir https://skymatch-demo.pages.dev
   - Probar todas las rutas principales
   - Verificar en mobile y desktop

2. **Monitorear métricas**:
   - Core Web Vitals en Cloudflare Analytics
   - Errores en Cloudflare Logs
   - Build time y deploy time

3. **Notificar al equipo**:
   - Slack/Discord con enlace al deployment
   - Changelog de cambios incluidos
   - Screenshots si hay cambios visuales

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
2. Revisa [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
3. Contacta al equipo: **info@iyata.com.co**

---

**Última actualización**: 23 de febrero de 2026  
**Mantenido por**: IYATA | Equipo SkyMatch
