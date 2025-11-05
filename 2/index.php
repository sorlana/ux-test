<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <title>DevExtreme UX: Редактирование таблицы с удалением</title>
    <link rel="icon" href="./fav2.ico" id="favicon">
    <script>
        // Определяем среду выполнения
        if (window.location.hostname === 'localhost' || 
            window.location.hostname.includes('local')) {
            // Локальная среда
            document.getElementById('favicon').href = './fav2-local.ico';
        } else {
            // Продакшен среда
            document.getElementById('favicon').href = './fav2.ico';
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link rel="stylesheet" href="select-min.css">
    <script src="./js/select-min.js"></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="variant1.css">
    <link rel="stylesheet" href="variant2.css">
    <link rel="stylesheet" href="variant3.css">
    <style>
        /* Дополнительные стили для активной кнопки */
        .controls .button-primary.active {
            background-color: #CE380B; /* Цвет фона активной кнопки */
            color: white; /* Цвет текста активной кнопки */
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>UX-тестирование для компонента выбора услуг</h1>
        <div class="controls">
            <button id="btn-variant1" class="button-primary active" onclick="loadVariant('variant1')">Вариант 1</button>
            <button id="btn-variant2" class="button-primary" onclick="loadVariant('variant2')">Вариант 2</button>
            <button id="btn-variant3" class="button-primary" onclick="loadVariant('variant3')">Вариант 3</button>
        </div>
        <div id="content">
            <!-- Содержимое будет загружаться сюда -->
        </div>
    </div>
    <!-- Popup для добавления (для Вариантов 2 и 4) -->
    <div class="popup-overlay" id="popupOverlayAdd"></div>
    <!-- Подключаем popup_add.php -->
    <?php include 'popup_add.php'; ?>
    <div style="width: 100%; display: flex; justify-content: center;>
    <?php include 'voice.php'; ?>
    </div>
    <!-- Подключаем JS файлы -->
    <script src="./js/common.js"></script>
</body>
</html>