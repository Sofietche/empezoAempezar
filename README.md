# empezó a empezar

Aplicación de juego de previas/copas construida con Expo + React Native. El objetivo es ofrecer cartas de preguntas y retos que pueden asignarse a jugadores y desplazarse como un mazo tipo Tinder.

## Requisitos previos

- Node.js LTS (18 o superior recomendado)
- npm 9+ o yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (se instala automáticamente con `npx expo`)
- Xcode (para ejecutar en iOS) y/o Android Studio (para emular en Android)

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

Inicia el bundler de Expo:

```bash
npm run start
```

Desde el menú de Expo puedes elegir:

- Presionar `i` para abrir la app en el simulador de iOS (requiere Xcode).
- Presionar `a` para abrir la app en un emulador de Android (requiere Android Studio).
- Escanear el QR con la app Expo Go en tu dispositivo físico para probar en vivo.

## Estructura

- `App.js`: Pantallas y lógica principal del juego.
- `app.json`: Configuración de la app Expo.
- `babel.config.js`: Configuración de Babel para Expo y Reanimated.

## Características implementadas

- Tema oscuro futurista con gradientes y efectos luminosos.
- Modo libre y modo con jugadores asignables.
- Cartas con swipe horizontal (izquierda/derecha) usando gestos y animaciones.
- Botón para pasar carta manualmente y reiniciar la partida.

## Recursos gráficos

Para evitar bloquear la creación del PR con archivos binarios, no se incluyen íconos ni imágenes de splash en el repositorio.
Expo proporcionará sus recursos por defecto. Si quieres usar arte personalizado, colócalo localmente y actualiza `app.json`
con las rutas correspondientes antes de compilar tu build final.

## Próximos pasos sugeridos

- Ampliar el mazo con más preguntas y retos dinámicos.
- Incorporar sonidos y animaciones adicionales.
- Añadir soporte para persistencia y estadísticas de juego.
- Diseñar un logo e íconos definitivos con identidad propia.
