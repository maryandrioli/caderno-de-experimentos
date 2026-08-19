# Direção de design — Galeria de Projetos

## Três possibilidades exploradas

### 1. Caderno de Experimentos
**Introdução breve:** Uma galeria com linguagem editorial, inspirada em fichários de pesquisa e materiais pedagógicos contemporâneos. A navegação transforma cada projeto em uma ficha de descoberta, com muito espaço para contexto e classificação.

**Probabilidade:** 0,07

### 2. Estante Lúdica
**Introdução breve:** Um ambiente claro e tátil, inspirado em uma estante de ateliê: cartões, etiquetas e pequenas camadas de papel organizam experiências educacionais e jogos sem infantilizá-los.

**Probabilidade:** 0,03

### 3. Arquivo de Campo
**Introdução breve:** Uma interface sóbria de acervo digital, com tipografia de catálogo, dados em evidência e contraste entre áreas de leitura e amostras visuais dos projetos.

**Probabilidade:** 0,09

---

## Direção escolhida: Caderno de Experimentos

### Movimento de design
**Editorial contemporâneo com referências de cadernos de laboratório e publicações independentes.** A interface deve parecer uma coleção curada, e não um mosaico genérico de portfólio.

### Princípios centrais

1. **Curadoria legível:** cada cartão deve comunicar rapidamente propósito, modalidade e caminhos de acesso.
2. **Contraste calmo:** fundos claros e materiais quentes preservam foco nas capturas e nos títulos.
3. **Hierarquia assimétrica:** uma margem lateral de metadados e uma área de projetos em ritmo editorial substituem um hero centralizado convencional.
4. **Ludicidade precisa:** cores e gestos de interação sugerem descoberta, sem competir com os projetos apresentados.

### Filosofia de cor
O fundo deve assumir um **creme-papel** para remeter a um arquivo vivo. O carvão escuro garante leitura e estrutura. A cor proprietária é um **laranja solar**, usado como sinal de seleção, marcador e detalhe de interação; verde-musgo e azul-petróleo aparecem apenas para codificar categorias. O resultado deve transmitir curiosidade, clareza e autoria.

### Paradigma de layout
O conteúdo começa em uma faixa editorial assimétrica: à esquerda, identidade, manifesto e contadores; à direita, um grande painel visual de projetos em destaque. Abaixo, uma barra de filtros se comporta como uma faixa de etiquetas de arquivo. A grade é propositalmente irregular em telas largas — cards de destaque ocupam mais espaço, enquanto os demais funcionam como fichas catalográficas.

### Elementos de assinatura

1. **Marcadores circulares laranja** semelhantes a pontos de registro, aplicados a títulos e estados ativos.
2. **Etiquetas de arquivo em caixa alta** para categorias, tecnologias e tipo de acesso.
3. **Linhas pontilhadas e pequenas anotações de margem** que conectam a ideia de processo ao conteúdo.

### Filosofia de interação
Os filtros devem responder como etiquetas físicas: cor, leve deslocamento e realce de contagem. Os cartões elevam discretamente, revelando os links de acesso sem esconder a informação essencial. Todo estado interativo precisa manter foco visível e navegação por teclado.

### Animação
Entradas suaves em cascata de 45–70 ms, usando somente opacidade e deslocamento vertical de poucos pixels. Hover em 160–220 ms com curva `cubic-bezier(0.23, 1, 0.32, 1)`. A preferência por redução de movimento deve desativar transições não essenciais. Não usar animações decorativas contínuas.

### Sistema tipográfico
**DM Sans** será usada para interfaces, metadados e textos corridos pela alta legibilidade. **Fraunces** será usada nos títulos e em palavras de ênfase, trazendo o tom editorial e experimental. Títulos são grandes, compactos e alinhados à esquerda; etiquetas usam caixa alta, espaçamento generoso e peso médio.

### Essência da marca
**Uma coleção viva de experiências digitais para aprender, jogar e explorar, feita para apresentar com clareza o trabalho de quem desenvolve.**

Personalidade: **curiosa, cuidadosa e convidativa.**

### Voz da marca
A escrita deve ser direta, observadora e específica, sem fórmulas de marketing. Títulos nomeiam a ação ou a descoberta; CTAs descrevem o destino real do clique.

Exemplos:

> "Projetos que transformam ideias em experiências de aprendizagem."

> "Abrir experiência na web" e "Ver código no GitHub".

### Logotipo e marca
O símbolo será formado por **três cartões sobrepostos com um ponto solar de registro**, sugerindo coleção, processo e descoberta. O wordmark usa Fraunces, com o ponto laranja como sinal gráfico recorrente. O símbolo aparece de forma visível no cabeçalho e como favicon.

### Cor de assinatura
**Laranja Solar — `#F26A2E`**. É a cor de seleção, descoberta e autoria; nunca deve ocupar grandes superfícies sem necessidade.

## Decisões de estilo

- Cards sem captura pública usam uma **capa editorial de acervo** com inicial, categoria, número de arquivo, ponto solar e textura de papel; nunca uma área vazia de placeholder.
- A grade alterna fichas comuns, fichas ampliadas e pausas editoriais, mantendo a assimetria visível em toda a página.
- Todas as descrições devem explicar o propósito observado do projeto; incertezas permanecem sinalizadas pelo ponto solar, sem usar texto genérico como "descrição provisória".
