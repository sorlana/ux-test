// variant4.js

function initVariant4() {
    document.getElementById("addRow4").addEventListener("click", () => {
        openAddPopup("variant4");
    });
}

function editRow(button) {
    const row = button.closest(".table-row");
    const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
    const isSaveMode = button.classList.contains("btn-save");
    if (isSaveMode) {
        const inputs = row.querySelectorAll("input");
        const selects = row.querySelectorAll("select");
        cells.forEach((cell, i) => {
            const input = inputs[i];
            const select = selects[i];
            if (input && !input.readOnly) {
                const txtDiv = document.createElement("div");
                txtDiv.className = "txt";
                txtDiv.textContent = input.value;
                cell.innerHTML = "";
                cell.appendChild(txtDiv);
            } else if (select) {
                const txtDiv = document.createElement("div");
                txtDiv.className = "txt";
                txtDiv.textContent = select.value;
                cell.innerHTML = "";
                cell.appendChild(txtDiv);
            }
        });
        button.className = "btn-edit button-action-row";
    } else {
        cells.forEach((cell, i) => {
            const text = cell.querySelector(".txt")?.textContent || cell.textContent.trim();
            if (i === 0) {
                cell.innerHTML = `
                  <select class="fm-select">
                    <option value="Оплата тарифа по РЖД" ${text === 'Оплата тарифа по РЖД' ? 'selected' : ''}>Оплата тарифа по РЖД</option>
                    <option value="Доставка контейнера" ${text === 'Доставка контейнера' ? 'selected' : ''}>Доставка контейнера</option>
                  </select>
                `;
            }
            else if (i === 1) {
                cell.innerHTML = `
                  <select class="fm-select">
                    <option value="Контейнер" ${text === 'Контейнер' ? 'selected' : ''}>Контейнер</option>
                    <option value="Тонна" ${text === 'Тонна' ? 'selected' : ''}>Тонна</option>
                  </select>
                `;
            }
            else if (i === 2) {
                cell.innerHTML = `<input type="number" class="fm" value="${text}">`;
            }
            else if (i === 3) {
                const numValue = text.replace(' ₽', '').replace(/\s/g, '');
                cell.innerHTML = `<input type="number" class="fm" value="${numValue}">`;
            }
            else if (i === 4) {
                const numValue = text.replace(' ₽', '').replace(/\s/g, '');
                cell.innerHTML = `<input type="number" class="fm" value="${numValue}" readonly>`;
            }
            else if (i === 5) {
                cell.innerHTML = `
                  <select class="fm-select">
                    <option value="НДС 0%" ${text === 'НДС 0%' ? 'selected' : ''}>НДС 0%</option>
                    <option value="НДС 20%" ${text === 'НДС 20%' ? 'selected' : ''}>НДС 20%</option>
                  </select>
                `;
            }
            else if (i === 6) {
                cell.innerHTML = `
                  <select class="fm-select">
                    <option value="" ${!text ? 'selected' : ''}>-- Выберите --</option>
                    <option value="ООО Рога и Копыта" ${text === 'ООО Рога и Копыта' ? 'selected' : ''}>ООО Рога и Копыта</option>
                    <option value="ИП Петров И.П." ${text === 'ИП Петров И.П.' ? 'selected' : ''}>ИП Петров И.П.</option>
                  </select>
                `;
            }
            else if (i === 7) {
                cell.innerHTML = `
                  <select class="fm-select">
                    <option value="" ${!text ? 'selected' : ''}>-- Выберите --</option>
                    <option value="Дог. №123" ${text === 'Дог. №123' ? 'selected' : ''}>Дог. №123</option>
                    <option value="Дог. №456" ${text === 'Дог. №456' ? 'selected' : ''}>Дог. №456</option>
                  </select>
                `;
            }
        });
        button.className = "btn-save button-action-row";
    }
}