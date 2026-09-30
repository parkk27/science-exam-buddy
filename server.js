import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const publicFiles = new Set(['index.html', 'styles.css', 'app.js', 'content.js', 'tutor.js', 'dom.js', 'assets/buddy.svg']);
const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

export function createAppServer() {
  return createServer(async (request, response) => {
    const send = (status, text) => {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff' });
      response.end(text);
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.setHeader('Allow', 'GET, HEAD');
      send(405, 'This local server only serves the guide files.');
      return;
    }
    let path;
    try {
      path = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    } catch {
      send(400, 'That file address is not valid.');
      return;
    }
    if (path === '/science-exam-buddy') {
      response.writeHead(302, { Location: '/science-exam-buddy/' });
      response.end();
      return;
    }
    if (path.startsWith('/science-exam-buddy/')) path = path.slice('/science-exam-buddy'.length);
    const file = path === '/' ? 'index.html' : path.slice(1);
    if (!publicFiles.has(file)) {
      send(404, 'That file is not part of the revision app.');
      return;
    }
    try {
      const contents = await readFile(join(root, ...file.split('/')));
      response.writeHead(200, {
        'Content-Type': `${mimeTypes[extname(file)]}; charset=utf-8`,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : contents);
    } catch (error) {
      console.error(`Could not serve ${file}: ${error.message}`);
      send(500, 'A guide file could not be opened. Check the local app files.');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be a whole number between 1 and 65535.');
  const server = createAppServer();
  server.on('error', (error) => {
    console.error(`The local guide server could not start: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => {
    console.log(`Science Exam Buddy: http://127.0.0.1:${port}/science-exam-buddy/`);
    console.log('Root URL also works. Stop with Ctrl+C. No question API or external services.');
  });
}
