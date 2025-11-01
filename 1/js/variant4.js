// variant4.js
// Объект сокращений валют для variant4
const currencySymbols4 = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

/**
 * Функция для переключения строки между режимами просмотра и редактирования.
 * @param {HTMLButtonElement} button - Кнопка "Редактировать", "Сохранить" или "Отмена".
 */
function editRow(button) {
  const row = button.closest(".table-row");
  const table = row.closest("#table4");
  const isEditButton = button.classList.contains("btn-edit");
  const isSaveButton = button.classList.contains("btn-save");
  const isCancelButton = button.classList.contains("btn-cancel");

  if (isEditButton) {
    // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
    console.group(
      `[variant4.js] Редактирование строки (ID: ${row.id || "no-id"})`
    );

    // Сохраняем исходные данные в dataset, если их ещё нет
    if (!row.dataset.originalData) {
      console.log("Первое редактирование: сохраняем originalData");
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
      console.log("Исходные данные (originalData):", originalData);

      // Определение исходной валюты из поля ставки
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
      originalData.currency = originalCurrency;
      console.log(
        "Определённая валюта (originalCurrency):",
        `'${originalCurrency}'`
      );
      row.dataset.originalData = JSON.stringify(originalData);
    }

    const originalData = JSON.parse(row.dataset.originalData);
    console.log("Загруженные originalData:", originalData);

    // Извлечение значений из originalData для заполнения формы
    const originalService = originalData.service;
    const originalUnit = originalData.unit;
    const originalQuantity = originalData.quantity;
    const originalRateText = originalData.rate;
    const originalRateMatch = originalRateText.match(/([\d\s,]+)\s*[₽$¥€₸]/);
    const originalRateValue = originalRateMatch
      ? parseFloat(originalRateMatch[1].replace(/\s/g, "").replace(",", ".")) ||
        0
      : 0;
    const originalTotalText = originalData.total;
    const originalTotalMatch = originalTotalText.match(/([\d\s,]+)\s*[₽$¥€₸]/);
    const originalTotalValue = originalTotalMatch
      ? parseFloat(
          originalTotalMatch[1].replace(/\s/g, "").replace(",", ".")
        ) || 0
      : 0;
    const originalVat = originalData.vat;
    const originalContractor = originalData.contractor;
    const originalContract = originalData.contract;
    const originalCurrency = originalData.currency;

    console.log("--- Значения для заполнения формы ---");
    console.log("originalService:", `'${originalService}'`);
    console.log("originalUnit:", `'${originalUnit}'`);
    console.log("originalQuantity:", originalQuantity);
    console.log("originalRateValue:", originalRateValue);
    console.log("originalTotalValue:", originalTotalValue);
    console.log("originalVat:", `'${originalVat}'`);
    console.log("originalContractor:", `'${originalContractor}'`);
    console.log("originalContract:", `'${originalContract}'`);
    console.log("originalCurrency:", `'${originalCurrency}'`);

    // --- Создание новой строки с формой редактирования ---
    const editFormRow = document.createElement("div");
    editFormRow.className = "table-row table-row-edit"; // Добавлен класс для стилизации формы

    // --- HTML формы с лейблами ---
    editFormRow.innerHTML = `
    <div class="table-wrap">
    <div class="table-form">
    <div class="table-cell table-cell-edit">
        <label class="form-label">Услуга:</label>
        <select class="fm-select" name="service">
          <option value="">-- Выберите --</option>
          <option value="Оплата тарифа по Белоруссии" ${
            originalService === "Оплата тарифа по Белоруссии" ? "selected" : ""
          }>Оплата тарифа по Белоруссии</option>
          <option value="Оплата тарифа по Казахстану" ${
            originalService === "Оплата тарифа по Казахстану" ? "selected" : ""
          }>Оплата тарифа по Казахстану</option>
          <option value="Оплата тарифа по Монголии" ${
            originalService === "Оплата тарифа по Монголии" ? "selected" : ""
          }>Оплата тарифа по Монголии</option>
          <option value="Организация импортной перевозки в КТК" ${
            originalService === "Организация импортной перевозки в КТК"
              ? "selected"
              : ""
          }>Организация импортной перевозки в КТК</option>
          <option value="Организация экспортной перевозки в КТК" ${
            originalService === "Организация экспортной перевозки в КТК"
              ? "selected"
              : ""
          }>Организация экспортной перевозки в КТК</option>
          <option value="Предоставление вагонов" ${
            originalService === "Предоставление вагонов" ? "selected" : ""
          }>Предоставление вагонов</option>
          <option value="Оплата тарифа по РЖД" ${
            originalService === "Оплата тарифа по РЖД" ? "selected" : ""
          }>Оплата тарифа по РЖД</option>
        </select>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Ед. изм.:</label>
        <select class="fm-select" name="unit">
          <option value="">-- Выберите --</option>
          <option value="Вагон" ${
            originalUnit === "Вагон" ? "selected" : ""
          }>Вагон</option>
          <option value="Вагоно-сутки" ${
            originalUnit === "Вагоно-сутки" ? "selected" : ""
          }>Вагоно-сутки</option>
          <option value="Километр" ${
            originalUnit === "Километр" ? "selected" : ""
          }>Километр</option>
          <option value="Сутки" ${
            originalUnit === "Сутки" ? "selected" : ""
          }>Сутки</option>
          <option value="Тонна" ${
            originalUnit === "Тонна" ? "selected" : ""
          }>Тонна</option>
          <option value="Штука" ${
            originalUnit === "Штука" ? "selected" : ""
          }>Штука</option>
          <option value="Контейнер" ${
            originalUnit === "Контейнер" ? "selected" : ""
          }>Контейнер</option>
        </select>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Кол-во:</label>
        <input type="number" class="fm" name="quantity" value="${originalQuantity}">
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Ставка:</label>
        <input type="number" class="fm" name="rate" value="${originalRateValue}">
      </div>
      </div>
      <div class="table-form">
      <div class="table-cell table-cell-edit">
        <label class="form-label">Сумма:</label>
        <input type="number" class="fm" name="total" value="${originalTotalValue}" readonly>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">НДС:</label>
        <select class="fm-select" name="vat">
          <option value="">-- Выберите --</option>
          <option value="НДС 0%" ${
            originalVat === "НДС 0%" ? "selected" : ""
          }>НДС 0%</option>
          <option value="НДС 5%" ${
            originalVat === "НДС 5%" ? "selected" : ""
          }>НДС 5%</option>
          <option value="НДС 7%" ${
            originalVat === "НДС 7%" ? "selected" : ""
          }>НДС 7%</option>
          <option value="НДС 10%" ${
            originalVat === "НДС 10%" ? "selected" : ""
          }>НДС 10%</option>
          <option value="НДС 12%" ${
            originalVat === "НДС 12%" ? "selected" : ""
          }>НДС 12%</option>
          <option value="НДС 18%" ${
            originalVat === "НДС 18%" ? "selected" : ""
          }>НДС 18%</option>
          <option value="Без НДС" ${
            originalVat === "Без НДС" ? "selected" : ""
          }>Без НДС</option>
          <option value="НДС 20%" ${
            originalVat === "НДС 20%" ? "selected" : ""
          }>НДС 20%</option>
        </select>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Контрагент:</label>
        <select class="fm-select" name="contractor">
          <option value="">-- Выберите --</option>
          <option value="20 футов ООО" ${
            originalContractor === "20 футов ООО" ? "selected" : ""
          }>20 футов ООО</option>
          <option value="2Day Telecom ТОО" ${
            originalContractor === "2Day Telecom ТОО" ? "selected" : ""
          }>2Day Telecom ТОО</option>
          <option value="45КА ООО" ${
            originalContractor === "45КА ООО" ? "selected" : ""
          }>45КА ООО</option>
          <option value="4А.КОНСАЛТИНГ ООО" ${
            originalContractor === "4А.КОНСАЛТИНГ ООО" ? "selected" : ""
          }>4А.КОНСАЛТИНГ ООО</option>
          <option value="7ПЛ ООО" ${
            originalContractor === "7ПЛ ООО" ? "selected" : ""
          }>7ПЛ ООО</option>
          <option value="AA TRANSPORT SERVİS ООО" ${
            originalContractor === "AA TRANSPORT SERVİS ООО" ? "selected" : ""
          }>AA TRANSPORT SERVİS ООО</option>
          <option value="ABSERON EXPRESS ООО" ${
            originalContractor === "ABSERON EXPRESS ООО" ? "selected" : ""
          }>ABSERON EXPRESS ООО</option>
          <option value="ООО Рога и Копыта" ${
            originalContractor === "ООО Рога и Копыта" ? "selected" : ""
          }>ООО Рога и Копыта</option>
          <option value="ИП Петров И.П." ${
            originalContractor === "ИП Петров И.П." ? "selected" : ""
          }>ИП Петров И.П.</option>
        </select>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Договор:</label>
        <select class="fm-select" name="contract" disabled>
          <option value="">-- Выберите --</option>
          <option value="Дог. №123" ${
            originalContract === "Дог. №123" ? "selected" : ""
          }>Дог. №123</option>
          <option value="Дог. №456" ${
            originalContract === "Дог. №456" ? "selected" : ""
          }>Дог. №456</option>
        </select>
      </div>
      <div class="table-cell table-cell-edit">
        <label class="form-label">Валюта:</label>
        <select class="fm-select currency-select" name="currency">
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
      </div>
      </div>
      <!-- Ячейка для кнопок действия -->
      <div style="width:100%;display:flex; justify-content:end;">
        <button class="btn-save button-primary" onclick="editRow(this)" style=".btn-save::before: content: ''!important; margin-right: 10px;">Сохранить</button>
        <button class="btn-cancel button-secondary" onclick="editRow(this)" style="margin-right:0;">Отмена</button>
      </div>
      </div>
    `;

    // Заменяем старую строку новой формой редактирования
    const parent = row.parentNode;
    if (parent) {
      parent.replaceChild(editFormRow, row);
      console.log("Строка заменена на форму редактирования.");
    } else {
      console.error("Родительский элемент строки не найден!");
    }

    // --- ИСПРАВЛЕНО: Заголовки НЕ меняются ---
    // if (table) {
    //   const headerCells = table.querySelectorAll(".table-header .table-cell");
    //   if (headerCells.length > 4) {
    //     headerCells[4].querySelector(".txt").textContent = "Валюта";
    //     console.log("Заголовок 5-го столбца изменён на 'Валюта'.");
    //   }
    // }
    console.groupEnd();
  } else if (isSaveButton) {
    // --- РЕЖИМ СОХРАНЕНИЯ ---
    console.group(`[variant4.js] Сохранение строки (ID: ${row.id || "no-id"})`);

    // Находим форму редактирования (теперь row содержит форму)
    const serviceSelect = row.querySelector("select[name='service']");
    const unitSelect = row.querySelector("select[name='unit']");
    const vatSelect = row.querySelector("select[name='vat']");
    const contractorSelect = row.querySelector("select[name='contractor']");
    const contractSelect = row.querySelector("select[name='contract']");
    const currencySelect = row.querySelector("select[name='currency']"); // Валюта теперь в отдельной ячейке
    const quantityInput = row.querySelector("input[name='quantity']");
    const rateInput = row.querySelector("input[name='rate']");

    // Извлечение значений из формы
    const serviceValue = serviceSelect ? serviceSelect.value : "";
    const unitValue = unitSelect ? unitSelect.value : "";
    const vatValue = vatSelect ? vatSelect.value : "";
    const contractorValue = contractorSelect ? contractorSelect.value : "";
    const contractValue = contractSelect ? contractSelect.value : "";
    const currencyValue = currencySelect ? currencySelect.value : "Рубль"; // Используем селект валюты
    const quantityValue = parseFloat(quantityInput?.value) || 0;
    const rateInputValue = parseFloat(rateInput?.value) || 0;

    // --- ОТЛАДКА ЗНАЧЕНИЙ ---
    console.log("--- Извлечённые значения из формы ---");
    console.log("serviceValue (ожидаем Услуга):", `'${serviceValue}'`);
    console.log("unitValue (ожидаем Ед.изм.):", `'${unitValue}'`);
    console.log("currencyValue (ожидаем Валюта):", `'${currencyValue}'`);
    console.log("quantityValue (ожидаем Кол-во):", quantityValue);
    console.log("rateInputValue (ожидаем Ставка):", rateInputValue);
    console.log("vatValue (ожидаем НДС):", `'${vatValue}'`);
    console.log(
      "contractorValue (ожидаем Контрагент):",
      `'${contractorValue}'`
    );
    console.log("contractValue (ожидаем Договор):", `'${contractValue}'`);
    // ---

    const calculatedTotalValue = quantityValue * rateInputValue;

    // --- ИСПРАВЛЕНО: Используем currencySymbols4 ---
    const currencySymbol = currencySymbols4[currencyValue] || "₽";
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

    // --- СОЗДАЁМ НОВУЮ СТРОКУ В РЕЖИМЕ ПРОСМОТРА ---
    const viewRowElement = document.createElement("div");
    viewRowElement.className = "table-row";

    // Порядок ячеек в режиме просмотра: [Услуга] [Ед.изм.] [Кол-во] [Ставка] [Сумма] [НДС] [Контрагент] [Договор]
    viewRowElement.innerHTML = `
      <div class="table-cell"><div class="txt">${serviceValue}</div></div> <!-- 0: Услуга -->
      <div class="table-cell"><div class="txt">${unitValue}</div></div>     <!-- 1: Ед. изм. -->
      <div class="table-cell"><div class="txt">${quantityValue}</div></div>  <!-- 2: Кол-во -->
      <div class="table-cell"><div class="txt">${rateValueWithCurrency}</div></div> <!-- 3: Ставка -->
      <div class="table-cell"><div class="txt">${totalValueWithCurrency}</div></div> <!-- 4: Сумма -->
      <div class="table-cell"><div class="txt">${vatValue}</div></div>       <!-- 5: НДС -->
      <div class="table-cell"><div class="txt">${contractorValue}</div></div> <!-- 6: Контрагент -->
      <div class="table-cell"><div class="txt">${contractValue}</div></div>   <!-- 7: Договор -->
      <div class="action-cell">
          <button class="btn-edit button-action-row" onclick="editRow(this)"></button>
          <button class="btn-delete button-action-row" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
          </button>
      </div>
    `;

    console.log("--- Создана новая строка просмотра ---");
    // console.log("viewRowElement.innerHTML:", viewRowElement.innerHTML); // Закомментировано для читаемости лога

    // --- ИСПРАВЛЕНО: Заголовки НЕ меняются ---
    // if (table) {
    //   const headerCells = table.querySelectorAll(".table-header .table-cell");
    //   if (headerCells.length > 4) {
    //     headerCells[4].querySelector(".txt").textContent = "Сумма";
    //     console.log("Заголовок 5-го столбца изменён на 'Сумма'.");
    //   }
    // }

    // Заменяем форму редактирования на новую строку просмотра
    const parent = row.parentNode;
    if (parent) {
      parent.replaceChild(viewRowElement, row);
      console.log("Форма редактирования заменена на строку просмотра.");
    } else {
      console.error("Родительский элемент формы не найден!");
    }
    console.groupEnd();
  } else if (isCancelButton) {
    // --- РЕЖИМ ОТМЕНЫ РЕДАКТИРОВАНИЯ ---
    console.group(
      `[variant4.js] Отмена редактирования строки (ID: ${row.id || "no-id"})`
    );

    const originalData = JSON.parse(row.dataset.originalData || "{}");
    if (!originalData) {
      console.error("originalData отсутствуют при отмене редактирования.");
      console.groupEnd();
      return;
    }

    const serviceValue = originalData.service || "";
    const unitValue = originalData.unit || "";
    const quantityValue = originalData.quantity || "0";
    const rateValue = originalData.rate || "0";
    const totalValue = originalData.total || "0";
    const vatValue = originalData.vat || "";
    const contractorValue = originalData.contractor || "";
    const contractValue = originalData.contract || "";

    // --- СОЗДАЁМ НОВУЮ СТРОКУ В РЕЖИМЕ ПРОСМОТРА из originalData ---
    const viewRowElement = document.createElement("div");
    viewRowElement.className = "table-row";

    // Порядок ячеек в режиме просмотра: [Услуга] [Ед.изм.] [Кол-во] [Ставка] [Сумма] [НДС] [Контрагент] [Договор]
    viewRowElement.innerHTML = `
      <div class="table-cell"><div class="txt">${serviceValue}</div></div> <!-- 0: Услуга -->
      <div class="table-cell"><div class="txt">${unitValue}</div></div>     <!-- 1: Ед. изм. -->
      <div class="table-cell"><div class="txt">${quantityValue}</div></div>  <!-- 2: Кол-во -->
      <div class="table-cell"><div class="txt">${rateValue}</div></div> <!-- 3: Ставка -->
      <div class="table-cell"><div class="txt">${totalValue}</div></div> <!-- 4: Сумма -->
      <div class="table-cell"><div class="txt">${vatValue}</div></div>       <!-- 5: НДС -->
      <div class="table-cell"><div class="txt">${contractorValue}</div></div> <!-- 6: Контрагент -->
      <div class="table-cell"><div class="txt">${contractValue}</div></div>   <!-- 7: Договор -->
      <div class="action-cell">
          <button class="btn-edit button-action-row" onclick="editRow(this)"></button>
          <button class="btn-delete button-action-row" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
          </button>
      </div>
    `;

    console.log("--- Создана строка просмотра из originalData ---");
    // console.log("viewRowElement.innerHTML:", viewRowElement.innerHTML); // Закомментировано для читаемости лога

    // --- ИСПРАВЛЕНО: Заголовки НЕ меняются ---
    // if (table) {
    //   const headerCells = table.querySelectorAll(".table-header .table-cell");
    //   if (headerCells.length > 4) {
    //     headerCells[4].querySelector(".txt").textContent = "Сумма";
    //     console.log("Заголовок 5-го столбца изменён на 'Сумма' при отмене.");
    //   }
    // }

    // Заменяем форму редактирования на строку просмотра с оригинальными данными
    const parent = row.parentNode;
    if (parent) {
      parent.replaceChild(viewRowElement, row);
      console.log(
        "Форма редактирования заменена на строку просмотра с оригинальными данными."
      );
    } else {
      console.error("Родительский элемент формы не найден при отмене!");
    }
    console.groupEnd();
  }
}

function initVariant4() {
  document.getElementById("addRow4").addEventListener("click", () => {
    openAddPopup("variant4"); // Вызывает глобальную функцию из popup_add.js
  });
}
