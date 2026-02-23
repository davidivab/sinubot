# ⚡ Quick Start - SkyMatch Demo

**¿Necesitas ejecutar el demo AHORA? Sigue estos pasos.**

---

## 🚀 5 Pasos para Ejecutar Localmente

### 1️⃣ Instalar dependencias

```bash
cd /Users/david/Desktop/projects/sinubot
npm install
```

### 2️⃣ Copiar variables de entorno

```bash
cp .env.example .env.local
```

### 3️⃣ Iniciar servidor de desarrollo

```bash
npm run dev
```

### 4️⃣ Abrir navegador

```
http://localhost:3000
```

### 5️⃣ Login con usuario de prueba

**Empresario** (recomendado para ver funcionalidades completas):
- Email: `ana.martinez@constructora.com`
- Contraseña: `demo123`

---

## 🎯 Ver las Funcionalidades Implementadas

### Caso de Uso 1: Selección y Agrupación

1. Login como empresario
2. Ir a `/empresario/dashboard`
3. Clic en `Nuevo Escenario`
4. Completar Paso 1 (información básica)
5. **Ver Paso 2**: Criterios explícitos, área total, familias afectadas

### Caso de Uso 2: Simulación con Indicadores

1. Continuar en el formulario anterior
2. **Ver Paso 3**: Pasar cursor sobre cada índice (ICS, CJ, TM, BL)
3. Tooltip mostrará:
   - Fórmula completa
   - Fuentes de datos
   - Proceso de cálculo paso a paso
   - Interpretación por niveles

### Caso de Uso 3: Vistas Diferenciadas

1. Continuar en el formulario anterior
2. **Ver Paso 4**: 
   - Vista actual: Empresario (datos anonimizados)
   - Comparar con vistas SDP y Morador
   - Ver logs de auditoría SHA-256
   - Ver protección anti-presión

---

## 🌐 Deployment Rápido a Cloudflare

### Opción 1: Manual (5 minutos)

```bash
# Build
npm run build

# Deploy
npm run deploy
```

Sigue las instrucciones en terminal para autenticar con Cloudflare.

### Opción 2: Automático con GitHub (una sola vez)

1. Configurar secretos en GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

2. Push:
```bash
git add .
git commit -m "Deploy SkyMatch demo"
git push origin main
```

GitHub Actions desplegará automáticamente.

---

## 📚 Documentación Completa

- **Setup local detallado**: `LOCAL_SETUP.md`
- **Deployment paso a paso**: `DEPLOYMENT.md`
- **Historial de cambios**: `CHANGELOG.md`
- **Resumen ejecutivo**: `RESUMEN_EJECUTIVO.md`
- **Auditoría completa**: `AUDITORIA_Retroalimentacion_vs_Documentos_Generados.md`

---

## 🆘 Troubleshooting Rápido

### Error: "Port 3000 already in use"

```bash
npm run dev -- -p 3001
```

### Error: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error en build

```bash
npm run build
# Si hay errores de TypeScript, están configurados para ser ignorados en producción
```

---

## ✅ Checklist Rápido

Antes de presentar el demo:

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona en `http://localhost:3000`
- [ ] Login con los 3 usuarios de prueba funciona
- [ ] Paso 2 muestra criterios de agrupación
- [ ] Paso 3 muestra tooltips con fórmulas
- [ ] Paso 4 muestra logs SHA-256
- [ ] Build funciona: `npm run build`

---

## 🎥 Demo Flow (5 minutos)

**Script para demostración**:

1. **[0:00-0:30]** Landing page → Explicar problema ZIDA
2. **[0:30-1:00]** Login como empresario → Dashboard
3. **[1:00-2:00]** Nuevo escenario → Paso 1 (información básica)
4. **[2:00-2:45]** Paso 2 → **MOSTRAR**: Criterios explícitos, área, familias
5. **[2:45-3:30]** Paso 3 → **MOSTRAR**: Pasar cursor sobre ICS → Fórmula completa
6. **[3:30-4:15]** Paso 4 → **MOSTRAR**: Logs SHA-256, vistas por actor
7. **[4:15-5:00]** Confirmar → Ver dashboard SDP → Auditoría

---

## 📞 Contacto

**Soporte**: info@iyata.com.co  
**Docs**: Ver README.md para guía completa

---

**¡Listo! 🎉 Tu demo está funcionando.**
