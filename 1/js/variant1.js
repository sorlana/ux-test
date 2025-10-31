// variant1.js
// Объект сокращений валют
const currencySymbols1 = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

// --- Код функций openAddPopup, closeAddPopup, saveNewRowFromPopup, addNewRowToTable2 ---
let currentVariantForAdd1 = null;
function openAddPopup1(variant) {
  currentVariantForAdd1 = variant;
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
  popupService.value = "";
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
  popupUnit.value = "";
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
  popupVat.value = "НДС 0%";
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
  popupContractor.value = "";
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

function closeAddPopup1() {
  document.getElementById("popupOverlayAdd").style.display = "none";
  document.getElementById("addPopup").style.display = "none";
  const totalLabel = document.querySelector('label[for="addTotal"]');
  if (totalLabel) {
    totalLabel.textContent = "Сумма:";
  }
  document.getElementById("addTotal").value = 0;
}

function saveNewRowFromPopup1() {
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
  // variant1 не использует addNewRowToTable2, добавляем строку напрямую
  const table = document.getElementById("table1");
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  const calculatedTotal = quantity * rate;
  const currencySymbol = currencySymbols1[rowData.currency] || "₽";
  newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${
            rowData.service
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.unit}</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.quantity
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.rate.toLocaleString()} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${calculatedTotal.toLocaleString()} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${rowData.vat}</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.contractor
          }</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.contract
          }</div></div>
          <div class="action-cell">
            <button class="btn-delete button-action-row" style="display:none;" onclick="deleteRow1(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
  table.appendChild(newRow);
  closeAddPopup1();
  alert("✅ Новая строка добавлена!");
}

function addNewRowToTable21(data) {
  const table = document.getElementById("table1"); // Используем table1
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  const isEditingMode1 = table.classList.contains("edit-mode");
  if (isEditingMode1) {
    const calculatedTotal = data.quantity * data.rate;
    newRow.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.service}" selected>${data.service}</option>
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
              <option value="${data.unit}" selected>${data.unit}</option>
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
          <div class="table-cell"><input type="number" class="fm" value="${
            data.rate
          }"></div>
          <div class="table-cell"><input type="number" class="fm" value="${calculatedTotal}" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.vat}" selected>${data.vat}</option>
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
              <option value="${data.contractor}" selected>${
      data.contractor || "-- Выберите --"
    }</option>
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
          <div class="action-cell">
            <button class="btn-delete button-action-row" style="display:flex;" onclick="deleteRow1(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
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
    const newDeleteBtn = newRow.querySelector(".btn-delete");
    if (newDeleteBtn) {
      newDeleteBtn.style.display = "flex";
    }
  } else {
    const calculatedTotal = data.quantity * data.rate;
    const currencySymbol = currencySymbols1[data.currency] || "₽";
    newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${data.service}</div></div>
          <div class="table-cell"><div class="txt">${data.unit}</div></div>
          <div class="table-cell"><div class="txt">${data.quantity}</div></div>
          <div class="table-cell"><div class="txt">${data.rate.toLocaleString()} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${calculatedTotal.toLocaleString()} ${currencySymbol}</div></div>
          <div class="table-cell"><div class="txt">${data.vat}</div></div>
          <div class="table-cell"><div class="txt">${
            data.contractor
          }</div></div>
          <div class="table-cell"><div class="txt">${data.contract}</div></div>
          <div class="action-cell">
            <button class="btn-delete button-action-row" style="display:none;" onclick="deleteRow1(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
    table.appendChild(newRow);
  }
}

function deleteRow1(button) {
  if (confirm("Удалить строку?")) {
    const row = button.closest(".table-row");
    row.remove();
  }
}

// --- Конец кода функций из common.js ---

let isEditing1 = false;

function initVariant1() {
  const table = document.getElementById("table1");
  const addBtn = document.getElementById("addRow1"); // Получаем элемент кнопки
  const editBtn = document.getElementById("edit1");
  if (!table || !editBtn) {
    console.error("Элементы table1 или edit1 не найдены.");
    return; // Важно: выходим, если элементы не найдены
  }

  // Удаляем предыдущие обработчики, если они были (например, при повторной инициализации)
  editBtn.onclick = null; // Сбрасываем обработчик

  editBtn.onclick = () => {
    isEditing1 = !isEditing1;
    table.classList.toggle("edit-mode", isEditing1);
    // --- ИСПРАВЛЕНО: Управляем видимостью кнопки addBtn ---
    if (addBtn) {
      addBtn.style.display = isEditing1 ? "flex" : "none";
    }
    if (isEditing1) {
      const rows = table.querySelectorAll(".table-row");
      rows.forEach((row) => {
        const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
        const originalData = {
          service: cells[0].querySelector(".txt")?.textContent.trim() || "",
          unit: cells[1].querySelector(".txt")?.textContent.trim() || "",
          quantity: cells[2].querySelector(".txt")?.textContent.trim() || "0",
          rate: cells[3].querySelector(".txt")?.textContent.trim() || "0",
          total: cells[4].querySelector(".txt")?.textContent.trim() || "0",
          vat: cells[5].querySelector(".txt")?.textContent.trim() || "",
          contractor: cells[6].querySelector(".txt")?.textContent.trim() || "",
          contract: cells[7].querySelector(".txt")?.textContent.trim() || "",
        };
        row.dataset.originalData = JSON.stringify(originalData);
        const originalRateText = originalData.rate;
        const currencySymbolMatch = originalRateText.match(/[\₽\$\¥\€\₸]/);
        let originalCurrency = "Рубль";
        if (currencySymbolMatch) {
          const symbol = currencySymbolMatch[0];
          const symbolMap = {
            "₽": "Рубль",
            $: "Доллар",
            "¥": "Юань",
            "€": "Евро",
            "₸": "Тенге",
          };
          originalCurrency = symbolMap[symbol] || "Рубль";
        }
        row.dataset.originalCurrency = originalCurrency;
        const serviceText = originalData.service;
        cells[0].innerHTML = `
          <select class="fm-select">
            <option value="">-- Выберите --</option>
            <option value="Оплата тарифа по Белоруссии" ${
              serviceText === "Оплата тарифа по Белоруссии" ? "selected" : ""
            }>Оплата тарифа по Белоруссии</option>
            <option value="Оплата тарифа по Казахстану" ${
              serviceText === "Оплата тарифа по Казахстану" ? "selected" : ""
            }>Оплата тарифа по Казахстану</option>
            <option value="Оплата тарифа по Монголии" ${
              serviceText === "Оплата тарифа по Монголии" ? "selected" : ""
            }>Оплата тарифа по Монголии</option>
            <option value="Организация импортной перевозки в КТК" ${
              serviceText === "Организация импортной перевозки в КТК"
                ? "selected"
                : ""
            }>Организация импортной перевозки в КТК</option>
            <option value="Организация экспортной перевозки в КТК" ${
              serviceText === "Организация экспортной перевозки в КТК"
                ? "selected"
                : ""
            }>Организация экспортной перевозки в КТК</option>
            <option value="Предоставление вагонов" ${
              serviceText === "Предоставление вагонов" ? "selected" : ""
            }>Предоставление вагонов</option>
            <option value="Оплата тарифа по РЖД" ${
              serviceText === "Оплата тарифа по РЖД" ? "selected" : ""
            }>Оплата тарифа по РЖД</option>
          </select>
        `;
        const unitText = originalData.unit;
        cells[1].innerHTML = `
          <select class="fm-select">
            <option value="">-- Выберите --</option>
            <option value="Вагон" ${
              unitText === "Вагон" ? "selected" : ""
            }>Вагон</option>
            <option value="Вагоно-сутки" ${
              unitText === "Вагоно-сутки" ? "selected" : ""
            }>Вагоно-сутки</option>
            <option value="Километр" ${
              unitText === "Километр" ? "selected" : ""
            }>Километр</option>
            <option value="Сутки" ${
              unitText === "Сутки" ? "selected" : ""
            }>Сутки</option>
            <option value="Тонна" ${
              unitText === "Тонна" ? "selected" : ""
            }>Тонна</option>
            <option value="Штука" ${
              unitText === "Штука" ? "selected" : ""
            }>Штука</option>
            <option value="Контейнер" ${
              unitText === "Контейнер" ? "selected" : ""
            }>Контейнер</option>
          </select>
        `;
        cells[2].innerHTML = `<input type="number" class="fm" value="${originalData.quantity}">`;
        const rateMatch = originalData.rate.match(/([\d\s,]+)\s*[₽$¥€₸]/);
        const rateValue = rateMatch
          ? parseFloat(rateMatch[1].replace(/\s/g, "").replace(",", ".")) || 0
          : 0;
        cells[3].innerHTML = `<input type="number" class="fm" value="${rateValue}">`;
        cells[4].style.display = "none";
        const vatText = originalData.vat;
        cells[5].innerHTML = `
          <select class="fm-select">
            <option value="">-- Выберите --</option>
            <option value="НДС 0%" ${
              vatText === "НДС 0%" ? "selected" : ""
            }>НДС 0%</option>
            <option value="НДС 5%" ${
              vatText === "НДС 5%" ? "selected" : ""
            }>НДС 5%</option>
            <option value="НДС 7%" ${
              vatText === "НДС 7%" ? "selected" : ""
            }>НДС 7%</option>
            <option value="НДС 10%" ${
              vatText === "НДС 10%" ? "selected" : ""
            }>НДС 10%</option>
            <option value="НДС 12%" ${
              vatText === "НДС 12%" ? "selected" : ""
            }>НДС 12%</option>
            <option value="НДС 18%" ${
              vatText === "НДС 18%" ? "selected" : ""
            }>НДС 18%</option>
            <option value="Без НДС" ${
              vatText === "Без НДС" ? "selected" : ""
            }>Без НДС</option>
            <option value="НДС 20%" ${
              vatText === "НДС 20%" ? "selected" : ""
            }>НДС 20%</option>
          </select>
        `;
        const contractorText = originalData.contractor;
        cells[6].innerHTML = `
          <select class="fm-select">
            <option value="">-- Выберите --</option>
            <option value="20 футов ООО" ${
              contractorText === "20 футов ООО" ? "selected" : ""
            }>20 футов ООО</option>
            <option value="2Day Telecom ТОО" ${
              contractorText === "2Day Telecom ТОО" ? "selected" : ""
            }>2Day Telecom ТОО</option>
            <option value="45КА ООО" ${
              contractorText === "45КА ООО" ? "selected" : ""
            }>45КА ООО</option>
            <option value="4А.КОНСАЛТИНГ ООО" ${
              contractorText === "4А.КОНСАЛТИНГ ООО" ? "selected" : ""
            }>4А.КОНСАЛТИНГ ООО</option>
            <option value="7ПЛ ООО" ${
              contractorText === "7ПЛ ООО" ? "selected" : ""
            }>7ПЛ ООО</option>
            <option value="AA TRANSPORT SERVİS ООО" ${
              contractorText === "AA TRANSPORT SERVİS ООО" ? "selected" : ""
            }>AA TRANSPORT SERVİS ООО</option>
            <option value="ABSERON EXPRESS ООО" ${
              contractorText === "ABSERON EXPRESS ООО" ? "selected" : ""
            }>ABSERON EXPRESS ООО</option>
            <option value="ООО Рога и Копыта" ${
              contractorText === "ООО Рога и Копыта" ? "selected" : ""
            }>ООО Рога и Копыта</option>
            <option value="ИП Петров И.П." ${
              contractorText === "ИП Петров И.П." ? "selected" : ""
            }>ИП Петров И.П.</option>
          </select>
        `;
        const contractText = originalData.contract;
        cells[7].innerHTML = `
          <select class="fm-select" disabled>
            <option value="">-- Выберите --</option>
            <option value="Дог. №123" ${
              contractText === "Дог. №123" ? "selected" : ""
            }>Дог. №123</option>
            <option value="Дог. №456" ${
              contractText === "Дог. №456" ? "selected" : ""
            }>Дог. №456</option>
          </select>
        `;
        const currencyCell = document.createElement("div");
        currencyCell.className = "table-cell";
        const currencyValue = row.dataset.originalCurrency || "Рубль";
        currencyCell.innerHTML = `
          <select class="fm-select currency-select">
            <option value="" ${
              !currencyValue || currencyValue === "" ? "selected" : ""
            }>-- Выберите --</option>
            <option value="Рубль" ${
              currencyValue === "Рубль" ? "selected" : ""
            }>Рубль</option>
            <option value="Доллар" ${
              currencyValue === "Доллар" ? "selected" : ""
            }>Доллар</option>
            <option value="Юань" ${
              currencyValue === "Юань" ? "selected" : ""
            }>Юань</option>
            <option value="Евро" ${
              currencyValue === "Евро" ? "selected" : ""
            }>Евро</option>
            <option value="Тенге" ${
              currencyValue === "Тенге" ? "selected" : ""
            }>Тенге</option>
          </select>
        `;
        row.insertBefore(currencyCell, cells[4]);
        const deleteBtn = row.querySelector(".btn-delete");
        if (deleteBtn) deleteBtn.style.display = "flex";
      });
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Валюта";
      }
      editBtn.innerHTML =
        '<span class="material-icons m24">save</span> Сохранить';
    } else {
      const rows = table.querySelectorAll(".table-row");
      rows.forEach((row) => {
        const originalData = JSON.parse(row.dataset.originalData || "{}");
        const allCurrentCells = Array.from(
          row.querySelectorAll(".table-cell:not(.action-cell)")
        );
        const serviceValue =
          allCurrentCells[0].querySelector("select")?.value ||
          originalData.service;
        const unitValue =
          allCurrentCells[1].querySelector("select")?.value ||
          originalData.unit;
        const quantityValue =
          parseFloat(allCurrentCells[2].querySelector("input")?.value) ||
          parseFloat(originalData.quantity) ||
          0;
        const rateInputValue =
          parseFloat(allCurrentCells[3].querySelector("input")?.value) || 0;
        const currencyValue =
          allCurrentCells[4].querySelector("select")?.value || "Рубль";
        const vatValue =
          allCurrentCells[6].querySelector("select")?.value || originalData.vat;
        const contractorValue =
          allCurrentCells[7].querySelector("select")?.value ||
          originalData.contractor;
        const contractValue =
          allCurrentCells[8].querySelector("select")?.value ||
          originalData.contract;
        const currencySymbol = currencySymbols1[currencyValue] || "₽";
        const calculatedTotalValue = quantityValue * rateInputValue;
        const rateValueWithCurrency =
          rateInputValue.toLocaleString("ru-RU", { maximumFractionDigits: 2 }) +
          " " +
          currencySymbol;
        const totalValueWithCurrency =
          calculatedTotalValue.toLocaleString("ru-RU", {
            maximumFractionDigits: 2,
          }) +
          " " +
          currencySymbol;
        const parent = row.parentNode;
        if (parent) {
          const newRowElement = document.createElement("div");
          newRowElement.className = "table-row";
          newRowElement.innerHTML = `
            <div class="table-cell"><div class="txt">${originalData.service}</div></div>
            <div class="table-cell"><div class="txt">${originalData.unit}</div></div>
            <div class="table-cell"><div class="txt">${originalData.quantity}</div></div>
            <div class="table-cell"><div class="txt">${originalData.rate}</div></div>
            <div class="table-cell"><div class="txt">${originalData.total}</div></div>
            <div class="table-cell"><div class="txt">${originalData.vat}</div></div>
            <div class="table-cell"><div class="txt">${originalData.contractor}</div></div>
            <div class="table-cell"><div class="txt">${originalData.contract}</div></div>
            <div class="action-cell">
                <button class="btn-delete button-action-row" style="display: none;" onclick="deleteRow1(this)">
                    <span class="material-icons m24">delete</span>
                </button>
            </div>
          `;
          const newCells = newRowElement.querySelectorAll(
            ".table-cell:not(.action-cell)"
          );
          newCells[0].querySelector(".txt").textContent = serviceValue;
          newCells[1].querySelector(".txt").textContent = unitValue;
          newCells[2].querySelector(".txt").textContent = quantityValue;
          newCells[3].querySelector(".txt").textContent = rateValueWithCurrency;
          newCells[4].querySelector(".txt").textContent =
            totalValueWithCurrency;
          newCells[5].querySelector(".txt").textContent = vatValue;
          newCells[6].querySelector(".txt").textContent = contractorValue;
          newCells[7].querySelector(".txt").textContent = contractValue;
          parent.replaceChild(newRowElement, row);
        }
      });
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Сумма";
      }
      editBtn.innerHTML =
        '<span class="material-icons m24">edit</span> Изменить';
    }
  };
  document.getElementById("addRow1").addEventListener("click", () => {
    const table = document.getElementById("table1");
    const newRow = document.createElement("div");
    newRow.className = "table-row";
    newRow.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
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
              <option value="">-- Выберите --</option>
              <option value="Вагон">Вагон</option>
              <option value="Вагоно-сутки">Вагоно-сутки</option>
              <option value="Километр">Километр</option>
              <option value="Сутки">Сутки</option>
              <option value="Тонна">Тонна</option>
              <option value="Штука">Штука</option>
              <option value="Контейнер">Контейнер</option>
            </select>
          </div>
          <div class="table-cell"><input type="number" class="fm" value="1"></div>
          <div class="table-cell"><input type="number" class="fm" value="0"></div>
          <div class="table-cell"><input type="number" class="fm" value="0" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="">-- Выберите --</option>
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
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select" disabled>
              <option value="">-- Выберите --</option>
              <option value="Дог. №123">Дог. №123</option>
              <option value="Дог. №456">Дог. №456</option>
            </select>
          </div>
          <div class="action-cell">
            <button class="btn-delete button-action-row" style="display:flex;" onclick="deleteRow1(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
    table.appendChild(newRow);
    const newCells = newRow.querySelectorAll(".table-cell:not(.action-cell)");
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
    newRow.insertBefore(currencyCell, newCells[5]);
    newCells[4].style.display = "none";
    const newDeleteBtn = newRow.querySelector(".btn-delete");
    if (newDeleteBtn) {
      newDeleteBtn.style.display = "flex";
    }
  });
}

// Управление вариантами (если используется)
const variants1 = ["variant1", "variant2", "variant3", "variant4"];
function loadVariant1(variantId) {
  if (!variants1.includes(variantId)) {
    console.error("Неверный идентификатор варианта:", variantId);
    return;
  }
  fetch(`variants/${variantId}.php`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      // initVariant1(); // Вызов своей инициализации - не вызываем здесь, так как инициализация происходит в DOMContentLoaded или вручную
    })
    .catch((err) => console.error("Ошибка загрузки варианта:", err));
}

// Раскомментируйте следующий блок, если variant1.js загружается на страницу,
// где элементы #table1 и #edit1 уже существуют на момент DOMContentLoaded.
document.addEventListener("DOMContentLoaded", function () {
  // Вызов инициализации variant1 при загрузке страницы, если это текущий активный вариант
  // или если он должен быть инициализирован по умолчанию
  const urlParams = new URLSearchParams(window.location.search);
  const initialVariant = urlParams.get("variant") || "variant1";
  if (initialVariant === "variant1") {
    console.log("DOMContentLoaded: вызов initVariant1 для variant1");
    initVariant1(); // Вызов своей инициализации
  }
});
