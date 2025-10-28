<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <title>DevExtreme UX: Редактирование таблицы с удалением</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>UX-тестирование редактирования таблицы "Плановые расходы"</h1>
        <div class="controls">
            <button id="btn-variant1" class="button-primary" onclick="loadVariant('variant1')">Вариант 1</button>
            <button id="btn-variant2" class="button-primary" onclick="loadVariant('variant2')">Вариант 2</button>
            <button id="btn-variant3" class="button-primary" onclick="loadVariant('variant3')">Вариант 3</button>
            <button id="btn-variant4" class="button-primary" onclick="loadVariant('variant4')">Вариант 4</button>
        </div>
        <div id="content">
            <?php
            $active_variant = $_GET['variant'] ?? 'variant1';
            $allowed_variants = ['variant1', 'variant2', 'variant3', 'variant4'];
            if (!in_array($active_variant, $allowed_variants)) {
                $active_variant = 'variant1';
            }
            include "variants/{$active_variant}.php";
            ?>
        </div>
    </div>

    <!-- Popup для добавления (для Вариантов 2 и 4) -->
    <div class="popup-overlay" id="popupOverlayAdd"></div>
    <?php include 'popup_add.php'; ?>

    <!-- Подключаем JS файлы -->
    <script src="./js/common.js"></script>
    <script src="./js/variant1.js"></script>
    <script src="./js/variant2.js"></script>
    <script src="./js/variant3.js"></script>
    <script src="./js/variant4.js"></script>
</body>
</html>