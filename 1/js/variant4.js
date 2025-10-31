// variant4.js

// Объект сокращений валют для variant4
const currencySymbols4 = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

// --- ИСПРАВЛЕНО: Функция editRow для редактирования отдельной строки ---
function editRow(button) {
  const row = button.closest(".table-row");
  const table = row.closest("#table4"); // Получаем ссылку на таблицу
  const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
  const isSaveMode = button.classList.contains("btn-save");

  if (isSaveMode) {
    // --- РЕЖИМ СОХРАНЕНИЯ ---
    console.group(`[variant4.js] Сохранение строки (ID: ${row.id || "no-id"})`);

    const inputs = row.querySelectorAll("input");
    const selects = row.querySelectorAll("select");

    console.log("Найденные inputs:", inputs.length, inputs);
    console.log("Найденные selects:", selects.length, selects);

    // --- ИСПРАВЛЕНО: Порядок select элементов в DOM строки после вставки currencyCell:
    // 0: Услуга (select) - cells[0] в редактировании
    // 1: Ед. изм. (select) - cells[1] в редактировании
    // 2: Валюта (select) - currencyCell (новая ячейка!)
    // 3: НДС (select) - cells[5] в редактировании
    // 4: Контрагент (select) - cells[6] в редактировании
    // 5: Договор (select) - cells[7] в редактировании

    // Проверка наличия selects перед извлечением
    if (selects.length < 6) {
      console.error("Недостаточно select элементов для сохранения!", selects);
      console.groupEnd();
      alert("Ошибка: Недостаточно элементов для сохранения.");
      return; // Прерываем сохранение
    }

    // --- ИСПРАВЛЕНО: Правильные индексы для извлечения значений ---
    const serviceValue = selects[0]?.value || ""; // 0 -> Услуга
    const unitValue = selects[1]?.value || ""; // 1 -> Ед. изм.
    const currencyValue = selects[2]?.value || "Рубль"; // 2 -> Валюта (<--- Исправлено)
    // inputs[0] - Кол-во, inputs[1] - Ставка
    const quantityValue = parseFloat(inputs[0]?.value) || 0;
    const rateInputValue = parseFloat(inputs[1]?.value) || 0;
    const vatValue = selects[3]?.value || ""; // 3 -> НДС
    const contractorValue = selects[4]?.value || ""; // 4 -> Контрагент
    const contractValue = selects[5]?.value || ""; // 5 -> Договор
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

    // --- ОТЛАДКА ЗНАЧЕНИЙ ---
    console.log("--- Извлечённые значения ---");
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
    const newRowElement = document.createElement("div");
    newRowElement.className = "table-row";

    // Используем обновлённые значения
    // Порядок ячеек в режиме просмотра: [Услуга] [Ед.изм.] [Кол-во] [Ставка] [Сумма] [НДС] [Контрагент] [Договор]
    newRowElement.innerHTML = `
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
    console.log("--- Создана новая строка ---");
    console.log("newRowElement.innerHTML:", newRowElement.innerHTML);

    // --- ИСПРАВЛЕНО: Восстанавливаем заголовок "Сумма" при выходе из режима редактирования ---
    if (table) {
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Сумма";
        console.log("Заголовок 5-го столбца изменён на 'Сумма'.");
      }
    }
    // ---

    // Заменяем старую строку новой
    const parent = row.parentNode;
    if (parent) {
      console.log("Заменяем старую строку на новую...");
      parent.replaceChild(newRowElement, row);
      console.log("Строка успешно заменена.");
    } else {
      console.error("Родительский элемент строки не найден!");
    }
    console.groupEnd();
  } else {
    // --- РЕЖИМ РЕДАКТИРОВАНИЯ ---
    console.group(
      `[variant4.js] Редактирование строки (ID: ${row.id || "no-id"})`
    );

    // --- ИСПРАВЛЕНО: Меняем заголовок на "Валюта" при переходе в режим редактирования ---
    if (table) {
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Валюта";
        console.log("Заголовок 5-го столбца изменён на 'Валюта'.");
      }
    }
    // ---

    // Сохраняем исходные данные в dataset, если их ещё нет
    if (!row.dataset.originalData) {
      console.log("Первое редактирование: сохраняем originalData");
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

      // Сохраняем исходную валюту
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
      originalData.currency = originalCurrency; // Добавляем валюту в объект
      console.log(
        "Определённая валюта (originalCurrency):",
        `'${originalCurrency}'`
      );

      row.dataset.originalData = JSON.stringify(originalData);
      console.log("OriginalData сохранены в dataset.row");
    }

    const originalData = JSON.parse(row.dataset.originalData);
    console.log("Загруженные originalData:", originalData);

    // Извлекаем значения из сохранённых данных
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
    const originalCurrency = originalData.currency; // Используем сохранённую валюту

    console.log("--- Значения для заполнения select ---");
    console.log("originalService:", `'${originalService}'`);
    console.log("originalUnit:", `'${originalUnit}'`);
    console.log("originalQuantity:", originalQuantity);
    console.log("originalRateValue:", originalRateValue);
    console.log("originalTotalValue:", originalTotalValue);
    console.log("originalVat:", `'${originalVat}'`);
    console.log("originalContractor:", `'${originalContractor}'`);
    console.log("originalContract:", `'${originalContract}'`);
    console.log(
      "originalCurrency (для select 'Валюта'):",
      `'${originalCurrency}'`
    ); // Логируем валюту для селекта
    // ---

    // Заменяем ячейки на редактируемые элементы
    console.log("Заменяем ячейки на редактируемые элементы...");
    cells[0].innerHTML = `
          <select class="fm-select">
            <option value="">-- Выберите --</option>
            <option value="Оплата тарифа по Белоруссии" ${
              originalService === "Оплата тарифа по Белоруссии"
                ? "selected"
                : ""
            }>Оплата тарифа по Белоруссии</option>
            <option value="Оплата тарифа по Казахстану" ${
              originalService === "Оплата тарифа по Казахстану"
                ? "selected"
                : ""
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
        `;

    cells[1].innerHTML = `
          <select class="fm-select">
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
        `;

    cells[2].innerHTML = `<input type="number" class="fm" value="${originalQuantity}">`;
    cells[3].innerHTML = `<input type="number" class="fm" value="${originalRateValue}">`;
    cells[4].innerHTML = `<input type="number" class="fm" value="${originalTotalValue}" readonly>`;
    cells[4].style.display = "none";

    cells[5].innerHTML = `
          <select class="fm-select">
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
        `;

    cells[6].innerHTML = `
          <select class="fm-select">
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
        `;

    cells[7].innerHTML = `
          <select class="fm-select" disabled>
            <option value="">-- Выберите --</option>
            <option value="Дог. №123" ${
              originalContract === "Дог. №123" ? "selected" : ""
            }>Дог. №123</option>
            <option value="Дог. №456" ${
              originalContract === "Дог. №456" ? "selected" : ""
            }>Дог. №456</option>
          </select>
        `;
    console.log("Ячейки заменены.");

    // --- ИСПРАВЛЕНО: Создаем и вставляем новую ячейку "Валюта" с выбранной валютой ---
    console.log("Создаём и вставляем ячейку 'Валюта'...");
    const currencyCell = document.createElement("div");
    currencyCell.className = "table-cell";
    // --- ИСПРАВЛЕНО: Устанавливаем selected на originalCurrency ---
    currencyCell.innerHTML = `
          <select class="fm-select currency-select">
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
    console.log("currencyCell.innerHTML:", currencyCell.innerHTML);
    row.insertBefore(currencyCell, cells[5]); // Вставляем перед НДС (cells[5] в редактировании - это НДС)
    console.log("'Валюта' вставлена перед НДС.");

    // Меняем кнопку на "Сохранить"
    button.className = "btn-save button-action-row";
    console.log("Кнопка изменена на 'Сохранить'.");
    console.groupEnd();
  }
}

function initVariant4() {
  document.getElementById("addRow4").addEventListener("click", () => {
    openAddPopup("variant4"); // Вызывает глобальную функцию из popup_add.js
  });
}

// Управление вариантами (только для случая, если variant4.js загружается отдельно и нужно переключение внутри него)
// Обычно loadVariant определяется в common.js
// const variants4 = ["variant1", "variant2", "variant3", "variant4"]; // Не нужно
// function loadVariant4(variantId) { ... } // Не нужно
// document.addEventListener("DOMContentLoaded", function () { ... }); // Не нужно
