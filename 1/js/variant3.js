// variant3.js
// Объект сокращений валют
const currencySymbols3 = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

// --- Код функций openAddPopup, closeAddPopup, saveNewRowFromPopup, addNewRowToTable2 ---
let currentVariantForAdd3 = null;
function openAddPopup3(variant) {
  currentVariantForAdd3 = variant;
  const totalLabel = document.querySelector('label[for="addTotal"]');
  if (totalLabel) {
    totalLabel.textContent = "Валюта:";
  }
  const popupCurrency = document.getElementById("addTotal");
  popupCurrency.innerHTML = `
    <option value="Рубль" selected>Рубль</option>
    <option value="Доллар">Доллар</option>
    <option value="Юань">Юань</option>
    <option value="Евро">Евро</option>
    <option value="Тенге">Тенге</option>
  `;
  popupCurrency.value = "Рубль";
  const popupService = document.getElementById("addService");
  popupService.innerHTML = `
    <option value="">-- Выберите --</option>
    <option value="Оплата тарифа по Белоруссии">Оплата тарифа по Белоруссии</option>
    <option value="Оплата тарифа по Казахстану">Оплата тарифа по Казахстану</option>
    <option value="Оплата тарифа по Монголии">Оплата тарифа по Монголии</option>
    <option value="Организация импортной перевозки в КТК">Организация импортной перевозки в КТК</option>
    <option value="Организация экспортной перевозки в КТК">Организация экспортной перевозки в КТК</option>
    <option value="Предоставление вагонов">Предоставление вагонов</option>
    <option value="Оплата тарифа по РЖД">Оплата тарифа по РЖД</option>
  `;
  popupService.value = ""; // Установлено значение по умолчанию
  const popupUnit = document.getElementById("addUnit");
  popupUnit.innerHTML = `
    <option value="">-- Выберите --</option>
    <option value="Вагон">Вагон</option>
    <option value="Вагоно-сутки">Вагоно-сутки</option>
    <option value="Километр">Километр</option>
    <option value="Сутки">Сутки</option>
    <option value="Тонна">Тонна</option>
    <option value="Штука">Штука</option>
    <option value="Контейнер">Контейнер</option>
  `;
  popupUnit.value = ""; // Установлено значение по умолчанию
  const popupVat = document.getElementById("addVat");
  popupVat.innerHTML = `
    <option value="">-- Выберите --</option>
    <option value="НДС 0%">НДС 0%</option>
    <option value="НДС 5%">НДС 5%</option>
    <option value="НДС 7%">НДС 7%</option>
    <option value="НДС 10%">НДС 10%</option>
    <option value="НДС 12%">НДС 12%</option>
    <option value="НДС 18%">НДС 18%</option>
    <option value="Без НДС">Без НДС</option>
    <option value="НДС 20%">НДС 20%</option>
  `;
  popupVat.value = ""; // Установлено значение по умолчанию
  const popupContractor = document.getElementById("addContractor");
  popupContractor.innerHTML = `
    <option value="">-- Выберите --</option>
    <option value="20 футов ООО">20 футов ООО</option>
    <option value="2Day Telecom ТОО">2Day Telecom ТОО</option>
    <option value="45КА ООО">45КА ООО</option>
    <option value="4А.КОНСАЛТИНГ ООО">4А.КОНСАЛТИНГ ООО</option>
    <option value="7ПЛ ООО">7ПЛ ООО</option>
    <option value="AA TRANSPORT SERVİS ООО">AA TRANSPORT SERVİS ООО</option>
    <option value="ABSERON EXPRESS ООО">ABSERON EXPRESS ООО</option>
    <option value="ООО Рога и Копыта">ООО Рога и Копыта</option>
    <option value="ИП Петров И.П.">ИП Петров И.П.</option>
  `;
  popupContractor.value = ""; // Установлено значение по умолчанию
  const popupContract = document.getElementById("addContract");
  popupContract.innerHTML = `
    <option value="">-- Выберите --</option>
    <option value="Дог. №123">Дог. №123</option>
    <option value="Дог. №456">Дог. №456</option>
  `;
  popupContract.value = "";
  popupContract.disabled = true;
  document.getElementById("addQuantity").value = 1;
  document.getElementById("addRate").value = 0;
  document.getElementById("popupOverlayAdd").style.display = "block";
  document.getElementById("addPopup").style.display = "block";
}
function closeAddPopup3() {
  document.getElementById("popupOverlayAdd").style.display = "none";
  document.getElementById("addPopup").style.display = "none";
  const totalLabel = document.querySelector('label[for="addTotal"]');
  if (totalLabel) {
    totalLabel.textContent = "Сумма:";
  }
  document.getElementById("addTotal").value = 0;
}
function saveNewRowFromPopup3() {
  const service = document.getElementById("addService").value.trim();
  const unit = document.getElementById("addUnit").value.trim();
  const quantity = parseInt(document.getElementById("addQuantity").value) || 0;
  const rate = parseFloat(document.getElementById("addRate").value) || 0;
  const vat = document.getElementById("addVat").value.trim();
  const contractor = document.getElementById("addContractor").value.trim();
  const contract = document.getElementById("addContract").value.trim();
  const currency = document.getElementById("addTotal").value.trim();
  if (!service) {
    alert("⚠️ Укажите услугу!");
    return;
  }
  const rowData = {
    service,
    unit,
    quantity,
    rate,
    currency,
    vat,
    contractor,
    contract,
  };
  // variant3 не использует addNewRowToTable2, добавляем строку напрямую
  const table = document.getElementById("table3");
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  const calculatedTotal = quantity * rate;
  const currencySymbol = currencySymbols3[rowData.currency] || "₽";
  newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${
            rowData.service
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.unit}</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.quantity
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.rate.toLocaleString(
            "ru-RU",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${calculatedTotal.toLocaleString(
            "ru-RU",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${rowData.vat}</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.contractor
          }</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.contract
          }</div></div>
          <div class="table-cell-2"></div>
        `;
  table.appendChild(newRow);
  closeAddPopup3();
  alert("✅ Новая строка добавлена!");
}
function addNewRowToTable23(data) {
  const table = document.getElementById("table3"); // Используем table3
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  const isEditingMode3 = table.classList.contains("edit-mode");
  if (isEditingMode3) {
    const calculatedTotal = data.quantity * data.rate;
    newRow.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="" selected>-- Выберите --</option>
              <option value="Оплата тарифа по Белоруссии">Оплата тарифа по Белоруссии</option>
              <option value="Оплата тарифа по Казахстану">Оплата тарифа по Казахстану</option>
              <option value="Оплата тарифа по Монголии">Оплата тарифа по Монголии</option>
              <option value="Организация импортной перевозки в КТК">Организация импортной перевозки в КТК</option>
              <option value="Организация экспортной перевозки в КТК">Организация экспортной перевозки в КТК</option>
              <option value="Предоставление вагонов">Предоставление вагонов</option>
              <option value="Оплата тарифа по РЖД">Оплата тарифа по РЖД</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="" selected>-- Выберите --</option>
              <option value="Вагон">Вагон</option>
              <option value="Вагоно-сутки">Вагоно-сутки</option>
              <option value="Километр">Километр</option>
              <option value="Сутки">Сутки</option>
              <option value="Тонна">Тонна</option>
              <option value="Штука">Штука</option>
              <option value="Контейнер">Контейнер</option>
            </select>
          </div>
          <div class="table-cell"><input type="number" class="fm" value="${
            data.quantity
          }"></div>
          <div class="table-cell"><input type="number" class="fm rate-input" data-original-value="${
            data.rate
          }" value="${data.rate}"></div>
          <div class="table-cell"><input type="number" class="fm" value="${calculatedTotal}" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="" selected>-- Выберите --</option>
              <option value="НДС 0%">НДС 0%</option>
              <option value="НДС 5%">НДС 5%</option>
              <option value="НДС 7%">НДС 7%</option>
              <option value="НДС 10%">НДС 10%</option>
              <option value="НДС 12%">НДС 12%</option>
              <option value="НДС 18%">НДС 18%</option>
              <option value="Без НДС">Без НДС</option>
              <option value="НДС 20%">НДС 20%</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="" selected>-- Выберите --</option>
              <option value="20 футов ООО">20 футов ООО</option>
              <option value="2Day Telecom ТОО">2Day Telecom ТОО</option>
              <option value="45КА ООО">45КА ООО</option>
              <option value="4А.КОНСАЛТИНГ ООО">4А.КОНСАЛТИНГ ООО</option>
              <option value="7ПЛ ООО">7ПЛ ООО</option>
              <option value="AA TRANSPORT SERVİS ООО">AA TRANSPORT SERVİS ООО</option>
              <option value="ABSERON EXPRESS ООО">ABSERON EXPRESS ООО</option>
              <option value="ООО Рога и Копыта">ООО Рога и Копыта</option>
              <option value="ИП Петров И.П.">ИП Петров И.П.</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select" disabled>
              <option value="${data.contract || ""}" selected>${
      data.contract || "-- Выберите --"
    }</option>
              <option value="Дог. №123">Дог. №123</option>
              <option value="Дог. №456">Дог. №456</option>
            </select>
          </div>
          <div class="table-cell-2"></div>
        `;
    table.appendChild(newRow);
    const newCells = newRow.querySelectorAll(".table-cell:not(.action-cell)");
    const currencyCell = document.createElement("div");
    currencyCell.className = "table-cell";
    currencyCell.innerHTML = `
      <select class="fm-select currency-select">
        <option value="${data.currency}" selected>${data.currency}</option>
        <option value="Рубль">Рубль</option>
        <option value="Доллар">Доллар</option>
        <option value="Юань">Юань</option>
        <option value="Евро">Евро</option>
        <option value="Тенге">Тенге</option>
      </select>
    `;
    newRow.insertBefore(currencyCell, newCells[5]);
    newCells[4].style.display = "none";

    // Добавляем обработчики для нового поля "Ставка"
    const rateInput = newCells[3].querySelector(".rate-input");
    const quantityInput = newCells[2].querySelector("input");
    const totalInput = newCells[4].querySelector("input");
    const currencySelect = currencyCell.querySelector("select");

    // Обработчик для изменения ставки
    rateInput.addEventListener("input", function () {
      const rateValue = parseFloat(this.value) || 0;
      const quantityValue = parseFloat(quantityInput.value) || 0;
      const totalValue = rateValue * quantityValue;
      totalInput.value = totalValue;
      // Сохраняем "чистое" значение в data-атрибуте
      this.dataset.originalValue = rateValue;
    });

    // Обработчик для изменения количества
    quantityInput.addEventListener("input", function () {
      const quantityValue = parseFloat(this.value) || 0;
      // Используем "чистое" значение из data-атрибута, если оно есть
      const rateValue =
        parseFloat(rateInput.dataset.originalValue) ||
        parseFloat(rateInput.value) ||
        0;
      const totalValue = rateValue * quantityValue;
      totalInput.value = totalValue;
    });

    // Обработчик для изменения валюты (форматирует ставку)
    currencySelect.addEventListener("change", function () {
      const selectedCurrency = this.value;
      const currencySymbol = currencySymbols3[selectedCurrency] || "₽";
      // Используем "чистое" значение из data-атрибута, если оно есть
      let currentRateValue = parseFloat(rateInput.dataset.originalValue);
      if (isNaN(currentRateValue)) {
        currentRateValue = parseFloat(rateInput.value) || 0;
      }
      // Форматируем и устанавливаем значение в поле ввода
      rateInput.value = currentRateValue
        .toLocaleString("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace(/\s/g, " ");
    });
  } else {
    const calculatedTotal = data.quantity * data.rate;
    const currencySymbol = currencySymbols3[data.currency] || "₽";
    newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${data.service}</div></div>
          <div class="table-cell"><div class="txt">${data.unit}</div></div>
          <div class="table-cell"><div class="txt">${data.quantity}</div></div>
          <div class="table-cell"><div class="txt">${data.rate.toLocaleString(
            "ru-RU",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${calculatedTotal.toLocaleString(
            "ru-RU",
            { minimumFractionDigits: 2, maximumFractionDigits: 2 }
          )} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${data.vat}</div></div>
          <div class="table-cell"><div class="txt">${
            data.contractor
          }</div></div>
          <div class="table-cell"><div class="txt">${data.contract}</div></div>
          <div class="table-cell-2"></div>
        `;
    table.appendChild(newRow);
  }
}
function deleteRow3(button) {
  if (confirm("Удалить строку?")) {
    const row = button.closest(".table-row");
    row.remove();
  }
}

// --- Конец кода функций из common.js ---
let originalData3 = [
  {
    service: "Оплата тарифа по РЖД",
    unit: "Контейнер",
    quantity: 50,
    rate: 25000,
    total: 1250000,
    vat: "НДС 0%",
    contractor: "",
    contract: "",
    currency: "Рубль", // Добавлено поле валюты
  },
];

function initVariant3() {
  const table = document.getElementById("table3");
  if (!table) return;
  renderTable3(originalData3);
  document.getElementById("edit3").addEventListener("click", () => {
    openPopup3();
  });
}

function renderTable3(data) {
  const table = document.getElementById("table3");
  const header = table.querySelector(".table-header");
  while (table.firstChild) table.removeChild(table.firstChild);
  table.appendChild(header);
  data.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row";
    const currencySymbol = currencySymbols3[row.currency] || "₽";
    const displayedRate =
      row.rate.toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      currencySymbol;
    const displayedTotal =
      (row.quantity * row.rate).toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      currencySymbol;
    rowEl.innerHTML = `
          <div class="table-cell"><div class="txt">${row.service}</div></div>
          <div class="table-cell"><div class="txt">${row.unit}</div></div>
          <div class="table-cell"><div class="txt">${row.quantity}</div></div>
          <div class="table-cell"><div class="txt">${displayedRate}</div></div>
          <div class="table-cell"><div class="txt">${displayedTotal}</div></div>
          <div class="table-cell"><div class="txt">${row.vat}</div></div>
          <div class="table-cell"><div class="txt">${row.contractor}</div></div>
          <div class="table-cell"><div class="txt">${row.contract}</div></div>
          <div class="table-cell-2"></div>
        `;
    table.appendChild(rowEl);
  });
}

function openPopup3() {
  const container = document.getElementById("modalTableContainer");
  while (container.children.length > 1)
    container.removeChild(container.lastChild);

  // Обновляем текст заголовка столбца "Сумма" на "Валюта" в модальном окне
  const headerCells = container.querySelectorAll(".table-header .table-cell");
  if (headerCells.length > 4) {
    headerCells[4].querySelector(".txt").textContent = "Валюта";
  }

  originalData3.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row";

    const originalCurrency = row.currency || "Рубль"; // Используем сохраненное значение

    rowEl.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
              <option value="Оплата тарифа по Белоруссии" ${
                row.service === "Оплата тарифа по Белоруссии" ? "selected" : ""
              }>Оплата тарифа по Белоруссии</option>
              <option value="Оплата тарифа по Казахстану" ${
                row.service === "Оплата тарифа по Казахстану" ? "selected" : ""
              }>Оплата тарифа по Казахстану</option>
              <option value="Оплата тарифа по Монголии" ${
                row.service === "Оплата тарифа по Монголии" ? "selected" : ""
              }>Оплата тарифа по Монголии</option>
              <option value="Организация импортной перевозки в КТК" ${
                row.service === "Организация импортной перевозки в КТК"
                  ? "selected"
                  : ""
              }>Организация импортной перевозки в КТК</option>
              <option value="Организация экспортной перевозки в КТК" ${
                row.service === "Организация экспортной перевозки в КТК"
                  ? "selected"
                  : ""
              }>Организация экспортной перевозки в КТК</option>
              <option value="Предоставление вагонов" ${
                row.service === "Предоставление вагонов" ? "selected" : ""
              }>Предоставление вагонов</option>
              <option value="Оплата тарифа по РЖД" ${
                row.service === "Оплата тарифа по РЖД" ? "selected" : ""
              }>Оплата тарифа по РЖД</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
              <option value="Вагон" ${
                row.unit === "Вагон" ? "selected" : ""
              }>Вагон</option>
              <option value="Вагоно-сутки" ${
                row.unit === "Вагоно-сутки" ? "selected" : ""
              }>Вагоно-сутки</option>
              <option value="Километр" ${
                row.unit === "Километр" ? "selected" : ""
              }>Километр</option>
              <option value="Сутки" ${
                row.unit === "Сутки" ? "selected" : ""
              }>Сутки</option>
              <option value="Тонна" ${
                row.unit === "Тонна" ? "selected" : ""
              }>Тонна</option>
              <option value="Штука" ${
                row.unit === "Штука" ? "selected" : ""
              }>Штука</option>
              <option value="Контейнер" ${
                row.unit === "Контейнер" ? "selected" : ""
              }>Контейнер</option>
            </select>
          </div>
          <div class="table-cell"><input type="number" class="fm" value="${
            row.quantity
          }"></div>
          <div class="table-cell"><input type="number" class="fm rate-input" data-original-value="${
            row.rate
          }" value="${row.rate}"></div>
          <div class="table-cell"><input type="number" class="fm" value="${
            row.total
          }" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
              <option value="НДС 0%" ${
                row.vat === "НДС 0%" ? "selected" : ""
              }>НДС 0%</option>
              <option value="НДС 5%" ${
                row.vat === "НДС 5%" ? "selected" : ""
              }>НДС 5%</option>
              <option value="НДС 7%" ${
                row.vat === "НДС 7%" ? "selected" : ""
              }>НДС 7%</option>
              <option value="НДС 10%" ${
                row.vat === "НДС 10%" ? "selected" : ""
              }>НДС 10%</option>
              <option value="НДС 12%" ${
                row.vat === "НДС 12%" ? "selected" : ""
              }>НДС 12%</option>
              <option value="НДС 18%" ${
                row.vat === "НДС 18%" ? "selected" : ""
              }>НДС 18%</option>
              <option value="НДС 20%" ${
                row.vat === "НДС 20%" ? "selected" : ""
              }>НДС 20%</option>
              <option value="Без НДС" ${
                row.vat === "Без НДС" ? "selected" : ""
              }>Без НДС</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
              <option value="20 футов ООО" ${
                row.contractor === "20 футов ООО" ? "selected" : ""
              }>20 футов ООО</option>
              <option value="2Day Telecom ТОО" ${
                row.contractor === "2Day Telecom ТОО" ? "selected" : ""
              }>2Day Telecom ТОО</option>
              <option value="45КА ООО" ${
                row.contractor === "45КА ООО" ? "selected" : ""
              }>45КА ООО</option>
              <option value="4А.КОНСАЛТИНГ ООО" ${
                row.contractor === "4А.КОНСАЛТИНГ ООО" ? "selected" : ""
              }>4А.КОНСАЛТИНГ ООО</option>
              <option value="7ПЛ ООО" ${
                row.contractor === "7ПЛ ООО" ? "selected" : ""
              }>7ПЛ ООО</option>
              <option value="AA TRANSPORT SERVİS ООО" ${
                row.contractor === "AA TRANSPORT SERVİS ООО" ? "selected" : ""
              }>AA TRANSPORT SERVİS ООО</option>
              <option value="ABSERON EXPRESS ООО" ${
                row.contractor === "ABSERON EXPRESS ООО" ? "selected" : ""
              }>ABSERON EXPRESS ООО</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select" disabled>
              <option value="">-- Выберите --</option>
              <option value="Дог. №123" ${
                row.contract === "Дог. №123" ? "selected" : ""
              }>Дог. №123</option>
              <option value="Дог. №456" ${
                row.contract === "Дог. №456" ? "selected" : ""
              }>Дог. №456</option>
            </select>
          </div>
          <div class="action-cell">
            <button class="btn-delete button-action-row" onclick="deleteRowInModal3(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;

    container.appendChild(rowEl);

    // Находим все ячейки в строке, кроме action-cell
    const cells = rowEl.querySelectorAll(".table-cell:not(.action-cell)");
    // Создаем и вставляем ячейку "Валюта" перед ячейкой "НДС" (ранее это была ячейка "Сумма")
    const currencyCell = document.createElement("div");
    currencyCell.className = "table-cell";
    currencyCell.innerHTML = `
      <select class="fm-select currency-select">
        <option value="" ${
          originalCurrency === "" ? "selected" : ""
        }>-- Выберите --</option>
        <option value="Рубль" ${
          originalCurrency === "Рубль" ? "selected" : ""
        }>Рубль</option>
        <option value="Доллар" ${
          originalCurrency === "Доллар" ? "selected" : ""
        }>Доллар</option>
        <option value="Юань" ${
          originalCurrency === "Юань" ? "selected" : ""
        }>Юань</option>
        <option value="Евро" ${
          originalCurrency === "Евро" ? "selected" : ""
        }>Евро</option>
        <option value="Тенге" ${
          originalCurrency === "Тенге" ? "selected" : ""
        }>Тенге</option>
      </select>
    `;
    rowEl.insertBefore(currencyCell, cells[5]); // Вставляем перед НДС (старая 5-я ячейка)

    // Скрываем ячейку "Сумма" (новая 5-я ячейка, старая 4-я)
    cells[4].style.display = "none";

    // Добавляем обработчики для нового поля "Ставка"
    const rateInput = cells[3].querySelector(".rate-input");
    const quantityInput = cells[2].querySelector("input");
    const totalInput = cells[4].querySelector("input");
    const currencySelect = currencyCell.querySelector("select");

    // Обработчик для изменения ставки
    rateInput.addEventListener("input", function () {
      const rateValue = parseFloat(this.value) || 0;
      const quantityValue = parseFloat(quantityInput.value) || 0;
      const totalValue = rateValue * quantityValue;
      totalInput.value = totalValue;
      // Сохраняем "чистое" значение в data-атрибуте
      this.dataset.originalValue = rateValue;
    });

    // Обработчик для изменения количества
    quantityInput.addEventListener("input", function () {
      const quantityValue = parseFloat(this.value) || 0;
      // Используем "чистое" значение из data-атрибута, если оно есть
      const rateValue =
        parseFloat(rateInput.dataset.originalValue) ||
        parseFloat(rateInput.value) ||
        0;
      const totalValue = rateValue * quantityValue;
      totalInput.value = totalValue;
    });

    // Обработчик для изменения валюты (форматирует ставку)
    currencySelect.addEventListener("change", function () {
      const selectedCurrency = this.value;
      const currencySymbol = currencySymbols3[selectedCurrency] || "₽";
      // Используем "чистое" значение из data-атрибута, если оно есть
      let currentRateValue = parseFloat(rateInput.dataset.originalValue);
      if (isNaN(currentRateValue)) {
        currentRateValue = parseFloat(rateInput.value) || 0;
      }
      // Форматируем и устанавливаем значение в поле ввода
      rateInput.value = currentRateValue
        .toLocaleString("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
        .replace(/\s/g, " ");
    });
  });
  document.getElementById("popupOverlay3").style.display = "block";
  document.getElementById("editPopup3").style.display = "block";
}

function deleteRowInModal3(button) {
  if (confirm("Удалить строку?")) {
    const row = button.closest(".table-row");
    row.remove();
  }
}

function saveModalChanges3() {
  const container = document.getElementById("modalTableContainer");
  const rows = container.querySelectorAll(".table-row");
  const newData = [];
  for (const row of rows) {
    const selects = row.querySelectorAll("select");
    const inputs = row.querySelectorAll("input");
    if (selects.length < 6 || inputs.length < 3) continue; // Увеличено на 1 селект (валюта)
    const service = selects[0].value.trim();
    if (!service) continue;

    // Извлекаем значения из правильных индексов
    const rowData = {
      service,
      unit: selects[1].value,
      quantity: parseInt(inputs[0].value) || 0,
      rate:
        parseFloat(inputs[1].dataset.originalValue) ||
        parseFloat(inputs[1].value) ||
        0, // Используем "чистое" значение
      total: parseFloat(inputs[2].value) || 0, // Сумма (ранее была на 4-м месте, теперь 5-е)
      vat: selects[3].value, // НДС (ранее 5-е, стало 6-е)
      contractor: selects[4].value, // Контрагент (ранее 6-е, стало 7-е)
      contract: selects[5].value, // Договор (ранее 7-е, стало 8-е)
      currency: selects[2].value, // Валюта (новый селект, вставленный на 5-е место)
    };
    newData.push(rowData);
  }
  originalData3 = newData;
  renderTable3(originalData3); // Обновляем основную таблицу
  closePopup3();
  alert("✅ Изменения сохранены!");
}

function closePopup3() {
  document.getElementById("popupOverlay3").style.display = "none";
  document.getElementById("editPopup3").style.display = "none";

  // Восстанавливаем текст заголовка столбца "Валюта" на "Сумма" при закрытии модального окна
  const container = document.getElementById("modalTableContainer");
  const headerCells = container.querySelectorAll(".table-header .table-cell");
  if (headerCells.length > 4) {
    headerCells[4].querySelector(".txt").textContent = "Сумма";
  }
}

// Добавляем модальное окно Варианта 3 и его overlay в DOM, если они не существуют
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("editPopup3")) {
    const popup3 = document.createElement("div");
    popup3.className = "popup";
    popup3.id = "editPopup3";
    popup3.innerHTML = `
          <div class="popup-title-wrap">
            <h4>Редактирование таблицы "Плановые расходы"</h4>
            <span class="material-icons m24 close" onclick="closePopup3()">close</span>
          </div>
          <div class="popup-content">
            <button id="addRowInModal" class="add-row-btn button-action" style="margin-bottom: 8px;">
              <span class="material-icons m24">add</span> Добавить строку
            </button>
            <div id="modalTableContainerPlaceholder"></div>
          </div>
          <div class="popup-button-wrap">
            <button class="button-primary" onclick="saveModalChanges3()">Сохранить</button>
            <button class="button-secondary" onclick="closePopup3()">Отмена</button>
          </div>
        `;
    document.body.appendChild(popup3);
    const modalContainer = document.createElement("div");
    modalContainer.id = "modalTableContainer";
    modalContainer.className = "table-container edit-mode";
    modalContainer.innerHTML = `
          <div class="table-header">
            <div class="table-cell"><div class="txt">Услуга</div></div>
            <div class="table-cell"><div class="txt">Ед. изм.</div></div>
            <div class="table-cell"><div class="txt">Кол-во</div></div>
            <div class="table-cell"><div class="txt">Ставка</div></div>
            <div class="table-cell"><div class="txt">Сумма</div></div>
            <div class="table-cell"><div class="txt">НДС</div></div>
            <div class="table-cell"><div class="txt">Контрагент</div></div>
            <div class="table-cell"><div class="txt">Договор</div></div>
            <div class="table-cell-2"></div>
          </div>
        `;
    document
      .getElementById("modalTableContainerPlaceholder")
      .replaceWith(modalContainer);
    document.getElementById("addRowInModal").addEventListener("click", () => {
      const container = document.getElementById("modalTableContainer");
      const newRow = document.createElement("div");
      newRow.className = "table-row";
      newRow.innerHTML = `
              <div class="table-cell">
                <select class="fm-select">
                  <option value="" selected>-- Выберите --</option>
                  <option value="Оплата тарифа по Белоруссии">Оплата тарифа по Белоруссии</option>
                  <option value="Оплата тарифа по Казахстану">Оплата тарифа по Казахстану</option>
                  <option value="Оплата тарифа по Монголии">Оплата тарифа по Монголии</option>
                  <option value="Организация импортной перевозки в КТК">Организация импортной перевозки в КТК</option>
                  <option value="Организация экспортной перевозки в КТК">Организация экспортной перевозки в КТК</option>
                  <option value="Предоставление вагонов">Предоставление вагонов</option>
                  <option value="Оплата тарифа по РЖД">Оплата тарифа по РЖД</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="" selected>-- Выберите --</option>
                  <option value="Вагон">Вагон</option>
                  <option value="Вагоно-сутки">Вагоно-сутки</option>
                  <option value="Километр">Километр</option>
                  <option value="Контейнер">Контейнер</option>
                  <option value="Сутки">Сутки</option>
                  <option value="Тонна">Тонна</option>
                  <option value="Штука">Штука</option>
                </select>
              </div>
              <div class="table-cell"><input type="number" class="fm" value="1"></div>
              <div class="table-cell"><input type="number" class="fm rate-input" data-original-value="0" value="0"></div>
              <div class="table-cell"><input type="number" class="fm" value="0" readonly></div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="" selected>-- Выберите --</option>
                  <option value="НДС 0%">НДС 0%</option>
                  <option value="НДС 5%">НДС 5%</option>
                  <option value="НДС 7%">НДС 7%</option>
                  <option value="НДС 10%">НДС 10%</option>
                  <option value="НДС 12%">НДС 12%</option>
                  <option value="НДС 18%">НДС 18%</option>
                  <option value="НДС 20%">НДС 20%</option>
                  <option value="Без НДС">Без НДС</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="" selected>-- Выберите --</option>
                  <option value="20 футов ООО">20 футов ООО</option>
                  <option value="2Day Telecom ТОО">2Day Telecom ТОО</option>
                  <option value="45КА ООО">45КА ООО</option>
                  <option value="4А.КОНСАЛТИНГ ООО">4А.КОНСАЛТИНГ ООО</option>
                  <option value="7ПЛ ООО">7ПЛ ООО</option>
                  <option value="AA TRANSPORT SERVİS ООО">AA TRANSPORT SERVİS ООО</option>
                  <option value="ABSERON EXPRESS ООО">ABSERON EXPRESS ООО</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select" disabled>
                  <option value="">-- Выберите --</option>
                </select>
              </div>
              <div class="action-cell">
                <button class="btn-delete button-action-row" onclick="deleteRowInModal3(this)">
                  <span class="material-icons m24">delete</span>
                </button>
              </div>
            `;
      container.appendChild(newRow);

      // Находим все ячейки в строке, кроме action-cell
      const cells = newRow.querySelectorAll(".table-cell:not(.action-cell)");
      // Создаем и вставляем ячейку "Валюта" перед ячейкой "НДС" (новая 6-я ячейка, старая 5-я была "Сумма")
      const currencyCell = document.createElement("div");
      currencyCell.className = "table-cell";
      currencyCell.innerHTML = `
        <select class="fm-select currency-select">
          <option value="" selected>-- Выберите --</option>
          <option value="Рубль">Рубль</option>
          <option value="Доллар">Доллар</option>
          <option value="Юань">Юань</option>
          <option value="Евро">Евро</option>
          <option value="Тенге">Тенге</option>
        </select>
      `;
      newRow.insertBefore(currencyCell, cells[5]); // Вставляем перед НДС (старая 5-я ячейка)

      // Скрываем ячейку "Сумма" (новая 5-я ячейка, старая 4-я)
      cells[4].style.display = "none";

      // Добавляем обработчики для нового поля "Ставка"
      const rateInput = cells[3].querySelector(".rate-input");
      const quantityInput = cells[2].querySelector("input");
      const totalInput = cells[4].querySelector("input");
      const currencySelect = currencyCell.querySelector("select");

      // Обработчик для изменения ставки
      rateInput.addEventListener("input", function () {
        const rateValue = parseFloat(this.value) || 0;
        const quantityValue = parseFloat(quantityInput.value) || 0;
        const totalValue = rateValue * quantityValue;
        totalInput.value = totalValue;
        // Сохраняем "чистое" значение в data-атрибуте
        this.dataset.originalValue = rateValue;
      });

      // Обработчик для изменения количества
      quantityInput.addEventListener("input", function () {
        const quantityValue = parseFloat(this.value) || 0;
        // Используем "чистое" значение из data-атрибута, если оно есть
        const rateValue =
          parseFloat(rateInput.dataset.originalValue) ||
          parseFloat(rateInput.value) ||
          0;
        const totalValue = rateValue * quantityValue;
        totalInput.value = totalValue;
      });

      // Обработчик для изменения валюты (форматирует ставку)
      currencySelect.addEventListener("change", function () {
        const selectedCurrency = this.value;
        const currencySymbol = currencySymbols3[selectedCurrency] || "₽";
        // Используем "чистое" значение из data-атрибута, если оно есть
        let currentRateValue = parseFloat(rateInput.dataset.originalValue);
        if (isNaN(currentRateValue)) {
          currentRateValue = parseFloat(rateInput.value) || 0;
        }
        // Форматируем и устанавливаем значение в поле ввода
        rateInput.value = currentRateValue
          .toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
          .replace(/\s/g, " ");
      });
    });
    const overlay3 = document.createElement("div");
    overlay3.className = "popup-overlay";
    overlay3.id = "popupOverlay3";
    document.body.appendChild(overlay3);
  }
});
