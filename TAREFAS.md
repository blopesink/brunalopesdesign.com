# Tarefas do site — brunalopesdesign.com

Ordenado por eficiência: ajustes rápidos de estilo/interação primeiro (mesmos
arquivos abertos) → conteúdo completo → **só então** bilíngue (traduzir uma vez,
não duas) → publicação por último. Cases e "backburn" ficam em trilha separada.

Legenda: `[ ]` a fazer · `[x]` feito · 🔥 backburn (fazer depois)

---

## Bloco 1 — Ajustes rápidos de estilo e interação
_Mesmo CSS/JS, poucas linhas cada. Fazer tudo junto antes de partir pra conteúdo._

- [x] **1.1 Navbar — navlinks**
  - [x] Navlinks — hover "botão levantado" (igual aos `.hbtn`): sombra dura
        `--lima` extruda pro canto inf-direito e o link levanta na diagonal
        esquerda/cima (`translate(-5px,-5px)`); active = fundo `--musgo` + texto
        `--lima` (via `aria-current="page"`)
  - [x] Mesmo hover nos links do rodapé, com sombra `--musgo` (visível no fundo
        lima) + tipografia dos textos igual à navbar
  - [x] Résumé: **mantido** na nav e no rodapé, mas agora **rola pra seção
        `#resume` da index** em vez de abrir `resume.html` (arquivo preservado)
  - [ ] _Pendente:_ botões CTA que ainda apontam pra `resume.html` — decidir se
        também rolam pra `#resume`: hero da index (`resumé`) e uiux (`Résumé — UI/UX track`)

- [x] **1.2 Seção "areas" (dois blobs / seção 3) — navegação**
  - [x] Suavizar: easing smoothstep + `data-drift-span="0.9"` (drift espalhado
        por mais rolagem = glide mais lento e macio)
  - [x] Posição final ~40px mais afastada: `data-drift-end` = design `-20px`,
        uiux `+20px` (antes terminavam em 0/sobrepostos)
  - Ajuste fino fácil: `data-drift-end` (separação final) e `data-drift-span`
    (quanto maior, mais lento) nos dois `.blob-block` do [index.html](index.html)

- [x] **1.3 Seção 2 (manifesto) — pássaro**
  - [x] Pássaro desloca em **diagonal esquerda + cima** (~184px) **conforme a
        página rola** — drift em dois eixos (`data-drift-end="-130"` X e
        `data-drift-y-end="-130"` Y), easing smoothstep, `data-drift-span="0.9"`
  - Estendi o sistema de drift do 1.2 pra suportar eixo Y (`--drift-y`).
    Ajuste fácil: mudar os dois `-130` no [index.html](index.html)

---

## Bloco 2 — Conteúdo e design da 4ª seção
_Maior peça de conteúdo. Fazer antes do bilíngue._

- [x] **2.1** Importados no `#resume-more` da index, nesta ordem: Contact &
      Details → Profile → Core Competencies → **Tools** → Experience
- [x] **2.2** Botão "Read/Fold the résumé": trocado de `font-px` para
      `font-type` (igual aos outros botões) + **bold 700**
- [x] **Extra:** linhas tracejadas → **1px sólido** (cv-meta, cv-tools,
      cv-timeline) — vale p/ index e resume.html
- [x] **Extra:** hover "levantar" nos `.cv-card` (translate + sombra maior)
- [x] **Extra:** blocos entram com **reveal escalonado** ao expandir (fade +
      slide-up em cascata, como a resume.html)
- [x] **Extra:** palavra "résumé" do título da seção agora usa `font-type`
- Nota: card rosa recebeu fundo `--cru` no fundo rosa da seção (contraste)

---

## Bloco 3 — Rodapé
- [x] **3.1** Layout do rodapé finalizado (estrutura `f-mail-row` / `f-mail-col`
      / `f-phone` com telefone, em todas as 4 páginas)

---

## Bloco 3.5 — Redesign das páginas Design & UI/UX
_Fechar o design dessas páginas **antes** do bilíngue (pra traduzir uma vez só)._

- [x] **3.5.1** Refazer o design da página **[design.html](design.html)** —
      page-hero, grid de projetos, CTAs
      — page-hero virou split ilustração (blob + beziers + PNG) / título+lede;
      grid de projetos virou `.case-collage` (retângulos musgo = thumbs +
      blobs orgânicos com título/tags), textos de preenchimento por enquanto
- [x] **3.5.2** Refazer o design da página **[uiux.html](uiux.html)** —
      page-hero, cases em destaque, toolkit design-to-code, CTAs
      — mesmo tratamento de hero; os 2 `case-featured` (Nexus CRM / Ultimatum)
      foram substituídos pelo mesmo `.case-collage` de placeholders (o link
      real do Nexus CRM ficou de fora — reintroduzir quando as cases reais
      entrarem); toolkit e CTAs mantidos
- [x] Aplicar a linguagem visual já consolidada na index: hover "botão
      levantado", linhas 1px sólido, paleta musgo/lima/rosa, tipografia
      `font-type`/`font-display`, reveal escalonado
- [x] Resolver o CTA pendente **"Résumé — UI/UX track"** (uiux.html) que ainda
      abre `resume.html` — decidir se vira `index.html#resume` (ver item 1.1)
      — agora aponta pra `index.html#resume`

---

## Bloco 4 — Bilíngue (EN / PT-BR)
_Só depois que TODO o conteúdo acima estiver fechado, pra traduzir uma vez só._

- [x] **4.1** Tornar o site bilíngue: inglês + português brasileiro (toggle de idioma)
      — botão "PT"/"EN" na navbar (index, design, uiux, resume.html); toggle
      client-side via [js/i18n.js](js/i18n.js) (`data-i18n` / `data-i18n-attr`
      + dicionário EN/PT), idioma salvo em `localStorage` e aplicado nas 4
      páginas. **Fora do escopo, de propósito:** textos de preenchimento do
      `.case-collage` (design.html / uiux.html) — ver Bloco 6.
- [x] **4.2** Alternar os botões de download do currículo conforme o idioma:
      PT-BR quando o site estiver em PT-BR, ENG quando estiver em ENG
      — `data-cv-en`/`data-cv-pt` nos botões de PDF (index.html e
      resume.html), apontando pra `cv/maria-bruna-lopes-resume-{design,uiux}.pdf`
      (EN) e `cv/maria-bruna-lopes-resume-{gdpt,uxpt}.pdf` (PT)

---

## Bloco 5 — Publicação
- [ ] **5.1** Publicar o site no Git
- [ ] **5.2** Escolher a forma de publicar no domínio já contratado
      (`brunalopesdesign.com`, Hostinger, sem servidor)
  - Opções: Netlify grátis (site estático, só carrega links) **vs.** contratar
    Hostinger 1 ano (R$ 143,88, já inclui caixa de e-mail personalizada)
- [ ] **5.3** Terminar config da caixa `hello@brunalopesdesign.com` + Gmail

---

## Bloco 6 — Cases (trilha de conteúdo à parte)
- [ ] **6.1** Refazer o curso Human Academy de IA (entregáveis por direção de arte)
- [ ] **6.2** Publicar case: **Bom Tequenho**
- [ ] **6.3** Publicar case: **Chocolates da Sorte**
- [ ] **6.4** Publicar case: **CyberBulk**
- [ ] **6.5** Publicar case: **Ilha Doce**
- [ ] **6.6** Publicar case: **Mi Design**
- [ ] **6.7** Publicar case: **Mural Cantô**
- [ ] **6.8** Publicar case: **Mural Eloah**
- [ ] **6.9** Publicar case: **Mural The Pub**
- [ ] **6.10** Publicar case: **Nexus**
- [ ] **6.11** Publicar case: **Studio Burger**
- [ ] **6.12** Publicar case: **Tattoo Caveira Bicicleta**
- [ ] **6.13** Publicar case: **Tattoo Estrela**
- [ ] **6.14** Publicar case: **Tattoo Lobo Guará**
- [ ] **6.15** Publicar case: **Ultimatum**
- [ ] **6.16** Publicar case: **Zen com a Gente**

---

## 🔥 Backburn (quando sobrar fôlego)
- [ ] 🔥 Editar um vídeo para o título da seção 2 + fazer upload
- [ ] 🔥 Seção extra acionada por botão — lado pessoal que influencia a produção:
      desenhar desde criança · artesanato pra vender · coral em escola de artes
      pública (viajou o Brasil, conheceu autoridades) · ajudar a mãe no negócio
      caseiro de salgados · aulas de reforço escolar · música alternativa/eletrônica
      · curso de corte e costura · bolsas artesanais · amor por animais (gatos!)
- [ ] 🔥 Form de interesse / qualificação de lead: curso ou serviço? tipo de
      serviço? contratar / consultoria? qual projeto? nº de pessoas? budget?
      empresa? contato?
