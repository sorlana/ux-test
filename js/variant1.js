// variant1.js

let isEditing1 = false;

function initVariant1() {
    const table = document.getElementById("table1");
    const addBtn = document.getElementById("addRow1");
    const editBtn = document.getElementById("edit1");

    if (!table || !editBtn) return;

    editBtn.onclick = () => {
        isEditing1 = !isEditing1;
        table.classList.toggle("edit-mode", isEditing1);
        addBtn.style.display = isEditing1 ? "flex" : "none";
        if (isEditing1) {
            const rows = table.querySelectorAll(".table-row");
            rows.forEach((row) => {
                const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
                // Услуга (1)
                const serviceCell = cells[0];
                const serviceText = serviceCell.textContent.trim();
                serviceCell.innerHTML = `
                  <select class="fm-select">
                    <option value="Оплата тарифа по РЖД" ${serviceText === 'Оплата тарифа по РЖД' ? 'selected' : ''}>Оплата тарифа по РЖД</option>
                    <option value="Доставка контейнера" ${serviceText === 'Доставка контейнера' ? 'selected' : ''}>Доставка контейнера</option>
                  </select>
                `;
                // Ед. изм. (2)
                const unitCell = cells[1];
                const unitText = unitCell.textContent.trim();
                unitCell.innerHTML = `
                  <select class="fm-select">
                    <option value="Контейнер" ${unitText === 'Контейнер' ? 'selected' : ''}>Контейнер</option>
                    <option value="Тонна" ${unitText === 'Тонна' ? 'selected' : ''}>Тонна</option>
                  </select>
                `;
                // Кол-во (3)
                const quantityCell = cells[2];
                const quantityText = quantityCell.textContent.trim();
                quantityCell.innerHTML = `<input type="number" class="fm" value="${quantityText}">`;
                // Ставка (4) - Теперь только input, без select валюты
                const rateCell = cells[3];
                const rateText = rateCell.textContent.trim();
                const rateMatch = rateText.match(/([\d\s,]+)\s*[₽$¥€₸]/);
                const rateValue = rateMatch ? rateMatch[1].replace(/\s/g, '').replace(',', '.') : '0';
                rateCell.innerHTML = `<input type="number" class="fm" value="${rateValue}">`;
                // Сумма (5) - скрываем
                const totalCell = cells[4];
                totalCell.style.display = 'none';
                // НДС (6)
                const vatCell = cells[5];
                const vatText = vatCell.textContent.trim();
                vatCell.innerHTML = `
                  <select class="fm-select">
                    <option value="НДС 0%" ${vatText === 'НДС 0%' ? 'selected' : ''}>НДС 0%</option>
                    <option value="НДС 20%" ${vatText === 'НДС 20%' ? 'selected' : ''}>НДС 20%</option>
                  </select>
                `;
                // Контрагент (7)
                const contractorCell = cells[6];
                const contractorText = contractorCell.textContent.trim();
                contractorCell.innerHTML = `
                  <select class="fm-select">
                    <option value="" ${!contractorText ? 'selected' : ''}>-- Выберите --</option>
                    <option value="ООО Рога и Копыта" ${contractorText === 'ООО Рога и Копыта' ? 'selected' : ''}>ООО Рога и Копыта</option>
                    <option value="ИП Петров И.П." ${contractorText === 'ИП Петров И.П.' ? 'selected' : ''}>ИП Петров И.П.</option>
                  </select>
                `;
                // Договор (8)
                const contractCell = cells[7];
                const contractText = contractCell.textContent.trim();
                contractCell.innerHTML = `
                  <select class="fm-select">
                    <option value="" ${!contractText ? 'selected' : ''}>-- Выберите --</option>
                    <option value="Дог. №123" ${contractText === 'Дог. №123' ? 'selected' : ''}>Дог. №123</option>
                    <option value="Дог. №456" ${contractText === 'Дог. №456' ? 'selected' : ''}>Дог. №456</option>
                  </select>
                `;
                // Добавляем поле "Валюта" (вместо суммы)
                const currencyCell = document.createElement("div");
                currencyCell.className = "table-cell";
                currencyCell.innerHTML = `
                  <select class="fm-select">
                    <option value="Рубль" selected>Рубль</option>
                    <option value="Доллар">Доллар</option>
                    <option value="Юань">Юань</option>
                    <option value="Евро">Евро</option>
                    <option value="Тенге">Тенге</option>
                  </select>
                `;
                row.insertBefore(currencyCell, totalCell);

                const deleteBtn = row.querySelector(".btn-delete");
                if (deleteBtn) deleteBtn.style.display = "flex";
            });
            editBtn.innerHTML = '<span class="material-icons m24">save</span> Сохранить';
        } else {
            const rows = table.querySelectorAll(".table-row");
            rows.forEach((row) => {
                const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
                const currencyCell = row.querySelector('.table-cell select:not(.currency-select)')?.closest('.table-cell');
                const currencyValue = currencyCell ? currencyCell.querySelector('select').value : 'Рубль';
                const currencySymbol = currencySymbols[currencyValue] || '₽';

                const totalCell = cells[4];
                const quantityCell = cells[2];
                const rateCell = cells[3];
                const quantityInput = quantityCell.querySelector("input");
                const rateInputForTotal = rateCell.querySelector("input");
                if (quantityInput && rateInputForTotal) {
                  const quantity = parseFloat(quantityInput.value) || 0;
                  const rate = parseFloat(rateInputForTotal.value) || 0;
                  const totalValue = quantity * rate;
                  const txtDiv = document.createElement("div");
                  txtDiv.className = "txt";
                  txtDiv.textContent = `${totalValue.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ${currencySymbol}`;
                  totalCell.innerHTML = "";
                  totalCell.appendChild(txtDiv);
                  totalCell.style.display = 'flex';
                }

                const allCellsInRow = row.querySelectorAll('.table-cell:not(.action-cell)');
                allCellsInRow.forEach(cell => {
                  const input = cell.querySelector("input");
                  const select = cell.querySelector("select");
                  if (input && !input.readOnly) {
                    const txtDiv = document.createElement("div");
                    txtDiv.className = "txt";
                    txtDiv.textContent = input.value;
                    cell.innerHTML = "";
                    cell.appendChild(txtDiv);
                  } else if (select) {
                    if (cell === rateCell && input) {
                      const rateValue = input.value;
                      const txtDiv = document.createElement("div");
                      txtDiv.className = "txt";
                      txtDiv.textContent = `${parseFloat(rateValue).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ${currencySymbol}`;
                      cell.innerHTML = "";
                      cell.appendChild(txtDiv);
                    } else {
                      const txtDiv = document.createElement("div");
                      txtDiv.className = "txt";
                      txtDiv.textContent = select.value;
                      cell.innerHTML = "";
                      cell.appendChild(txtDiv);
                    }
                  } else if (cell === totalCell) {
                  } else {
                    const existingTxt = cell.querySelector('.txt');
                    if (!existingTxt) {
                      const txtDiv = document.createElement("div");
                      txtDiv.className = "txt";
                      txtDiv.textContent = cell.textContent.trim();
                      cell.innerHTML = "";
                      cell.appendChild(txtDiv);
                    }
                  }
                });

                if (currencyCell) {
                  currencyCell.remove();
                }

                const deleteBtn = row.querySelector(".btn-delete");
                if (deleteBtn) deleteBtn.style.display = "none";
            });
            editBtn.innerHTML = '<span class="material-icons m24">edit</span> Изменить';
        }
    };

    document.getElementById("addRow1").addEventListener("click", () => {
        const table = document.getElementById("table1");
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
          <div class="table-cell"><input type="number" class="fm" value="1"></div>
          <div class="table-cell"><input type="number" class="fm" value="0"></div>
          <div class="table-cell"><input type="number" class="fm" value="0" readonly></div>
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
            <button class="btn-delete button-action-row" style="display:flex;" onclick="deleteRow(this)">
              <span class="material-icons m24">delete</span>
            </button>
          </div>
        `;
        table.appendChild(newRow);
    });
}