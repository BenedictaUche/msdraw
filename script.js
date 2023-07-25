// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variable to store the current drawing data
let drawingData = [];

// Load saved drawing data from Local Storage, if available
loadDrawingData();

// Add event listeners for mouse interactions (you'll implement these in your code)
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

// Add event listeners for touch interactions (optional, if you want touch support)
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

// Implement the drawing logic here (you'll write this code)
function handleMouseDown(event) { /* ... */ }
function handleMouseMove(event) { /* ... */ }
function handleMouseUp(event) { /* ... */ }

function handleTouchStart(event) { /* ... */ }
function handleTouchMove(event) { /* ... */ }
function handleTouchEnd(event) { /* ... */ }

// Function to save the drawing data to Local Storage
function saveDrawingData() {
  localStorage.setItem('drawingData', JSON.stringify(drawingData));
}

// Function to load drawing data from Local Storage
function loadDrawingData() {
  const savedDrawingData = localStorage.getItem('drawingData');
  if (savedDrawingData) {
    drawingData = JSON.parse(savedDrawingData);
    redrawCanvas(); // Redraw the canvas with the loaded drawing data
  }
}

// Function to redraw the canvas with the loaded drawing data
function redrawCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw each stroke from the drawing data
  drawingData.forEach(stroke => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < stroke.points.length; i++) {
      const point = stroke.points[i];
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    ctx.stroke();
  });
}

// Function to clear the canvas and reset drawing data
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawingData = [];
  saveDrawingData();
}
