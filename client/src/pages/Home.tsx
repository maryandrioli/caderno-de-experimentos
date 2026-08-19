/**
 * Caderno de Experimentos: página editorial, assimétrica e calorosa.
 * A interface prioriza curadoria, etiquetas de arquivo e descobertas progressivas.
 */
import { Fragment, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  FolderGit2,
  Gamepad2,
  Github,
  Instagram,
  LockKeyhole,
  Search,
  Sparkles,
  Youtube,
  X,
} from "lucide-react";
import { categories, galleryAsset, projects, type Category, type Project } from "@/data/projects";

const brandMark = galleryAsset("/manus-storage/marca-caderno-experimentos_30c72e53.png");
const heroImage = galleryAsset("/manus-storage/hero-caderno-experimentos_5af1da29.png");

const categoryMarks: Record<Category, string> = {
  Educação: "A",
  Jogos: "J",
  "Arte & Som": "S",
  Ferramentas: "F",
  Robótica: "R",
  "Portfólio & Estudos": "P",
  "Vídeos e Palestras": "V",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasPreview = Boolean(project.preview);
  const archiveNumber = String(index + 1).padStart(2, "0");

  return (
    <article className={`project-card sequence-${index % 8} ${project.featured ? "project-card--featured" : ""}`}>
      <div className={`project-cover project-cover--${project.category.replaceAll(" ", "-").replaceAll("&", "e")}`}>
        {hasPreview ? (
          <img src={project.preview} alt={`Prévia de tela do projeto ${project.title}`} loading="lazy" />
        ) : (
          <div className="cover-fallback" aria-label="Prévia visual não publicada">
            <div className="cover-fallback__top"><span>arquivo</span><b>{archiveNumber}</b></div>
            <span className="cover-fallback__letter">{categoryMarks[project.category]}</span>
            <span className="cover-fallback__line" />
            <small>{project.category}</small>
            <span className="cover-fallback__sun" />
          </div>
        )}
        <div className="cover-shade" />
        <div className="cover-meta">
          <span className="category-label">{project.category}</span>
          {project.contentType === "video" ? (
            <span className="access-label"><Youtube size={12} /> vídeo</span>
          ) : !project.demoUrl && project.visibility === "private" ? (
            <span className="access-label"><LockKeyhole size={12} /> privado</span>
          ) : project.demoUrl ? (
            <span className="access-label">captura web</span>
          ) : (
            <span className="access-label">código</span>
          )}
        </div>
      </div>

      <div className="project-body">
        <div className="project-heading">
          <h3>{project.title}</h3>
          {project.provisional && <span className="provisional-dot" title="Descrição provisória" />}
        </div>
        <p>{project.description}</p>

        {project.videoMeta && <div className="video-meta"><Youtube size={13} /> {project.videoMeta}</div>}

        <div className="tag-list" aria-label={`Tags de ${project.title}`}>
          {project.tags.slice(0, 4).map((tag) => <span key={tag}>#{tag}</span>)}
        </div>

        <div className="project-links">
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              {project.contentType === "video" ? <Youtube size={15} /> : <ExternalLink size={15} />}
              {project.contentType === "video" ? "Assistir vídeo" : "Abrir experiência"}
            </a>
          ) : (
            <span className="project-link project-link--muted">
              <Code2 size={15} /> {project.visibility === "private" ? "Acesso restrito" : "Sem demo pública"}
            </span>
          )}
          {project.contentType === "video" ? (
            <span className="project-link project-link--muted">seleção audiovisual</span>
          ) : project.repoUrl && project.visibility === "public" ? (
            <a className="project-link--github" href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`Ver código de ${project.title} no GitHub`}>
              <Github size={17} /> Código
            </a>
          ) : (
            <span className="project-link project-link--muted"><LockKeyhole size={15} /> Privado</span>
          )}
          {project.instagramUrl && (
            <a className="project-link--instagram" href={project.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Abrir Instagram de ${project.title}`}>
              <Instagram size={16} /> Instagram
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | "Todos">("Todos");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "Todos" || project.category === activeCategory;
      const searchable = [project.title, project.description, project.category, ...project.tags].join(" ").toLocaleLowerCase("pt-BR");
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  const webProjects = projects.filter((project) => project.demoUrl).length;
  const privateProjects = projects.filter((project) => project.visibility === "private").length;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ir ao início da galeria">
          <img src={brandMark} alt="" />
          <span>caderno<br /><em>de experimentos</em></span>
        </a>
        <div className="header-note"><span /> acervo em desenvolvimento</div>
        <a className="github-profile" href="https://github.com/maryandrioli" target="_blank" rel="noreferrer">
          <Github size={17} /> github.com/maryandrioli <ArrowUpRight size={15} />
        </a>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> coleção digital · 2026</div>
            <h1>Ideias que<br /><em>viram experiência.</em></h1>
            <p>Um acervo vivo de projetos, vídeos e palestras sobre educação, tecnologia, som e jogo. Explore as experiências, assista às falas e encontre os códigos que as sustentam.</p>
            <div className="hero-counts" aria-label="Resumo do acervo">
              <div><strong>{projects.length}</strong><span>itens<br />catalogados</span></div>
              <div><strong>{webProjects}</strong><span>experiências<br />na web</span></div>
              <div><strong>{privateProjects}</strong><span>itens de<br />acesso restrito</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Colagem visual do Caderno de Experimentos">
            <img src={heroImage} alt="Colagem editorial de cartões, trajetos e experiências digitais" />
            <div className="hero-project-strip" aria-label="Projetos em destaque">
              <div className="hero-project-strip__item hero-project-strip__item--large">
                <img src={galleryAsset("/manus-storage/estagiopedagogia_7f1a9f39.png")} alt="Prévia do Gerador de Termo de Compromisso de Estágio" />
                <span>ficha 01 · estágio</span>
              </div>
              <div className="hero-project-strip__item hero-project-strip__item--small">
                <img src={galleryAsset("/manus-storage/traceme_e8d0e850.png")} alt="Prévia do jogo TraceMe" />
                <span>ficha 02 · padrões</span>
              </div>
            </div>
            <div className="visual-caption"><span>01</span> aprender, fazer, jogar</div>
            <div className="visual-sticker">feito<br />para<br /><b>explorar</b></div>
          </div>
        </section>

        <section className="archive-intro" aria-labelledby="acervo-titulo">
          <div className="archive-intro__line"><span>02</span></div>
          <div>
            <p className="eyebrow">índice do acervo</p>
            <h2 id="acervo-titulo">Encontre um projeto pelo <em>assunto</em> ou pelo gesto que ele propõe.</h2>
          </div>
          <p className="archive-intro__aside">As imagens nos cartões com selo <b>captura web</b> são prévias reais das demonstrações disponíveis. Quando não há uma demonstração pública, o catálogo mostra o acesso ao código ou sinaliza a restrição.</p>
        </section>

        <section className="catalogue" aria-label="Catálogo de projetos">
          <div className="filter-panel">
            <div className="filter-topline">
              <div className="filter-title"><FolderGit2 size={18} /> filtrar coleção</div>
              <span>{filteredProjects.length} {filteredProjects.length === 1 ? "resultado" : "resultados"}</span>
            </div>
            <div className="filter-controls">
              <div className="category-filters" aria-label="Filtrar por categoria">
                {categories.map((category) => {
                  const count = category === "Todos" ? projects.length : projects.filter((project) => project.category === category).length;
                  return (
                    <button
                      key={category}
                      className={activeCategory === category ? "is-active" : ""}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}<small>{count}</small>
                    </button>
                  );
                })}
              </div>
              <label className="search-field">
                <Search size={18} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="buscar por tema ou tag" aria-label="Buscar por tema ou tag" />
                {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca"><X size={16} /></button>}
              </label>
            </div>
          </div>

          {filteredProjects.length ? (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <Fragment key={project.slug}>
                  {index > 0 && index % 9 === 0 && (
                    <aside className="archive-interlude">
                      <div className="archive-interlude__number">{String(index + 1).padStart(2, "0")}</div>
                      <p>{index === 9 ? "Uma coleção também se lê pelas conexões." : index === 18 ? "Ferramentas, sons e jogos: cada ficha abre outro modo de experimentar." : "O acervo continua: mais caminhos, mais protótipos, mais perguntas."}</p>
                      <span>ponto de registro <i /></span>
                    </aside>
                  )}
                  <ProjectCard project={project} index={index} />
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Gamepad2 size={28} />
              <h3>Nenhum projeto por aqui.</h3>
              <p>Tente outro termo ou remova um dos filtros para voltar ao acervo completo.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory("Todos"); }}>ver todos os projetos</button>
            </div>
          )}
        </section>

        <section className="update-note">
          <div className="update-note__mark">+</div>
          <div><p className="eyebrow">acervo em movimento</p><h2>Um detalhe mudou? <em>O caderno acompanha.</em></h2></div>
          <p>Descrições provisórias estão marcadas com um ponto laranja. Basta enviar a atualização desejada para ajustar texto, tags, imagens ou links de qualquer ficha.</p>
        </section>
      </main>

      <footer className="site-footer">
        <div>caderno de experimentos <span>·</span> acervo pessoal de projetos</div>
        <a href="#inicio">voltar ao começo <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  );
}
