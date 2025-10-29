// variant2.js

let isEditingMode2 = false;

function initVariant2() {
  const table = document.getElementById("table2");
  const editBtn = document.getElementById("edit2");
  // Убираем прямую работу с addBtn.style.display из JavaScript, так как она теперь всегда видна в HTML

  if (!table || !editBtn) return;

  editBtn.onclick = () => {
    isEditingMode2 = !isEditingMode2;
    table.classList.toggle("edit-mode", isEditingMode2);
    // addBtn.style.display = isEditingMode2 ? "flex" : "none"; // Закомментировано

    if (isEditingMode2) {
      const rows = table.querySelectorAll(".table-row");
      rows.forEach((row) => {
        // 1. Сохраняем исходные текстовые значения в data-атрибуты для последующего восстановления
        const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
        const originalData = {
          service: cells[0].querySelector(".txt")?.textContent.trim() || "",
          unit: cells[1].querySelector(".txt")?.textContent.trim() || "",
          quantity: cells[2].querySelector(".txt")?.textContent.trim() || "0",
          rate: cells[3].querySelector(".txt")?.textContent.trim() || "0",
          total: cells[4].querySelector(".txt")?.textContent.trim() || "0", // В режиме просмотра это Сумма (4-й столбец)
          vat: cells[5].querySelector(".txt")?.textContent.trim() || "", // В режиме просмотра это НДС (5-й столбец)
          contractor: cells[6].querySelector(".txt")?.textContent.trim() || "", // В режиме просмотра это Контрагент (6-й столбец)
          contract: cells[7].querySelector(".txt")?.textContent.trim() || "", // В режиме просмотра это Договор (7-й столбец)
        };
        row.dataset.originalData = JSON.stringify(originalData);

        // --- НОВОЕ: Определяем исходную валюту из ячейки "Ставка" ---
        const originalRateText = originalData.rate; // Например, "25 000,00 ₽"
        const currencySymbolMatch = originalRateText.match(/[\₽\$\¥\€\₸]/);
        let originalCurrency = "Рубль"; // Значение по умолчанию
        if (currencySymbolMatch) {
          const symbol = currencySymbolMatch[0];
          // Сопоставляем символ с названием валюты
          const symbolMap = {
            "₽": "Рубль",
            $: "Доллар",
            "¥": "Юань",
            "€": "Евро",
            "₸": "Тенге",
          };
          originalCurrency = symbolMap[symbol] || "Рубль";
        }
        // Сохраняем найденную валюту в dataset для использования при создании select
        row.dataset.originalCurrency = originalCurrency;

        // 2. Обновляем ячейки на редактируемые элементы
        // 0: Услуга
        const serviceText = originalData.service;
        cells[0].innerHTML = `
                  <select class="fm-select">
                    <option value="">-- Выберите --</option>
                    <option value="Оплата тарифа по Белоруссии" ${
                      serviceText === "Оплата тарифа по Белоруссии"
                        ? "selected"
                        : ""
                    }>Оплата тарифа по Белоруссии</option>
                    <option value="Оплата тарифа по Казахстану" ${
                      serviceText === "Оплата тарифа по Казахстану"
                        ? "selected"
                        : ""
                    }>Оплата тарифа по Казахстану</option>
                    <option value="Оплата тарифа по Монголии" ${
                      serviceText === "Оплата тарифа по Монголии"
                        ? "selected"
                        : ""
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
        // 1: Ед. изм.
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
        // 2: Кол-во
        cells[2].innerHTML = `<input type="number" class="fm" value="${originalData.quantity}">`;
        // 3: Ставка
        const rateText = originalData.rate;
        const rateMatch = rateText.match(/([\d\s,]+)\s*[₽$¥€₸]/);
        const rateValue = rateMatch
          ? parseFloat(rateMatch[1].replace(/\s/g, "").replace(",", ".")) || 0
          : 0;
        cells[3].innerHTML = `<input type="number" class="fm" value="${rateValue}">`;
        // 4: Сумма (временно скрываем)
        cells[4].style.display = "none";
        // 5: НДС
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
        // 6: Контрагент
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
                      contractorText === "AA TRANSPORT SERVİS ООО"
                        ? "selected"
                        : ""
                    }>AA TRANSPORT SERVİS ООО</option>
                    <option value="ABSERON EXPRESS ООО" ${
                      contractorText === "ABSERON EXPRESS ООО" ? "selected" : ""
                    }>ABSERON EXPRESS ООО</option>
                  </select>
                `;
        // 7: Договор
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

        // 3. Создаем и вставляем новую ячейку "Валюта" на 4-е место (между ставкой и НДС)
        // В ТЗ: "...столбец (4): хедер -"Валюта", значение - "(var val)"..."
        // В ТЗ: "Столбец с индексом 4 (Валюта) в режиме просмотра скрыт."
        // Значит, "Валюта" вставляется ПЕРЕД текущую ячейку 4 (ранее Сумма).
        const currencyCell = document.createElement("div");
        currencyCell.className = "table-cell";
        // --- ИСПРАВЛЕНО: Используем originalCurrency для установки selected ---
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
        row.insertBefore(currencyCell, cells[4]); // Вставляем перед НДС (ранее 5-й, стал 6-й, сумма была 4-й, стала 5-й)

        const deleteBtn = row.querySelector(".btn-delete");
        if (deleteBtn) deleteBtn.style.display = "flex";
      });
      // Обновляем текст заголовка столбца "Сумма" на "Валюта" в режиме редактирования
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Валюта";
      }
      editBtn.innerHTML =
        '<span class="material-icons m24">save</span> Сохранить';
    } else {
      const rows = table.querySelectorAll(".table-row");
      rows.forEach((row) => {
        // 1. Получаем сохраненные исходные данные
        const originalData = JSON.parse(row.dataset.originalData || "{}");

        // 2. Находим редактируемые ячейки в текущем состоянии (в режиме редактирования)
        const allCurrentCells = Array.from(
          row.querySelectorAll(".table-cell:not(.action-cell)")
        );

        // 3. Извлекаем значения из редактируемых полей (select, input)
        // Порядок в allCurrentCells в режиме редактирования:
        // 0: Услуга (select)
        // 1: Ед. изм. (select)
        // 2: Кол-во (input)
        // 3: Ставка (input)
        // 4: Валюта (select) - используем для расчета, НЕ вставляем в новую строку
        // 5: Сумма (скрыта в ред.) (ранее была на месте 4)
        // 6: НДС (select) (ранее была на месте 5)
        // 7: Контрагент (select) (ранее была на месте 6)
        // 8: Договор (select) (ранее была на месте 7)
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
          allCurrentCells[4].querySelector("select")?.value || "Рубль"; // Ячейка "Валюта" (новая)
        // const totalValue = allCurrentCells[5].querySelector("input")?.value || originalData.total; // Сумма не редактируется напрямую
        const vatValue =
          allCurrentCells[6].querySelector("select")?.value || originalData.vat; // Ячейка "НДС" в редактировании
        const contractorValue =
          allCurrentCells[7].querySelector("select")?.value ||
          originalData.contractor; // Ячейка "Контрагент" в редактировании
        const contractValue =
          allCurrentCells[8].querySelector("select")?.value ||
          originalData.contract; // Ячейка "Договор" в редактировании

        const currencySymbol = currencySymbols[currencyValue] || "₽";
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

        // 4. Удаляем старую строку
        const parent = row.parentNode;
        if (parent) {
          // 5. Создаем новую строку в режиме просмотра НА ОСНОВЕ originalData
          // Это гарантирует правильный порядок ячеек.
          const newRowElement = document.createElement("div");
          newRowElement.className = "table-row";
          // Исходный шаблон строки (режим просмотра) - 9 столбцов
          newRowElement.innerHTML = `
                    <div class="table-cell"><div class="txt">${originalData.service}</div></div>
                    <div class="table-cell"><div class="txt">${originalData.unit}</div></div>
                    <div class="table-cell"><div class="txt">${originalData.quantity}</div></div>
                    <div class="table-cell"><div class="txt">${originalData.rate}</div></div>
                    <div class="table-cell"><div class="txt">${originalData.total}</div></div> <!-- Столбец 4 - Сумма -->
                    <div class="table-cell"><div class="txt">${originalData.vat}</div></div>   <!-- Столбец 5 - НДС -->
                    <div class="table-cell"><div class="txt">${originalData.contractor}</div></div> <!-- Столбец 6 - Контрагент -->
                    <div class="table-cell"><div class="txt">${originalData.contract}</div></div> <!-- Столбец 7 - Договор -->
                    <div class="action-cell">
                        <button class="btn-delete button-action-row" style="display: none;" onclick="deleteRow(this)">
                            <span class="material-icons m24">delete</span>
                        </button>
                    </div>
                  `;

          // 6. Обновляем ячейки новой строки с учетом отредактированных значений
          const newCells = newRowElement.querySelectorAll(
            ".table-cell:not(.action-cell)"
          );
          // 0: Услуга
          newCells[0].querySelector(".txt").textContent = serviceValue;
          // 1: Ед. изм.
          newCells[1].querySelector(".txt").textContent = unitValue;
          // 2: Кол-во
          newCells[2].querySelector(".txt").textContent = quantityValue;
          // 3: Ставка
          newCells[3].querySelector(".txt").textContent = rateValueWithCurrency;
          // 4: Сумма (ранее 5-й столбец в просмотре)
          newCells[4].querySelector(".txt").textContent =
            totalValueWithCurrency;
          // 5: НДС (ранее 6-й столбец в просмотре)
          newCells[5].querySelector(".txt").textContent = vatValue;
          // 6: Контрагент (ранее 7-й столбец в просмотре)
          newCells[6].querySelector(".txt").textContent = contractorValue;
          // 7: Договор (ранее 8-й столбец в просмотре)
          newCells[7].querySelector(".txt").textContent = contractValue;

          // 7. Заменяем старую строку на новую
          parent.replaceChild(newRowElement, row);
        }
      });
      // Восстанавливаем текст заголовка столбца "Валюта" на "Сумма" при выходе из режима редактирования
      const headerCells = table.querySelectorAll(".table-header .table-cell");
      if (headerCells.length > 4) {
        headerCells[4].querySelector(".txt").textContent = "Сумма";
      }
      editBtn.innerHTML =
        '<span class="material-icons m24">edit</span> Изменить';
    }
  };

  // Кнопка "Добавить строку" по-прежнему открывает попап
  document.getElementById("addRow2").addEventListener("click", () => {
    openAddPopup("variant2");
  });
}
