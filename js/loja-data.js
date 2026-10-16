/* Loja de serviços: conteúdo e preços.
   Fonte única da loja (loja.html, produto.html, carrinho.html, pagamento.html).
   Valores em reais, inteiros. Para mudar um preço, edite só aqui. */

/* ---- subprodutos de conteúdo dos sites (valores sugeridos) ---- */
const SUB_ALTERACAO = {
  id: "alt", rotulo: "Alteração de conteúdo", tipo: "qtd", valor: 150, posEntrega: true,
  unidade: "pacote de até 2 h",
  nota: "Pacote de até 2 h para trocar textos, imagens, preços, datas, botões e links em seções que já existem, com publicação. Não inclui seção ou página nova (cobrada à parte) nem mudança de layout. Válido por 12 meses após a entrega."
};
const SUB_RENOVACAO = {
  id: "ren", rotulo: "Renovação de conteúdo", tipo: "check", pct: 20, posEntrega: true,
  nota: "Atualização completa do conteúdo mantendo o layout: textos, imagens, ofertas e ordem das seções, a partir de material fornecido pelo cliente. Criação de texto e imagens fica fora (sob consulta). Válida por 12 meses após a entrega."
};

/* ---- mix de peças das redes sociais (créditos por peça) ---- */
const PECAS_SOCIAL = [
  { id: "est",  rotulo: "Post estático",                                  creditos: 1, preco: 80 },
  { id: "car",  rotulo: "Carrossel de até 15 slides",                     creditos: 5, preco: 380 },
  { id: "vid",  rotulo: "Vídeo post CapCut de até 15 segundos",           creditos: 6, preco: 480 },
  { id: "carv", rotulo: "Carrossel com vídeos curtos (até 10 slides, até 3 vídeos de até 5 s)", creditos: 7, preco: 550 }
];

window.LOJA = {
  contato: {
    whatsapp: "5562981192575",
    whatsappExibicao: "(62) 98119-2575",
    email: "hello@brunalopesdesign.com"
  },
  validade: "31 de dezembro de 2026",
  pagamento: "50% para iniciar e 50% na entrega, ou até 6x no crédito, com juros da operadora",

  /* desconto progressivo: conta serviços distintos no carrinho */
  descontos: [
    { min: 2, pct: 5 },
    { min: 3, pct: 10 },
    { min: 4, pct: 15 }
  ],

  /* visitas presenciais inclusas, pelo valor do pedido (já com desconto).
     A proposta deixa um vão entre R$ 1.201 e R$ 1.499: tratado como 1ª faixa. */
  visitas: [
    { min: 800,  max: 1499,     texto: "1 visita de 2 h" },
    { min: 1500, max: 2800,     texto: "1 visita de até 3 h" },
    { min: 2801, max: Infinity, texto: "2 visitas de até 3 h" }
  ],
  visitaExtra: 180,

  /* Pix: preencha a chave e coloque o QR em img/loja/pix-qr.png */
  pix: {
    chave: "",
    qr: "img/loja/pix-qr.png",
    beneficiario: ""
  },

  /* licenças de arquivos editáveis (exclusivas entre si) */
  licencas: [
    {
      id: "lic-projeto", rotulo: "Editáveis para o projeto", pct: 40,
      nota: "Arquivos abertos (Figma, Illustrator, Photoshop, InDesign ou After Effects). Uso vitalício para editar e gerar novas versões dentro do mesmo projeto, marca ou campanha. Não vale para outros clientes ou marcas."
    },
    {
      id: "lic-comercial", rotulo: "Editáveis para uso comercial", pct: 100,
      nota: "Os mesmos arquivos abertos, com uso comercial livre e vitalício, inclusive reuso em outros projetos, marcas e clientes da agência. Não inclui revender os arquivos como produto."
    }
  ],

  categorias: [
    { id: "marca",    nome: "Marca",    resumo: "Da logo ao manual, com as peças e o movimento da identidade." },
    { id: "web",      nome: "Web",      resumo: "Landing pages e sites que encantam, transmitem autoridade e convertem." },
    { id: "conteudo", nome: "Conteúdo", resumo: "Peças para redes sociais e vídeos com a cara da marca." }
  ],

  produtos: [
    /* ================= MARCA ================= */
    {
      slug: "logo",
      categoria: "marca",
      nome: "Logo",
      subtitulo: "até três propostas, sem manual",
      resumo: "Uma logo feita com método e pronta para aplicações refinadas: painel semântico de referências e até 3 propostas, entregue em vetor e imagem.",
      descricao: "Uma logo feita com método e pronta para aplicações refinadas no futuro. Desenvolvimento da marca gráfica (logotipo ou logotipo + símbolo) a partir do briefing, seguindo as boas práticas de design. O processo começa com um painel semântico de referências e segue com até 3 propostas. O projeto termina com a logo aprovada, refinada e com todas as versões de aplicação finalizadas (vetor e imagem).",
      indicacao: "Quem precisa de uma marca nova ou de um redesign e vai cuidar das aplicações por conta própria ou com outra agência.",
      incluso: [
        "Painel semântico (mapa mental de referências e características) para direcionar a primeira proposta",
        "Até 3 propostas de logo, apresentadas uma de cada vez",
        "Refinamento e finalização da proposta aprovada",
        "Arquivos finais da logo em JPEG, PNG, SVG e EPS, em RGB e CMYK",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência"
      ],
      naoIncluso: [
        "Sistema de aplicação da identidade",
        "Peças (papelaria, redes sociais, camisetas, adesivos etc.)",
        "Manual de marca / branding book",
        "Mockups",
        "Serviços de terceiros (impressão, fotografia, banco de imagens, renders 3D)"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do briefing"],
        ["2º dia útil", "Painel semântico para aprovação"],
        ["4º dia útil", "Entrega da 1ª proposta. Se aprovada, segue para finalização; se reprovada, uma nova proposta é feita em 3 dias úteis com base no feedback do cliente"],
        ["7º dia útil", "Entrega da 2ª proposta (se necessária). Aprovada, segue para finalização; reprovada, nova proposta em 3 dias úteis"],
        ["10º dia útil", "Entrega da 3ª proposta (se necessária). Com três propostas em mãos, o cliente escolhe uma"],
        ["+2 dias úteis", "Finalização e entrega nos formatos JPEG, PNG, SVG e EPS, em RGB e CMYK"]
      ],
      tecnologias: "Rascunhos à mão, Procreate, Illustrator",
      prazo: "Mínimo de 6 dias úteis (1ª proposta aprovada: 4 de desenvolvimento + 2 de finalização)<br>Máximo de 12 dias úteis (3ª proposta: 10 de desenvolvimento + 2 de finalização)",
      preco: 1800,
      licenca: false,
      notaValor: "A logo já é entregue com os vetores (SVG e EPS), então não há licença de arquivos editáveis à parte.",
      sobConsulta: []
    },
    {
      slug: "branding-book",
      categoria: "marca",
      nome: "Branding Book e aplicações da marca",
      subtitulo: "manual de 20 ou 80 páginas, com peças e mockups",
      resumo: "Manual de marca diagramado, com peças de aplicação e mockups que mostram a identidade em uso real.",
      descricao: "Diagramação do manual de marca a partir da logo e do direcionamento estratégico. Inclui o desenvolvimento das peças de aplicação e dos mockups que mostram a marca em uso. O material ganha organização, hierarquia e acabamento gráfico, com um projeto gráfico dinâmico e fora do óbvio e aplicações reais da identidade.",
      indicacao: "Marca que já tem logo e diretrizes definidas e precisa de um manual que explique os conceitos da marca e mostre a identidade aplicada em peças reais, com regras claras de uso para a equipe interna e para terceiros.",
      incluso: [
        "Projeto gráfico e diagramação do branding book",
        "Organização do conteúdo fornecido pelo cliente",
        "Versões de aplicação da logo, cores e tipografia, conforme o conteúdo recebido",
        "Desenvolvimento de peças de aplicação da logo: 3 ou 8, conforme o pacote (ex.: papelaria, sinalização, redes sociais, uniforme, embalagem)",
        "Criação de mockups com as peças aplicadas: 3 ou 8, conforme o pacote, para o branding book e para a divulgação da marca",
        "Arquivos das peças (vetor e imagem) e dos mockups (imagem em alta resolução)",
        "Arquivo final do branding book em PDF para uso digital e impressão",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência"
      ],
      naoIncluso: [
        "Desenvolvimento de logo",
        "Peças de aplicação e mockups além dos incluídos no pacote (sob consulta)",
        "Criação de texto e de direcionamento estratégico da marca (o conteúdo e a estratégia vêm do cliente)",
        "Fotografia e banco de imagens pagos",
        "Produção e impressão das peças e outros serviços de terceiros"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do conteúdo, da logo e dos assets, reunião de alinhamento e definição das peças de aplicação"],
        ["3º dia útil", "Projeto gráfico (capa e páginas-modelo) para aprovação"],
        ["5º dia útil", "Peças de aplicação e mockups para aprovação"],
        ["10º dia útil", "Entrega da diagramação completa em PDF final, das peças e dos mockups"]
      ],
      tecnologias: "Claude, Procreate, Illustrator, Photoshop, Nano Banana, Adobe InDesign",
      prazo: "10 dias úteis após o recebimento do conteúdo e da logo",
      variantes: [
        { id: "b20", rotulo: "Até 20 páginas", preco: 1200, nota: "Com 3 peças de aplicação e 3 mockups." },
        { id: "b80", rotulo: "Até 80 páginas", preco: 1800, nota: "Com 8 peças de aplicação e 8 mockups." }
      ],
      licenca: true,
      notaValor: "Páginas e peças extras sob consulta.",
      sobConsulta: ["Páginas, peças de aplicação e mockups extras do Branding Book"]
    },
    {
      slug: "vinheta",
      categoria: "marca",
      nome: "Vinheta institucional (logo motion)",
      subtitulo: "até 8 segundos",
      resumo: "A logo e a tagline ganham movimento numa vinheta de até 8 segundos, com trilha e efeitos sonoros.",
      descricao: "Animação da logo em uma vinheta curta, de até 8 segundos. Serve para abrir ou fechar vídeos, apresentações, reels e outros conteúdos da marca. A logo, a tagline/slogan e os elementos da identidade ganham movimento, com trilha e efeitos sonoros.",
      indicacao: "Marca que quer dar movimento à identidade e ter uma assinatura animada para usar em vídeos, redes sociais, apresentações e eventos.",
      incluso: [
        "Animação da logo e da tagline/slogan em vinheta de até 8 segundos",
        "Uso dos assets da identidade visual (cores, tipografia e elementos gráficos)",
        "Trilha sonora e efeitos sonoros de bibliotecas royalty-free, licenciados para uso comercial sem custo adicional, ou áudio enviado pelo cliente",
        "2 rodadas de revisão",
        "Exportação nos formatos pedidos (ex.: 16:9 e 9:16)",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência"
      ],
      naoIncluso: [
        "Desenvolvimento ou redesenho da logo",
        "Vinheta com mais de 8 segundos ou mais de uma versão de animação",
        "Narração, trilha sonora paga ou exclusiva",
        "Animação 2D quadro a quadro e animação 3D",
        "Serviços de terceiros"
      ],
      etapas: [
        ["1º dia útil", "Recebimento da logo, dos assets e do briefing"],
        ["2º dia útil", "Referências e direção da animação para aprovação"],
        ["5º dia útil", "Entrega da primeira versão da vinheta"],
        ["Após o feedback", "Até 2 rodadas de revisão e exportação final nos formatos pedidos"]
      ],
      tecnologias: "Adobe After Effects, Illustrator, Premiere Pro",
      prazo: "Primeira versão em 5 dias úteis após receber a logo e os assets",
      preco: 600,
      licenca: true,
      notaValor: "Vinheta institucional de até 8 segundos com logo, tagline/slogan + assets + trilha e efeitos sonoros de licenciamento gratuito e/ou áudio enviado pelo cliente.",
      sobConsulta: []
    },

    /* ================= WEB ================= */
    {
      slug: "landing-starter",
      categoria: "web",
      nome: "Landing Page Starter",
      subtitulo: "hero, 3 seções e formulário",
      resumo: "Uma página com hero, 3 seções e formulário, feita para encantar, transmitir autoridade e converter, com a experiência pensada para o mobile.",
      descricao: "Uma página com banner/hero, 3 seções e formulário, feita para encantar, transmitir autoridade e converter. A página se diferencia das landing pages comuns e apresenta o serviço ou produto de forma clara, direta e atrativa. CTAs estratégicos acompanham toda a rolagem. A experiência é pensada para o mobile, com interações, animações e elementos reativos. A hierarquia de informação eficiente conduz o usuário até a ação desejada.",
      indicacao: "Projeto que precisa ser lançado para captação imediata de leads, mas exige polimento na qualidade da entrega.",
      incluso: [
        "Grafismos/ilustrações de baixa complexidade para enriquecer a interface, ou uso inteligente dos assets já disponibilizados",
        "Instalação no domínio e hospedagem adquiridos",
        "Consultoria na aquisição de domínio e hospedagem",
        "Instalação de códigos e ferramentas de venda e automação já adquiridas e pré-configuradas pelo cliente (Google Tag Manager, Google Analytics e Ads, formulário de CRM para captação de leads, botão/link do ManyChat)",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência",
        "Teste final"
      ],
      naoIncluso: [
        "Painel administrativo",
        "Desenvolvimento de logo, vetorização",
        "Criação de textos e imagens (sob consulta)",
        "Fotografia profissional",
        "Ilustração complexa, mascote, infográficos, ilustração 3D",
        "Captação ou edição de vídeo",
        "Assinatura e configuração de ferramentas de venda, automação e tráfego",
        "Aquisição de domínio, hospedagem ou qualquer serviço de terceiros"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do briefing e dos assets do cliente"],
        ["5º dia útil", "Layout da página para aprovação"],
        ["Após a aprovação (cliente)", "Envio dos códigos e ferramentas já pré-configurados (GTM, CRM, ManyChat), até o 8º dia útil"],
        ["8º dia útil", "Desenvolvimento e instalação dos códigos"],
        ["10º dia útil", "Teste final, ajuste (1 rodada) e publicação"]
      ],
      tecnologias: "HTML, CSS, JavaScript",
      prazo: "10 dias úteis",
      preco: 2400,
      adicionais: [
        {
          id: "wp", rotulo: "Upgrade para painel WordPress", tipo: "check", valor: 1400,
          nota: "A página passa a ser feita em WordPress, com painel administrativo para você editar textos, imagens e conteúdos e vídeo de treinamento. Equivale à Landing com painel WordPress (R$ 3.800)."
        },
        SUB_ALTERACAO,
        SUB_RENOVACAO
      ],
      licenca: true,
      notaValor: "Com textos e imagens enviados pelo cliente.",
      sobConsulta: ["Criação de textos e imagens", "Página extra"]
    },
    {
      slug: "site-wordpress",
      categoria: "web",
      nome: "Site institucional ou Landing Page com painel WordPress",
      subtitulo: "landing ou institucional, com painel e treinamento em vídeo",
      resumo: "Site ou landing page em WordPress com painel administrativo: você edita textos e imagens sem depender de desenvolvedor, com treinamento em vídeo.",
      descricao: "Site responsivo ou landing page em WordPress, com painel administrativo. O próprio cliente edita textos, imagens e conteúdos sem depender de desenvolvedor. Inclui treinamento em vídeo para uso do painel.",
      indicacao: "Quem precisa manter o site atualizado por conta própria (novos conteúdos, produtos, galerias) e quer autonomia depois da entrega.",
      incluso: [
        "Até 2 propostas de layout, apresentadas uma de cada vez",
        "Layout responsivo (desktop, tablet e smartphone)",
        "Landing page: hero + seções + formulário  |  Institucional: até 5 páginas (home, sobre, serviços, portfólio, contato)",
        "Painel administrativo em WordPress, configurado para as áreas editáveis",
        "Vídeo de treinamento para uso do painel",
        "Instalação no domínio e hospedagem do cliente, com consultoria na contratação",
        "Instalação de códigos e ferramentas de venda e automação já adquiridas e pré-configuradas pelo cliente (Google Tag Manager, Google Analytics e Ads, formulário de CRM para captação de leads, botão/link do ManyChat)",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência",
        "Teste final"
      ],
      naoIncluso: [
        "Desenvolvimento de logo",
        "Criação de textos e fotografia profissional (conteúdo vem do cliente)",
        "Página extra além do combinado (cobrada à parte)",
        "Loja virtual / e-commerce",
        "Assinatura e configuração de ferramentas de venda, automação e tráfego",
        "Domínio, hospedagem, plugins pagos e outros serviços de terceiros"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do briefing e orientação sobre domínio e hospedagem"],
        ["10º dia útil", "Apresentação da 1ª proposta de layout"],
        ["Se necessária", "2ª proposta em até 5 dias úteis após o feedback da 1ª"],
        ["Até 10 dias úteis após a aprovação", "Desenvolvimento em WordPress, painel administrativo e inserção do conteúdo do cliente"],
        ["15º dia útil após a aprovação", "Testes, vídeo de treinamento do painel, publicação e entrega"]
      ],
      tecnologias: "WordPress, HTML, CSS, JavaScript, Figma",
      prazo: "1ª proposta de layout em 10 dias úteis (2ª, se necessária, em até 5) · site em 15 dias úteis após a aprovação do layout",
      variantes: [
        { id: "landing", rotulo: "Landing page", preco: 3800, nota: "Hero + seções + formulário." },
        { id: "inst", rotulo: "Institucional", preco: 4500, nota: "Até 5 páginas (home, sobre, serviços, portfólio, contato)." }
      ],
      adicionais: [SUB_ALTERACAO, SUB_RENOVACAO],
      licenca: true,
      notaValor: "Institucional com até 5 páginas.",
      sobConsulta: ["Página extra além do combinado"]
    },

    /* ================= CONTEÚDO ================= */
    {
      slug: "redes-sociais",
      categoria: "conteudo",
      nome: "Conteúdo para redes sociais",
      subtitulo: "pacote mensal ou avulso",
      resumo: "Carrosséis, posts estáticos e vídeo posts com acabamento de campanha, em pacote mensal de créditos ou peças avulsas.",
      descricao: "Peças para redes sociais com acabamento de campanha: carrosséis, posts estáticos e vídeo posts com motion básico. Ilustrações simples ajudam a chamar atenção e a converter. Pensado para conteúdos de maior impacto e campanhas de impulsionamento, sempre em diálogo com a identidade visual da marca.",
      indicacao: "Marca que já tem linha editorial e precisa de peças mais bem acabadas para lançamentos, promoções e anúncios pagos, em vez de posts de rotina.",
      incluso: [
        "Carrosséis (até 15 slides) com direção de arte e, quando o conceito pedir, ilustrações de baixa complexidade (ícones, grafismos e elementos simples)",
        "Posts estáticos com identidade visual aplicada",
        "Vídeo posts com motion básico (textos e elementos animados)",
        "Adaptação da mesma peça para feed, stories e reels (não conta como peça nova)",
        "Peças prontas para impulsionamento; variações para teste A/B contam como peça adicional",
        "1 rodada de ajustes por peça, devolvida em até 1 dia útil após o feedback",
        "Arquivos finais para postagem, liberados assim que cada peça é aprovada",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência"
      ],
      naoIncluso: [
        "Criação de texto/legenda e planejamento editorial (conteúdo vem do cliente)",
        "Gestão de redes, postagem e atendimento aos seguidores",
        "Gestão de tráfego e crédito de impulsionamento (pago direto às plataformas)",
        "Fotografia e captação de vídeo",
        "Ilustração detalhada ou com cenário, personagens, mascote e animação 3D",
        "Vídeos mais elaborados (ver Vídeo Motion Institucional)"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do briefing, da linha editorial e dos textos"],
        ["3º dia útil", "Key visual / templates do mês para aprovação"],
        ["5º dia útil", "Lote 1 (3 a 4 peças)"],
        ["8º dia útil", "Lote 2 (3 a 4 peças)"],
        ["10º dia útil", "Lote 3 (peças restantes)"],
        ["A cada aprovação", "Ajustes em até 1 dia útil e arquivo final liberado para postagem"]
      ],
      tecnologias: "Figma, Illustrator, Photoshop, Procreate (iPad), After Effects, CapCut",
      prazo: "Pacote mensal: 10 dias úteis, em 3 lotes · avulso: estático em 1 dia útil, carrossel em 2 a 3, vídeo em 3 · urgência em 24 h: +50%",
      variantes: [
        {
          id: "avulso", rotulo: "Peças avulsas",
          nota: "Escolha quantas peças de cada tipo.",
          semQtd: true,
          itens: PECAS_SOCIAL
        },
        {
          id: "pacote", rotulo: "Pacote mensal", preco: 2300, creditos: 36,
          rotuloQtd: "Pacotes (meses)",
          nota: "36 créditos por mês. Entre 15% e 20% abaixo do avulso, conforme o mix.",
          itens: PECAS_SOCIAL.map(p => ({ id: p.id, rotulo: p.rotulo, creditos: p.creditos }))
        }
      ],
      adicionais: [
        { id: "urg", rotulo: "Urgência em 24 h", tipo: "check", pct: 50, nota: "Entrega das peças em até 24 h." }
      ],
      licenca: true,
      notaValor: "Cada peça consome créditos: post estático = 1 · carrossel = 5 · vídeo post = 6 · carrossel com vídeos = 7. A agência monta o mix do mês, por exemplo 4 carrosséis + 2 vídeos + 4 estáticos, ou 7 carrosséis + 1 estático. Créditos não usados passam para o mês seguinte (validade de 1 mês).",
      sobConsulta: ["Ilustração complexa personalizada"]
    },
    {
      slug: "video-motion",
      categoria: "conteudo",
      nome: "Vídeo Motion Institucional",
      subtitulo: "até 60 segundos",
      resumo: "Vídeo institucional com motion graphics, infográficos animados e a identidade da marca, a partir do seu roteiro e do seu material.",
      descricao: "Edição de vídeos institucionais com motion graphics e animações. Títulos animados, infográficos em movimento e transições aplicam a identidade visual da marca. Como adicional, a animação 2D feita à mão no iPad (quadro a quadro) traz personalidade e diferenciação ao conteúdo.",
      indicacao: "Marca que precisa de um vídeo institucional, de lançamento ou de apresentação com acabamento profissional e identidade própria, a partir de imagens e roteiro que já existem.",
      incluso: [
        "Edição e montagem do vídeo a partir do material bruto fornecido",
        "Até 8 cenas (cerca de 7 a 8 segundos cada), em um estilo principal de animação definido no briefing",
        "Motion graphics em After Effects: títulos animados, lower thirds e transições",
        "Até 3 infográficos animados simples (números, gráficos ou ícones)",
        "Aplicação da identidade visual (logo, cores, tipografia)",
        "Animatic simples: prévia com a ordem, o tempo das cenas e a trilha, para aprovação antes da animação final",
        "Trilha sonora e efeitos sonoros de bibliotecas royalty-free, licenciados para uso comercial sem custo adicional",
        "Legendagem automática por IA, no idioma original do vídeo",
        "2 rodadas de revisão",
        "Exportação nos formatos pedidos (ex.: 16:9 e 9:16)",
        "Até 2 reuniões online com o cliente final (até 1 h cada), com a presença de um representante da agência"
      ],
      naoIncluso: [
        "Roteiro e criação de texto (conteúdo vem do cliente)",
        "Captação de imagens e fotografia",
        "Narração humana (a narração por IA está disponível como adicional), trilha sonora paga ou exclusiva e banco de imagens ou vídeos pagos",
        "Animação 2D quadro a quadro no Procreate (adicional: + R$ 600 a cada 10 segundos)",
        "Cenas e infográficos além dos incluídos, e mais de um estilo de animação no mesmo vídeo",
        "Alterações de roteiro ou da ordem das cenas depois da aprovação do animatic",
        "Ilustração 3D e animação 3D",
        "Legendagem manual ou com revisão profissional, tradução e versões em outros idiomas",
        "Serviços de terceiros"
      ],
      etapas: [
        ["1º dia útil", "Recebimento do briefing, do roteiro e do material bruto e definição do estilo de animação"],
        ["3º dia útil", "Direção de arte e animatic simples (prévia com a ordem e o tempo das cenas) para aprovação"],
        ["10º dia útil", "Entrega da primeira versão do vídeo"],
        ["Após o feedback", "Até 2 rodadas de revisão e exportação final nos formatos pedidos"]
      ],
      tecnologias: "Adobe After Effects, Premiere Pro, Illustrator, Procreate (iPad), ElevenLabs",
      prazo: "Primeira versão em 10 dias úteis após receber o material",
      preco: 2400,
      adicionais: [
        { id: "narr", rotulo: "Narração produzida no ElevenLabs", tipo: "check", valor: 150 },
        {
          id: "anim", rotulo: "Animação 2D quadro a quadro", tipo: "qtd", valor: 600, unidade: "a cada 10 segundos",
          nota: "Feita à mão no Procreate, no iPad. Cada unidade são 10 segundos de animação."
        }
      ],
      licenca: true,
      notaValor: "Vídeo institucional com infográficos + edição de vídeo + motion, até 60 segundos e até 8 cenas + trilha e efeitos sonoros de licenciamento gratuito e/ou áudio enviado pelo cliente. Valor sujeito a alteração conforme briefing.",
      sobConsulta: []
    }
  ]
};

/* arte do thumb: img/loja/<slug>-shape.svg, -desenho.png e -beziers.svg
   (prancheta 1131 × 1000 px, fundo transparente). Arquivo ausente vira placeholder.
   Para trocar um nome ou extensão, defina `thumb` no produto. */
window.LOJA.produtos.forEach(p => {
  p.thumb = Object.assign({
    shape:   `img/loja/${p.slug}-shape.svg`,
    desenho: `img/loja/${p.slug}-desenho.png`,
    beziers: `img/loja/${p.slug}-beziers.svg`
  }, p.thumb);
});
