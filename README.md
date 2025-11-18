# Conversor SiberPunk

Interface web single-page que converte valores em Real brasileiro (BRL) para Dólar americano, Euro e Bitcoin, usando uma estética inspirada em neon/cyberpunk.

![Demonstração do Conversor SiberPunk](assets/conversor-siberpunk-full.png)

## Estrutura do projeto

- `index.html` — marcação principal da landing page e formulário de conversão.
- `style.css` — estilos com gradientes neon, animações e responsividade.
- `script.js` — lógica de conversão e atualização dinâmica dos cards de prévias.
- `assets/` — imagens das bandeiras e do logotipo do Bitcoin utilizados na interface.

## Pré-requisitos

Nenhuma dependência externa é necessária. Basta um navegador moderno com suporte a ES6 para executar o projeto localmente.

## Como executar

1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arraste para uma aba).
3. Digite um valor em reais, escolha a moeda de destino e clique em **Converter** para visualizar o resultado e as prévias nas demais moedas.

## Personalização

- Ajuste as taxas de conversão no objeto `rates` em `script.js`. Cada entrada contém:
  - `brl`: valor equivalente em reais para 1 unidade da moeda de destino.
  - `flagSrc` e `flagAlt`: caminho da bandeira exibida no resultado.
- Adicione novos destinos duplicando a estrutura do objeto `rates` e inserindo uma nova opção no `<select>` de `index.html`.

## Convenções de código

- Toda função pública no JavaScript possui docstrings no formato JSDoc.
- Classes CSS e elementos estruturais usam nomes descritivos para facilitar manutenção.

## Próximos passos sugeridos

- Integrar uma API de câmbio em tempo real para atualizar as taxas automaticamente.
- Adicionar testes unitários para as funções de formatação e cálculo quando o projeto crescer.
