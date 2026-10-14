# Arte da loja

Cada serviço da loja lê até 3 camadas desta pasta. Todas com a **mesma prancheta de 1131 × 1000 px** e **fundo transparente** (a mesma proporção de `blob-hero-design.svg` e do hero da proposta), para se alinharem sozinhas.

| Camada | Arquivo | Obrigatória | Parallax |
|---|---|---|---|
| Shape (colagem) | `<slug>-shape.svg` | sim | leve |
| Desenho | `<slug>-desenho.png` | sim | médio |
| Beziers / traços | `<slug>-beziers.svg` | não | forte |

Slugs: `logo`, `branding-book`, `vinheta`, `landing-starter`, `site-wordpress`, `redes-sociais`, `video-motion`.

- Se preferir entregar a arte já mesclada, basta o `<slug>-shape.svg` (ou `.png`, trocando o nome em `thumb` no `js/loja-data.js`) e as outras camadas ficam de fora.
- Enquanto o arquivo não existe, a loja mostra um placeholder tracejado com o nome esperado.
- O mesmo thumb aparece na loja, na página do produto (grande) e no carrinho (miniatura).

## Pix

- `pix-qr.png`: o QR code geral do Pix (o mesmo para qualquer valor).
- A chave copia-e-cola e o nome do beneficiário ficam em `LOJA.pix` no `js/loja-data.js`.
