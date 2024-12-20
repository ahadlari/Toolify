function calculateHealth() {
    // Get input values
    const age = parseInt(document.getElementById("age").value);
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const bloodPressure = document.getElementById("bloodPressure").value;
    const heartRate = parseInt(document.getElementById("heartRate").value);

    // Check for valid input
    if (!age || !height || !weight || !bloodPressure || !heartRate) {
        alert("Please fill out all fields with valid values.");
        return;
    }

    console.log("Input values:", { age, height, weight, bloodPressure, heartRate });

    // Calculate BMI
    const bmi = weight / ((height / 100) ** 2);
    console.log("Calculated BMI:", bmi);

    // Set ideal BMI range
    const minBMI = 18.5;
    const maxBMI = 24.9;
    const bmiPercentage = Math.min(Math.max(((bmi - minBMI) / (maxBMI - minBMI)) * 100, 0), 100);

    // Parse blood pressure
    const bpValues = bloodPressure.split("/");
    if (bpValues.length !== 2) {
        alert("Please enter blood pressure in systolic/diastolic format (e.g., 120/80).");
        return;
    }
    const [systolic, diastolic] = bpValues.map(Number);

    // Check blood pressure and heart rate ranges
    const isBPHealthy = systolic <= 120 && diastolic <= 80;
    const isHeartRateHealthy = heartRate >= 60 && heartRate <= 100;

    // Generate suggestions
    let suggestions = "";
    if (bmi < minBMI) {
        suggestions += "Consider gaining weight with foods like nuts, avocados, and lean proteins. ";
    } else if (bmi > maxBMI) {
        suggestions += "Consider a balanced diet for weight management. Include more vegetables, fruits, and lean proteins. ";
    }
    if (!isBPHealthy) {
        suggestions += "Monitor blood pressure and consider potassium-rich foods like bananas, spinach, and sweet potatoes. ";
    }
    if (!isHeartRateHealthy) {
        suggestions += "Try moderate exercise and stress-relief practices. ";
    }
    if (age >= 50) {
        suggestions += "Ensure calcium, vitamin D, and omega-3 rich foods to support bone and heart health. ";
    }

    // Display results and suggestions
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <strong>Your BMI: ${bmi.toFixed(1)}</strong> (${bmiPercentage.toFixed(1)}% of the healthy range)
        <p>Blood Pressure: ${bloodPressure} ${isBPHealthy ? '(Healthy)' : '(Monitor recommended)'}</p>
        <p>Heart Rate: ${heartRate} bpm ${isHeartRateHealthy ? '(Healthy)' : '(Consult physician recommended)'}</p>
        <p><strong>Suggestions:</strong> ${suggestions}</p>
    `;

    // Update the BMI meter
    const bmiMeter = document.getElementById("bmiMeter");
    bmiMeter.style.width = `${bmiPercentage}%`;
    bmiMeter.style.backgroundColor = bmi < minBMI ? "#ffc107" : bmi > maxBMI ? "#dc3545" : "#28a745";
}
