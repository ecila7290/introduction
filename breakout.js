
const canvas= document.getElementById("myCanvas");
const ctx=canvas.getContext("2d");

//* player 1 관련 변수

//공의 반지름, xy좌표, 이동하는 px수
const ballRadius=10;
let x = canvas.width/2;
let y = canvas.height-30;

let dx=2;
let dy=-2;
//막대 폭, 높이, x좌표
const paddleHeight=10;
const paddleWidth=75;
let paddleX=(canvas.width-paddleWidth)/2;
//키보드 기본 상태=누르지 않음
let rightPressed=false;
let leftPressed=false;
//벽돌 기본정보
let brickRowCount = 5;
let brickColumnCount = 7;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 20;

//player 2 관련 변수

//ball2 변수 (반지름은 그대로 사용)
let x2 = canvas.width/2;
let y2 = canvas.height-30;
let dx2=-2;
let dy2=-2;

//paddle2 변수
let paddleX2=paddleX-(paddleWidth/2)

//player2 키보드 기본 상태=누르지 않음
let rightPressed2=false;
let leftPressed2=false;


//점수
let score = 0;
//벽돌 생성
let bricks=[];
for(let c=0; c<brickColumnCount;c++){
    bricks[c]=[];
    for (let r=0; r<brickRowCount;r++){
        bricks[c][r] = {x:0, y:0, status:1};
    }
}



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

document.addEventListener('keydown', keyDownHandler2, false);
document.addEventListener('keyup', keyUpHandler2, false);


function keyDownHandler(e){
    if (e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed=true;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed=true;
    }
}

function keyUpHandler(e){
    if (e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed=false;
    }
    else if (e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed=false;
    }
}

function keyDownHandler2(e){
    if (e.key == 'd' || e.key == 'D'){
        rightPressed2=true;
    }
    else if (e.key == 'a' || e.key == 'A'){
        leftPressed2=true;
    }
}

function keyUpHandler2(e){
    if (e.key == 'd' || e.key == 'D'){
        rightPressed2=false;
    }
    else if (e.key == 'a' || e.key == 'A'){
        leftPressed2=false;
    }
}

function collisionDetection(){
    for(let c=0; c<brickColumnCount; c++){
        for (let r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            //calculation
            if (b.status==1){
                if (x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    dy=-dy;
                    b.status=0;
                    score+=100;
                    if (score==(brickRowCount*brickColumnCount)*100){
                        alert("CONGRATULATIONS!!");
                        document.location.reload();
                        clearInterval(interval);
                        
                    }
                }
                
            }
        }
    }
}

function collisionDetection2(){
    for(let c=0; c<brickColumnCount; c++){
        for (let r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            //calculation
            if (b.status==1){
                if (x2>b.x && x2<b.x+brickWidth && y2>b.y && y2<b.y+brickHeight){
                    dy2=-dy2;
                    b.status=0;
                    score+=100;
                    if (score==(brickRowCount*brickColumnCount)*100){
                        alert("CONGRATULATIONS!!");
                        document.location.reload();
                        clearInterval(interval);
                        
                    }
                }
                
            }
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}


function drawBall2(){
    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle2(){
    ctx.beginPath();
    ctx.rect(paddleX2, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle="red";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for (let c=0; c<brickColumnCount; c++){
        for (let r=0; r<brickRowCount; r++){
            if (bricks[c][r].status==1){
                let brickX= (c * (brickWidth+brickPadding)) + brickOffsetLeft;
                let brickY= (r * (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle="#0095DD";
                ctx.fill();
                ctx.closePath();
            }
            
        }
        
    }
}

function drawScore(){
    ctx.font= "16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}



function draw(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    if (x+dx>canvas.width-ballRadius || x+dx<ballRadius){
        dx=-dx;

    }
    if (y+dy<ballRadius){
        dy=-dy;   
    } else if(y+dy>canvas.height-ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy=-dy;
        }
        else{
            alert("GAME OVER");
            //reload해도 공이 계속 나아가는 문제 해결
            dx=0;
            dy=0;
            document.location.reload();
            clearInterval(interval);
        }
    }
 
    if (rightPressed){
        paddleX+=7;
        if (paddleX+paddleWidth>canvas.width){
            paddleX=canvas.width-paddleWidth;
        }
    } else if(leftPressed){
        paddleX-=7;
        if (paddleX<0){
            paddleX=0;
        }
    }
    
    
    x+=dx;
    y+=dy;
    
}   


function draw2(){
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawBall2();
    drawPaddle();
    drawPaddle2();
    drawScore();
    collisionDetection();
    collisionDetection2();
    
    if (x+dx>canvas.width-ballRadius || x+dx<ballRadius){
        dx=-dx;

    }
    if (y+dy<ballRadius){
        dy=-dy;   
    } else if(y+dy>canvas.height-ballRadius){
        if(x>paddleX && x<paddleX+paddleWidth){
            dy=-dy;
        }
        else{
            alert("GAME OVER")
            //reload해도 공이 계속 나아가는 문제 해결
            dx=0;
            dy=0;
            document.location.reload();
            clearInterval(interval);

        }
    }

    if (x2+dx2>canvas.width-ballRadius || x2+dx2<ballRadius){
        dx2=-dx2;

    }
    if (y2+dy2<ballRadius){
        dy2=-dy2;   
    } else if(y2+dy2>canvas.height-ballRadius){
        if(x2>paddleX2 && x2<paddleX2+paddleWidth){
            dy2=-dy2;
        }
        else{
            alert("GAME OVER");
            //reload해도 공이 계속 나아가는 문제 해결
            dx2=0;
            dy2=0;
            document.location.reload();
            clearInterval(interval);
        }
    }
 
    if (rightPressed){
        paddleX+=7;
        if (paddleX+paddleWidth>canvas.width){
            paddleX=canvas.width-paddleWidth;
        }
    } else if(leftPressed){
        paddleX-=7;
        if (paddleX<0){
            paddleX=0;
        }
    }
    
    if (rightPressed2){
        paddleX2+=7;
        if (paddleX2+paddleWidth>canvas.width){
            paddleX2=canvas.width-paddleWidth;
        }
    } else if(leftPressed2){
        paddleX2-=7;
        if (paddleX2<0){
            paddleX2=0;
        }
    }
    
    x+=dx;
    y+=dy;
    
    x2+=dx2;
    y2+=dy2;
    
}   



//requestAnimationFrame()을 사용하면 움직임은 부드러워지지만, reload()가 제대로 작동하지 않음    


function game_start(){

    let inverval= setInterval(() => {
        draw(); 
     }, 10);
    
}
function game_start_coop(){
    
    let inverval= setInterval(() => {
        draw2(); 
     }, 10);
    
    
}
