let leftLegX = 155;
let rightLegX = 290;
let leftLegSpeed = 1.5;
let rightLegSpeed = 3;

let leftArmY = 195;
let rightArmY = 195;
let leftArmSpeed = 2;
let rightArmSpeed = 1;

let headX = 250;
let headY = 100;
let headXSpeed = 1.2;
let headYSpeed = 1.2;

let headSize = 175;
let headSizeSpeed = 0.5;

let textSizeValue = 28;
let textSizeSpeed = 1;
let pulseCount = 0;
let growing = true;

let footerX = 20;
let footerY = 500;
let footerSpeed = 2;
let footerDirection = 0; // 0: right, 1: up, 2: left, 3: down

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(173, 216, 230);

    // --- Pulsing "Look at me!" text ---
    if (growing) {
        textSizeValue += textSizeSpeed;
        if (textSizeValue >= 40) {
            pulseCount++;
            if (pulseCount >= 5) {
                growing = false;
                pulseCount = 0;
            }
        }
    } else {
        textSizeValue -= textSizeSpeed;
        if (textSizeValue <= 28) {
            pulseCount++;
            if (pulseCount >= 5) {
                growing = true;
                pulseCount = 0;
            }
        }
    }

    fill(255, 255, 0);
    textSize(textSizeValue);
    text("Look at me!", 10, 80);

    // --- Leg bounce ---
    leftLegX += leftLegSpeed;
    rightLegX += rightLegSpeed;
    if (leftLegX > 175 || leftLegX < 135) leftLegSpeed *= -1;
    if (rightLegX > 310 || rightLegX < 270) rightLegSpeed *= -1;

    // --- Arm bounce ---
    leftArmY += leftArmSpeed;
    rightArmY += rightArmSpeed;
    if (leftArmY > 215 || leftArmY < 175) leftArmSpeed *= -1;
    if (rightArmY > 215 || rightArmY < 175) rightArmSpeed *= -1;

    // --- Head movement ---
    headX += headXSpeed;
    headY += headYSpeed;
    if (headX > 270 || headX < 230) headXSpeed *= -1;
    if (headY > 120 || headY < 80) headYSpeed *= -1;

    // --- Head size change ---
    headSize += headSizeSpeed;
    if (headSize > 200 || headSize < 150) headSizeSpeed *= -1;

    // --- Head ---
    fill(255, 218, 185);
    ellipse(headX, headY, headSize);

    // Hair
    fill(50, 25, 0);
    triangle(headX - 50, headY - 65, headX - 20, headY - 95, headX + 10, headY - 65);
    triangle(headX - 20, headY - 65, headX + 10, headY - 95, headX + 40, headY - 65);
    triangle(headX + 10, headY - 65, headX + 40, headY - 95, headX + 70, headY - 65);

    // Eyes, nose, mouth
    strokeWeight(10);
    fill(10);
    point(headX - 75, headY - 25);
    point(headX - 60, headY - 25);
    point(headX - 70, headY - 10);
    ellipse(headX - 70, headY + 35, 30, 45);

    // Body
    fill(10, 300, 120);
    rect(200, 185, 100, 150);

    // Decoration
    fill(255);
    triangle(240, 320, 250, 220, 280, 300);

    // Arms
    fill(10, 300, 120);
    rect(300, rightArmY, 145, 10);
    rect(60, leftArmY, 145, 10);

    // --- Legs: change color if touching the body ---
    let legColorL = (leftLegX + 40 >= 200 && leftLegX <= 300) ? color(255, 0, 0) : color(0, 0, 255);
    let legColorR = (rightLegX <= 300 && rightLegX + 40 >= 200) ? color(255, 0, 0) : color(0, 0, 255);
    fill(legColorL);
    rect(leftLegX, 335, 40, 200);
    fill(legColorR);
    rect(rightLegX, 335, 40, 200);

    // --- Footer Text moves in square ---
    switch (footerDirection) {
        case 0: footerX += footerSpeed; if (footerX >= 700) footerDirection = 1; break;
        case 1: footerY -= footerSpeed; if (footerY <= 400) footerDirection = 2; break;
        case 2: footerX -= footerSpeed; if (footerX <= 20)  footerDirection = 3; break;
        case 3: footerY += footerSpeed; if (footerY >= 500) footerDirection = 0; break;
    }

    fill(255, 255, 0);
    textSize(22);
    text("Jaia Kattelus", footerX, footerY);
}
