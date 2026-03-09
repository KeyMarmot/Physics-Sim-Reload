
console.log('Script Starting...')
const canvas = document.getElementById('canvas');
const Changer = document.getElementById('AttChange');
const ctx = canvas.getContext('2d');
const hAccel = document.getElementById('hAccel');
const vAccel = document.getElementById('vAccel');
const hspeed = document.getElementById('hSpeed');
const vspeed = document.getElementById('vSpeed');
const color = document.getElementById('color');
const size = document.getElementById('size');
const startPosx = document.getElementById('startingPosx');
const startPosy = document.getElementById('startingPosy')

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

//circle definitions
let circle = {
    x: 32, 
    y: 32,
    radius: 16,
    haccelerate: .25,
    vaccelerate: 1,
    hspeed: 1,
    vspeed: 1,
    fill: 'green'
}

//Add lookahead
//movement code & instructions
function moveWithBounce(circle){
    circle.hspeed += circle.haccelerate;
    circle.vspeed += circle.vaccelerate;
    circle.x += circle.hspeed;
    circle.y += circle.vspeed;
    console.log(circle.vspeed)

    //speed cap
    if (circle.hspeed >= 5 || circle.hspeed <= -5){
        circle.haccelerate = 0;
    }
    //bouncing rules
    if (circle.x-circle.radius < 0 || circle.x+circle.radius > canvas.width){
        circle.hspeed *= -1;
    }

    if (circle.x-circle.radius < 0 || circle.x+circle.radius > canvas.width){
        circle.haccelerate *= -1;
    }

    if (circle.y-circle.radius < 0 || circle.y+circle.radius > canvas.height){
        circle.vspeed *= -.99;
        circle.y = canvas.height-circle.radius
    }

    if (circle.vspeed < .45 && circle.vspeed > -.45){
        circle.vspeed = 0;
        circle.vaccelerate = 0;
    }
}


function changeAttributes(circle){
    circle.vaccelerate = Number(vAccel.value);
    if (vAccel.value == ""){
        circle.vaccelerate = 1
    }
    circle.haccelerate = Number(hAccel.value);
    if (hAccel.value == ""){
        circle.haccelerate = .25
    }
    circle.vspeed = Number(vspeed.value);
    if (vspeed.value == ""){
        circle.vspeed = 1
    }
    circle.hspeed = Number(hspeed.value);
    if (hspeed.value == ""){
        circle.hspeed = 1
    }
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





