<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Инициализация переменных
$message = '<br>';
$id = 1;

// Создаем файл голосования если не существует
if (!file_exists('vote1.txt')) {
    file_put_contents('vote1.txt', '0,0,0,0,0');
}

// Обработка голосования
if (isset($_POST['vote']) && is_numeric($_POST['item']) && is_numeric($_POST['id'])) {
    $id = intval($_POST['id']);
    $item = intval($_POST['item']);
    $f_name = "vote" . $id . ".txt";
    $f_ip = "vote" . $id . "_ip.txt";
    $ip = $_SERVER['REMOTE_ADDR'];

    // Проверка существования файла голосования
    if (!file_exists($f_name)) {
        $message = "<b>Ошибка: файл голосования не найден!</b><br>";
    } else {
        // Проверка IP
        $already_voted = false;
        if (file_exists($f_ip)) {
            $file_ip = file_get_contents($f_ip);
            $ips = explode(",", $file_ip);
            if (in_array($ip, $ips)) {
                $already_voted = true;
                $message = "<b>Вы уже голосовали!</b><br>";
            }
        }

        if (!$already_voted) {
            // Чтение текущих результатов
            $file_content = file_get_contents($f_name);
            $file = explode(",", $file_content);
            
            // Проверка корректности номера варианта
            if ($item >= 0 && $item < count($file)) {
                $file[$item] = intval($file[$item]) + 1;
                
                // Запись обновленных результатов
                if (file_put_contents($f_name, implode(",", $file)) !== false) {
                    // Сохранение IP
                    file_put_contents($f_ip, $ip . ",", FILE_APPEND);
                    $message = "<b>Ваш голос учтен!</b><br>";
                } else {
                    $message = "<b>Ошибка записи!</b><br>";
                }
            } else {
                $message = "<b>Ошибка: неверный вариант!</b><br>";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Система голосования</title>
    <style>
        .voting-form {
            max-width: 500px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f9f9f9;
        }
        .voting-form table {
            width: 100%;
            border-collapse: collapse;
        }
        .voting-form td {
            padding: 10px 5px;
            border-bottom: 1px solid #eee;
        }
        .message {
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
        }
        .success { color: #155724; background: #d4edda; }
        .error { color: #721c24; background: #f8d7da; }
        .info { color: #0c5460; background: transparent; }
    </style>
</head>
<body>
    <form method="POST" class="voting-form">
        <input type="hidden" name="id" value="1">
        <p><strong>Какой из вариантов Вам больше понравился?</strong></p>
        
        <table>
            <tr>
                <td><input type="radio" name="item" value="0" checked> Вариант 1</td>
            </tr>
            <tr>
                <td><input type="radio" name="item" value="1"> Вариант 2</td>
            </tr>
            <tr>
                <td><input type="radio" name="item" value="2"> Вариант 3</td>
            </tr>
            <tr>
                <td style="padding-top: 20px; text-align: center;">
                    <button type="submit" name="vote" class="button-primary">Голосовать</button>
                </td>
            </tr>
        </table>
        
        <div class="message <?php 
            if (strpos($message, 'учтен') !== false) echo 'success';
            elseif (strpos($message, 'ошибка') !== false || strpos($message, 'уже') !== false) echo 'error';
            else echo 'info';
        ?>">
            <?php echo $message; ?>
        </div>
    </form>
</body>
</html>