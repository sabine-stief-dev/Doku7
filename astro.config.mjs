import { defineConfig } from 'astro/config';
import { readFile, writeFile } from 'node:fs/promises';
export default defineConfig({
  output: 'static',
  site: 'https://sparkly-mochi-a3f5cf.netlify.app',
  base: '/',
  integrations: [{
    name: 'docu7-script-syntax-repair',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const file = new URL('index.html', dir);
        let html = await readFile(file, 'utf8');
        const broken = "b('X35','Korrigieren','time:'+t.id')+' '+b('X36','Verlauf','history:'+t.id)";
        const fixed = "b('X35','Korrigieren','time:'+t.id)+' '+b('X36','Verlauf','history:'+t.id)";
        if (!html.includes(broken)) throw new Error('Expected Docu7 syntax issue not found; verify generated script');
        html = html.replace(broken, fixed);
        await writeFile(file, html);
      }
    }
  }]
});
