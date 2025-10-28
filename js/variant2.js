// variant2.js

let isEditingMode2 = false;

function initVariant2() {
    const table = document.getElementById("table2");
    const editBtn = document.getElementById("edit2");

    if (!table || !editBtn) return;

    editBtn.onclick = () => {
        isEditingMode2 = !isEditingMode2;
        table.classList.toggle("edit-mode", isEditingMode2);
        if (isEditingMode2) {
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
                // Ставка (4)
                const rateCell = cells[3];
                const rateText = rateCell.textContent.trim().replace(' ₽', '').replace(/\s/g, '');
                rateCell.innerHTML = `<input type="number" class="fm" value="${rateText}">`;
                // Сумма (5)
                const totalCell = cells[4];
                const totalText = totalCell.textContent.trim().replace(' ₽', '').replace(/\s/g, '');
                totalCell.innerHTML = `<input type="number" class="fm" value="${totalText}" readonly>`;
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
                const deleteBtn = row.querySelector(".btn-delete");
                if (deleteBtn) deleteBtn.style.display = "flex";
            });
            editBtn.innerHTML = '<span class="material-icons m24">save</span> Сохранить';
        } else {
            const rows = table.querySelectorAll(".table-row");
            rows.forEach((row) => {
                const cells = row.querySelectorAll(".table-cell:not(.action-cell)");
                cells.forEach((cell) => {
                    const input = cell.querySelector("input");
                    const select = cell.querySelector("select");
                    if (input) {
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
                const deleteBtn = row.querySelector(".btn-delete");
                if (deleteBtn) deleteBtn.style.display = "none";
            });
            editBtn.innerHTML = '<span class="material-icons m24">edit</span> Изменить';
        }
    };

    document.getElementById("addRow2").addEventListener("click", () => {
        openAddPopup("variant2");
    });
}