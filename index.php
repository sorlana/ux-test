<?php
// index.php
$active_variant = $_GET['variant'] ?? 'variant1'; // По умолчанию - Вариант 1

// Валидация, чтобы загружать только разрешённые файлы
$allowed_variants = ['variant1', 'variant2', 'variant3', 'variant4'];
if (!in_array($active_variant, $allowed_variants)) {
    $active_variant = 'variant1';
}

include 'template.php';
?>