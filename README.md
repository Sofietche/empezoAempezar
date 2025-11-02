# empezó a empezar

Aplicación de juego de previas/copas construida con Expo + React Native. El objetivo es ofrecer cartas de preguntas y retos que pueden asignarse a jugadores y desplazarse como un mazo tipo Tinder.

## Requisitos previos

- Node.js LTS (18 o superior recomendado)
- npm 9+ o yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (se instala automáticamente con `npx expo`)
- Xcode (para ejecutar en iOS) y/o Android Studio (para emular en Android)
- **macOS:** se recomienda instalar [Watchman](https://facebook.github.io/watchman/) con `brew install watchman` para que Metro use watchers nativos eficientes y evitar el error `EMFILE`.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

Inicia el bundler de Expo:

```bash
npm run start
```

> [!TIP]
> En macOS el script de arranque intenta aumentar automáticamente los límites suave y duro de
> archivos abiertos (usando `launchctl` y `ulimit`) antes de iniciar Expo para evitar el error
> `EMFILE: too many open files`. Si aún ves el error:
> 
> 1. Cierra la terminal, ábrela de nuevo y vuelve a ejecutar `npm run start` (los cambios de `launchctl` requieren una nueva sesión para aplicarse).
> 2. Instala Watchman con `brew install watchman` para que Metro utilice el watcher nativo.
> 3. Ajusta manualmente el objetivo exportando `EXPO_TARGET_FILE_LIMIT=20480 npm run start` si necesitas un límite más alto.
> 
> En otros sistemas operativos el comportamiento es el mismo que `npx expo start`.

Desde el menú de Expo puedes elegir:

- Presionar `i` para abrir la app en el simulador de iOS (requiere Xcode).
- Presionar `a` para abrir la app en un emulador de Android (requiere Android Studio).
- Escanear el QR con la app Expo Go en tu dispositivo físico para probar en vivo.

## Integración con Firebase

La app puede sincronizar el mazo de cartas desde una colección alojada en Cloud Firestore. Si la descarga falla o la colección
está vacía, automáticamente se vuelve al mazo local incluido en el código para que el juego siga siendo funcional.

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) y habilita **Firestore Database**.
2. Dentro de Firestore crea una colección llamada `deck`. Cada documento debe incluir al menos:
   - `text` (`string`): contenido principal de la carta.
   - `type` (`string`): usa `"pregunta"` o `"reto"` para que la UI aplique los estilos correctos.
   - `order` (`number`, opcional): valor utilizado para ordenar antes de barajar.
3. Copia las credenciales de la app web de Firebase y actualiza `src/config/firebaseConfig.js` con tus valores reales.
4. (Opcional) Si no quieres subir esas claves al repositorio, puedes marcar el archivo con `git update-index --skip-worktree src/config/firebaseConfig.js` una vez que tengas tus valores cargados.

> [!NOTE]
> El hook `useGameState` intentará sincronizarse con Firebase cada vez que comience una partida. Si ocurre un error (por reglas
> restrictivas, credenciales inválidas o falta de conexión) verás un aviso en pantalla y se seguirá utilizando el mazo local
> definido en `src/constants/deck.js`.

## Estructura

- `App.js`: Punto de entrada que decide entre pantallas de bienvenida y juego.
- `src/screens/WelcomeScreen` y `src/screens/GameScreen`: Contienen la UI y estilos específicos de cada etapa.
- `src/components`: Piezas reutilizables del juego (botones, cartas, configurador de jugadores, fin del mazo, etc.).
- `src/components/layout/GradientScreen`: Contenedor común con gradiente y `SafeAreaView` para mantener coherencia visual.
- `src/hooks/useGameState.js`: Lógica del mazo, jugadores, sincronización con Firebase y gestos de swipe.
- `src/services/decks/deckRepository.js`: Lectura del mazo desde Firestore.
- `src/services/firebase/app.js`: Inicialización de Firebase a partir de la configuración local.

## Características implementadas

- Tema oscuro futurista con gradientes y efectos luminosos.
- Modo libre y modo con jugadores asignables.
- Cartas con swipe horizontal (izquierda/derecha) usando gestos y animaciones.
- Botón para pasar carta manualmente y reiniciar la partida.
- Sincronización opcional del mazo con Firestore usando Firebase.

## Recursos gráficos

Para evitar bloquear la creación del PR con archivos binarios, no se incluyen íconos ni imágenes de splash en el repositorio.
Expo proporcionará sus recursos por defecto. Si quieres usar arte personalizado, colócalo localmente y actualiza `app.json`
con las rutas correspondientes antes de compilar tu build final.

## Próximos pasos sugeridos

- Ampliar el mazo con más preguntas y retos dinámicos.
- Incorporar sonidos y animaciones adicionales.
- Añadir soporte para persistencia y estadísticas de juego.
- Diseñar un logo e íconos definitivos con identidad propia.
