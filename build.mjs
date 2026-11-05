/**
 * Build the browser bundle and the standalone stylesheet.
 *
 *   node build.mjs
 *
 * Outputs:
 *   client.js              – DSH client plugin with the CSS inlined
 *   student-notebook.css   – the same CSS, for <style> / DevTools injection
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))

const css = await readFile(path.join(root, 'src', 'theme.css'), 'utf8')
const template = await readFile(path.join(root, 'src', 'client.template.js'), 'utf8')

const token = '__THEME_CSS_JSON__'
if (!template.includes(token)) {
  throw new Error(`client template is missing ${token}`)
}

const client = template.replace(token, JSON.stringify(css))
await writeFile(path.join(root, 'client.js'), client, 'utf8')
await writeFile(path.join(root, 'student-notebook.css'), css, 'utf8')

const kb = (value) => `${(Buffer.byteLength(value, 'utf8') / 1024).toFixed(1)} KB`
console.log(`client.js            ${kb(client)}`)
console.log(`student-notebook.css ${kb(css)}`)
