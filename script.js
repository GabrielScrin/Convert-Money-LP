const rates = {
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
const targetSelect = document.querySelector("#target");
const resultBrl = document.querySelector("#result-brl");
const resultLabel = document.querySelector("#result-label");
const resultTarget = document.querySelector("#result-target");
const targetCode = document.querySelector("#target-code");
const targetFlagImg = document.querySelector("#target-flag-img");
const rateCards = document.querySelector("#rate-cards");

const formatTarget = (info, value) => {
  if (info.currency === "BTC") {
    return `${info.symbol} ${value.toFixed(5)}`;
  }

  return new Intl.NumberFormat(info.locale, {
    style: "currency",
    currency: info.currency,
  }).format(value);
};

const buildCards = (baseValue) => {
  rateCards.innerHTML = "";

  Object.values(rates).forEach((info) => {
    const card = document.createElement("article");
    card.className = "rate-card";
    card.style.setProperty("--accent", info.accent);

    const converted = baseValue / info.brl;
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

const updateConversion = () => {
  const targetKey = targetSelect.value;
  const info = rates[targetKey];
  const value = Number(amountInput.value);

  if (!info || !value || value <= 0) {
    return;
  }

  const converted = value / info.brl;
  resultBrl.textContent = brlFormatter.format(value);
  targetFlagImg.src = info.flagSrc;
  targetFlagImg.alt = info.flagAlt;
  targetCode.textContent = info.code;
  resultLabel.textContent = info.label;
  resultTarget.textContent = formatTarget(info, converted);

  buildCards(value);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateConversion();
});

amountInput.addEventListener("input", () => {
  updateConversion();
});

targetSelect.addEventListener("change", () => {
  updateConversion();
});

updateConversion();
