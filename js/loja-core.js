/* Loja: carrinho, motor de preço e resumo do pedido.
   Estado em localStorage["site-cart"] (mesmo padrão de "site-lang"); se o
   armazenamento estiver bloqueado, o carrinho vive só na memória da página. */
(function () {
  const L = window.LOJA;
  const CHAVE = "site-cart";
  const MAX_QTD = 99;

  const brl = (n) => "R$ " + Math.round(n).toLocaleString("pt-BR");
  const produto = (slug) => L.produtos.find((p) => p.slug === slug);
  const licenca = (id) => L.licencas.find((l) => l.id === id);

  /* ---------- armazenamento ---------- */
  function ler() {
    try {
      const d = JSON.parse(localStorage.getItem(CHAVE));
      if (d && Array.isArray(d.itens)) return { itens: d.itens, visitaExtra: d.visitaExtra | 0 };
    } catch (e) { /* storage indisponível ou conteúdo inválido */ }
    return { itens: [], visitaExtra: 0 };
  }
  let estado = ler();
  const ouvintes = new Set();

  function avisar() { const r = resumo(); ouvintes.forEach((f) => f(r)); }
  function gravar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* segue só em memória */ }
    avisar();
  }
  addEventListener("storage", (e) => { if (e.key === CHAVE) { estado = ler(); avisar(); } });

  /* ---------- configuração de um item ---------- */
  function cfgPadrao(p) {
    return { slug: p.slug, v: p.variantes ? p.variantes[0].id : null, q: 1, a: {}, i: {}, lic: null };
  }
  function ordenado(o) {
    if (Array.isArray(o)) return o.map(ordenado);
    if (o && typeof o === "object") return Object.keys(o).sort().reduce((r, k) => { r[k] = ordenado(o[k]); return r; }, {});
    return o;
  }
  function normalizar(cfg) {
    const f = (m) => Object.keys(m || {}).reduce((r, k) => { if (m[k]) r[k] = m[k] === true ? true : m[k] | 0; return r; }, {});
    return { slug: cfg.slug, v: cfg.v, q: Math.min(Math.max(cfg.q | 0, 1), MAX_QTD), a: f(cfg.a), i: f(cfg.i), lic: cfg.lic || null };
  }
  const chaveCfg = (cfg) => { const c = normalizar(cfg); delete c.q; return JSON.stringify(ordenado(c)); };

  /* ---------- preço de um item ---------- */
  function calcular(p, cfg) {
    const v = p.variantes ? (p.variantes.find((x) => x.id === cfg.v) || p.variantes[0]) : null;
    const linhas = [];
    let base = 0;
    let aviso = "";
    let creditos = null;

    if (v && v.itens && v.itens.some((i) => i.preco != null)) {
      v.itens.forEach((i) => {
        const n = cfg.i[i.id] | 0;
        if (n > 0) { base += n * i.preco; linhas.push([`${n}× ${i.rotulo}`, n * i.preco]); }
      });
      if (!base) aviso = "Escolha ao menos uma peça.";
    } else if (v) {
      base = v.preco;
      linhas.push([`${p.nome} · ${v.rotulo}`, v.preco]);
    } else {
      base = p.preco;
      linhas.push([p.nome, p.preco]);
    }

    const semQtd = !!(v && v.semQtd);
    const q = semQtd ? 1 : Math.min(Math.max(cfg.q | 0, 1), MAX_QTD);

    if (v && v.creditos) {
      const usados = (v.itens || []).reduce((s, i) => s + (cfg.i[i.id] | 0) * i.creditos, 0);
      creditos = { usados, total: v.creditos * q };
      if (usados > creditos.total) aviso = `O mix usa ${usados} créditos e o pacote tem ${creditos.total}. Reduza as peças ou aumente os pacotes.`;
    }

    let escopo = base;
    const pcts = [];
    (p.adicionais || []).forEach((a) => {
      const n = a.tipo === "qtd" ? cfg.a[a.id] | 0 : (cfg.a[a.id] ? 1 : 0);
      if (!n) return;
      if (a.pct != null) { pcts.push(a); return; }
      const val = a.valor * n;
      linhas.push([a.tipo === "qtd" ? `${n}× ${a.rotulo}` : a.rotulo, val]);
      if (!a.posEntrega) escopo += val;
    });
    pcts.forEach((a) => linhas.push([`${a.rotulo} (+${a.pct}%)`, Math.round((escopo * a.pct) / 100)]));
    const l = p.licenca && cfg.lic ? licenca(cfg.lic) : null;
    if (l) linhas.push([`${l.rotulo} (+${l.pct}%)`, Math.round((escopo * l.pct) / 100)]);

    const unit = linhas.reduce((s, x) => s + x[1], 0);
    return { v, linhas, unit, q, semQtd, total: unit * q, creditos, aviso, valido: !aviso };
  }

  /* opções escolhidas, em texto, para o carrinho e o resumo */
  function descrever(p, cfg) {
    const r = calcular(p, cfg);
    const o = [];
    if (r.v) o.push(r.v.rotulo);
    if (r.v && r.v.itens) r.v.itens.forEach((i) => { const n = cfg.i[i.id] | 0; if (n > 0) o.push(`${n}× ${i.rotulo}`); });
    (p.adicionais || []).forEach((a) => {
      const n = a.tipo === "qtd" ? cfg.a[a.id] | 0 : (cfg.a[a.id] ? 1 : 0);
      if (n) o.push(a.tipo === "qtd" ? `${n}× ${a.rotulo}${a.unidade ? " (" + a.unidade + ")" : ""}` : a.rotulo);
    });
    const l = p.licenca && cfg.lic ? licenca(cfg.lic) : null;
    if (l) o.push(l.rotulo);
    return o;
  }

  function precoMinimo(p) {
    if (p.preco != null) return p.preco;
    return Math.min(...p.variantes.map((v) => (v.itens && v.itens.some((i) => i.preco != null) ? Math.min(...v.itens.map((i) => i.preco)) : v.preco)));
  }

  /* ---------- ações no carrinho ---------- */
  const novoUid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function adicionar(cfg, uidSubstituir) {
    const nova = normalizar(cfg);
    if (uidSubstituir) {
      const i = estado.itens.findIndex((x) => x.uid === uidSubstituir);
      if (i >= 0) { estado.itens[i] = Object.assign(nova, { uid: uidSubstituir }); gravar(); return uidSubstituir; }
    }
    const igual = estado.itens.find((x) => chaveCfg(x) === chaveCfg(nova));
    if (igual) { igual.q = Math.min(igual.q + nova.q, MAX_QTD); gravar(); return igual.uid; }
    nova.uid = novoUid();
    estado.itens.push(nova);
    gravar();
    return nova.uid;
  }
  function obter(uid) { return estado.itens.find((x) => x.uid === uid) || null; }
  function alterarQtd(uid, delta) {
    const it = obter(uid);
    if (!it) return;
    it.q = Math.min(Math.max((it.q | 0) + delta, 1), MAX_QTD);
    gravar();
  }
  function remover(uid) { estado.itens = estado.itens.filter((x) => x.uid !== uid); gravar(); }
  function definirVisitaExtra(n) { estado.visitaExtra = Math.min(Math.max(n | 0, 0), 20); gravar(); }
  function esvaziar() { estado = { itens: [], visitaExtra: 0 }; gravar(); }

  /* ---------- resumo do carrinho ---------- */
  function resumo() {
    const linhas = estado.itens.map((cfg) => {
      const p = produto(cfg.slug);
      if (!p) return null;
      return { uid: cfg.uid, cfg, p, r: calcular(p, cfg), opcoes: descrever(p, cfg) };
    }).filter(Boolean);

    const n = new Set(linhas.map((l) => l.p.slug)).size;
    const subtotal = linhas.reduce((s, l) => s + l.r.total, 0);
    const faixa = [...L.descontos].reverse().find((d) => n >= d.min);
    const pct = faixa ? faixa.pct : 0;
    const desconto = Math.round((subtotal * pct) / 100);
    const apos = subtotal - desconto;
    const visitaExtraQtd = estado.visitaExtra | 0;
    const visitaExtra = visitaExtraQtd * L.visitaExtra;
    const visitas = L.visitas.find((v) => apos >= v.min && apos <= v.max);
    const sobConsulta = [];
    linhas.forEach((l) => l.p.sobConsulta.forEach((s) => { if (!sobConsulta.includes(s)) sobConsulta.push(s); }));

    return {
      linhas, n, subtotal, pct, desconto, visitaExtraQtd, visitaExtra,
      total: apos + visitaExtra,
      visitasInclusas: visitas ? visitas.texto : "",
      sobConsulta,
      vazio: linhas.length === 0
    };
  }

  /* ---------- resumo do pedido: texto, html e json ---------- */
  /* tipo "pix": extra = { pago, rotulo } com o valor pago e se é entrada ou total */
  function montarResumo(tipo, extra) {
    const r = resumo();
    const t = [];
    t.push(tipo === "pix"
      ? `Olá, Bruna! Fiz o pagamento via Pix de ${brl(extra && extra.pago != null ? extra.pago : r.total)}${extra && extra.rotulo ? " (" + extra.rotulo + ")" : ""} referente ao pedido abaixo.`
      : `Olá, Bruna! Gostaria de contratar os serviços abaixo (valores válidos até ${L.validade}).`);
    t.push("");
    r.linhas.forEach((l, i) => {
      t.push(`${i + 1}) ${l.p.nome}${l.r.q > 1 ? " × " + l.r.q : ""}: ${brl(l.r.total)}`);
      l.opcoes.forEach((o) => t.push(`   · ${o}`));
    });
    t.push("");
    t.push(`Subtotal: ${brl(r.subtotal)}`);
    if (r.desconto) t.push(`Desconto (${r.n} serviços, ${r.pct}%): − ${brl(r.desconto)}`);
    if (r.visitaExtraQtd) t.push(`Visita extra × ${r.visitaExtraQtd}: ${brl(r.visitaExtra)}`);
    t.push(`Total: ${brl(r.total)}`);
    if (r.visitasInclusas) t.push(`Visitas presenciais inclusas: ${r.visitasInclusas}`);
    if (r.sobConsulta.length) { t.push(""); t.push(`A orçar (fora do total): ${r.sobConsulta.join("; ")}.`); }
    t.push("");
    t.push(`Pagamento: ${L.pagamento}.`);

    const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const html = "<ol>" + r.linhas.map((l) =>
      `<li><b>${esc(l.p.nome)}${l.r.q > 1 ? " × " + l.r.q : ""}</b>: ${brl(l.r.total)}<ul>${l.opcoes.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></li>`
    ).join("") + `</ol><p>Total: <b>${brl(r.total)}</b></p>`;

    const json = {
      validade: L.validade,
      itens: r.linhas.map((l) => ({ produto: l.p.slug, nome: l.p.nome, quantidade: l.r.q, opcoes: l.opcoes, total: l.r.total })),
      subtotal: r.subtotal, descontoPct: r.pct, desconto: r.desconto, visitaExtra: r.visitaExtraQtd, total: r.total, sobConsulta: r.sobConsulta
    };
    return { texto: t.join("\n"), html, json };
  }

  const whatsappUrl = (texto) => `https://wa.me/${L.contato.whatsapp}?text=${encodeURIComponent(texto)}`;
  const assinar = (f) => { ouvintes.add(f); f(resumo()); return () => ouvintes.delete(f); };

  window.Carrinho = {
    brl, produto, licenca, calcular, descrever, precoMinimo, cfgPadrao, normalizar,
    adicionar, obter, alterarQtd, remover, definirVisitaExtra, esvaziar,
    resumo, montarResumo, whatsappUrl, assinar
  };
})();
