// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tool icons
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

// Tool event listeners
select.addEventListener("click", () => {
  canvas.style.cursor = "default";
});

draw.addEventListener("click", () => {
  canvas.style.cursor = "crosshair";
});

text.addEventListener("click", () => {
  canvas.style.cursor = "text";
});

note.addEventListener("click", displayNote)

arrowUp.addEventListener("click", drawArrow)

eraser.addEventListener("click", eraserFunction)

picture.addEventListener("click", () => {
  fileInput.click();
});

// Handle tool selection (active state)
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

// Add an input element of type "file" to the HTML, hidden from the user's view. (Done)
// Trigger the click event of the hidden input when the picture icon is clicked.
fileInput.addEventListener("change", handleImageSelect);

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


// Ability to add a note to the canvas.
function displayNote() {
  const note = document.createElement("textarea");
  note.classList.add("note");
  note.style.position = "absolute";
  note.style.left = "50%";
  note.style.top = "50%";
  note.style.transform = "translate(-50%, -50%)";
  note.style.width = "200px";
  note.style.height = "200px";
  note.style.border = "1px solid pink";
  note.style.borderRadius = "10px";
  note.style.padding = "10px";
  note.style.resize = "none";
  note.style.outline = "none";
  note.style.fontFamily = "sans-serif";
  note.style.fontSize = "12px";
  note.style.overflow = "hidden";
  note.style.zIndex = "100";
  note.style.backgroundColor = "pink";
  note.style.color = "black";
  note.style.opacity = "0.9";
  note.style.textAlign = "center";
  note.style.lineHeight = "1.5";
  note.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
  note.style.cursor = "move";
  note.style.userSelect = "none";

  note.addEventListener("mousedown", function (e) {
    let shiftX = e.clientX - note.getBoundingClientRect().left;
    let shiftY = e.clientY - note.getBoundingClientRect().top;

    note.style.position = "absolute";
    note.style.zIndex = 1000;
    document.body.append(note);

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
      note.style.left = pageX - shiftX + "px";
      note.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    note.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", onMouseMove);
      note.onmouseup = null;
    });
  });

  note.ondragstart = function () {
    return false;
  };

  note.addEventListener("dblclick", function () {
    note.remove();
  });



  document.body.append(note);
}


// Ability to add an arrow to the canvas.
function drawArrow() {
  canvas.addEventListener("mousedown", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    let width = 0;
    let height = 0;

    canvas.addEventListener("mousemove", draw);

    function draw(e) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      width = e.clientX - x;
      height = e.clientY - y;
      // Make the arrow smaller in size
      width = width / 2;
      height = height / 2;
      drawArrowhead(x, y, width, height);
    }

    canvas.addEventListener("mouseup", function () {
      canvas.removeEventListener("mousemove", draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawArrowhead(x, y, width, height);
    });

    function drawArrowhead(x0, y0, x1, y1) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.closePath();
      ctx.stroke();

      let angle = Math.atan2(y1 - y0, x1 - x0);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - 10 * Math.cos(angle - Math.PI / 6),
        y1 - 10 * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        x1 - 10 * Math.cos(angle + Math.PI / 6),
        y1 - 10 * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();
    }
  });
}























// Add more functionality for different shapes and tools as needed.
// Ability to add text to the canvas.

// Ability to add a square to the canvas.


// Ability to add an angle to the canvas.
// Ability to add a line to the canvas.
// Ability to add a circle to the canvas.
// Ability to add a triangle to the canvas.
// Ability to add a heart to the canvas.
