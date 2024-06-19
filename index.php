<?php
$apiKey = '8be4498af6msh96db5b74f19cff4p1ba17djsn8f915c436f01';
$apiHost = 'exercisedb.p.rapidapi.com';
$apiUrl = 'https://exercisedb.p.rapidapi.com/exercises';

$options = [
    'http' => [
        'header' => [
            "X-RapidAPI-Key: $apiKey",
            "X-RapidAPI-Host: $apiHost"
        ]
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($apiUrl, false, $context);
$exercises = json_decode($response, true);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExerciseXpert</title>
    <link rel="stylesheet" href="styles.css">
    
    
</head>
<body>
    <header>
    <h1 class="mainhead" > ExerciseXpert</h1>
        <nav>
            <a href="index.php">Home</a>
           
            <a href="bmi.php">BMI Calculator</a>
        </nav>
    </header>

    <section id="search-section">
        
        <input type="text" id="exercise-search" placeholder="Search for exercises...">
        <button id="search-button">Search</button>
    </section>

    <section class="exercise-types">
        <div class="arrow left-arrow">&lt;</div>
        <div class="exercise-types-container"></div>
        <div class="arrow right-arrow">&gt;</div>
    </section>

    <section id="exercise-container" class="exercise-container">
        <?php foreach ($exercises as $exercise): ?>
            <div class="exercise-card" data-id="<?= htmlspecialchars($exercise['id']) ?>">
                <img src="<?= htmlspecialchars($exercise['gifUrl']) ?>" alt="<?= htmlspecialchars($exercise['name']) ?>" class="gif-img">
                <h3><?= htmlspecialchars($exercise['name']) ?></h3>
                <p>Body Part: <?= htmlspecialchars($exercise['bodyPart']) ?></p>
                <p>Target: <?= htmlspecialchars($exercise['target']) ?></p>
                <button class="favorite-button">
                    <i class="far fa-heart fa-2x"></i>
                </button>
            </div>
        <?php endforeach; ?>
    </section>

    <div class="pagination">
        <div class="arrow prev-button">&lt;</div>
        <div class="page-numbers"></div>
        <div class="arrow next-button">&gt;</div>
    </div>

    <div id="exercise-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2 id="modal-name"></h2>
            <img id="modal-gif" src="" alt="Exercise GIF" class="gif-img">
            <p id="modal-bodyPart"></p>
            <p id="modal-target"></p>
            <p id="modal-equipment"></p>
            <ul id="modal-instructions"></ul>
        </div>
    </div>
    <script defer src="script.js"></script>
</body>
</html>
