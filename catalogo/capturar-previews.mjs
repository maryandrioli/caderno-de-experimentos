import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir } from "node:fs/promises";

const run = promisify(execFile);
const outputDir = "/home/ubuntu/webdev-static-assets/previews-github";

const projects = [
  ["estagiopedagogia", "https://maryandrioli.github.io/estagiopedagogia/"],
  ["mina", "https://maryandrioli.github.io/mina/"],
  ["saboteaurpedagogico", "https://maryandrioli.github.io/saboteaurpedagogico/"],
  ["tecnoancestral", "https://maryandrioli.github.io/tecnoancestral/"],
  ["letramento", "https://maryandrioli.github.io/letramento/"],
  ["repositorioslides", "https://maryandrioli.github.io/repositorioslides/"],
  ["vigoskin", "https://maryandrioli.github.io/vigoskin/"],
  ["fichas-letramento", "https://maryandrioli.github.io/fichas-letramento/"],
  ["criealfabetomovel", "https://maryandrioli.github.io/criealfabetomovel/"],
  ["fpei", "https://maryandrioli.github.io/fpei/"],
  ["jogosebrincadeiras", "https://maryandrioli.github.io/jogosebrincadeiras/"],
  ["casa", "https://maryandrioli.github.io/casa/"],
  ["steam", "https://maryandrioli.github.io/steam/"],
  ["steam-ia", "https://maryandrioli.github.io/steam-ia/"],
  ["recursosTA", "https://maryandrioli.github.io/recursosTA/"],
  ["indicadoresTA", "https://maryandrioli.github.io/indicadoresTA/"],
  ["traceme", "https://maryandrioli.github.io/traceme/"],
  ["jogospraticasrestaurativas", "https://maryandrioli.github.io/jogospraticasrestaurativas/"],
  ["engrenar", "https://engrenar.vercel.app"],
  ["musicassrq", "https://maryandrioli.github.io/musicassrq/"],
  ["appsrq", "https://maryandrioli.github.io/appsrq/"],
  ["passeiossonoros", "https://maryandrioli.github.io/passeiossonoros/"],
  ["teleprompter", "https://maryandrioli.github.io/teleprompter/"],
  ["stopmotion", "https://maryandrioli.github.io/stopmotion/"],
  ["gravador-de-sons", "https://maryandrioli.github.io/gravador-de-sons/"],
  ["pianogregmaker", "https://maryandrioli.github.io/pianogregmaker/"],
  ["regioes", "https://maryandrioli.github.io/regioes/"],
  ["site_CA", "https://maryandrioli.github.io/site_CA/"],
  ["didatica", "https://maryandrioli.github.io/ia/"],
  ["iaf1", "https://maryandrioli.github.io/iaf1/"],
  ["ia", "https://maryandrioli.github.io/ia/"],
  ["jogodaforca", "https://maryandrioli.github.io/jogodaforca/"],
  ["paginapessoal", "https://maryandrioli.github.io/paginapessoal/"],
  ["jogos", "https://maryandrioli.github.io/jogos/"],
  ["mostradeaudio", "https://maryandrioli.github.io/mostradeaudio/"],
  ["barbeariaalura", "https://maryandrioli.github.io/barbeariaalura/"],
];

await mkdir(outputDir, { recursive: true });

async function capture([slug, url]) {
  const output = `${outputDir}/${slug}.png`;
  try {
    await run(
      "chromium",
      [
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--window-size=1365,820",
        "--virtual-time-budget=2500",
        `--screenshot=${output}`,
        url,
      ],
      { timeout: 35000 },
    );
    return { slug, ok: true };
  } catch (error) {
    return { slug, ok: false, message: error.message.split("\n")[0] };
  }
}

const results = [];
const queue = [...projects];
const concurrency = 4;

async function worker() {
  while (queue.length) {
    const project = queue.shift();
    if (project) results.push(await capture(project));
  }
}

await Promise.all(Array.from({ length: concurrency }, worker));

const failed = results.filter((result) => !result.ok);
console.log(JSON.stringify({ captured: results.length - failed.length, failed }, null, 2));
