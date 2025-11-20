# Conversor SiberPunk

Interface web single-page que converte valores em Real brasileiro (BRL) para D��lar americano, Euro e Bitcoin, usando uma estǸtica inspirada em neon/cyberpunk.

![Demonstra��ǜo do Conversor SiberPunk](assets/conversor-siberpunk-full.png)

## Estrutura do projeto

- `index.html` �?" marca��ǜo principal da landing page e formulǭrio de conversǜo.
- `style.css` �?" estilos com gradientes neon, anima����es e responsividade.
- `script.js` �?" l��gica de conversǜo e atualiza��ǜo dinǽmica dos cards de prǸvias.
- `assets/` �?" imagens das bandeiras e do logotipo do Bitcoin utilizados na interface.

## PrǸ-requisitos

Nenhuma dependǦncia externa Ǹ necessǭria. Basta um navegador moderno com suporte a ES6 para executar o projeto localmente.

## Como executar

1. Acesse online: https://conversor.digitaleducacao.com.br/
2. Ou rode localmente:
   - Fa��a o download ou clone este reposit��rio.
   - Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arraste para uma aba).
   - Digite um valor em reais, escolha a moeda de destino e clique em **Converter** para visualizar o resultado e as prǸvias nas demais moedas.

## Qualidade de c��digo

Os comandos abaixo ajudam a validar padr��es e boas prǭticas. Execute antes um `npm install` para instalar o ESLint e o Prettier declarados em `package.json`.

```bash
# verifica problemas de estilo e poss��veis bugs
npm run lint

# corrige automaticamente o que for poss��vel
npm run lint:fix

# verifica formata��ǜo consistente
npm run format:check

# aplica a formata��ǜo definida
npm run format
```

## Personaliza��ǜo

- Ajuste as taxas de conversǜo no objeto `rates` em `script.js`. Cada entrada contǸm:
  - `brl`: valor equivalente em reais para 1 unidade da moeda de destino.
  - `flagSrc` e `flagAlt`: caminho da bandeira exibida no resultado.
- Adicione novos destinos duplicando a estrutura do objeto `rates` e inserindo uma nova op��ǜo no `<select>` de `index.html`.

## Conven����es de c��digo

- Toda fun��ǜo pǧblica no JavaScript possui docstrings no formato JSDoc.
- Classes CSS e elementos estruturais usam nomes descritivos para facilitar manuten��ǜo.

## Pr��ximos passos sugeridos

- Integrar uma API de cǽmbio em tempo real para atualizar as taxas automaticamente.
- Adicionar testes unitǭrios para as fun����es de formata��ǜo e cǭlculo quando o projeto crescer.
