// popup_add.js
// Объект сокращений валют
const currencySymbols = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

// Общая функция удаления строки
function deleteRow(button) {
  if (confirm("Удалить строку?")) {
    const row = button.closest(".table-row");
    row.remove();
  }
}

// Общие функции для popup добавления
let currentVariantForAdd = null;
function openAddPopup(variant) {
  currentVariantForAdd = variant;
  // --- ИСПРАВЛЕНО: Обновляем label и содержимое addTotal ---
  const totalLabel = document.querySelector('label[for="addTotal"]');
  // Меняем label на "Валюта"
  if (totalLabel) {
    totalLabel.textContent = "Валюта:";
  }
  // Меняем содержимое addTotal на select валюты
  const popupCurrency = document.getElementById("addTotal");
  popupCurrency.innerHTML = `
    <option value="Рубль" selected>Рубль</option>
    <option value="Доллар">Доллар</option>
    <option value="Юань">Юань</option>
    <option value="Евро">Евро</option>
    <option value="Тенге">Тенге</option>
  `;
  popupCurrency.value = "Рубль";

  // --- Обновляем остальные поля в popup в соответствии с select из ТЗ ---
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
  popupUnit.value = ""; // Исправлено: теперь по умолчанию "-- Выберите --"
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
  popupContract.disabled = true; // --- ИСПРАВЛЕНО: Поле "Договор" теперь disabled ---
  document.getElementById("addQuantity").value = 1;
  document.getElementById("addRate").value = 0;
  // document.getElementById("addTotal").value = 0; // Не нужно устанавливать для select валюты
  document.getElementById("popupOverlayAdd").style.display = "block";
  document.getElementById("addPopup").style.display = "block";
}
function closeAddPopup() {
  document.getElementById("popupOverlayAdd").style.display = "none";
  document.getElementById("addPopup").style.display = "none";
  // --- ИСПРАВЛЕНО: Всегда возвращаем label "Валюта" обратно к "Сумма" при закрытии ---
  const totalLabel = document.querySelector('label[for="addTotal"]');
  if (totalLabel) {
    totalLabel.textContent = "Сумма:";
  }
  // Сбрасываем addTotal на input с 0 на случай, если он был select
  document.getElementById("addTotal").value = 0;
}
function saveNewRowFromPopup() {
  // Получаем значения из select
  const service = document.getElementById("addService").value.trim();
  const unit = document.getElementById("addUnit").value.trim();
  const quantity = parseInt(document.getElementById("addQuantity").value) || 0;
  const rate = parseFloat(document.getElementById("addRate").value) || 0;
  // const total = quantity * rate; // Не используем введенную сумму, рассчитываем
  const vat = document.getElementById("addVat").value.trim();
  const contractor = document.getElementById("addContractor").value.trim();
  const contract = document.getElementById("addContract").value.trim();
  // --- ИСПРАВЛЕНО: Получаем значение валюты из addTotal (select) ---
  // Теперь addTotal всегда используется как select валюты
  const currency = document.getElementById("addTotal").value.trim(); // Берем из поля "Валюта" (ранее "Сумма")
  if (!service) {
    alert("⚠️ Укажите услугу!");
    return;
  }
  // --- ИСПРАВЛЕНО: Передаем currency вместо total ---
  const rowData = {
    service,
    unit,
    quantity,
    rate,
    currency, // Передаем валюту
    vat,
    contractor,
    contract,
  };
  if (currentVariantForAdd === "variant2") {
    addNewRowToTable2(rowData);
  } else if (currentVariantForAdd === "variant4") {
    const table = document.getElementById("table4");
    if (!table) {
      console.error("Таблица table4 не найдена для добавления строки.");
      closeAddPopup(); // Закрываем попап, если таблица не найдена
      return;
    }
    const newRow = document.createElement("div");
    newRow.className = "table-row";
    // --- ИСПРАВЛЕНО: Рассчитываем сумму и используем валюту для отображения ---
    const calculatedTotal = quantity * rate;
    const currencySymbol = currencySymbols[rowData.currency] || "₽";
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
            <button class="btn-edit button-action-row" onclick="editRow(this)"></button>
            <button class="btn-delete button-action-row" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
    table.appendChild(newRow);
    closeAddPopup();
    alert("✅ Новая строка добавлена!");
  } else {
    // Если currentVariantForAdd не 2 или 4, закрываем попап и сообщаем об ошибке
    console.error(
      "Неизвестный вариант для добавления строки:",
      currentVariantForAdd
    );
    closeAddPopup();
  }
}
// Общая функция для добавления строки в Вариант 2
function addNewRowToTable2(data) {
  const table = document.getElementById("table2");
  if (!table) {
    console.error("Таблица table2 не найдена для добавления строки.");
    closeAddPopup(); // Закрываем попап, если таблица не найдена
    return;
  }
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  // Проверяем, находится ли таблица в режиме редактирования
  const isEditingMode2 = table.classList.contains("edit-mode");
  if (isEditingMode2) {
    // --- ИСПРАВЛЕНО: Используем currency из data ---
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
            <button class="btn-delete button-action-row" style="display:flex;" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
    // --- Добавляем логику для вставки ячейки "Валюта" и скрытия "Суммы" для новой строки в режиме редактирования ---
    table.appendChild(newRow);
    // Находим ячейки новой строки
    const newCells = newRow.querySelectorAll(".table-cell:not(.action-cell)");
    // Создаем ячейку "Валюта"
    const currencyCell = document.createElement("div");
    currencyCell.className = "table-cell";
    currencyCell.innerHTML = `
      <select class="fm-select currency-select">
        <option value="${data.currency}" selected>${data.currency}</option> <!-- Используем валюту из data -->
        <option value="Рубль">Рубль</option>
        <option value="Доллар">Доллар</option>
        <option value="Юань">Юань</option>
        <option value="Евро">Евро</option>
        <option value="Тенге">Тенге</option>
      </select>
    `;
    // Вставляем перед НДС (новая ячейка 5, была 4 - Сумма, 5 - НДС)
    newRow.insertBefore(currencyCell, newCells[5]);
    // Скрываем ячейку "Сумма" (новая ячейка 5, была 4)
    newCells[4].style.display = "none";
    // Убедимся, что кнопка удаления видна
    const newDeleteBtn = newRow.querySelector(".btn-delete");
    if (newDeleteBtn) {
      newDeleteBtn.style.display = "flex";
    }
  } else {
    // --- ИСПРАВЛЕНО: Рассчитываем сумму и используем валюту для отображения в режиме просмотра ---
    const calculatedTotal = data.quantity * data.rate;
    const currencySymbol = currencySymbols[data.currency] || "₽";
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
            <button class="btn-delete button-action-row" style="display:none;" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
    table.appendChild(newRow);
  }
  closeAddPopup();
  alert("✅ Новая строка добавлена!");
}
