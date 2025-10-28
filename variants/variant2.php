<div id="variant2" class="variant-panel active">
    <h3>Вариант 2: Кастомные шаблоны + Popup для добавления</h3>
    <div style="display: flex; margin-bottom: 8px">
        <button id="edit2" class="button-action">
            <span class="material-icons m24">edit</span> Изменить
        </button>
        <button id="addRow2" class="add-row-btn button-action">
            <span class="material-icons m24">add</span> Добавить строку
        </button>
    </div>
    <div id="table2" class="table-container">
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
        <div class="table-row">
            <div class="table-cell">
                <div class="txt">Оплата тарифа по РЖД</div>
            </div>
            <div class="table-cell"><div class="txt">Контейнер</div></div>
            <div class="table-cell"><div class="txt">50</div></div>
            <div class="table-cell"><div class="txt">25 000,00 ₽</div></div>
            <div class="table-cell"><div class="txt">1 250 000,00 ₽</div></div>
            <div class="table-cell"><div class="txt">НДС 0%</div></div>
            <div class="table-cell"><div class="txt"></div></div>
            <div class="table-cell"><div class="txt"></div></div>
            <div class="action-cell">
                <button
                    class="btn-delete button-action-row"
                    style="display: none"
                    onclick="deleteRow(this)"
                >
                    <span class="material-icons m24">delete</span>
                </button>
            </div>
        </div>
    </div>
    <div class="status" id="status2"></div>
</div>