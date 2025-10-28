// common.js

// Объект сокращений валют
const currencySymbols = {
  Рубль: "₽",
  Доллар: "$",
  Юань: "¥",
  Евро: "€",
  Тенге: "₸",
};

// Управление вариантами
const variants = ["variant1", "variant2", "variant3", "variant4"];

function loadVariant(variantId) {
  if (!variants.includes(variantId)) {
    console.error("Неверный идентификатор варианта:", variantId);
    return;
  }
  fetch(`variants/${variantId}.php`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      initializeVariant(variantId);
    })
    .catch((err) => console.error("Ошибка загрузки варианта:", err));
}

function initializeVariant(variantId) {
  document.querySelectorAll(".controls button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.getElementById(`btn-${variantId}`).classList.add("active");

  switch (variantId) {
    case "variant1":
      initVariant1();
      break;
    case "variant2":
      initVariant2();
      break;
    case "variant3":
      initVariant3();
      break;
    case "variant4":
      initVariant4();
      break;
  }
}

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
  document.getElementById("addService").value = "";
  document.getElementById("addUnit").value = "Контейнер";
  document.getElementById("addQuantity").value = 1;
  document.getElementById("addRate").value = 0;
  document.getElementById("addTotal").value = 0;
  document.getElementById("addVat").value = "НДС 0%";
  document.getElementById("addContractor").value = "";
  document.getElementById("addContract").value = "";
  document.getElementById("popupOverlayAdd").style.display = "block";
  document.getElementById("addPopup").style.display = "block";
}

function closeAddPopup() {
  document.getElementById("popupOverlayAdd").style.display = "none";
  document.getElementById("addPopup").style.display = "none";
}

function saveNewRowFromPopup() {
  const service = document.getElementById("addService").value.trim();
  const unit = document.getElementById("addUnit").value.trim();
  const quantity = parseInt(document.getElementById("addQuantity").value) || 0;
  const rate = parseFloat(document.getElementById("addRate").value) || 0;
  const total = quantity * rate;
  const vat = document.getElementById("addVat").value || "НДС 0%";
  const contractor = document.getElementById("addContractor").value.trim();
  const contract = document.getElementById("addContract").value.trim();
  if (!service) {
    alert("⚠️ Укажите услугу!");
    return;
  }
  const rowData = {
    service,
    unit,
    quantity,
    rate,
    total,
    vat,
    contractor,
    contract,
  };
  if (currentVariantForAdd === "variant2") {
    addNewRowToTable2(rowData);
  } else if (currentVariantForAdd === "variant4") {
    const table = document.getElementById("table4");
    const newRow = document.createElement("div");
    newRow.className = "table-row";
    newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${
            rowData.service
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.unit}</div></div>
          <div class="table-cell"><div class="txt">${
            rowData.quantity
          }</div></div>
          <div class="table-cell"><div class="txt">${rowData.rate.toLocaleString()} ₽</div></div>
          <div class="table-cell"><div class="txt">${rowData.total.toLocaleString()} ₽</div></div>
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
  }
  closeAddPopup();
  alert("✅ Новая строка добавлена!");
}

// Общая функция для добавления строки в Вариант 2
function addNewRowToTable2(data) {
  const table = document.getElementById("table2");
  const newRow = document.createElement("div");
  newRow.className = "table-row";
  // Проверяем, находится ли таблица в режиме редактирования
  const isEditingMode2 = table.classList.contains("edit-mode");
  if (isEditingMode2) {
    newRow.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.service}" selected>${data.service}</option>
              <option value="Оплата тарифа по РЖД">Оплата тарифа по РЖД</option>
              <option value="Доставка контейнера">Доставка контейнера</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.unit}" selected>${data.unit}</option>
              <option value="Контейнер">Контейнер</option>
              <option value="Тонна">Тонна</option>
            </select>
          </div>
          <div class="table-cell"><input type="number" class="fm" value="${
            data.quantity
          }"></div>
          <div class="table-cell"><input type="number" class="fm" value="${
            data.rate
          }"></div>
          <div class="table-cell"><input type="number" class="fm" value="${
            data.total
          }" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.vat}" selected>${data.vat}</option>
              <option value="НДС 0%">НДС 0%</option>
              <option value="НДС 20%">НДС 20%</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.contractor}" selected>${
      data.contractor || "-- Выберите --"
    }</option>
              <option value="ООО Рога и Копыта">ООО Рога и Копыта</option>
              <option value="ИП Петров И.П.">ИП Петров И.П.</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="${data.contract}" selected>${
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
  } else {
    newRow.innerHTML = `
          <div class="table-cell"><div class="txt">${data.service}</div></div>
          <div class="table-cell"><div class="txt">${data.unit}</div></div>
          <div class="table-cell"><div class="txt">${data.quantity}</div></div>
          <div class="table-cell"><div class="txt">${data.rate.toLocaleString()} ₽</div></div>
          <div class="table-cell"><div class="txt">${data.total.toLocaleString()} ₽</div></div>
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
  }
  table.appendChild(newRow);
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const initialVariant = urlParams.get("variant") || "variant1";
  initializeVariant(initialVariant);
});
