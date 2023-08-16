// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Toolbar elements
const select = document.getElementById("mouse-pointer");
const hand = document.getElementById("hand");
const draw = document.getElementById("pencil");
const eraser = document.getElementById("eraser");
const arrowUp = document.getElementById("arrow-up");
const text = document.getElementById("text");
const note = document.getElementById("note");
const picture = document.getElementById("picture");
const square = document.getElementById("square");
const angleUp = document.getElementById("angle-up");
const all = document.getElementById("all");
const fileInput = document.getElementById("file-input");
const share = document.getElementById("share");

// Set cursor styles for different tools
select.addEventListener("click", () => {
  canvas.style.cursor = "default";
});

draw.addEventListener("click", () => {
  canvas.style.cursor = "crosshair";
});

text.addEventListener("click", () => {
  canvas.style.cursor = "text";
});

note.addEventListener("click", () => {
  canvas.style.cursor = "help";
});

eraser.addEventListener("click", () => {
  canvas.style.cursor = "cell";
});

// Tool selection
for (let i = 0; i < all.children.length; i++) {
  all.children[i].addEventListener("click", function () {
    const current = document.querySelector(".bottom-list li.active");
    if (current) {
      current.classList.remove("active");
    }
    this.classList.add("active");
  });
}

// Share functionality
share.addEventListener("click", async () => {
  try {
    const shareData = {
      title: "Share this drawing",
      text: "Check out my drawing on msDraw!",
      url: window.location.href,
    };

    await navigator.share(shareData);
    console.log("Successfully shared.");
  } catch (error) {
    console.error("Error sharing:", error);
  }
});

// Function to handle the selected image from the file input
fileInput.addEventListener("change", handleImageSelect);

// Image cropping
let image;
let isDragging = false;
let startX, startY;
let cropX = 100;
let cropY = 100;
const cropWidth = 200;
const cropHeight = 200;

// Canvas drawing
let drawingData = [];

// Load saved drawing data from Local Storage, if available
loadDrawingData();

// Event listeners for mouse interactions
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
document.getElementById("cropButton").addEventListener("click", cropImage);

// Event listeners for touch interactions
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleTouchEnd);

// Function to handle the selected image from the file input
function handleImageSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const img = new Image();
  
      img.onload = function () {
        // Set the image at smaller width and height
        const smallerWidth = img.width / 2;
        const smallerHeight = img.height / 2;
        // Image at the center of the screen
        const centerX = (canvas.width - smallerWidth) / 2;
        const centerY = (canvas.height - smallerHeight) / 2;
        // Draw the image on the canvas
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, centerX, centerY, smallerWidth, smallerHeight);
      };
  
      img.src = e.target.result;
    };
  
    reader.readAsDataURL(file);
}

// Functions for image cropping and moving
function drawImageToCanvas(image) {
    const canvasWrapper = document.getElementById("canvasWrapper");
    // Draw the image on the canvas
    canvas.width = canvasWrapper.offsetWidth;
    canvas.height = canvasWrapper.offsetHeight;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
    drawCropRectangle();
}

function drawCropRectangle(event) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight); 
}

// Functions for mouse interactions
function handleMouseDown(event) {
  // ...
}

function handleMouseMove(event) {
  // ...
}

function handleMouseUp(event) {
  // ...
}

// Functions for touch interactions
function handleTouchStart(event) {
  // ...
}

function handleTouchMove(event) {
  // ...
}

function handleTouchEnd(event) {
  // ...
}

// Functions to save and load drawing data
function saveDrawingData() {
    localStorage.setItem("drawingData", JSON.stringify(drawingData));
}

function loadDrawingData() {
    const savedDrawingData = localStorage.getItem("drawingData");
    if (savedDrawingData) {
      drawingData = JSON.parse(savedDrawingData);
      redrawCanvas(); // Redraw the canvas with the loaded drawing data
    }
}

function redrawCanvas() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw each stroke from the drawing data
  drawingData.forEach((stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
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
