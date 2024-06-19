document.getElementById('calculate-bmi-button').addEventListener('click', function() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
        const bmi = calculateBMI(height, weight);
        displayBMIResult(bmi);
    } else {
        displayBMIResult('Please enter valid height and weight.');
    }
});

function calculateBMI(height, weight) {
    const heightMeters = height / 100;
    return (weight / (heightMeters * heightMeters)).toFixed(1);
}

function displayBMIResult(bmi) {
    document.getElementById('bmi-result').textContent = `Your BMI is: ${bmi}`;
}
