<div class="popup" id="addPopup">
    <div class="popup-title-wrap">
        <h4>Добавить новую строку</h4>
        <span class="material-icons m24 close" onclick="closeAddPopup()">close</span>
    </div>
    <div class="popup-content">
        <div class="form-group">
            <label>Услуга:</label>
            <select id="addService" class="fm-select">
                <option value="">-- Выберите услугу --</option>
                <option value="Оплата тарифа по РЖД">Оплата тарифа по РЖД</option>
                <option value="Доставка контейнера">Доставка контейнера</option>
            </select>
            <label>Ед. изм.:</label>
            <select id="addUnit" class="fm-select">
                <option value="">-- Выберите единицу --</option>
                <option value="Контейнер">Контейнер</option>
                <option value="Тонна">Тонна</option>
            </select>
            <label>Кол-во:</label>
            <input
                id="addQuantity"
                type="number"
                class="fm"
                value="1"
                min="1"
                style="width: 100px"
            />
            <label>Ставка:</label>
            <input
                id="addRate"
                type="number"
                class="fm"
                value="0"
                min="0"
                style="width: 100px"
            />
            <!-- ИЗМЕНЕНО: Поле "Сумма" заменено на "Валюта" -->
            <label>Валюта:</label>
            <select id="addTotal" class="fm-select" style="width: 150px;">
                <option value="Рубль" selected>Рубль</option>
                <option value="Доллар">Доллар</option>
                <option value="Юань">Юань</option>
                <option value="Евро">Евро</option>
                <option value="Тенге">Тенге</option>
            </select>
            <label>НДС:</label>
            <select id="addVat" class="fm-select">
                <option value="">-- Выберите НДС --</option>
                <option value="НДС 0%">НДС 0%</option>
                <option value="НДС 20%">НДС 20%</option>
            </select>
            <label>Контрагент:</label>
            <select id="addContractor" class="fm-select">
                <option value="">-- Выберите контрагента --</option>
                <option value="ООО Рога и Копыта">ООО Рога и Копыта</option>
                <option value="ИП Петров И.П.">ИП Петров И.П.</option>
            </select>
            <label>Договор:</label>
            <select id="addContract" class="fm-select">
                <option value="">-- Выберите договор --</option>
                <option value="Дог. №123">Дог. №123</option>
                <option value="Дог. №456">Дог. №456</option>
            </select>
        </div>
    </div>
    <div class="popup-button-wrap">
        <button onclick="saveNewRowFromPopup()" class="button-primary">
            Добавить строку
        </button>
        <button class="button-secondary" onclick="closeAddPopup()">
            Отмена
        </button>
    </div>
</div>