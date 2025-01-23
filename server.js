const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Handle POST request to control the servo motor
app.post('/control-servo', (req, res) => {
    const { angle } = req.body;

    if (angle === undefined) {
        return res.status(400).send('Angle is required.');
    }

    console.log(`Received angle: ${angle}`);

    // Simulate sending the angle to the ESP32
    // In a real scenario, you would send this via HTTP, WebSocket, or MQTT
    console.log(`Sending angle ${angle} to ESP32...`);

    res.status(200).send('Angle command sent to ESP32.');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
