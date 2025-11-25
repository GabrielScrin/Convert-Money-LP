# Conversor SiberPunk

Interface web single-page que converte valores em Real brasileiro (BRL) para D??lar americano, Euro e Bitcoin, usando uma est?tica inspirada em neon/cyberpunk.

![Demonstra??uo do Conversor SiberPunk](assets/conversor-siberpunk-full.png)

## Estrutura do projeto

- `index.html` ??" marca??uo principal da landing page e formulorio de conversuo.
- `style.css` ??" estilos com gradientes neon, anima????es e responsividade.
- `script.js` ??" l??gica de conversuo e atualiza??uo din?mica dos cards de pr?vias.
- `assets/` ??" imagens das bandeiras e do logotipo do Bitcoin utilizados na interface.

## Pr?-requisitos

Nenhuma dependGncia externa ? necessoria. Basta um navegador moderno com suporte a ES6 para executar o projeto localmente.

## Como executar

1. Acesse online: https://digitaleducacao.com.br/conversor/
2. Ou rode localmente:
   - Fa??a o download ou clone este reposit??rio.
   - Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arraste para uma aba).
   - Digite um valor em reais, escolha a moeda de destino e clique em **Converter** para visualizar o resultado e as pr?vias nas demais moedas.

## Qualidade de c??digo

Os comandos abaixo ajudam a validar padr??es e boas proticas. Execute antes um `npm install` para instalar o ESLint e o Prettier declarados em `package.json`.

```bash
# verifica problemas de estilo e poss??veis bugs
npm run lint

# corrige automaticamente o que for poss??vel
npm run lint:fix

# verifica formata??uo consistente
npm run format:check

# aplica a formata??uo definida
npm run format
```

## Personaliza??uo

- Ajuste as taxas de conversuo no objeto `rates` em `script.js`. Cada entrada cont?m:
  - `brl`: valor equivalente em reais para 1 unidade da moeda de destino.
  - `flagSrc` e `flagAlt`: caminho da bandeira exibida no resultado.
- Adicione novos destinos duplicando a estrutura do objeto `rates` e inserindo uma nova op??uo no `<select>` de `index.html`.

## Conven????es de c??digo

- Toda fun??uo pgblica no JavaScript possui docstrings no formato JSDoc.
- Classes CSS e elementos estruturais usam nomes descritivos para facilitar manuten??uo.

## Pr??ximos passos sugeridos

- Integrar uma API de c?mbio em tempo real para atualizar as taxas automaticamente.
- Adicionar testes unitorios para as fun????es de formata??uo e colculo quando o projeto crescer.
