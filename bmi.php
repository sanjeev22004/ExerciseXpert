<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExerciseXpert - BMI Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        
        <nav>
            <a href="index.php">Home</a>
            <a href="index.php#search-section">Exercise</a>
            <a href="#bmi-section">BMI Calculator</a>
        </nav>
    </header>

    <section id="bmi-section">
        <h2>BMI Calculator</h2>
        <div class="bmi-form">
            <label for="height">Height (cm):</label>
            <input type="number" id="height" placeholder="Enter your height in cm">
            <label for="weight">Weight (kg):</label>
            <input type="number" id="weight" placeholder="Enter your weight in kg">
            <button id="calculate-bmi-button">Calculate BMI</button>
        </div>
        <div id="bmi-result"></div>
    </section>

    <script  src="scriptbmi.js"></script>
</body>
</html>
