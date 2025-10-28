// variant3.js

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
        rowEl.innerHTML = `
          <div class="table-cell"><div class="txt">${row.service}</div></div>
          <div class="table-cell"><div class="txt">${row.unit}</div></div>
          <div class="table-cell"><div class="txt">${row.quantity}</div></div>
          <div class="table-cell"><div class="txt">${row.rate.toLocaleString()} ₽</div></div>
          <div class="table-cell"><div class="txt">${row.total.toLocaleString()} ₽</div></div>
          <div class="table-cell"><div class="txt">${row.vat}</div></div>
          <div class="table-cell"><div class="txt">${row.contractor}</div></div>
          <div class="table-cell"><div class="txt">${row.contract}</div></div>
        `;
        table.appendChild(rowEl);
    });
}

function openPopup3() {
    const container = document.getElementById("modalTableContainer");
    while (container.children.length > 1) container.removeChild(container.lastChild);
    originalData3.forEach((row) => {
        const rowEl = document.createElement("div");
        rowEl.className = "table-row";
        rowEl.innerHTML = `
          <div class="table-cell">
            <select class="fm-select">
              <option value="Оплата тарифа по РЖД" ${row.service === 'Оплата тарифа по РЖД' ? 'selected' : ''}>Оплата тарифа по РЖД</option>
              <option value="Доставка контейнера" ${row.service === 'Доставка контейнера' ? 'selected' : ''}>Доставка контейнера</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="Контейнер" ${row.unit === 'Контейнер' ? 'selected' : ''}>Контейнер</option>
              <option value="Тонна" ${row.unit === 'Тонна' ? 'selected' : ''}>Тонна</option>
            </select>
          </div>
          <div class="table-cell"><input type="number" value="${row.quantity}"></div>
          <div class="table-cell"><input type="number" value="${row.rate}"></div>
          <div class="table-cell"><input type="number" value="${row.total}" readonly></div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="НДС 0%" ${row.vat === 'НДС 0%' ? 'selected' : ''}>НДС 0%</option>
              <option value="НДС 20%" ${row.vat === 'НДС 20%' ? 'selected' : ''}>НДС 20%</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="" ${!row.contractor ? 'selected' : ''}>-- Выберите --</option>
              <option value="ООО Рога и Копыта" ${row.contractor === 'ООО Рога и Копыта' ? 'selected' : ''}>ООО Рога и Копыта</option>
              <option value="ИП Петров И.П." ${row.contractor === 'ИП Петров И.П.' ? 'selected' : ''}>ИП Петров И.П.</option>
            </select>
          </div>
          <div class="table-cell">
            <select class="fm-select">
              <option value="" ${!row.contract ? 'selected' : ''}>-- Выберите --</option>
              <option value="Дог. №123" ${row.contract === 'Дог. №123' ? 'selected' : ''}>Дог. №123</option>
              <option value="Дог. №456" ${row.contract === 'Дог. №456' ? 'selected' : ''}>Дог. №456</option>
            </select>
          </div>
          <div class="action-cell">
            <button class="btn-delete button-action-row" onclick="deleteRowInModal(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
        container.appendChild(rowEl);
    });
    document.getElementById("popupOverlay3").style.display = "block";
    document.getElementById("editPopup3").style.display = "block";
}

function deleteRowInModal(button) {
    if (confirm("Удалить строку?")) {
        const row = button.closest(".table-row");
        row.remove();
    }
}

function saveModalChanges() {
    const container = document.getElementById("modalTableContainer");
    const rows = container.querySelectorAll(".table-row");
    const newData = [];
    for (const row of rows) {
        const selects = row.querySelectorAll("select");
        const inputs = row.querySelectorAll("input");
        if (selects.length < 5 || inputs.length < 3) continue;
        const service = selects[0].value.trim();
        if (!service) continue;
        const rowData = {
            service,
            unit: selects[1].value,
            quantity: parseInt(inputs[0].value) || 0,
            rate: parseFloat(inputs[1].value) || 0,
            total: (parseInt(inputs[0].value) || 0) * (parseFloat(inputs[1].value) || 0),
            vat: selects[2].value,
            contractor: selects[3].value,
            contract: selects[4].value,
        };
        newData.push(rowData);
    }
    originalData3 = newData;
    renderTable3(originalData3);
    closePopup3();
    alert("✅ Изменения сохранены!");
}

function closePopup3() {
    document.getElementById("popupOverlay3").style.display = "none";
    document.getElementById("editPopup3").style.display = "none";
}

// Добавляем модальное окно Варианта 3 и его overlay в DOM, если они не существуют
document.addEventListener('DOMContentLoaded', function() {
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
            <button class="button-primary" onclick="saveModalChanges()">Сохранить</button>
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
        document.getElementById("modalTableContainerPlaceholder").replaceWith(modalContainer);

        document.getElementById("addRowInModal").addEventListener("click", () => {
            const container = document.getElementById("modalTableContainer");
            const newRow = document.createElement("div");
            newRow.className = "table-row";
            newRow.innerHTML = `
              <div class="table-cell">
                <select class="fm-select">
                  <option value="Оплата тарифа по РЖД" selected>Оплата тарифа по РЖД</option>
                  <option value="Доставка контейнера">Доставка контейнера</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="Контейнер" selected>Контейнер</option>
                  <option value="Тонна">Тонна</option>
                </select>
              </div>
              <div class="table-cell"><input type="number" value="1"></div>
              <div class="table-cell"><input type="number" value="0"></div>
              <div class="table-cell"><input type="number" value="0" readonly></div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="НДС 0%" selected>НДС 0%</option>
                  <option value="НДС 20%">НДС 20%</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="">-- Выберите --</option>
                  <option value="ООО Рога и Копыта">ООО Рога и Копыта</option>
                  <option value="ИП Петров И.П.">ИП Петров И.П.</option>
                </select>
              </div>
              <div class="table-cell">
                <select class="fm-select">
                  <option value="">-- Выберите --</option>
                  <option value="Дог. №123">Дог. №123</option>
                  <option value="Дог. №456">Дог. №456</option>
                </select>
              </div>
              <div class="action-cell">
                <button class="btn-delete button-action-row" onclick="deleteRowInModal(this)">
                  <span class="material-icons m24">delete</span>
                </button>
              </div>
            `;
            container.appendChild(newRow);
        });

        const overlay3 = document.createElement("div");
        overlay3.className = "popup-overlay";
        overlay3.id = "popupOverlay3";
        document.body.appendChild(overlay3);
    }
});