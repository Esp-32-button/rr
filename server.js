const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initial servo state
let servoState = {
  angle: 90, // Default angle
};

// Serve the website's static files
app.use(express.static("public"));

// Endpoint to get the current servo angle (for ESP32)
app.get("/servo", (req, res) => {
  res.json(servoState);
  console.log("Sent current servo angle to ESP32:", servoState);
});

// Endpoint to update the servo angle (from website)
app.post("/servo", (req, res) => {
  const { angle } = req.body;

  // Validate the angle
  if (angle >= 0 && angle <= 180) {
    servoState.angle = angle; // Update the servo angle
    res.json({ success: true, message: `Servo angle updated to ${angle}` });
    console.log(`Servo angle updated to: ${angle}`);
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid angle. Must be between 0 and 180.",
    });
    console.error("Invalid angle received:", angle);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
