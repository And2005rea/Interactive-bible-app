# 🙏 Apokályptos - Red Social Bíblica

**Prototipo Frontend Completo** - Una red social moderna para conectar a la comunidad cristiana a través de las escrituras.

## 📋 Descripción del Proyecto

Apokályptos es una red social bíblica diseñada para motivar a personas de todas las edades a acercarse a Dios y crear comunidad. El nombre significa "revelación" o "descubrir lo oculto", representando cómo Dios se revela en nuestras vidas.

### 🎯 Características Principales

- **🔐 Sistema de Autenticación** con personajes bíblicos únicos
- **📖 Feed de Versículos** con interacciones sociales (likes, comentarios, compartir)
- **🔍 Búsqueda Avanzada** con filtros de palabras y testamentos
- **🌐 Traducciones Bíblicas** en español, hebreo y griego koiné
- **📝 Block de Notas Espiritual** para reflexiones personales
- **📱 Diseño Responsivo** optimizado para móviles y desktop

### 🎨 Diseño y UX

- **Paleta de Colores**: Zapote, Lila, Turquesa, Dorado
- **Tipografías**: Poppins (principal), Dancing Script (títulos decorativos)
- **Animaciones Sutiles** que mejoran la experiencia sin distraer
- **Efectos Glassmorphism** para un look moderno y elegante

---

## 🚀 Instalación y Configuración

### 📁 Estructura del Proyecto

```
apokaliptos-prototype/
├── 📄 index.html                 # Página principal (vanilla)
├── 📦 package.json              # Configuración del proyecto
├── 📖 README.md                 # Documentación
├── src/
│   ├── styles/
│   │   └── 🎨 styles.css        # Estilos principales
│   ├── scripts/
│   │   └── ⚡ main.js           # JavaScript principal
│   └── assets/
│       └── 🖼️ (imágenes)
├── public/
│   └── 📁 (archivos públicos)
└── react-version/
    ├── 📦 package.json          # Configuración React
    ├── public/
    │   └── 📄 index.html        # HTML base React
    └── src/
        ├── ⚛️ App.js            # Componente principal
        ├── 🎨 App.css           # Estilos React
        ├── ⚡ index.js          # Punto de entrada
        └── components/
            └── 📁 (componentes)
```

---

## 💻 Comandos PowerShell para Crear el Proyecto

### 🏗️ Crear Estructura Completa

```powershell
# Crear la carpeta principal del proyecto
mkdir apokaliptos-prototype
cd apokaliptos-prototype

# Crear estructura de carpetas
mkdir src, src/components, src/styles, src/scripts, src/assets, public

# Crear archivos principales
New-Item -ItemType File -Name "index.html"
New-Item -ItemType File -Name "src/styles/styles.css"
New-Item -ItemType File -Name "src/scripts/main.js"
New-Item -ItemType File -Name "package.json"
New-Item -ItemType File -Name "README.md"

# Para React
mkdir react-version
cd react-version
mkdir src, src/components, src/styles, public
New-Item -ItemType File -Name "package.json"
New-Item -ItemType File -Name "src/App.js"
New-Item -ItemType File -Name "src/App.css"
New-Item -ItemType File -Name "src/index.js"
New-Item -ItemType File -Name "public/index.html"

# Volver al directorio principal
cd ..

Write-Host "✅ Estructura del proyecto creada exitosamente!" -ForegroundColor Green
```

---

## 🌐 Versión Vanilla (HTML/CSS/JS)

### 🔧 Instalación

```bash
# Clonar o descargar el proyecto
cd apokaliptos-prototype

# Instalar dependencias (opcional - solo para live-server)
npm install

# Iniciar servidor de desarrollo
npm start
# O directamente:
npx live-server .
```

### 📱 Uso

1. Abrir `index.html` en el navegador
2. Navegar por las diferentes secciones
3. Probar funcionalidades interactivas

### 🗂️ Archivos Principales

- **`index.html`**: Estructura HTML completa
- **`src/styles/styles.css`**: Todos los estilos CSS
- **`src/scripts/main.js`**: Lógica JavaScript completa

---

## ⚛️ Versión React

### 🔧 Instalación

```bash
# Navegar a la versión React
cd react-version

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### 📱 Uso

1. El proyecto se abre automáticamente en `http://localhost:3000`
2. Desarrollo con hot-reload automático
3. Componentes React modulares y reutilizables

### 🗂️ Archivos Principales

- **`src/App.js`**: Componente principal con toda la lógica
- **`src/App.css`**: Estilos CSS adaptados para React
- **`src/index.js`**: Punto de entrada de la aplicación

---

## 🎯 Funcionalidades Implementadas

### 🔐 **Autenticación**
- **Login/Registro** con validación de formularios
- **28 Personajes Bíblicos** con avatares únicos
- **Navegación con flechas** para explorar personajes
- **Animaciones dinámicas** en textos motivacionales

### 🏠 **Página Principal (Home)**
- **Feed de versículos** con interacciones sociales
- **Sistema de likes** con animación de estrellas
- **Comentarios anidados** con respuestas
- **Botón compartir** con modal de contactos

### 🔍 **Búsqueda Avanzada**
- **Filtros múltiples**: letras parciales, palabras exactas, frases consecutivas
- **Filtros por testamento**: Todo, AT, NT
- **Resultados reales** con datos bíblicos auténticos
- **Botón de traducción** en cada resultado

### 🌐 **Traducciones**
- **16 versículos completos** con traducciones auténticas
- **Textos en español, hebreo y griego koiné**
- **Pronunciaciones fonéticas** para idiomas originales
- **Scroll sincronizado** entre paneles
- **Botones de audio** simulados

### 📝 **Block de Notas**
- **Editor de notas** con cruz estática de fondo
- **Notas guardadas** expandibles/contraíbles
- **Edición y eliminación** con animaciones
- **Iconos flotantes** que aparecen al hover

### 📤 **Sistema de Compartir**
- **Modal de contactos** con 6 contactos ficticios
- **Selección múltiple** de destinatarios
- **Preview del versículo** a compartir
- **Animaciones fluidas** de apertura/cierre

---

## 🎨 Guía de Estilos

### 🎨 **Paleta de Colores**

```css
:root {
    --zapote: #FF6B35;      /* Naranja vibrante */
    --lila: #9B59B6;        /* Morado principal */
    --blanco: #FFFFFF;      /* Blanco puro */
    --turquesa: #1ABC9C;    /* Verde azulado */
    --gris-claro: #ECF0F1;  /* Gris suave */
    --texto-oscuro: #2C3E50; /* Azul oscuro */
    --dorado: #F39C12;      /* Dorado acentos */
    --azul-cielo: #3498DB;  /* Azul claro */
}
```

### 📱 **Tipografías**

```css
/* Principal */
font-family: 'Poppins', sans-serif;

/* Títulos decorativos */
font-family: 'Dancing Script', cursive;
```

### ✨ **Animaciones Principales**

- **`float`**: Elementos flotantes bíblicos
- **`shimmer`**: Efecto brillante en tarjetas
- **`subtleSlideUp`**: Transición de palabras dinámicas
- **`starRotate`**: Animación de likes
- **`bounce`**: Botón flotante de notas

---

## 📱 Responsive Design

### 🖥️ **Desktop (1200px+)**
- Diseño completo con todos los elementos
- Navegación horizontal
- Paneles de traducción lado a lado

### 📱 **Tablet (768px - 1199px)**
- Adaptación de espaciados
- Reorganización de elementos
- Mantenimiento de funcionalidades

### 📱 **Mobile (< 768px)**
- Navegación compacta
- Paneles apilados verticalmente
- Botones y textos optimizados
- Modales adaptados

---

## 🔄 Flujo de Usuario

### 🚀 **Primera Visita**
1. **Landing en Login** → Formulario de acceso
2. **Registro** → Datos personales → Selección de personaje
3. **Home** → Feed de versículos

### 🔍 **Búsqueda y Exploración**
1. **Búsqueda desde Home** → Página de búsqueda
2. **Resultados** → Click "Ver Traducción"
3. **Traducciones** → Versículo en idiomas originales

### 📝 **Gestión de Contenido**
1. **Crear nota** → Block de notas → Guardar
2. **Editar nota** → Hover → Ícono editar → Modal
3. **Eliminar nota** → Hover → Ícono eliminar → Confirmación

### 📤 **Interacciones Sociales**
1. **Like versículo** → Animación de estrella
2. **Compartir** → Modal de contactos → Selección → Envío
3. **Comentar** → Texto → Publicar → Interacciones

---

## 🛠️ Tecnologías Utilizadas

### 🌐 **Vanilla Version**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados con variables CSS
- **JavaScript ES6+** - Interactividad moderna
- **Google Fonts** - Tipografías Poppins y Dancing Script

### ⚛️ **React Version**
- **React 18** - Framework principal
- **React Hooks** - useState, useEffect, useRef
- **CSS Modules** - Estilos encapsulados
- **Create React App** - Toolchain de desarrollo

### 🎨 **Características CSS Avanzadas**
- **CSS Variables** - Paleta de colores dinámica
- **Flexbox & CSS Grid** - Layouts responsivos
- **CSS Animations** - Animaciones fluidas
- **Backdrop Filter** - Efectos glassmorphism
- **CSS Transforms** - Interacciones 3D

---

## 🚀 Próximos Pasos (Para Desarrollo Backend)

### 📊 **Base de Datos**
- **Usuarios**: ID, nombre, email, personaje_biblico
- **Versiculos**: ID, texto, referencia, testamento
- **Likes**: usuario_id, versiculo_id, timestamp
- **Comentarios**: ID, usuario_id, versiculo_id, texto, timestamp
- **Notas**: ID, usuario_id, titulo, contenido, timestamp

### 🔧 **APIs Necesarias**
```
GET /api/verses - Obtener versículos
POST /api/verses/:id/like - Dar like
GET /api/translations/:reference - Obtener traducciones
POST /api/notes - Crear nota
PUT /api/notes/:id - Editar nota
DELETE /api/notes/:id - Eliminar nota
```

### 🔐 **Autenticación**
- JWT tokens
- Validación de sesiones
- Protección de rutas privadas

### 📱 **Notificaciones**
- Sistema de notificaciones en tiempo real
- WebSockets para comentarios instantáneos
- Push notifications para móvil

---

## 👥 Contribución

### 🐛 **Reportar Bugs**
1. Usar GitHub Issues
2. Descripción detallada del problema
3. Pasos para reproducir
4. Screenshots si es necesario

### 💡 **Nuevas Funcionalidades**
1. Fork del repositorio
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -am 'Add: nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Pull Request con descripción detallada

### 📋 **Estándares de Código**
- **JavaScript**: ESLint + Prettier
- **CSS**: BEM methodology
- **React**: Functional components + Hooks
- **Commits**: Conventional Commits

---

## 📄 Licencia

MIT License - Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Desarrollado por

**Equipo Apokályptos** - Red Social Bíblica

### 📞 **Contacto**
- 📧 Email: apokaliptos@proyecto.com
- 🌐 Web: https://apokaliptos.proyecto.com
- 📱 GitHub: https://github.com/apokaliptos

---

## 🙏 Agradecimientos

- **Comunidad Cristiana** por la inspiración
- **Usuarios Beta** por sus valiosos comentarios
- **Desarrolladores Open Source** por las herramientas utilizadas

---

## 📚 Recursos Adicionales

### 📖 **Documentación**
- [React Documentation](https://reactjs.org/docs)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [JavaScript ES6+ Features](https://github.com/lukehoban/es6features)

### 🎨 **Herramientas de Diseño**
- [Figma](https://figma.com) - Prototipado visual
- [Coolors](https://coolors.co) - Generador de paletas
- [Google Fonts](https://fonts.google.com) - Tipografías web

### 🔧 **Herramientas de Desarrollo**
- [VS Code](https://code.visualstudio.com) - Editor recomendado
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Servidor local

---

**¡Que Dios bendiga este proyecto y a todos los que contribuyan a él! 🙏✨**