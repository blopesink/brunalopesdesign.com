/* =========================================================
   CASE: Ultimatum — rebranding (2024)
   Conteúdo real. Layout vem de css/case.css + js/case-render.js.
   Assets reais em assets/ (SVG vetorial) e refs/ (deck original).
   Regra do manual respeitada: símbolo "versão clara" sobre fundo
   escuro; lockups em painel claro.
   ========================================================= */
window.CASE = {
  slug: "ultimatum",
  titulo: "Ultimatum",
  categoria: "✳ Identidade de marca · rebranding",
  resumo: "Rebranding da pioneira brasileira em tecnologia jurídica. Uma marca metalinguística — robusta, tecnológica e descomplicada — construída para sustentar a próxima década da Ultimatum.",
  voltar: "design.html",

  // TEMA — imersão clara na identidade da Ultimatum (prata claro → chumbo).
  // Fundo prata claro metálico; texto chumbo; símbolo clara COM dropshadow
  // (regra do manual p/ fundo cinza claro); lockups em painel branco.
  tema: {
    bg: "linear-gradient(180deg, #ffffff 0%, #5e6465 100%)",
    ink: "#5e6465",       // texto chumbo
    titulo: "#3d4245",    // títulos grafite mais fundo (hierarquia)
    acento: "#7c8288",    // kicker, legendas, cite
    borda: "#c3c9cf",     // bordas de imagem / divisor
    quoteBg: "linear-gradient(120deg, #e4e8eb 0%, #cfd5da 100%)",
    quoteInk: "#3d4245",
    painel: "#ffffff"     // painéis de logo brancos (contraste com o prata)
  },

  // grafismos (linhas do U) sangrando na borda ao longo da página
  grafismos: ["assets/grafismo-1.svg", "assets/grafismo-2.svg"],

  meta: [
    { rotulo: "Cliente", valor: "Ultimatum — tecnologia jurídica" },
    { rotulo: "Ano", valor: "2024 · 1º redesign em 2011" },
    { rotulo: "Papel", valor: "Direção de arte · identidade visual" },
    { rotulo: "Entregáveis", valor: "Símbolo, logotipo, assinatura, paleta, aplicações" }
  ],

  blocos: [
    // hero: a identidade completa em painel claro (símbolo + logotipo + assinatura)
    {
      tipo: "imagem",
      src: "assets/lockup-vertical.svg",
      moldura: false,
      tamanho: "520px",
      legenda: "Assinatura vertical — símbolo, logotipo e tecnologia jurídica"
    },
    {
      tipo: "texto",
      titulo: "Robusta · Tecnológica · Descomplicada",
      corpo: "As três palavras-chave que guiaram cada decisão do rebranding."
    },
    {
      tipo: "texto",
      titulo: "O retorno",
      corpo: [
        "Assinei o redesign da Ultimatum em 2011. Em 2024 voltei à marca — desta vez para reescrevê-la.",
        "O primeiro trabalho modernizou o que já existia. Este é mais ousado: aproveita a longa história da Ultimatum, pioneira em legaltech desde 1998, para recolocá-la no zeitgeist e dar fôlego para sustentar sua trajetória por muitos anos."
      ]
    },
    {
      tipo: "texto",
      titulo: "Evolução da marca",
      corpo: "Do logo legado ao redesign de 2011 e ao rebranding de 2024 — a marca amadurecendo em três tempos."
    },
    {
      tipo: "linha",
      painel: false,
      altura: "84px",
      colunas: 3,
      itens: [
        { src: "assets/logo-legado.svg", rotulo: "Legado · pré-2011" },
        { src: "assets/logo-2011.svg", rotulo: "Redesign · 2011" },
        { src: "assets/lockup-horizontal.svg", rotulo: "Rebranding · 2024" }
      ]
    },
    {
      tipo: "quote",
      texto: "Abandonamos os signos do passado para conectar nossa marca com o futuro.",
      autor: "— Ultimatum"
    },
    {
      tipo: "texto",
      titulo: "O conceito",
      corpo: [
        "O rebranding é centrado no nome e na essência vanguardista da Ultimatum. Ao escolher a letra U, a marca afirma o foco em si mesma — não precisa recorrer a signos externos.",
        "A logo é metalinguística: fala da própria Ultimatum."
      ]
    },
    {
      tipo: "texto",
      titulo: "Novo símbolo",
      corpo: "Gradiente, volume, tridimensional. Metal e polimento levam a marca do branco ao chumbo. As formas angulares constroem a leitura da letra U e reforçam o aspecto tecnológico."
    },
    {
      tipo: "imagem",
      src: "assets/simbolo-caracteristicas.svg",
      moldura: false,
      tamanho: "760px",
      legenda: "Novo símbolo e suas características"
    },
    {
      tipo: "texto",
      titulo: "Novo logotipo",
      corpo: "O logotipo foi desenhado exclusivamente para a Ultimatum. Assim como o símbolo, tem linhas angulosas — diagonais, arredondadas e pontiagudas — que reafirmam a versatilidade e o dinamismo da empresa."
    },
    {
      tipo: "imagem",
      src: "assets/logotipo.svg",
      painel: true,
      tamanho: "50%",
      legenda: "Novo logotipo"
    },
    {
      tipo: "texto",
      titulo: "Paleta de cores",
      corpo: "A nova abordagem vai do branco ao chumbo — uma paleta metálica, sóbria e tecnológica."
    },
    {
      tipo: "paleta",
      formato: "bento",
      cores: [
        { nome: "Branco", hex: "#ffffff" },
        { nome: "Prata claro", hex: "#eff1f2" },
        { nome: "Cinza", hex: "#d1d7df" },
        { nome: "Aço", hex: "#91989c" },
        { nome: "Chumbo", hex: "#5e6465" }
      ]
    },
    {
      tipo: "texto",
      titulo: "Aplicações",
      corpo: "A identidade se estende com a mesma disciplina para assinaturas, avatares e peças — como as camisetas do time."
    },
    {
      tipo: "linha",
      painel: false,
      altura: "240px",
      colunas: 3,
      itens: [
        { src: "assets/CAMISETA-01.png" },
        { src: "assets/CAMISETA-02.png" },
        { src: "assets/CAMISETA-03.png" }
      ]
    },
    {
      tipo: "quote",
      texto: "O que a Ultimatum entrega não é apenas o essencial — é a base tecnológica para uma gestão jurídica completa, inteligente e à prova do tempo.",
      autor: "— Manifesto Ultimatum"
    }
  ]
};
