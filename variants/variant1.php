<div id="variant1" class="variant-panel active">
    <h3>Вариант 1: DataGrid + Batch Edit</h3>
    <div style="display: flex; margin-bottom: 8px">
        <button id="edit1" class="button-action">
            <span class="material-icons m24">edit</span> Изменить
        </button>
        <button id="addRow1" style="display: none" class="button-action">
            <span class="material-icons m24">add</span> Добавить строку
        </button>
    </div>
    <div id="table1" class="table-container">
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
    <div class="status" id="status1"></div>
</div>