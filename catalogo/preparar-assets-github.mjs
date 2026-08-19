import { cp, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const sourceProject = "/home/ubuntu/galeria-projetos-github";
const assetsRoot = "/home/ubuntu/webdev-static-assets";
const targetProject = process.argv[2];

if (!targetProject) {
  throw new Error("Informe o diretório de destino do repositório GitHub.");
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const sourceFiles = await collectFiles(assetsRoot);
const sourceByName = new Map(sourceFiles.map((file) => [path.basename(file), file]));
const codeFiles = (await collectFiles(path.join(sourceProject, "client", "src")))
  .filter((file) => /\.(tsx|ts|css)$/.test(file));
const code = (await Promise.all(codeFiles.map((file) => readFile(file, "utf8")))).join("\n");
const storageFiles = [...new Set([...code.matchAll(/\/manus-storage\/([^"')\s]+)/g)].map((match) => match[1]))];
const destination = path.join(targetProject, "client", "public", "assets");

await mkdir(destination, { recursive: true });
for (const storageFile of storageFiles) {
  const sourceName = storageFile.replace(/_[a-f0-9]{8}(\.[a-zA-Z0-9]+)$/, "$1");
  const source = sourceByName.get(sourceName);
  if (!source) throw new Error(`Ativo original não encontrado: ${sourceName}`);
  await cp(source, path.join(destination, storageFile));
}

console.log(`Ativos preparados: ${storageFiles.length}`);
