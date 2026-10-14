/* Loja: renderiza a página conforme body[data-pagina] (loja, produto, carrinho, pagamento).
   Dados em loja-data.js; carrinho e preços em loja-core.js. */
(function () {
  const L = window.LOJA;
  const C = window.Carrinho;
  const brl = C.brl;
  const pagina = document.body.dataset.pagina;
  const app = document.getElementById("app");
  const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const plural = (n, um, varios) => (n === 1 ? um : varios);
  const categoria = (id) => L.categorias.find((c) => c.id === id);

  /* ================= casca: rail + barra fixa + rodapé ================= */
  function casca(conteudo, nav) {
    app.innerHTML = `
      <aside class="rail">
        <a class="logo" href="loja.html" aria-label="Bruna Lopes, loja"><b>Bruna<br>Lopes</b></a>
        <div class="rail-foot">
          <div class="areas">design · ilustração · ui/ux</div>
          <div class="vert"><span>2026</span></div>
        </div>
      </aside>
      <header class="barra">
        <nav class="barra-nav" aria-label="Loja">${nav}</nav>
        <a class="barra-carrinho" id="barra-carrinho" href="carrinho.html">
          <span id="bc-rot">Carrinho · 0 itens</span><strong class="bc-valor" id="bc-valor">R$ 0</strong>
        </a>
      </header>
      <main>
        ${conteudo}
        <footer class="pf">
          <p class="pf-kicker">[ obrigada! vamos conversar ]</p>
          <div class="pf-row">
            <div class="pf-contacts">
              <span class="pf-label">WhatsApp</span>
              <a class="pf-big" href="https://wa.me/${L.contato.whatsapp}" target="_blank" rel="noopener">${L.contato.whatsappExibicao}</a>
              <span class="pf-label">E-mail</span>
              <a class="pf-big" href="mailto:${L.contato.email}">hello@<br>brunalopesdesign.com</a>
            </div>
            <nav class="pf-links" aria-label="Links externos">
              <a href="index.html?lang=pt" target="_blank" rel="noopener">Site ↗</a>
              <a href="https://www.behance.net/mariabrunalopes" target="_blank" rel="noopener">Portfólio no Behance ↗</a>
              <a href="index.html?lang=pt#curriculo" target="_blank" rel="noopener">Experiência profissional ↗</a>
            </nav>
          </div>
          <p class="pf-note">Proposta confidencial · Bruna Lopes, 2026. Esta página não é pública.</p>
        </footer>
      </main>`;

    const barra = document.getElementById("barra-carrinho");
    const rot = document.getElementById("bc-rot");
    const val = document.getElementById("bc-valor");
    C.assinar((r) => {
      rot.textContent = `Carrinho · ${r.n} ${plural(r.n, "item", "itens")}`;
      val.textContent = brl(r.total);
      barra.setAttribute("aria-label", `Ver carrinho: ${r.n} ${plural(r.n, "item", "itens")}, ${brl(r.total)}`);
    });
    return barra;
  }
  function pulsarBarra() {
    const b = document.getElementById("barra-carrinho");
    if (!b || reduzMovimento) return;
    b.classList.remove("pulso");
    void b.offsetWidth;
    b.classList.add("pulso");
  }

  /* ================= thumb: shape + desenho (+ beziers) ================= */
  function thumb(p, { parallax = true, mini = false } = {}) {
    const t = p.thumb;
    const nome = (src) => src.split("/").pop();
    const camada = (src, cls, depth, obrigatoria) => src
      ? `<img class="${cls}" src="${src}" alt="" loading="lazy" data-depth="${depth}" ${obrigatoria ? `onload="this.closest('.thumb').dataset.ok=1"` : ""} onerror="this.remove()">`
      : "";
    return `<div class="thumb${mini ? " thumb-mini" : ""}"${parallax ? " data-par" : ""}>
      <div class="th-vazio"><b>arte em breve</b><span>${nome(t.shape)}</span><span>${nome(t.desenho)}</span></div>
      ${camada(t.shape, "th-shape", 0.12, true)}${camada(t.desenho, "th-desenho", 0.42, true)}${camada(t.beziers, "th-beziers", 0.55, false)}
    </div>`;
  }
  /* parallax leve nas camadas, só enquanto o mouse passa sobre o card */
  function parallaxThumbs(raiz) {
    if (reduzMovimento) return;
    raiz.querySelectorAll(".thumb[data-par]").forEach((th) => {
      const card = th.closest(".prod-card") || th;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        th.querySelectorAll("img[data-depth]").forEach((el) => {
          el.style.translate = `${-x * el.dataset.depth * 70}px ${-y * el.dataset.depth * 52}px`;
        });
      });
      card.addEventListener("mouseleave", () => th.querySelectorAll("img[data-depth]").forEach((el) => { el.style.translate = ""; }));
    });
  }

  /* ================= LOJA ================= */
  function cardProduto(p, i, n, cat) {
    return `<a class="prod-card" href="produto.html?s=${p.slug}">
      ${thumb(p)}
      <span class="prod-tag">${cat.nome} · ${i + 1} de ${n}</span>
      <h3 class="prod-nome">${p.nome}</h3>
      ${p.subtitulo ? `<p class="prod-sub">${p.subtitulo}</p>` : ""}
      <p class="prod-resumo">${p.resumo}</p>
      <div class="prod-rodape">
        <div class="prod-valor"><span class="prod-de">a partir de</span><strong class="prod-preco">${brl(C.precoMinimo(p))}</strong></div>
        <span class="prod-ver">ver produto →</span>
      </div>
    </a>`;
  }

  function paginaLoja() {
    const descontos = L.descontos.map((d, i) => (i === 0 ? `${d.min} serviços, ${d.pct}%` : i === L.descontos.length - 1 ? `${d.min} ou mais, ${d.pct}%` : `${d.min}, ${d.pct}%`)).join(" · ");
    /* hero: mesmo conteúdo e marcação do topo da proposta-inicial.html */
    const conteudo = `
      <nav class="links" aria-label="Links externos">
        <a href="index.html?lang=pt" target="_blank" rel="noopener">Site</a>
        <a href="https://www.behance.net/mariabrunalopes" target="_blank" rel="noopener">Portfólio no Behance</a>
        <a href="index.html?lang=pt#curriculo" target="_blank" rel="noopener">Experiência profissional</a>
      </nav>

      <header class="top">
        <div class="top-art">
          <img class="ta-shapes" src="img/shapes-proposta.svg" alt="" aria-hidden="true" data-depth="0.12" data-scale-in="1.05" data-scale-to="0.98" data-scale-range="400">
          <img class="ta-bird" src="img/passaro-hero.png" alt="Gravura vintage de um pássaro pousado em um galho" data-depth="0.42">
          <img class="ta-beziers" src="img/beziers-ux-ui-hero.svg" alt="" aria-hidden="true" data-depth="0.55" data-scale-in="0.85" data-scale-to="1.1" data-scale-range="400">
        </div>
        <div class="top-copy">
          <p class="kicker">[ proposta inicial de serviços ]</p>
          <h1>Serviços de design<br>sob medida</h1>
          <p class="lede">Serviços e valores para uma parceria inicial; tudo é ajustável conforme a necessidade da agência.</p>
          <p class="lede">São 20 anos entre design gráfico, ilustração e UI/UX. Como sócia e diretora criativa da Dupplamente Projetos Criativos, conduzi projetos de branding de ponta a ponta e ajudei mais de 60 negócios a lançar ou consolidar sua marca: experiência, criatividade e metodologia a serviço de resultados de alto nível.</p>
          <p class="lede">Como crio a ideia e domino todos os formatos, cada projeto se desdobra em todas as peças sem trocar de mãos: menos tempo, menos atrito e a mesma qualidade do começo ao fim.</p>
          <p class="lede"><strong class="validade">Valores válidos para contratações até ${L.validade}</strong></p>
        </div>
      </header>

      <div class="notas">
        <div class="nota">
          <h4>Nota fiscal</h4>
          <p>Todos os serviços incluem nota fiscal. Valores em reais, sem acréscimo de impostos.</p>
        </div>
        <div class="nota">
          <h4>Descontos progressivos</h4>
          <p>Escolha o serviço, monte as opções e adicione ao carrinho. Mais de um serviço na mesma campanha ou projeto tem desconto progressivo, aplicado no carrinho: ${descontos}.</p>
        </div>
      </div>

      ${L.categorias.map((cat) => {
        const ps = L.produtos.filter((p) => p.categoria === cat.id);
        return `<section class="cat" id="${cat.id}" aria-labelledby="h-${cat.id}">
          <div class="cat-intro">
            <h2 id="h-${cat.id}">${cat.nome}</h2>
            <p>${cat.resumo}</p>
            <span class="prod-tag">${ps.length} ${plural(ps.length, "serviço", "serviços")}</span>
          </div>
          ${ps.map((p, i) => cardProduto(p, i, ps.length, cat)).join("")}
        </section>`;
      }).join("")}`;

    casca(conteudo, `<a href="loja.html" aria-current="page">Loja</a>`);
    parallaxThumbs(app);
    iniciarHero();
  }

  /* mesma mecânica do topo da proposta: parallax no mouse + escala no scroll */
  function iniciarHero() {
    const top = document.querySelector(".top");
    if (!top || reduzMovimento) return;
    const layers = top.querySelectorAll("[data-depth]");
    let tx = 0, ty = 0, cx = 0, cy = 0;
    top.addEventListener("mousemove", (e) => {
      const r = top.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    });
    top.addEventListener("mouseleave", () => { tx = 0; ty = 0; });
    (function animar() {
      const dx = tx - cx, dy = ty - cy;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        cx += dx * 0.06; cy += dy * 0.06;
        layers.forEach((el) => {
          const d = parseFloat(el.dataset.depth);
          el.style.translate = `${-cx * d * 120}px ${-cy * d * 90}px`;
        });
      }
      requestAnimationFrame(animar);
    })();
    const scaled = top.querySelectorAll("[data-scale-in]");
    const aoRolar = () => scaled.forEach((el) => {
      const p = Math.min(Math.max(scrollY / (parseFloat(el.dataset.scaleRange) || 400), 0), 1);
      const a = parseFloat(el.dataset.scaleIn), b = parseFloat(el.dataset.scaleTo);
      el.style.setProperty("--scale-in", a + p * (b - a));
    });
    addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  /* ================= PRODUTO ================= */
  const stepper = (t, id, val, min, max) =>
    `<div class="step" data-t="${t}" data-id="${id}" data-min="${min}" data-max="${max}">
      <button type="button" data-d="-1" aria-label="Diminuir"${val <= min ? " disabled" : ""}>−</button><output>${val}</output><button type="button" data-d="1" aria-label="Aumentar"${val >= max ? " disabled" : ""}>+</button>
    </div>`;

  function paginaProduto() {
    const params = new URLSearchParams(location.search);
    const p = C.produto(params.get("s"));
    if (!p) { location.replace("loja.html"); return; }
    const cat = categoria(p.categoria);
    const editUid = params.get("e");
    const salvo = editUid ? C.obter(editUid) : null;
    const cfg = salvo && salvo.slug === p.slug ? JSON.parse(JSON.stringify(salvo)) : C.cfgPadrao(p);
    delete cfg.uid;
    const editando = !!(salvo && salvo.slug === p.slug);
    document.title = `${p.nome} — Loja — Bruna Lopes`;

    const variante = () => (p.variantes ? p.variantes.find((v) => v.id === cfg.v) || p.variantes[0] : null);

    function htmlVariantes() {
      if (!p.variantes) return "";
      return `<fieldset class="grupo"><legend>Escolha</legend>${p.variantes.map((v) => `
        <label class="opt">
          <input type="radio" name="variante" value="${v.id}"${variante().id === v.id ? " checked" : ""}>
          <span class="opt-t">${v.rotulo}${v.nota ? `<small>${v.nota}</small>` : ""}</span>
          <em>${v.preco != null ? brl(v.preco) : "por peça"}</em>
        </label>`).join("")}</fieldset>`;
    }
    function htmlDinamico() {
      const v = variante();
      let h = "";
      if (!(v && v.semQtd)) {
        h += `<div class="grupo"><span class="grupo-t">Quantidade</span><div class="linha-q"><span class="linha-q-t">${(v && v.rotuloQtd) || "Quantidade"}</span>${stepper("q", "q", cfg.q, 1, 20)}</div></div>`;
      }
      if (v && v.itens) {
        const comPreco = v.itens.some((i) => i.preco != null);
        h += `<div class="grupo"><span class="grupo-t">${v.creditos ? "Mix do mês (opcional)" : "Peças"}</span>
          ${v.creditos ? `<div class="creditos" id="creditos"></div>` : ""}
          ${v.itens.map((i) => `<div class="linha-q"><span class="linha-q-t">${i.rotulo}<small>${[comPreco ? brl(i.preco) + " cada" : "", v.creditos ? `${i.creditos} ${plural(i.creditos, "crédito", "créditos")}` : ""].filter(Boolean).join(" · ")}</small></span>${stepper("i", i.id, cfg.i[i.id] | 0, 0, 30)}</div>`).join("")}
        </div>`;
      }
      return h;
    }
    function htmlAdicional(a) {
      if (a.tipo === "qtd") {
        return `<div class="linha-q"><span class="linha-q-t">${a.rotulo}<small>${brl(a.valor)}${a.unidade ? " · " + a.unidade : " cada"}</small>${a.nota ? `<small class="nota">${a.nota}</small>` : ""}</span>${stepper("a", a.id, cfg.a[a.id] | 0, 0, 20)}</div>`;
      }
      return `<label class="opt"><input type="checkbox" data-a="${a.id}"${cfg.a[a.id] ? " checked" : ""}>
        <span class="opt-t">${a.rotulo}${a.nota ? `<small>${a.nota}</small>` : ""}</span>
        <em>${a.pct != null ? "+" + a.pct + "%" : "+ " + brl(a.valor)}</em></label>`;
    }
    function htmlAdicionais() {
      const ad = p.adicionais || [];
      const escopo = ad.filter((a) => !a.posEntrega);
      const pos = ad.filter((a) => a.posEntrega);
      let h = "";
      if (escopo.length) h += `<fieldset class="grupo"><legend>Adicionais</legend>${escopo.map(htmlAdicional).join("")}</fieldset>`;
      if (pos.length) h += `<fieldset class="grupo"><legend>Depois da entrega</legend>${pos.map(htmlAdicional).join("")}</fieldset>`;
      if (p.licenca) {
        h += `<fieldset class="grupo"><legend>Arquivos editáveis (opcional)</legend>
          ${L.licencas.map((l) => `<label class="opt"><input type="checkbox" data-lic="${l.id}"${cfg.lic === l.id ? " checked" : ""}>
            <span class="opt-t">${l.rotulo}<small>${l.nota}</small></span><em>+${l.pct}%</em></label>`).join("")}
          <p class="nota-valor" style="font-family:var(--font-type);font-size:.78rem;margin-top:8px">Os arquivos finais já vêm inclusos. Os editáveis podem ser adquiridos agora ou em até 12 meses após a entrega.</p>
        </fieldset>`;
      }
      return h;
    }

    const lista = (a) => a.map((i) => `<li>${i}</li>`).join("");
    const conteudo = `
      <div class="produto">
        <div class="produto-info">
          <header class="cabeca">
            <p class="kicker">[ ${cat.nome.toLowerCase()} ]</p>
            <h1>${p.nome}</h1>
            ${p.subtitulo ? `<p class="prod-sub">${p.subtitulo}</p>` : ""}
          </header>
          ${thumb(p)}
          <div class="det">
            <h4>Descrição</h4><p>${p.descricao}</p>
            <h4>Indicação</h4><p>${p.indicacao}</p>
            <div class="duas">
              <div><h4>Incluso</h4><ul>${lista(p.incluso)}</ul></div>
              <div><h4>Não incluso</h4><ul class="nao">${lista(p.naoIncluso)}</ul></div>
            </div>
            <h4>Etapas de projeto</h4><ol class="etapas">${p.etapas.map(([q, t]) => `<li><b>${q}</b>${t}</li>`).join("")}</ol>
            <h4>Tecnologias</h4><p class="meta">${p.tecnologias}</p>
            <h4>Prazo</h4><p class="meta">${p.prazo}</p>
            ${p.notaValor ? `<h4>Sobre os valores</h4><p class="meta">${p.notaValor}</p>` : ""}
            ${p.sobConsulta.length ? `<h4>Sob consulta</h4><p class="meta">${p.sobConsulta.join("; ")}. Entram no pedido como itens a orçar, fora do total.</p>` : ""}
          </div>
        </div>
        <aside class="painel" id="painel" aria-label="Monte seu pedido">
          <div class="painel-corpo">
            <h2 class="painel-t" style="margin:0 0 4px">${editando ? "Editar item" : "Monte seu pedido"}</h2>
            <div id="g-var">${htmlVariantes()}</div>
            <div id="g-din">${htmlDinamico()}</div>
            ${htmlAdicionais()}
            <div class="grupo"><span class="grupo-t">Detalhe do valor</span><ul class="detalhe" id="detalhe"></ul></div>
            <div class="pay"><b>Condição de pagamento</b>${L.pagamento}</div>
          </div>
          <div class="painel-fim">
            <div class="total-l"><span>Total</span><strong class="total-v" id="total">R$ 0</strong></div>
            <p class="aviso" id="aviso" role="status"></p>
            <button class="btn btn-bloco" id="add" type="button">${editando ? "Salvar alterações" : "Adicionar ao carrinho"}</button>
            <div class="ok-box" id="ok" hidden><b>Adicionado ao carrinho.</b><br><a href="carrinho.html">Ver carrinho</a><a href="loja.html">Continuar na loja</a></div>
          </div>
        </aside>
      </div>
      <div class="compra-fixa"><strong class="total-v" id="total2">R$ 0</strong><button class="btn" id="add2" type="button">${editando ? "Salvar" : "Adicionar"}</button></div>`;

    casca(conteudo, `<a href="loja.html">← Loja</a>${editando ? `<a href="carrinho.html">← Carrinho</a>` : ""}`);
    parallaxThumbs(app);

    const $ = (id) => document.getElementById(id);
    const painel = $("painel");

    function atualizar() {
      const r = C.calcular(p, cfg);
      $("total").textContent = brl(r.total);
      $("total2").textContent = brl(r.total);
      let det = r.linhas.map(([t, v]) => `<li><span>${t}</span><b>${brl(v)}</b></li>`).join("");
      if (r.q > 1) det += `<li><span>Valor por unidade</span><b>${brl(r.unit)}</b></li><li><span>× ${r.q}</span><b>${brl(r.total)}</b></li>`;
      $("detalhe").innerHTML = det;
      $("aviso").textContent = r.aviso;
      ["add", "add2"].forEach((id) => { $(id).disabled = !r.valido; });
      const cr = $("creditos");
      if (cr && r.creditos) {
        cr.textContent = `Usando ${r.creditos.usados} de ${r.creditos.total} créditos`;
        cr.classList.toggle("estouro", r.creditos.usados > r.creditos.total);
      }
    }

    painel.addEventListener("change", (e) => {
      const el = e.target;
      if (el.name === "variante") {
        cfg.v = el.value; cfg.i = {}; cfg.q = 1;
        $("g-din").innerHTML = htmlDinamico();
      } else if (el.dataset.a) {
        if (el.checked) cfg.a[el.dataset.a] = true; else delete cfg.a[el.dataset.a];
      } else if (el.dataset.lic) {
        painel.querySelectorAll("[data-lic]").forEach((o) => { if (o !== el) o.checked = false; });
        cfg.lic = el.checked ? el.dataset.lic : null;
      }
      atualizar();
    });
    painel.addEventListener("click", (e) => {
      const b = e.target.closest(".step button");
      if (!b) return;
      const s = b.closest(".step");
      const min = +s.dataset.min, max = +s.dataset.max;
      const mapa = { q: cfg, a: cfg.a, i: cfg.i };
      const atual = s.dataset.t === "q" ? cfg.q : mapa[s.dataset.t][s.dataset.id] | 0;
      const novo = Math.min(Math.max(atual + +b.dataset.d, min), max);
      if (s.dataset.t === "q") cfg.q = novo;
      else if (novo) mapa[s.dataset.t][s.dataset.id] = novo; else delete mapa[s.dataset.t][s.dataset.id];
      s.querySelector("output").textContent = novo;
      s.querySelector("[data-d='-1']").disabled = novo <= min;
      s.querySelector("[data-d='1']").disabled = novo >= max;
      atualizar();
    });

    function adicionar() {
      if (!C.calcular(p, cfg).valido) return;
      C.adicionar(cfg, editando ? editUid : null);
      if (editando) { location.href = "carrinho.html"; return; }
      $("ok").hidden = false;
      pulsarBarra();
      const b2 = $("add2");
      b2.textContent = "Adicionado ✓";
      setTimeout(() => { b2.textContent = "Adicionar"; }, 1800);
    }
    $("add").addEventListener("click", adicionar);
    $("add2").addEventListener("click", adicionar);
    atualizar();
  }

  /* ================= CARRINHO ================= */
  function paginaCarrinho() {
    const conteudo = `
      <header class="cabeca"><p class="kicker">[ seu pedido ]</p><h1>Carrinho</h1></header>
      <div id="cart"></div>`;
    casca(conteudo, `<a href="loja.html">← Loja</a>`);
    const host = document.getElementById("cart");

    function itemHTML(l) {
      const href = `produto.html?s=${l.p.slug}`;
      return `<article class="item">
        <a href="${href}" aria-label="${l.p.nome}">${thumb(l.p, { parallax: false, mini: true })}</a>
        <div>
          <a class="item-nome" href="${href}">${l.p.nome}</a>
          <ul>${l.opcoes.map((o) => `<li>${o}</li>`).join("")}</ul>
          <div class="item-acoes">
            <a class="btn-link" href="${href}&e=${l.uid}">editar opções</a>
            <button class="btn-link" type="button" data-rm="${l.uid}">remover</button>
          </div>
        </div>
        <div class="item-preco">
          <strong>${brl(l.r.total)}</strong>
          ${l.r.semQtd ? `<span class="item-un">peças avulsas</span>` : `
            <div class="step" data-uid="${l.uid}">
              <button type="button" data-d="-1" data-foco="m-${l.uid}" aria-label="Diminuir quantidade"${l.cfg.q <= 1 ? " disabled" : ""}>−</button><output>${l.r.q}</output><button type="button" data-d="1" data-foco="p-${l.uid}" aria-label="Aumentar quantidade"${l.cfg.q >= 99 ? " disabled" : ""}>+</button>
            </div>
            ${l.r.q > 1 ? `<span class="item-un">${brl(l.r.unit)} cada</span>` : ""}`}
        </div>
      </article>`;
    }

    function render(r) {
      const foco = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.foco : null;
      if (r.vazio) {
        host.innerHTML = `<div class="vazio"><p>Seu carrinho está vazio. Escolha um serviço na loja para começar.</p><a class="btn" href="loja.html">Ver os serviços</a></div>`;
        return;
      }
      const prox = L.descontos.find((d) => d.min > r.n);
      const dica = prox ? `Com mais ${prox.min - r.n} ${plural(prox.min - r.n, "serviço", "serviços")} diferente${prox.min - r.n > 1 ? "s" : ""}, o desconto vai para ${prox.pct}%.` : "";
      host.innerHTML = `
        <div class="carrinho">
          <section class="itens" aria-label="Itens do carrinho">${r.linhas.map(itemHTML).join("")}</section>
          <aside class="caixa" aria-label="Resumo do pedido">
            <h2 class="painel-t" style="margin:0">Resumo</h2>
            <dl>
              <div><dt>Subtotal</dt><dd>${brl(r.subtotal)}</dd></div>
              ${r.pct ? `<div class="desc"><dt>Desconto · ${r.n} serviços, ${r.pct}%</dt><dd>− ${brl(r.desconto)}</dd></div>` : ""}
              ${r.visitaExtraQtd ? `<div><dt>Visita extra × ${r.visitaExtraQtd}</dt><dd>${brl(r.visitaExtra)}</dd></div>` : ""}
            </dl>
            <div class="total-fim"><span class="grupo-t" style="margin:0">Total</span><strong class="total-v">${brl(r.total)}</strong></div>
            ${dica ? `<p class="info">${dica}</p>` : ""}
            ${r.visitasInclusas ? `<div class="info"><b>Visitas presenciais inclusas</b>${r.visitasInclusas}</div>` : ""}
            <div class="visita linha-q">
              <span class="linha-q-t">Visita extra (até 3 h)<small>${brl(L.visitaExtra)} cada, para alinhamento, co-criação ou gravação do processo</small></span>
              <div class="step" data-t="v"><button type="button" data-d="-1" data-foco="vm" aria-label="Diminuir visitas"${r.visitaExtraQtd <= 0 ? " disabled" : ""}>−</button><output>${r.visitaExtraQtd}</output><button type="button" data-d="1" data-foco="vp" aria-label="Aumentar visitas">+</button></div>
            </div>
            <div class="info"><b>Condição de pagamento</b>${L.pagamento}.<br>Valores válidos até ${L.validade}.</div>
            ${r.sobConsulta.length ? `<div class="info"><b>A orçar (fora do total)</b>${r.sobConsulta.join("; ")}.</div>` : ""}
            <div class="acoes">
              <a class="btn btn-bloco" href="${C.whatsappUrl(C.montarResumo().texto)}" target="_blank" rel="noopener">Pedido por WhatsApp</a>
              <a class="btn btn-lima btn-bloco" href="pagamento.html">Pagar no Pix</a>
              <button class="btn-link" type="button" data-limpar>Esvaziar carrinho</button>
            </div>
          </aside>
        </div>`;
      if (foco) { const el = host.querySelector(`[data-foco="${foco}"]`); if (el && !el.disabled) el.focus(); }
    }

    host.addEventListener("click", (e) => {
      const rm = e.target.closest("[data-rm]");
      if (rm) { C.remover(rm.dataset.rm); return; }
      if (e.target.closest("[data-limpar]")) { if (confirm("Esvaziar o carrinho?")) C.esvaziar(); return; }
      const b = e.target.closest(".step button");
      if (!b) return;
      const s = b.closest(".step");
      if (s.dataset.uid) C.alterarQtd(s.dataset.uid, +b.dataset.d);
      else if (s.dataset.t === "v") C.definirVisitaExtra(C.resumo().visitaExtraQtd + +b.dataset.d);
    });
    C.assinar(render);
  }

  /* ================= PIX ================= */
  function paginaPix() {
    casca(`<header class="cabeca"><p class="kicker">[ pagamento ]</p><h1>Pagar no Pix</h1></header><div id="pix"></div>`,
      `<a href="loja.html">← Loja</a><a href="carrinho.html">← Carrinho</a>`);
    const host = document.getElementById("pix");
    let modo = "entrada";

    function render() {
      const r = C.resumo();
      if (r.vazio) {
        host.innerHTML = `<div class="vazio"><p>Seu carrinho está vazio. Escolha um serviço na loja antes de pagar.</p><a class="btn" href="loja.html">Ver os serviços</a></div>`;
        return;
      }
      const entrada = Math.round(r.total / 2);
      const pago = modo === "entrada" ? entrada : r.total;
      const rotulo = modo === "entrada" ? "entrada de 50%" : "valor total";
      const texto = C.montarResumo("pix", { pago, rotulo }).texto;
      const chave = L.pix.chave;
      host.innerHTML = `
        <div class="pix">
          <div class="pix-qr" id="pix-qr"><img src="${L.pix.qr}" alt="QR code do Pix"></div>
          <div>
            <fieldset class="grupo" style="margin-top:0"><legend>O que você vai pagar agora</legend>
              <label class="opt"><input type="radio" name="modo" value="entrada"${modo === "entrada" ? " checked" : ""}><span class="opt-t">Entrada de 50%<small>Para iniciar. Os outros 50% ficam para a entrega.</small></span><em>${brl(entrada)}</em></label>
              <label class="opt"><input type="radio" name="modo" value="total"${modo === "total" ? " checked" : ""}><span class="opt-t">Valor total do pedido</span><em>${brl(r.total)}</em></label>
            </fieldset>
            <p class="grupo-t" style="margin-top:20px">Valor a digitar no Pix</p>
            <div class="pix-valor">${brl(pago)}</div>
            <ol class="passos">
              <li>Abra o app do seu banco e escolha pagar com Pix por QR code${chave ? " ou por copia e cola" : ""}.</li>
              <li>Digite exatamente o valor acima: o QR code é geral e não traz o valor do pedido.</li>
              <li>Depois de pagar, envie o resumo e o comprovante pelo WhatsApp.</li>
            </ol>
            ${chave ? `<p class="grupo-t">Chave Pix${L.pix.beneficiario ? " · " + L.pix.beneficiario : ""}</p>
              <div class="pix-chave"><code id="chave">${chave}</code><button class="btn btn-cru" type="button" id="copiar" style="font-size:1rem;padding:.6rem 1rem;box-shadow:4px 4px 0 var(--musgo)">Copiar chave</button></div>` : ""}
            <a class="btn btn-bloco" href="${C.whatsappUrl(texto)}" target="_blank" rel="noopener">Já paguei: enviar resumo no WhatsApp</a>
            <div class="pix-resumo">
              <p class="grupo-t">Resumo do pedido</p>
              <ul>${r.linhas.map((l) => `<li><span>${l.p.nome}${l.r.q > 1 ? " × " + l.r.q : ""}</span><b style="font-weight:400">${brl(l.r.total)}</b></li>`).join("")}
                ${r.pct ? `<li style="color:var(--vinho)"><span>Desconto · ${r.n} serviços, ${r.pct}%</span><b style="font-weight:400">− ${brl(r.desconto)}</b></li>` : ""}
                ${r.visitaExtraQtd ? `<li><span>Visita extra × ${r.visitaExtraQtd}</span><b style="font-weight:400">${brl(r.visitaExtra)}</b></li>` : ""}
                <li><span><b style="font-weight:400">Total do pedido</b></span><b style="font-weight:400">${brl(r.total)}</b></li>
              </ul>
            </div>
          </div>
        </div>`;

      const img = host.querySelector("#pix-qr img");
      img.addEventListener("error", () => {
        img.parentElement.innerHTML = `<div class="th-vazio"><b>QR code do Pix</b><span>${L.pix.qr}</span></div>`;
      });
      host.querySelectorAll("input[name=modo]").forEach((i) => i.addEventListener("change", () => { modo = i.value; render(); }));
      const copiar = host.querySelector("#copiar");
      if (copiar) copiar.addEventListener("click", () => {
        const fim = () => { copiar.textContent = "Copiada"; setTimeout(() => { copiar.textContent = "Copiar chave"; }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(chave).then(fim, () => {});
      });
    }
    render();
  }

  ({ loja: paginaLoja, produto: paginaProduto, carrinho: paginaCarrinho, pagamento: paginaPix }[pagina] || paginaLoja)();
})();
