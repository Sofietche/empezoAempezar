#!/usr/bin/env node
const { spawn, spawnSync } = require('child_process');

const expoArgs = process.argv.slice(2);

const quoteArg = (arg) => `'${arg.replace(/'/g, "'\\''")}'`;

if (process.platform === 'darwin') {
  const quotedArgs = expoArgs.map(quoteArg).join(' ');
  const target = process.env.EXPO_TARGET_FILE_LIMIT || '10480';

  const hasWatchman = (() => {
    const check = spawnSync('watchman', ['--version'], { stdio: 'ignore' });
    if (check.error) {
      return false;
    }
    return check.status === 0;
  })();

  const macScript = [
    `TARGET=${target}`,
    'CURRENT=$(ulimit -n)',
    'HARD=$(ulimit -H -n 2>/dev/null)',
    'echo "macOS detectado. Límite suave actual: $CURRENT (duro: ${HARD:-desconocido})."',
    'if command -v launchctl >/dev/null 2>&1; then',
    '  echo "Ajustando launchctl maxfiles a $TARGET..."',
    '  launchctl limit maxfiles $TARGET $TARGET >/dev/null 2>&1 || true',
    'fi',
    'if [ "$CURRENT" != "unlimited" ] && [ "$CURRENT" -lt "$TARGET" ]; then',
    '  echo "Elevando límite de archivos abiertos a $TARGET..."',
    '  ulimit -n $TARGET || echo "No se pudo elevar el límite (¿requiere reiniciar la terminal?)."',
    'else',
    '  echo "No es necesario ajustar el límite (límite >= $TARGET)."',
    'fi',
    hasWatchman
      ? 'echo "Watchman detectado: Metro usará el watcher nativo (recomendado)."'
      : 'echo "Watchman no detectado. Instálalo con \"brew install watchman\" para reducir el uso de watchers."',
    'echo "Iniciando Expo..."',
    `exec npx expo start ${quotedArgs}`.trim()
  ].join('\n');

  const child = spawn('bash', ['-lc', macScript], { stdio: 'inherit' });
  child.on('close', (code) => process.exit(code ?? 0));
} else {
  console.log('Iniciando Expo...');
  const child = spawn('npx', ['expo', 'start', ...expoArgs], {
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
  child.on('close', (code) => process.exit(code ?? 0));
}
