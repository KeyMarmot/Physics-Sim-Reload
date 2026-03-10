console.log('Script Starting...')
const canvas = document.getElementById('canvas');
const Changer = document.getElementById('AttChange');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const size = document.getElementById('size');
const startPosx = document.getElementById('startingPosx');
const startPosy = document.getElementById('startingPosy');
const speed = document.getElementById('Speed');
const direction = document.getElementById("StartingDirection");
let dx = 0;
let dy=0;

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keydown', changeAttributes)
    if (changeAttributes.key === 'enter'){
        changeAttributes.preventDefault();
        Changer.click;
}

function handleKeyPress(e){
    console.log(e.key);
}

function drawCircle(x, y, radius, fill, startAngle=0, endAngle=360){
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
}

let circle = {
    speed: 2,
    x: 32, 
    y: 32,
    radius: 16,
    fill: 'green',
    direction: 7*Math.PI/4
}

let dxx = 10;
let dyy = 10;

function moveWithBounce(circle){
    //console.log(dy)
    let dx = (circle.speed*Math.cos(circle.direction))*dxx;
    let dy = (circle.speed*Math.sin(circle.direction))*dyy;
    circle.x += dx;
    circle.y += dy;

    //bounce rules
    if(circle.x-circle.radius<0 || circle.x+circle.radius > canvas.width){
        dxx *= -1;
    }

    if (circle.y-circle.radius < 0 || circle.y+circle.radius > canvas.height){
        dyy *= -1;
    }
}
function changeAttributes(circle){
    circle.radius = Number(size.value);
    if (size.value == ""){
        circle.radius = 16
    }

    circle.x = Number(startPosx.value);
    if (startPosx.value == ""){
        circle.x = 32
    }

    circle.y = Number(startPosy.value);
    if (startPosy.value == ""){
        circle.y = 32
    }

    circle.fill = color.value;
    if (color.value == ""){
        circle.fill = 'green'
    }

    circle.direction = direction.value;
    if (direction.value == ''){
        circle.direction = 7*Math.PI/4
    }

    circle.speed = speed.value;
    if (speed.value ==''){
        circle.speed = 2
    }
    console.log(circle)
}

function drawLoop(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //update
    moveWithBounce(circle);
    //draw objects
    drawCircle(circle.x, circle.y, circle.radius, circle.fill);
    //call drawLoop
    requestAnimationFrame(drawLoop);
}

Changer.onclick = () => changeAttributes(circle);

drawLoop();
