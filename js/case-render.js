/* =========================================================
   CASE RENDER — motor das páginas de projeto
   Lê window.CASE (definido no case.js de cada pasta) e monta
   a página inteira: header, hero, blocos e footer.
   PT-only por enquanto. Cada case vive em cases/<slug>/.
   Imagens que ainda não existem viram placeholder rotulado,
   então dá pra montar a página antes de gerar no Nano Banana.
   ========================================================= */
(function () {
  var C = window.CASE;
  if (!C) { console.error("case.js não definiu window.CASE"); return; }

  var BASE = "../../"; // cases/<slug>/ → raiz do site

  document.title = (C.titulo ? C.titulo + " — " : "") + "Bruna Lopes";

  // ---------- helpers ----------
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  // imagem com fallback: se o arquivo não existir, mostra placeholder
  function img(src, alt) {
    var i = el("img");
    i.src = src; i.alt = alt || ""; i.loading = "lazy";
    i.onerror = function () {
      var ph = el("div", "case-ph", "<span>sem imagem ainda<br>" + src.split("/").pop() + "</span>");
      if (i.parentNode) i.replaceWith(ph);
    };
    return i;
  }
  function figure(src, legenda, cls) {
    var f = el("figure", cls || null);
    f.appendChild(img(src, legenda));
    if (legenda) f.appendChild(el("figcaption", null, legenda));
    return f;
  }

  // ---------- HEADER ----------
  var header = el("header", "site-header");
  header.innerHTML =
    '<a class="logo" href="' + BASE + 'index.html">' +
      '<span class="logo-name">Bruna Lopes</span>' +
      '<span class="logo-sub">ui/ux — design</span>' +
    '</a>' +
    '<nav class="site-nav">' +
      '<a href="' + BASE + 'index.html#about">about</a>' +
      '<a href="' + BASE + 'design.html">design</a>' +
      '<a href="' + BASE + 'uiux.html">ui/ux</a>' +
      '<a href="' + BASE + 'index.html#resume">résumé</a>' +
      '<a href="#contact" class="nav-cta">contact</a>' +
    '</nav>';
  document.body.appendChild(header);

  // ---------- MAIN ----------
  var main = el("main", "case-page");

  // ---------- TEMA POR CASE ----------
  // --case-bg vai no <body> (fundo da página); --c-* no .case-page (conteúdo).
  // Header/footer não são filhos de main → mantêm a identidade Bruna.
  if (C.tema) {
    var t = C.tema;
    if (t.bg) document.body.style.setProperty("--case-bg", t.bg);
    var map = { ink: "--c-ink", titulo: "--c-title", acento: "--c-accent",
                borda: "--c-border", quoteBg: "--c-quote-bg", quoteInk: "--c-quote-ink",
                painel: "--c-panel" };
    Object.keys(map).forEach(function (k) { if (t[k]) main.style.setProperty(map[k], t[k]); });
  }

  var back = el("a", "case-back px", "← projetos");
  back.href = BASE + (C.voltar || "design.html");
  main.appendChild(back);

  // hero
  var hero = el("header", "case-hero reveal");
  hero.innerHTML =
    (C.categoria ? '<p class="case-kicker px">' + C.categoria + '</p>' : "") +
    '<h1 class="case-title">' + (C.titulo || "") + '</h1>' +
    (C.resumo ? '<p class="case-lede">' + C.resumo + '</p>' : "");
  if (C.meta && C.meta.length) {
    var ul = el("ul", "case-meta");
    C.meta.forEach(function (m) {
      ul.appendChild(el("li", null, '<span class="px">' + m.rotulo + '</span>' + m.valor));
    });
    hero.appendChild(ul);
  }
  main.appendChild(hero);
  if (C.hero) main.appendChild(figure(C.hero, C.heroLegenda || "", "case-hero-img reveal"));

  // blocos
  (C.blocos || []).forEach(function (b) {
    var node, v;
    switch (b.tipo) {
      case "texto":
        node = el("section", "case-text reveal");
        if (b.titulo) node.appendChild(el("h2", "case-h2", b.titulo));
        (Array.isArray(b.corpo) ? b.corpo : [b.corpo]).forEach(function (p) {
          node.appendChild(el("p", null, p));
        });
        break;
      case "imagem":
        var icls = "case-img reveal";
        if (b.largura === "full") icls += " is-full";
        if (b.painel) icls += " is-panel";       // fundo claro atrás (logos em fundo escuro)
        if (b.moldura === false) icls += " no-frame";
        if (b.sombra) icls += " has-shadow";       // dropshadow (ex.: símbolo clara em fundo claro)
        if (b.tamanho) icls += " is-centered";     // largura máxima + centrado
        node = figure(b.src, b.legenda, icls);
        if (b.tamanho) node.style.maxWidth = b.tamanho;
        break;
      case "linha":
        // linha responsiva de itens (logos cronológicos, camisetas...).
        // opções: painel (bool, fundo/borda por item), altura (px, contain),
        // colunas (nº; default = qtd de itens). Empilha no mobile.
        node = el("div", "case-row reveal");
        node.style.setProperty("--cols", b.colunas || (b.itens || []).length || 1);
        (b.itens || []).forEach(function (it) {
          var item = el("figure", "case-row-item" + (b.painel === false ? " no-panel" : ""));
          var im = img(it.src, it.rotulo || "");
          if (b.altura) im.style.height = b.altura;
          im.style.width = "100%"; im.style.objectFit = "contain";
          item.appendChild(im);
          if (it.rotulo) item.appendChild(el("figcaption", "case-row-label", it.rotulo));
          node.appendChild(item);
        });
        break;
      case "paleta":
        if (b.formato === "bento") {
          // mosaico bento: 5 cores em áreas fixas (branco, prata claro, prata,
          // aço, chumbo), cantos arredondados + contorno 1px aço.
          node = el("div", "case-bento reveal");
          var areas = ["branco", "pcl", "pra", "aco", "chumbo"];
          (b.cores || []).slice(0, 5).forEach(function (c, i) {
            var cell = el("div", "case-bento-cell");
            cell.style.gridArea = areas[i];
            cell.style.background = c.hex;
            cell.title = (c.nome ? c.nome + " " : "") + c.hex;
            // texto do hex por contraste (claro em box escuro, escuro em box claro)
            var h = c.hex.replace("#", "");
            var lum = 0.299 * parseInt(h.substr(0, 2), 16) +
                      0.587 * parseInt(h.substr(2, 2), 16) +
                      0.114 * parseInt(h.substr(4, 2), 16);
            cell.style.color = lum > 150 ? "#3d4245" : "#f4f6f7";
            cell.appendChild(el("span", "case-bento-hex", c.hex));
            node.appendChild(cell);
          });
        } else {
          node = el("div", "case-palette reveal");
          (b.cores || []).forEach(function (c) {
            var sw = el("div", "case-swatch");
            var chip = el("div", "chip"); chip.style.background = c.hex;
            sw.appendChild(chip);
            sw.appendChild(el("div", "nome", c.nome || ""));
            sw.appendChild(el("div", "hexv", c.hex));
            node.appendChild(sw);
          });
        }
        break;
      case "duo":
        node = el("div", "case-duo reveal");
        b.src.forEach(function (s, i) { node.appendChild(figure(s, (b.legenda || [])[i], null)); });
        break;
      case "galeria":
        node = el("div", "case-gallery reveal");
        b.src.forEach(function (s) { node.appendChild(figure(s, "", null)); });
        break;
      case "video":
        node = el("figure", "case-video reveal");
        v = el("video");
        v.src = b.src; v.loop = true; v.muted = true; v.autoplay = true;
        v.setAttribute("playsinline", ""); v.controls = !!b.controls;
        node.appendChild(v);
        if (b.legenda) node.appendChild(el("figcaption", null, b.legenda));
        break;
      case "quote":
        node = el("blockquote", "case-quote reveal",
          "<p>" + b.texto + "</p>" + (b.autor ? "<cite>" + b.autor + "</cite>" : ""));
        break;
      default:
        return;
    }
    main.appendChild(node);
  });

  document.body.appendChild(main);

  // ---------- FOOTER ----------
  var footer = el("footer", "site-footer");
  footer.id = "contact";
  footer.innerHTML =
    '<div class="f-content">' +
      '<p class="f-kicker px">[ get in touch ]</p>' +
      '<div class="f-mail-row">' +
        '<div class="f-mail-col">' +
          '<a class="f-mail" href="mailto:hello@brunalopesdesign.com">hello@<br>brunalopes<br>design.com</a>' +
          '<a class="f-phone" href="tel:+5562981192575">+55 62 98119-2575</a>' +
        '</div>' +
        '<div class="f-links">' +
          '<a href="https://www.behance.net/mariabrunalopes" target="_blank" rel="noopener">Behance</a>' +
          '<a href="https://www.linkedin.com/in/maria-bruna-lopes" target="_blank" rel="noopener">LinkedIn</a>' +
          '<a href="' + BASE + 'index.html#resume">Résumé</a>' +
        '</div>' +
      '</div>' +
      '<p class="f-note">Designed &amp; hand-coded by Bruna Lopes ✠ MMXXVI</p>' +
    '</div>';
  document.body.appendChild(footer);

  // ---------- GRAFISMOS decorativos (sangram na borda, ao longo da página) ----------
  if (C.grafismos && C.grafismos.length) {
    var spots = [
      { side: "right", top: "4%" },
      { side: "left",  top: "24%" },
      { side: "right", top: "45%" },
      { side: "left",  top: "66%" },
      { side: "right", top: "85%" }
    ];
    spots.forEach(function (s, i) {
      var g = el("img", "case-graf case-graf--" + s.side);
      g.src = C.grafismos[i % C.grafismos.length];
      g.alt = ""; g.setAttribute("aria-hidden", "true");
      g.style.top = s.top;
      document.body.appendChild(g); // direto no body (evita wrapper 0×0)
    });
  }

  // ---------- reveal on scroll ----------
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
})();
