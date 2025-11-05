<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Получение результатов голосования
function getVotingResults($id = 1) {
    $f_name = "vote" . $id . ".txt";
    
    if (!file_exists($f_name)) {
        return array(
            'exists' => false,
            'total' => 0,
            'results' => array()
        );
    }
    
    $file_content = file_get_contents($f_name);
    $votes = explode(",", $file_content);
    
    // Подсчет общего количества голосов
    $total = 0;
    foreach ($votes as $count) {
        $total += intval($count);
    }
    
    // Подготовка данных для отображения
    $results = array();
    for ($i = 0; $i < count($votes); $i++) {
        $count = intval($votes[$i]);
        $percent = ($total > 0) ? round(($count * 100 / $total), 2) : 0;
        
        $results[] = array(
            'option' => $i + 1,
            'count' => $count,
            'percent' => $percent,
            'width' => $percent * 2 // для визуализации
        );
    }
    
    return array(
        'exists' => true,
        'total' => $total,
        'results' => $results
    );
}

$voting_data = getVotingResults(1);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Результаты голосования</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .results-container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .total-votes {
            text-align: center;
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
            padding: 10px;
            background: #e9ecef;
            border-radius: 4px;
        }
        .result-item {
            margin-bottom: 20px;
        }
        .option-name {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        .progress-bar {
            background: #e9ecef;
            border-radius: 4px;
            overflow: hidden;
            height: 30px;
            margin-bottom: 5px;
        }
        .progress-fill {
            background: linear-gradient(45deg, #007cba, #005a87);
            height: 100%;
            transition: width 0.5s ease;
        }
        .stats {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #666;
        }
        .no-results {
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 18px;
        }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            padding: 10px 20px;
            background: #6c757d;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            text-align: center;
        }
        .back-link:hover {
            background: #545b62;
        }
        .center {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="results-container">
        <h1>📊 Результаты голосования</h1>
        
        <?php if (!$voting_data['exists']): ?>
            <div class="no-results">
                <p>Голосование еще не проводилось</p>
                <p>Будьте первым, кто проголосует!</p>
            </div>
        <?php else: ?>
            <div class="total-votes">
                <strong>Всего голосов:</strong> <?php echo $voting_data['total']; ?>
            </div>
            
            <?php foreach ($voting_data['results'] as $result): ?>
                <div class="result-item">
                    <div class="option-name">Вариант <?php echo $result['option']; ?></div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: <?php echo $result['percent']; ?>%"></div>
                    </div>
                    <div class="stats">
                        <span><?php echo $result['count']; ?> голосов</span>
                        <span><?php echo $result['percent']; ?>%</span>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
        
        <div class="center">
            <a href="index.php" class="back-link">← Вернуться к голосованию</a>
        </div>
    </div>
</body>
</html>