# Prompts — Ultimatum · campanha fotográfica (Nano Banana / Gemini)

> Como usar no AI Studio: para cada shot, **anexe a ref indicada** (`refs/ref-fotografica-0X.jpg`)
> como referência de composição + cole o prompt (assunto + bloco de DP de `direcao-foto.md`).
> Opcional: anexar `assets/simbolo.svg` e pedir o símbolo U discreto na tela do device.
> Salve com o nome exato da coluna → cai certo no `case.js` depois.

Bloco de DP fixo (colar no fim de cada prompt):
```
Photographic direction: quiet-luxury editorial photography of sophisticated,
dynamic people (diverse men and women), calm confident micro-smile,
effortlessly handling a task on a silver/graphite device (phone, laptop or
smartwatch). Wardrobe in refined neutral tones — cream, beige, warm grey,
white, camel — slim tailored-casual, harmonizing with the silver-to-graphite
brand palette (#eff1f2 → #5e6465). EXACTLY ONE tiny accent of neon green
(#C6FF3D) or electric blue (#2F6BFF) per frame, as a small detail only — a
shoe sole, a status light on a laptop, a nail, a watch button, a cable tip.
Unexpected angle (over-the-shoulder top-down, extreme close crop, low or
dutch angle). Soft warm natural light or clean high-key light-grey studio,
shallow depth of field, editorial negative space, fine grain, premium and
understated. Photorealistic, no text artifacts, no watermark.
```

---

### → output/campanha-01.jpg  · ref 04 · 4:5
**Tarefa (overlay):** "Explicar a última atualização para o cliente."
```
A sophisticated woman in a cream monochrome outfit relaxed in a warm, refined
interior, glasses, gentle micro-smile, reading her silver phone. Tiny accent:
a small electric-blue notification glow on the phone screen edge. Over-the-
shoulder 3/4 angle.
+ [bloco de DP]
```

### → output/campanha-02.jpg  · ref 01 · 3:2 (larga)
**Tarefa (overlay):** "Alterar cláusula do contrato."
```
Extreme close crop of hands on a silver laptop, white knit sleeve, clean high-
key light-grey studio background, lots of negative space. Tiny accent: a single
neon-green status light on the laptop's edge.
+ [bloco de DP]
```

### → output/campanha-03.jpg  · ref 03 · 4:5
**Tarefa (overlay):** "Solicitar as procurações."
```
Top-down from-behind angle of a stylish man in a camel wool coat and
sunglasses, walking on a cobblestone street, tapping his silver phone. Tiny
accent: a neon-green sneaker sole visible at the bottom of the frame.
+ [bloco de DP]
```

### → output/campanha-04.jpg  · ref 02 · 16:9 (HERO / payoff)
**Tarefa (overlay):** "Pronto, resolvido!"
```
Confident person outdoors in tailored-casual neutrals, glancing at a smartwatch
on the wrist with a satisfied micro-smile, blurred natural background, close
crop. Tiny accent: the watch side button glowing electric blue.
+ [bloco de DP]
```

### → output/campanha-05.jpg  · ref 05 · 4:5 (extra)
**Cena de fecho (lifestyle):**
```
A young woman with natural curly hair in a crisp white shirt, sitting on a light
neutral sofa with a silver laptop, soft daylight, calm micro-smile. Tiny accent:
one neon-green painted nail.
+ [bloco de DP]
```

---

## B) Pessoas vestindo as camisetas

> Método: **anexe o PNG da camiseta** (`assets/CAMISETA-0X.png`) como referência de
> peça + descreva a pessoa/cena. Peça pra **manter a cor da camiseta e o logo do peito
> exatamente** como na referência. Dica: mantenha o logo do peito **pequeno** no
> enquadramento (modelos distorcem menos assim); se o logo sair torto, dá pra corrigir
> depois colando o `simbolo.svg`/`lockup-horizontal.svg` por cima.
> Mesmas regras da direção: casting diverso, leve sorriso, ângulo inusitado, UM acento
> neon/azul mínimo, device na mão.

### → output/camiseta-pessoa-01.jpg  · camiseta 01 (grafite) · 4:5
```
A young man wearing the graphite-grey Ultimatum t-shirt from the attached
reference (keep the silver U symbol on the chest exactly), tailored-casual,
walking on a sunlit street, glancing at his silver phone with a light smile.
Top-down over-the-shoulder angle. Tiny accent: a neon-green sneaker sole.
+ [bloco de DP]
```

### → output/camiseta-pessoa-02.jpg  · camiseta 02 (cinza claro) · 4:5
```
A woman wearing the light-grey Ultimatum t-shirt from the attached reference
(keep the wordmark + line-pattern on the chest), relaxed in a bright modern
office lounge, silver laptop nearby, calm micro-smile. Three-quarter angle,
shallow depth of field. Tiny accent: an electric-blue status light on the laptop.
+ [bloco de DP]
```

### → output/camiseta-pessoa-03.jpg  · camiseta 03 (branca) · 4:5
```
A person wearing the white Ultimatum t-shirt from the attached reference (keep
the horizontal lockup on the chest), outdoors in tailored-casual neutrals,
checking a smartwatch mid-activity with a satisfied micro-smile. Low editorial
angle, warm natural light. Tiny accent: the watch button glowing neon green.
+ [bloco de DP]
```

### → output/camiseta-time.jpg  · as 3 juntas · 16:9 (opcional)
```
Three diverse team members standing together, each wearing a different Ultimatum
t-shirt from the attached references (graphite, light-grey, white — keep each
chest logo), clean high-key light-grey studio, editorial lineup, confident light
smiles. One single electric-blue accent detail in the frame.
+ [bloco de DP]
```

---

## Sequência da campanha (a narrativa)
Explicar a última atualização para o cliente. · Alterar cláusula do contrato. ·
Solicitar as procurações. → **Pronto, resolvido!**

## Checklist
- [ ] campanha-01 (ref 04)
- [ ] campanha-02 (ref 01)
- [ ] campanha-03 (ref 03)
- [ ] campanha-04 — HERO (ref 02)
- [ ] campanha-05 (ref 05)
- [ ] camiseta-pessoa-01 (grafite)
- [ ] camiseta-pessoa-02 (cinza claro)
- [ ] camiseta-pessoa-03 (branca)
- [ ] camiseta-time (opcional)
- [x] camisetas flat — já em assets/CAMISETA-01..03.png (mockups prontos)
