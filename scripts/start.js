#!/usr/bin/env node
const { spawn } = require('child_process');

const expoArgs = process.argv.slice(2);

const quoteArg = (arg) => `'${arg.replace(/'/g, "'\\''")}'`;

if (process.platform === 'darwin') {
  const quotedArgs = expoArgs.map(quoteArg).join(' ');
  const macScript = [
    'TARGET=10480',
    'CURRENT=$(ulimit -n)',
    'echo "macOS detectado. Límite actual: $CURRENT."',
    'if [ "$CURRENT" != "unlimited" ] && [ "$CURRENT" -lt "$TARGET" ]; then',
    '  echo "Elevando límite a $TARGET para Expo..."',
    '  ulimit -n $TARGET',
    'else',
    '  echo "No es necesario ajustar el límite (límite >= $TARGET)."',
    'fi',
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
