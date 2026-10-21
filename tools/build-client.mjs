/**
 * Embeds assets/whale-64.gif into client.js as a data URL.
 * Run: node tools/build-client.mjs
 */
import fs from 'node:fs'

const gif = fs.readFileSync(new URL('../assets/whale-64.gif', import.meta.url))
const b64 = gif.toString('base64')

const css = [
  '/* dsh-running-whale-skin: light-mode animation for the running status. */',
  '@media (forced-colors: none) {',
  '  body:not([data-ds-dark-theme]) [data-chat-running] span[class*="runningWhaleAnimated"] {',
  '    -webkit-mask: none;',
  '    mask: none;',
  `    background: url("data:image/gif;base64,${b64}") center / contain no-repeat;`,
  '  }',
  '}',
].join('\n')

const client = `window.__ModuleLoader__.load({
  id: 'dsh-running-whale-skin',
  factory() {
    const CSS = ${JSON.stringify(css)};
    return {
      apply(ctx) {
        ctx.effect(() => {
          const style = document.createElement('style');
          style.dataset.plugin = 'dsh-running-whale-skin';
          style.textContent = CSS;
          document.head.append(style);
          return () => style.remove();
        }, 'running-whale-skin: styles');
      },
    };
  },
});
`

fs.writeFileSync(new URL('../client.js', import.meta.url), client)
console.log('client.js bytes:', fs.statSync(new URL('../client.js', import.meta.url)).size)
