/* ---- bilingual toggle (EN / PT-BR) ----
   data-i18n="<key>" swaps an element's innerHTML for translations[lang][key].
   data-i18n-attr="attr1:key1;attr2:key2" does the same for attributes (alt,
   aria-label, content, ...) instead of innerHTML.
   data-cv-en / data-cv-pt on the résumé download links swap the PDF href.
   Language is persisted in localStorage under "site-lang" and applies across
   every page (index.html, design.html, uiux.html, resume.html) since they
   all load this file.
   NOTE: the case-collage placeholders (design.html / uiux.html project
   grids) are intentionally left untagged — filler text pending real case
   content (see TAREFAS.md Bloco 6), not worth translating twice. */

const translations = {
  en: {
    /* ---- shared: nav + footer ---- */
    "nav.about": "About",
    "nav.design": "Design",
    "nav.uiux": "UI/UX",
    "nav.resume": "Résumé",
    "nav.contact": "Contact",
    "footer.tag": "[ get in touch ]",
    "footer.behance": "Behance",
    "footer.linkedin": "LinkedIn",
    "footer.resume": "Résumé",
    "footer.note.index": 'Designed by Bruna Lopes <span class="px">*</span> 2026',
    "footer.note.pages": "Designed & hand-coded by Bruna Lopes ✠ MMXXVI",

    /* ---- shared: cv-tag / cv-label bracket tags ---- */
    "tag.contact": "[ contact ]",
    "tag.links": "[ links ]",
    "tag.education": "[ education ]",
    "tag.languages": "[ languages ]",
    "tag.design_ui": "[ design & ui ]",
    "tag.code_ai": "[ code & ai ]",
    "tag.illustration_video": "[ illustration & video ]",

    /* ---- index.html ---- */
    "idx.hero.title": '<span class="line">Graphic</span>\n        <span class="line"><span class="outline">Design</span> <span class="amp">&</span></span>\n        <span class="line">UI<span class="outline">/UX</span></span>',
    "idx.hero.lede": "Bridging artistic sensitivity with technical precision — 20 years turning craft into strategy, pixels into pigment, ideas into impact.",
    "idx.hero.cta_design": "design",
    "idx.hero.cta_uiux": "ui/ux",
    "idx.hero.cta_resume": "resumé",
    "idx.hero.construction": "Site under construction",
    "idx.marquee": 'Branding <span class="px">✳</span> Illustration <span class="px">✳</span> Murals <span class="px">✳</span> Tattoo <span class="px">✳</span> UI/UX <span class="px">✳</span> Design-to-Code <span class="px">✳</span>',
    "idx.manifesto.h2": 'The process<br>is the <span class="purpose">purpose</span>',
    "idx.manifesto.p1": "For me, no experience is ever discarded — everything becomes repertoire. My journey is rooted in a deeply personal philosophy: creating the best possible outcome with the materials at hand. Long before designing complex digital systems, my hands learned the value of structure and craft through manual arts and leatherwork.",
    "idx.manifesto.p2": "Today, my work exists in the tension between the pixel and the pigment. By merging the analytical rigor of a UX/UI designer with the tactile sensitivity of a tattoo artist and muralist, I bridge technology and art — anchoring purpose, aesthetics and humanity into everyday life.",
    "idx.areas.title": '<span class="px">✳</span> Two paths, one designer',
    "idx.areas.design_aria": "Design — branding, illustration, murals, tattoo",
    "idx.areas.uiux_aria": "UI/UX — research, prototyping, design-to-code",
    "idx.areas.ring_design": "branding · illustration · murals · tattoo · branding · illustration · murals · tattoo · ",
    "idx.areas.ring_uiux": "research · prototype · design-to-code · research · prototype · design-to-code · ",
    "idx.work.h2": 'Twenty years,<br>one <span class="frak">résumé</span>',
    "idx.work.p": "From print shops to product teams — graphic design, branding, murals, tattoo artistry and UI/UX engineering, all in one timeline. Read it right here or grab the PDF that fits the role.",
    "idx.work.toggle_closed": 'Read the résumé <span class="px">↓</span>',
    "idx.work.toggle_open": 'Fold the résumé <span class="px">↑</span>',
    "idx.work.pdf_design": "PDF — Design",
    "idx.work.pdf_uiux": "PDF — UI/UX",
    "idx.rm.contact_h3": "Contact & Details",
    "idx.rm.education_value": '<span class="emph-2">BA in Graphic Design</span><br>Universidade Federal de Goiás — 2005/2010',
    "idx.rm.languages_value": 'Portuguese <span class="emph-2">native</span><br>English <span class="emph-2">fluent</span>',
    "idx.rm.profile_h3": "Profile",
    "idx.rm.profile_p": "With 20 years in Graphic Design and UI/UX, I combine technical rigor with artistic sensitivity to create user-centered experiences. Applying Semiotics and Gestalt principles, I communicate deeply through every layer of a layout — from print and packaging to brand systems and digital products. My parallel journey as a muralist and tattoo artist broadens my creative range and gives me the flexibility to solve visual problems on any medium; with Design Thinking, I turn complex requirements into user journeys and implementation-ready interfaces, prototyping my own solutions in HTML, CSS and JavaScript.",
    "idx.rm.profile_photo_alt": "Portrait of Maria Bruna Lopes",
    "idx.rm.competencies_h3": "Core Competencies",
    "idx.rm.design_title": "Design craft",
    "idx.rm.design_li1": "<strong>Visual design & craft</strong> — typography, color theory, visual hierarchy and layout, grounded in Gestalt and Semiotics.",
    "idx.rm.design_li2": "<strong>Brand systems & art direction</strong> — identity, packaging and campaign design across print and digital, from concept to scalable visual systems.",
    "idx.rm.design_li3": "<strong>Illustration & multi-medium art</strong> — custom illustration, large-scale murals and tattoo artistry, one concept across physical and digital surfaces.",
    "idx.rm.design_li4": "<strong>Creative direction & collaboration</strong> — translating briefs and artistic visions into cohesive concepts, leading projects end-to-end.",
    "idx.rm.ux_title": "UX & code",
    "idx.rm.ux_li1": "<strong>UX/UI & research</strong> — user research, competitive benchmarking, wireframing and rapid prototyping.",
    "idx.rm.ux_li2": "<strong>Design-to-code</strong> — complex requirements into user journeys and flows, with functional prototyping and implementation-ready interfaces.",
    "idx.rm.ux_li3": "<strong>Processes, management & AI</strong> — agile methodologies, remote collaboration, project management and AI-powered workflows (research synthesis, automation, assisted coding).",
    "idx.rm.tools_h3": "Tools & Digital Production",
    "idx.rm.tools_design_ui_value": "Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign), Affinity Designer, Canva",
    "idx.rm.tools_code_ai_value": "HTML, CSS, JavaScript, AI coding assistants and image generators",
    "idx.rm.tools_illustration_video_value": "Procreate, After Effects, Premiere, CapCut",
    "idx.rm.experience_h3": "Experience Highlights",
    "idx.rm.exp1": '<h4>UI/UX Designer <span class="cv-at">— Ultimatum · legal practice management software</span></h4>\n                <p>Ultimatum builds law practice management software used across Brazil. I returned to the company, this time to lead the modernization of the platform\'s interface and experience — a strategic evolution centered on users\' real daily routines. Here, UX research and market analysis inform every decision, and the prototypes I develop in HTML, CSS, Bootstrap and Chart.js bring design and development closer together, ensuring every proposal is viable for implementation. I integrate AI into my workflow to accelerate research and code — freeing my focus for what matters most: refining the final product.</p>',
    "idx.rm.exp2": '<h4>Graphic Designer <span class="cv-at">— Places · real estate marketing & design</span></h4>\n                <p>Across social media, print, outdoor and catalogs, I kept the visual identity consistent for multiple clients as campaigns rolled out. In a field driven by tight deadlines, an agile, organized process let me hold both aesthetic quality and consistency, delivery after delivery.</p>',
    "idx.rm.exp3": '<h4>Independent Visual Artist <span class="cv-at">— muralist & tattoo artist</span></h4>\n                <p>Between large-scale murals and custom tattoos, I\'ve kept a parallel career that sharpens how I read expectations and sense of spatial design. Turning an abstract concept into something permanent — on skin or on a wall — teaches you to listen closely and decide with precision. Those are instincts I carry into every digital project.</p>',
    "idx.rm.exp4": '<h4>Creative Director <span class="cv-at">— Dupplamente Creative Projects</span></h4>\n                <p>As a partner, I ran branding projects end-to-end, coordinating multidisciplinary teams assembled on demand — researchers, photographers, and print suppliers. That collaborative orchestration, paired with Design Thinking, produced deep visual identities aligned with each client\'s real needs. In all, I helped over 60 businesses launch or consolidate in the market.</p>',
    "idx.rm.exp5": '<h4>UX/UI Designer <span class="cv-at">— Ultimatum · legal practice management software</span></h4>\n                <p>This first stint at Ultimatum put me in charge of the UI, visual identity, and design system of two digital products built from the ground up. The work proved decisive for the company\'s growth and opened doors to key contracts with several regional chapters of the OAB (Brazil\'s Bar Association).</p>',

    /* ---- design.html ---- */
    "des.hero_kicker": '<span class="px">✳ area 01</span> of two',
    "des.page_lede": "Brand identity, packaging and campaign design — enriched by a parallel life in illustration, large-scale murals and tattoo artistry. One concept, translated across unconventional physical and digital surfaces.",
    "des.projects_title": '<span class="px">✳</span> Projects',
    "des.cta_behance": 'Full archive on Behance <span class="px">→</span>',
    "des.cta_uiux": 'Cross to UI/UX <span class="px">→</span>',
    "des.figure_alt": "Illustrated eye artwork, from Bruna's authorial illustration and tattoo practice",

    /* ---- uiux.html ---- */
    "ux.hero_kicker": '<span class="px">✳ area 02</span> of two',
    "ux.page_lede": "Research, wireframing and rapid prototyping — carried all the way to implementation-ready interfaces in HTML, CSS and JavaScript. Design and development, closer together.",
    "ux.toolkit_title": '<span class="px">✳</span> Design-to-code toolkit',
    "ux.toolkit_research_label": "[ research ]",
    "ux.toolkit_research_value": "User research, competitive benchmarking, wireframing, rapid prototyping",
    "ux.toolkit_build_label": "[ build ]",
    "ux.toolkit_build_value": "HTML, CSS, JavaScript, Bootstrap, Chart.js, Figma",
    "ux.toolkit_accelerate_label": "[ accelerate ]",
    "ux.toolkit_accelerate_value": "AI-powered workflows — research synthesis, automation, assisted coding",
    "ux.cta_resume": "Résumé — UI/UX track",
    "ux.cta_design": 'Cross to Design <span class="px">→</span>',
    "ux.figure_alt": "Illustrated lily artwork, part of Bruna's design-to-code UI/UX practice",

    /* ---- resume.html ---- */
    "res.title": "Résumé — Bruna Lopes",
    "res.hero_kicker": '<span class="px">✳ the</span> Résumé',
    "res.page_lede": "Senior Graphic Designer & Visual Artist / UI/UX Designer — design-to-code. Goiânia, Brazil (remote).",
    "res.download_design": 'Download PDF — Design <span class="px">↓</span>',
    "res.download_uiux": 'Download PDF — UI/UX <span class="px">↓</span>',
    "res.education_value": "BA in Graphic Design<br>Universidade Federal de Goiás — 2005/2010",
    "res.languages_value": "Portuguese (native)<br>English (fluent)",
    "res.section01_h2": '<span class="px">01</span> Profile',
    "res.profile_p": "With 20 years in Graphic Design and UI/UX, I combine technical rigor with artistic sensitivity to create user-centered experiences. Applying Semiotics and Gestalt principles, I communicate deeply through every layer of a layout — from print and packaging to brand systems and digital products. My parallel journey as a muralist and tattoo artist broadens my creative range and gives me the flexibility to solve visual problems on any medium; with Design Thinking, I turn complex requirements into user journeys and implementation-ready interfaces, prototyping my own solutions in HTML, CSS and JavaScript.",
    "res.section02_h2": '<span class="px">02</span> Core competencies',
    "res.design_title": "Design craft",
    "res.design_li1": "<strong>Visual design & craft</strong> — typography, color theory, visual hierarchy and layout, grounded in Gestalt and Semiotics.",
    "res.design_li2": "<strong>Brand systems & art direction</strong> — identity, packaging and campaign design across print and digital, from concept to scalable visual systems.",
    "res.design_li3": "<strong>Illustration & multi-medium art</strong> — custom illustration, large-scale murals and tattoo artistry, one concept across physical and digital surfaces.",
    "res.design_li4": "<strong>Creative direction & collaboration</strong> — translating briefs and artistic visions into cohesive concepts, leading projects end-to-end.",
    "res.ux_title": "UX & code",
    "res.ux_li1": "<strong>UX/UI & research</strong> — user research, competitive benchmarking, wireframing and rapid prototyping.",
    "res.ux_li2": "<strong>Design-to-code</strong> — complex requirements into user journeys and flows, with functional prototyping and implementation-ready interfaces.",
    "res.ux_li3": "<strong>Processes, management & AI</strong> — agile methodologies, remote collaboration, project management and AI-powered workflows (research synthesis, automation, assisted coding).",
    "res.section03_h2": '<span class="px">03</span> Tools & digital production',
    "res.tools_design_ui_value": "Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign), Affinity Designer, Canva",
    "res.tools_code_ai_value": "HTML, CSS, JavaScript, AI coding assistants & image generators",
    "res.tools_illustration_video_value": "Procreate, After Effects, Premiere, CapCut",
    "res.section04_h2": '<span class="px">04</span> Experience',
    "res.exp1": '<h3>UI/UX Designer <span class="cv-at">— Ultimatum · law practice management software</span></h3>\n            <p>Leading the modernization of the platform\'s interface and experience — a strategic evolution centered on users\' real daily routines. UX research and market analysis inform every decision; prototypes are developed in HTML, CSS, Bootstrap and Chart.js, bringing design and development closer together so every proposal is viable for implementation. AI is integrated into the workflow to accelerate research and code.</p>',
    "res.exp2": '<h3>Graphic Designer <span class="cv-at">— Places · real estate marketing & design</span></h3>\n            <p>Kept the visual identity consistent for multiple clients across social media, print, outdoor and catalogs as campaigns rolled out. An agile, organized process held both aesthetic quality and consistency in a field driven by tight deadlines.</p>',
    "res.exp3": '<h3>Independent Visual Artist <span class="cv-at">— muralist & tattoo artist</span></h3>\n            <p>A parallel career of large-scale murals and custom tattoos that sharpens how expectations are read and space is designed. Turning an abstract concept into something permanent — on skin or on a wall — teaches you to listen closely and decide with precision.</p>',
    "res.exp4": '<h3>Creative Director <span class="cv-at">— Dupplamente Creative Projects</span></h3>\n            <p>As a partner, ran branding projects end-to-end, coordinating multidisciplinary teams assembled on demand — researchers, photographers, print suppliers. That collaborative orchestration, paired with Design Thinking, produced deep visual identities aligned with each client\'s real needs. In all, helped over 60 businesses launch or consolidate in the market.</p>',
    "res.exp5": '<h3>UX/UI Designer <span class="cv-at">— Ultimatum · legal practice management software</span></h3>\n            <p>First stint at Ultimatum: in charge of the UI, visual identity and design system of two digital products built from the ground up. The work proved decisive for the company\'s growth and opened doors to key contracts with several regional chapters of the OAB (Brazil\'s Bar Association).</p>',
  },

  pt: {
    "nav.about": "Sobre",
    "nav.design": "Design",
    "nav.uiux": "UI/UX",
    "nav.resume": "Currículo",
    "nav.contact": "Contato",
    "footer.tag": "[ fale comigo ]",
    "footer.behance": "Behance",
    "footer.linkedin": "LinkedIn",
    "footer.resume": "Currículo",
    "footer.note.index": 'Criado por Bruna Lopes <span class="px">*</span> 2026',
    "footer.note.pages": "Criado e codificado à mão por Bruna Lopes ✠ MMXXVI",

    "tag.contact": "[ contato ]",
    "tag.links": "[ links ]",
    "tag.education": "[ formação ]",
    "tag.languages": "[ idiomas ]",
    "tag.design_ui": "[ design & ui ]",
    "tag.code_ai": "[ código & ia ]",
    "tag.illustration_video": "[ ilustração & vídeo ]",

    "idx.hero.title": '<span class="line">Design</span>\n        <span class="line"><span class="outline">Gráfico</span> <span class="amp">&</span></span>\n        <span class="line">UI<span class="outline">/UX</span></span>',
    "idx.hero.lede": "Unindo sensibilidade artística e precisão técnica — 20 anos transformando ofício em estratégia, pixels em pigmento, ideias em impacto.",
    "idx.hero.cta_design": "design",
    "idx.hero.cta_uiux": "ui/ux",
    "idx.hero.cta_resume": "currículo",
    "idx.hero.construction": "Site em construção",
    "idx.marquee": 'Branding <span class="px">✳</span> Ilustração <span class="px">✳</span> Murais <span class="px">✳</span> Tatuagem <span class="px">✳</span> UI/UX <span class="px">✳</span> Design-to-Code <span class="px">✳</span>',
    "idx.manifesto.h2": 'O processo<br>é o <span class="purpose">propósito</span>',
    "idx.manifesto.p1": "Para mim, nenhuma experiência é descartada — tudo se torna repertório. Minha jornada tem raiz numa filosofia bem pessoal: criar o melhor resultado possível com os materiais que tenho em mãos. Muito antes de projetar sistemas digitais complexos, minhas mãos aprenderam o valor da estrutura e do ofício através de artes manuais e trabalho em couro.",
    "idx.manifesto.p2": "Hoje, meu trabalho existe na tensão entre o pixel e o pigmento. Ao unir o rigor analítico de uma designer UX/UI com a sensibilidade tátil de uma tatuadora e muralista, conecto tecnologia e arte — ancorando propósito, estética e humanidade no dia a dia.",
    "idx.areas.title": '<span class="px">✳</span> Dois caminhos, uma designer',
    "idx.areas.design_aria": "Design — branding, ilustração, murais, tatuagem",
    "idx.areas.uiux_aria": "UI/UX — pesquisa, prototipagem, design-to-code",
    "idx.areas.ring_design": "branding · ilustração · murais · tatuagem · branding · ilustração · murais · tatuagem · ",
    "idx.areas.ring_uiux": "pesquisa · prototipagem · design-to-code · pesquisa · prototipagem · design-to-code · ",
    "idx.work.h2": 'Vinte anos,<br>um <span class="frak">currículo</span>',
    "idx.work.p": "De gráficas a equipes de produto — design gráfico, branding, murais, tatuagem e engenharia de UI/UX, tudo em uma só linha do tempo. Leia aqui mesmo ou baixe o PDF que combina com a vaga.",
    "idx.work.toggle_closed": 'Ler o currículo <span class="px">↓</span>',
    "idx.work.toggle_open": 'Recolher o currículo <span class="px">↑</span>',
    "idx.work.pdf_design": "PDF — Design",
    "idx.work.pdf_uiux": "PDF — UI/UX",
    "idx.rm.contact_h3": "Contato & Detalhes",
    "idx.rm.education_value": '<span class="emph-2">Bacharelado em Design Gráfico</span><br>Universidade Federal de Goiás — 2005/2010',
    "idx.rm.languages_value": 'Português <span class="emph-2">nativo</span><br>Inglês <span class="emph-2">fluente</span>',
    "idx.rm.profile_h3": "Perfil",
    "idx.rm.profile_p": "Com 20 anos em Design Gráfico e UI/UX, combino rigor técnico com sensibilidade artística para criar experiências centradas no usuário. Aplicando princípios de Semiótica e Gestalt, comunico com profundidade em cada camada de um layout — do impresso e embalagens a sistemas de marca e produtos digitais. Minha trajetória paralela como muralista e tatuadora amplia meu repertório criativo e me dá flexibilidade para resolver problemas visuais em qualquer meio; com Design Thinking, transformo requisitos complexos em jornadas de usuário e interfaces prontas para implementação, prototipando minhas próprias soluções em HTML, CSS e JavaScript.",
    "idx.rm.profile_photo_alt": "Retrato de Maria Bruna Lopes",
    "idx.rm.competencies_h3": "Principais Competências",
    "idx.rm.design_title": "Domínio em Design",
    "idx.rm.design_li1": "<strong>Design visual & ofício</strong> — tipografia, teoria das cores, hierarquia visual e layout, com base em Gestalt e Semiótica.",
    "idx.rm.design_li2": "<strong>Sistemas de marca & direção de arte</strong> — identidade, embalagem e design de campanhas em impresso e digital, do conceito a sistemas visuais escaláveis.",
    "idx.rm.design_li3": "<strong>Ilustração & arte multimídia</strong> — ilustração autoral, murais de grande escala e tatuagem, um mesmo conceito em superfícies físicas e digitais.",
    "idx.rm.design_li4": "<strong>Direção criativa & colaboração</strong> — traduzindo briefings e visões artísticas em conceitos coesos, liderando projetos do início ao fim.",
    "idx.rm.ux_title": "UX & código",
    "idx.rm.ux_li1": "<strong>UX/UI & pesquisa</strong> — pesquisa com usuários, benchmarking competitivo, wireframes e prototipagem rápida.",
    "idx.rm.ux_li2": "<strong>Design-to-code</strong> — requisitos complexos transformados em jornadas e fluxos de usuário, com prototipagem funcional e interfaces prontas para implementação.",
    "idx.rm.ux_li3": "<strong>Processos, gestão & IA</strong> — metodologias ágeis, colaboração remota, gestão de projetos e fluxos de trabalho com IA (síntese de pesquisa, automação, codificação assistida).",
    "idx.rm.tools_h3": "Ferramentas & Produção Digital",
    "idx.rm.tools_design_ui_value": "Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign), Affinity Designer, Canva",
    "idx.rm.tools_code_ai_value": "HTML, CSS, JavaScript, assistentes de código com IA e geradores de imagem",
    "idx.rm.tools_illustration_video_value": "Procreate, After Effects, Premiere, CapCut",
    "idx.rm.experience_h3": "Destaques da Experiência",
    "idx.rm.exp1": '<h4>UI/UX Designer <span class="cv-at">— Ultimatum · software de gestão para escritórios de advocacia</span></h4>\n                <p>A Ultimatum desenvolve software de gestão para escritórios de advocacia usado em todo o Brasil. Voltei à empresa, agora para liderar a modernização da interface e da experiência da plataforma — uma evolução estratégica centrada na rotina real dos usuários. Aqui, a pesquisa de UX e a análise de mercado orientam cada decisão, e os protótipos que desenvolvo em HTML, CSS, Bootstrap e Chart.js aproximam design e desenvolvimento, garantindo que cada proposta seja viável para implementação. Integro IA ao meu fluxo de trabalho para acelerar pesquisa e código — liberando meu foco para o que realmente importa: refinar o produto final.</p>',
    "idx.rm.exp2": '<h4>Designer Gráfica <span class="cv-at">— Places · marketing & design imobiliário</span></h4>\n                <p>Em redes sociais, impressos, mídia externa e catálogos, mantive a identidade visual consistente para diversos clientes ao longo das campanhas. Num mercado guiado por prazos apertados, um processo ágil e organizado me permitiu manter qualidade estética e consistência, entrega após entrega.</p>',
    "idx.rm.exp3": '<h4>Artista Visual Independente <span class="cv-at">— muralista & tatuadora</span></h4>\n                <p>Entre murais de grande escala e tatuagens personalizadas, mantenho uma carreira paralela que aguça minha leitura de expectativas e senso de design espacial. Transformar um conceito abstrato em algo permanente — na pele ou numa parede — ensina a escutar de perto e decidir com precisão. São instintos que levo para todo projeto digital.</p>',
    "idx.rm.exp4": '<h4>Diretora Criativa <span class="cv-at">— Dupplamente Projetos Criativos</span></h4>\n                <p>Como sócia, conduzi projetos de branding do início ao fim, coordenando equipes multidisciplinares montadas sob demanda — pesquisadores, fotógrafos e fornecedores de impressão. Essa orquestração colaborativa, aliada ao Design Thinking, produziu identidades visuais profundas alinhadas às necessidades reais de cada cliente. No total, ajudei mais de 60 negócios a lançar ou consolidar sua presença no mercado.</p>',
    "idx.rm.exp5": '<h4>UX/UI Designer <span class="cv-at">— Ultimatum · software de gestão para escritórios de advocacia</span></h4>\n                <p>Essa primeira passagem pela Ultimatum me colocou à frente da UI, identidade visual e design system de dois produtos digitais construídos do zero. O trabalho foi decisivo para o crescimento da empresa e abriu portas para contratos importantes com diversas seccionais da OAB.</p>',

    "des.hero_kicker": '<span class="px">✳ área 01</span> de duas',
    "des.page_lede": "Identidade de marca, embalagens e design de campanhas — enriquecidos por uma vida paralela na ilustração, murais de grande escala e tatuagem. Um único conceito, traduzido em superfícies físicas e digitais fora do convencional.",
    "des.projects_title": '<span class="px">✳</span> Projetos',
    "des.cta_behance": 'Arquivo completo no Behance <span class="px">→</span>',
    "des.cta_uiux": 'Ir para UI/UX <span class="px">→</span>',
    "des.figure_alt": "Ilustração de um olho, da prática autoral de ilustração e tatuagem de Bruna",

    "ux.hero_kicker": '<span class="px">✳ área 02</span> de duas',
    "ux.page_lede": "Pesquisa, wireframes e prototipagem rápida — levados até interfaces prontas para implementação em HTML, CSS e JavaScript. Design e desenvolvimento, mais próximos.",
    "ux.toolkit_title": '<span class="px">✳</span> Kit de design-to-code',
    "ux.toolkit_research_label": "[ pesquisa ]",
    "ux.toolkit_research_value": "Pesquisa com usuários, benchmarking competitivo, wireframes, prototipagem rápida",
    "ux.toolkit_build_label": "[ construção ]",
    "ux.toolkit_build_value": "HTML, CSS, JavaScript, Bootstrap, Chart.js, Figma",
    "ux.toolkit_accelerate_label": "[ acelerar ]",
    "ux.toolkit_accelerate_value": "Fluxos de trabalho com IA — síntese de pesquisa, automação, codificação assistida",
    "ux.cta_resume": "Currículo — trilha UI/UX",
    "ux.cta_design": 'Ir para Design <span class="px">→</span>',
    "ux.figure_alt": "Ilustração de um lírio, parte da prática de design-to-code em UI/UX de Bruna",

    "res.title": "Currículo — Bruna Lopes",
    "res.hero_kicker": '<span class="px">✳ o</span> Currículo',
    "res.page_lede": "Designer Gráfica Sênior & Artista Visual / UI/UX Designer — design-to-code. Goiânia, Brasil (remoto).",
    "res.download_design": 'Baixar PDF — Design <span class="px">↓</span>',
    "res.download_uiux": 'Baixar PDF — UI/UX <span class="px">↓</span>',
    "res.education_value": "Bacharelado em Design Gráfico<br>Universidade Federal de Goiás — 2005/2010",
    "res.languages_value": "Português (nativo)<br>Inglês (fluente)",
    "res.section01_h2": '<span class="px">01</span> Perfil',
    "res.profile_p": "Com 20 anos em Design Gráfico e UI/UX, combino rigor técnico com sensibilidade artística para criar experiências centradas no usuário. Aplicando princípios de Semiótica e Gestalt, comunico com profundidade em cada camada de um layout — do impresso e embalagens a sistemas de marca e produtos digitais. Minha trajetória paralela como muralista e tatuadora amplia meu repertório criativo e me dá flexibilidade para resolver problemas visuais em qualquer meio; com Design Thinking, transformo requisitos complexos em jornadas de usuário e interfaces prontas para implementação, prototipando minhas próprias soluções em HTML, CSS e JavaScript.",
    "res.section02_h2": '<span class="px">02</span> Principais competências',
    "res.design_title": "Domínio em Design",
    "res.design_li1": "<strong>Design visual & ofício</strong> — tipografia, teoria das cores, hierarquia visual e layout, com base em Gestalt e Semiótica.",
    "res.design_li2": "<strong>Sistemas de marca & direção de arte</strong> — identidade, embalagem e design de campanhas em impresso e digital, do conceito a sistemas visuais escaláveis.",
    "res.design_li3": "<strong>Ilustração & arte multimídia</strong> — ilustração autoral, murais de grande escala e tatuagem, um mesmo conceito em superfícies físicas e digitais.",
    "res.design_li4": "<strong>Direção criativa & colaboração</strong> — traduzindo briefings e visões artísticas em conceitos coesos, liderando projetos do início ao fim.",
    "res.ux_title": "UX & código",
    "res.ux_li1": "<strong>UX/UI & pesquisa</strong> — pesquisa com usuários, benchmarking competitivo, wireframes e prototipagem rápida.",
    "res.ux_li2": "<strong>Design-to-code</strong> — requisitos complexos transformados em jornadas e fluxos de usuário, com prototipagem funcional e interfaces prontas para implementação.",
    "res.ux_li3": "<strong>Processos, gestão & IA</strong> — metodologias ágeis, colaboração remota, gestão de projetos e fluxos de trabalho com IA (síntese de pesquisa, automação, codificação assistida).",
    "res.section03_h2": '<span class="px">03</span> Ferramentas e produção digital',
    "res.tools_design_ui_value": "Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign), Affinity Designer, Canva",
    "res.tools_code_ai_value": "HTML, CSS, JavaScript, assistentes de código com IA & geradores de imagem",
    "res.tools_illustration_video_value": "Procreate, After Effects, Premiere, CapCut",
    "res.section04_h2": '<span class="px">04</span> Experiência',
    "res.exp1": '<h3>UI/UX Designer <span class="cv-at">— Ultimatum · software de gestão para escritórios de advocacia</span></h3>\n            <p>Liderando a modernização da interface e da experiência da plataforma — uma evolução estratégica centrada na rotina real dos usuários. Pesquisa de UX e análise de mercado orientam cada decisão; os protótipos são desenvolvidos em HTML, CSS, Bootstrap e Chart.js, aproximando design e desenvolvimento para que cada proposta seja viável de implementar. IA é integrada ao fluxo de trabalho para acelerar pesquisa e código.</p>',
    "res.exp2": '<h3>Designer Gráfica <span class="cv-at">— Places · marketing & design imobiliário</span></h3>\n            <p>Manteve a identidade visual consistente para diversos clientes em redes sociais, impressos, mídia externa e catálogos ao longo das campanhas. Um processo ágil e organizado sustentou qualidade estética e consistência num mercado guiado por prazos apertados.</p>',
    "res.exp3": '<h3>Artista Visual Independente <span class="cv-at">— muralista & tatuadora</span></h3>\n            <p>Uma carreira paralela de murais de grande escala e tatuagens personalizadas que aguça a leitura de expectativas e o design de espaços. Transformar um conceito abstrato em algo permanente — na pele ou numa parede — ensina a escutar de perto e decidir com precisão.</p>',
    "res.exp4": '<h3>Diretora Criativa <span class="cv-at">— Dupplamente Projetos Criativos</span></h3>\n            <p>Como sócia, conduziu projetos de branding do início ao fim, coordenando equipes multidisciplinares montadas sob demanda — pesquisadores, fotógrafos, fornecedores de impressão. Essa orquestração colaborativa, aliada ao Design Thinking, produziu identidades visuais profundas alinhadas às necessidades reais de cada cliente. No total, ajudou mais de 60 negócios a lançar ou consolidar sua presença no mercado.</p>',
    "res.exp5": '<h3>UX/UI Designer <span class="cv-at">— Ultimatum · legal practice management software</span></h3>\n            <p>Primeira passagem pela Ultimatum: à frente da UI, identidade visual e design system de dois produtos digitais construídos do zero. O trabalho foi decisivo para o crescimento da empresa e abriu portas para contratos importantes com diversas seccionais da OAB.</p>',
  },
};

const LANG_KEY = "site-lang";

function getLang() {
  return localStorage.getItem(LANG_KEY) === "pt" ? "pt" : "en";
}

function t(key) {
  const dict = translations[getLang()] || translations.en;
  return dict[key] !== undefined ? dict[key] : translations.en[key];
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });

  // résumé download links: swap the PDF the button points to
  document.querySelectorAll("[data-cv-en]").forEach((a) => {
    a.href = lang === "pt" ? a.dataset.cvPt : a.dataset.cvEn;
  });

  // the expandable-résumé toggle button rewrites its own label on click
  // (main.js); keep it in sync with the current language + open state too
  const resumeToggle = document.getElementById("resume-toggle");
  if (resumeToggle) {
    const open = resumeToggle.getAttribute("aria-expanded") === "true";
    resumeToggle.innerHTML = dict[open ? "idx.work.toggle_open" : "idx.work.toggle_closed"];
  }

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.textContent = lang === "pt" ? "EN" : "PT";
    btn.setAttribute("aria-label", lang === "pt" ? "Switch to English" : "Mudar para português");
  });

  localStorage.setItem(LANG_KEY, lang);
}

window.i18n = { translations, getLang, t, apply: applyLanguage };

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(getLang());
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(getLang() === "pt" ? "en" : "pt"));
  });
});
