let initVal = false;
const pongRadius = 10;        
const pongcanvas = document.getElementById("pongCanvas");
const pongctx = pongcanvas.getContext("2d");

let pongx= pongcanvas.width/2
let pongy= pongcanvas.height/2        
let pongdx=2;
let pongdy=-2;
let randNum=Math.floor(Math.random()*2)

const pongPadHeight=10;
const pongPadWidth=90;
let pongPadX=(pongcanvas.width-pongPadWidth)/2

const pongPad2Height=10;
const pongPad2Width=90;
let pongPad2X=(pongcanvas.width-pongPadWidth)/2

if (randNum==1){
    pongdy=-pongdy;
}


function drawPongBall(){
    pongctx.beginPath();
    pongctx.arc(pongx, pongy, pongRadius, 0, Math.PI*2);
    pongctx.fillStyle = '#0095DD';
    pongctx.fill();
    pongctx.closePath();
}

function drawPad(){
    pongctx.beginPath();
    pongctx.rect(pongPadX, pongcanvas.height-pongPadHeight, pongPadWidth, pongPadHeight);
    pongctx.fillStyle="#0095DD";
    pongctx.fill();
    pongctx.closePath();
}

function drawPad2(){
    pongctx.beginPath();
    pongctx.rect(pongPad2X, 0, pongPad2Width, pongPad2Height);
    pongctx.fillStyle="red";
    pongctx.fill();
    pongctx.closePath();
}


function init(){
    if (initVal==false){
        
        drawPongBall();
        drawPad();
        drawPad2();
        initVal=true;
    }
    
}

function run(){
    pongctx.clearRect(0,0, pongcanvas.width, pongcanvas.height);
    drawPongBall();
    drawPad();
    drawPad2();

    

    if (pongx+pongdx>pongcanvas.width-pongRadius || pongx+pongdx<pongRadius){
        pongdx=-pongdx;

    }

    if (pongy+pongdy>pongcanvas.height-pongRadius){
        if (pongx>pongPadX && pongx<pongPadX+pongPadWidth){
            pongdy=-pongdy;
        } else {
            alert("Red Won!");
            //reload해도 공이 계속 나아가는 문제 해결
            pongdx=0;
            pongdy=0;
            location.reload();
            clearInterval(setInterval);
        }
    }

    if (pongy+pongdy<pongRadius){
        if (pongx>pongPad2X && pongx<pongPad2X+pongPad2Width){
            pongdy=-pongdy;
        } else {
            alert("Blue Won!");
            //reload해도 공이 계속 나아가는 문제 해결
            pongdx=0;
            pongdy=0;
            location.reload();
            clearInterval(setInterval);
        }
    }

    
    if (rightPressed){
        pongPadX+=7;
        if (pongPadX+pongPadWidth>pongcanvas.width){
            pongPadX=pongcanvas.width-pongPadWidth;
        }
    } else if(leftPressed){
        pongPadX-=7;
        if (pongPadX<0){
            pongPadX=0;
        }
    }

    if (rightPressed2){
        pongPad2X+=7;
        if (pongPad2X+pongPad2Width>pongcanvas.width){
            pongPad2X=pongcanvas.width-pongPad2Width;
        }
    } else if(leftPressed2){
        pongPad2X-=7;
        if (pongPad2X<0){
            pongPad2X=0;
        }
    }

    pongx+=pongdx;
    pongy+=pongdy;
    
}
function play_pingpong(){
    
    init();
    setInterval(run, 10);
    
    
}