const rates = {
  brl: {
    label: "Real Brasileiro",
    flag: "🇧🇷",
    code: "BR",
    flagSrc: "assets/brasil 2.png",
    flagAlt: "Bandeira do Brasil",
    currency: "BRL",
    locale: "pt-BR",
    brl: 1,
    accent: "#22ff93",
    symbol: "R$",
  },
  usd: {
    label: "Dólar Americano",
    flag: "🇺🇸",
    code: "US",
    flagSrc: "assets/estados-unidos.png",
    flagAlt: "Bandeira dos Estados Unidos",
    currency: "USD",
    locale: "en-US",
    brl: 5.1,
    accent: "#00f0ff",
    symbol: "US$",
  },
  eur: {
    label: "Euro",
    flag: "🇪🇺",
    code: "EU",
    flagSrc: "assets/Euro.png",
    flagAlt: "Bandeira da União Europeia",
    currency: "EUR",
    locale: "de-DE",
    brl: 5.45,
    accent: "#ffe600",
    symbol: "€",
  },
  btc: {
    label: "Bitcoin",
    flag: "₿",
    code: "₿",
    flagSrc: "assets/bitcoin.png",
    flagAlt: "Logotipo do Bitcoin",
    currency: "BTC",
    locale: "en-US",
    brl: 310000,
    accent: "#f7931a",
    symbol: "₿",
  },
};

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const sourceSelect = document.querySelector("#source");
const targetSelect = document.querySelector("#target");
const resultSource = document.querySelector("#result-source");
const sourceLabel = document.querySelector("#source-label");
const sourceCode = document.querySelector("#source-code");
const sourceFlagImg = document.querySelector("#source-flag-img");
const resultLabel = document.querySelector("#result-label");
const resultTarget = document.querySelector("#result-target");
const targetCode = document.querySelector("#target-code");
const targetFlagImg = document.querySelector("#target-flag-img");
const rateCards = document.querySelector("#rate-cards");
const quoteGrid = document.querySelector("#quote-grid");
const quoteUpdated = document.querySelector("#quote-updated");
const quoteStatus = document.querySelector("#quote-status");

const QUOTE_ENDPOINT =
  "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL";
const quoteKeys = ["usd", "eur", "btc"];

/**
 * Formata o valor convertido respeitando a moeda alvo definida.
 *
 * @param {{ currency: string, locale: string, symbol: string }} info Objeto com metadados da moeda selecionada.
 * @param {number} value Valor que será exibido na moeda informada.
 * @returns {string} Valor já convertido, formatado segundo a localidade da moeda destino.
 */
const formatTarget = (info, value) => {
  if (info.currency === "BTC") {
    return `${info.symbol} ${value.toFixed(5)}`;
  }

  return new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: info.currency,
  }).format(value);
};

/**
 * Normaliza a data recebida da API para exibir o carimbo de atualiza��o.
 *
 * @param {string | undefined} timestamp Data retornada pela API (ex.: "2024-03-20 15:00:00").
 * @returns {string} Texto pronto para apare��er na interface.
 */
const formatUpdateLabel = (timestamp) => {
  if (!timestamp || typeof timestamp !== "string") {
    return "";
  }

  if (timestamp.includes(" ")) {
    const [datePart, timePart] = timestamp.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);

    if (year && month && day && timePart) {
      return `Atualizado em ${String(day).padStart(2, "0")}/${String(
        month
      ).padStart(2, "0")}/${year} ${timePart}`;
    }
  }

  const parsed = Date.parse(timestamp);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    return `Atualizado em ${date.toLocaleDateString(
      "pt-BR"
    )} ${date.toLocaleTimeString("pt-BR")}`;
  }

  return `Atualizado: ${timestamp}`;
};

/**
 * Exibe a sess�o de "cota��o do dia" com as taxas atuais em BRL.
 *
 * @returns {void}
 */
const renderDailyQuote = () => {
  if (!quoteGrid) {
    return;
  }

  quoteGrid.innerHTML = "";

  quoteKeys.forEach((key) => {
    const info = rates[key];
    if (!info) {
      return;
    }

    const chip = document.createElement("div");
    chip.className = "quote-chip";
    chip.style.setProperty("--accent", info.accent);
    chip.innerHTML = `
      <span>${info.label}</span>
      <strong>1 ${info.symbol} = ${brlFormatter.format(info.brl)}</strong>
    `;

    quoteGrid.appendChild(chip);
  });
};

/**
 * Atualiza o painel lateral com os cartões de taxa para cada moeda configurada.
 *
 * @param {number} baseValue Valor atual informado na moeda de origem para gerar as prévias de conversão.
 * @param {{ brl: number }} sourceInfo Objeto da moeda de origem contendo a taxa para Real.
 * @returns {void} Não retorna valor; apenas redesenha os cartões de prévia.
 */
const buildCards = (baseValue, sourceInfo) => {
  rateCards.innerHTML = "";

  const valueInBrl = baseValue * sourceInfo.brl;

  Object.values(rates).forEach((info) => {
    const card = document.createElement("article");
    card.className = "rate-card";
    card.style.setProperty("--accent", info.accent);

    const converted = valueInBrl / info.brl;
    card.innerHTML = `
      <span>${info.flag} ${info.label}</span>
      <strong>${formatTarget(info, converted)}</strong>
      <div class="rate-amount">1 ${info.symbol} = ${brlFormatter.format(
        info.brl
      )}</div>
    `;

    rateCards.appendChild(card);
  });
};

/**
 * Calcula a conversão selecionada no formulário e reflete o resultado na interface.
 *
 * @returns {void} Não retorna valor; atualiza os elementos do resultado com as informações calculadas.
 */
const updateConversion = () => {
  const sourceKey = sourceSelect.value;
  const targetKey = targetSelect.value;
  const sourceInfo = rates[sourceKey];
  const targetInfo = rates[targetKey];
  const value = Number(amountInput.value);

  if (!sourceInfo || !targetInfo || !value || value <= 0) {
    return;
  }

  const valueInBrl = value * sourceInfo.brl;
  const converted = valueInBrl / targetInfo.brl;

  sourceFlagImg.src = sourceInfo.flagSrc;
  sourceFlagImg.alt = sourceInfo.flagAlt;
  sourceCode.textContent = sourceInfo.code;
  sourceLabel.textContent = sourceInfo.label;
  resultSource.textContent = formatTarget(sourceInfo, value);

  targetFlagImg.src = targetInfo.flagSrc;
  targetFlagImg.alt = targetInfo.flagAlt;
  targetCode.textContent = targetInfo.code;
  resultLabel.textContent = targetInfo.label;
  resultTarget.textContent = formatTarget(targetInfo, converted);

  buildCards(value, sourceInfo);
};

/**
 * Trata o envio do formulário, impedindo o recarregamento da página e disparando o cálculo.
 *
 * @param {SubmitEvent} event Evento disparado pelo envio do formulário.
 * @returns {void} Não retorna valor; previne o envio padrão e chama o cálculo.
 */
const handleSubmit = (event) => {
  event.preventDefault();
  updateConversion();
};

/**
 * Busca a cota��o do dia e atualiza as taxas usadas na convers�o.
 *
 * @returns {Promise<void>}
 */
const loadDailyRates = async () => {
  if (quoteUpdated) {
    quoteUpdated.textContent = "Buscando cota��o do dia...";
  }

  if (quoteStatus) {
    quoteStatus.textContent = "";
  }

  renderDailyQuote();

  try {
    const response = await fetch(QUOTE_ENDPOINT);
    if (!response.ok) {
      throw new Error("Resposta invǭlida da API");
    }

    const data = await response.json();
    const incoming = {
      usd: Number(data?.USDBRL?.ask),
      eur: Number(data?.EURBRL?.ask),
      btc: Number(data?.BTCBRL?.ask),
    };

    const lastUpdate =
      data?.USDBRL?.create_date ||
      data?.EURBRL?.create_date ||
      data?.BTCBRL?.create_date;

    let applied = false;

    Object.entries(incoming).forEach(([key, value]) => {
      if (Number.isFinite(value) && value > 0 && rates[key]) {
        rates[key].brl = value;
        applied = true;
      }
    });

    if (quoteUpdated) {
      quoteUpdated.textContent =
        formatUpdateLabel(lastUpdate) || "Cota��o do dia carregada";
    }

    renderDailyQuote();

    if (applied) {
      updateConversion();
    }
  } catch (error) {
    if (quoteUpdated) {
      quoteUpdated.textContent = "Usando valores de refer��ncia";
    }

    if (quoteStatus) {
      quoteStatus.textContent =
        "Falha ao carregar a cota��o do dia. Mantivemos os valores de refer��ncia.";
    }
  }
};

form.addEventListener("submit", handleSubmit);
amountInput.addEventListener("input", updateConversion);
sourceSelect.addEventListener("change", updateConversion);
targetSelect.addEventListener("change", updateConversion);

updateConversion();
renderDailyQuote();
loadDailyRates();
