//
// Written by David Jan
//

function Close(){
    $('.row').remove();
}

function SuperPong(){
    $('body').append(   '<div class="row cssbox" >'+
                            '<span class="cssbox_full" style="opacity:1;">'+
                            '</span>'+
                            '<a class="cssbox_close" href="javascript:Close()" style="visibility: visible;"></a>'+
                        '</div>');

    /*let body = document.getElementsByTagName("body");
    let row = document.createElement("div");
    row.style = "display: inline-block; z-index:999999; position:fixed; top: 0; width:100%; height:100%; background-color: rgba(0,0,0,0.8); pointer-events:none; cursor: default;";
    row.classList = "row";*/
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style = "position:fixed; margin: 0; margin-right: -50%; transform: translate(-50%, -50%); paddint: 0; top: 50%; left: 50%; width:640px; height:480px; image-rendering: pixelated; image-rendering: crisp-edges; margin: auto; border:1px solid green";
    /*row.appendChild(canvas);
    document.body.appendChild(row);*/

    $('.cssbox_full').append(canvas);
    var ctx = canvas.getContext("2d");

    let rainbow = ['#9400D3', '#0000DD', '#00FF00', '#FFFF00', '#FF0000'];
    let Key = [{'a':false}, {'d':false}]
    let bord = {'x':Math.floor(canvas.width/2-25),'y':140, 'sx':50, 'sy':5};
    let ball = {'x':Math.floor(canvas.width/2),'y':100, 'sx':3, 'sy':2, 'mx':RandOneOrnOne(), 'my':RandOneOrnOne()};
    let level=[]
    let lvlsize=[5,14]
    let state = 1;

    for(let i = 0; i < lvlsize[1]; i ++){
        for(let j = 0; j < lvlsize[0]; j ++){
            level.push({'x':i* 20 + 15,'y':j* 10 + 10, 'sx':15, 'sy':5, 'color':rainbow[j]});
        }
    }

    let gameloop = setInterval(onTimerTick, 16);
    function onTimerTick() {
        CLS();
        Draw();
        switch(state){
            case 1: //Start
                ctx.font = "30px Arial";
                ctx.fillText("Super Pong", 75, 100);
                ctx.font = "12px Arial";
                ctx.fillText("Press Space to Start", 95, 120);
                clearInterval(gameloop);
            break;

            case 2: //Run
                GameUpdate();
            break;

            case 3: //Win
                ctx.font = "30px Arial";
                ctx.fillText("You Win", 90, 100);
                ctx.font = "12px Arial";
                ctx.fillText("Press Space to Restart", 90, 120);
                clearInterval(gameloop);
            break;

            case 4: //Lose
                ctx.font = "30px Arial";
                ctx.fillText("You Lose", 90, 100);
                ctx.font = "12px Arial";
                ctx.fillText("Press Space to Restart", 90, 120);
                clearInterval(gameloop);
            break;
        }
    }

    function CLS(){
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function Draw(){
        //Bord
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(bord.x, bord.y, bord.sx, bord.sy);

        //Bricks
        for(let i = level.length-1; i >= 0; i-- ){
            ctx.fillStyle = level[i].color;
            ctx.fillRect(level[i].x, level[i].y, level[i].sx, level[i].sy);
        }

        //Ball
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(ball.x, ball.y, ball.sx, ball.sy);
    }

    function GameUpdate(){
        //Move
        ball.x += ball.mx;
        ball.y += ball.my;

        if(Key.a){
            bord.x -= 5;
        }
        else if(Key.d){
            bord.x += 5;
        }

        //Wall Bounce
        if(ball.x == 0 || (ball.x+ball.sx) == canvas.width){
            ball.mx *= -1;
        }

        if(ball.y == 0){
            ball.my *= -1;
        }

        if(bord.x < 0){
            bord.x = 0;
        }

        if(bord.x + bord.sx > canvas.width){
            bord.x = canvas.width - bord.sx;
        }

        //Lose
        if((ball.y+ball.sy) == canvas.height){
            state = 4;
        }

        //Win
        if(level.length == 0){
            state = 3;
        }
        
        //Brick
        for(let i = level.length-1; i >= 0; i--){
            
            //top and bottom
            if((ball.x < (level[i].x + level[i].sx) && (ball.x + ball.sx) > level[i].x && (ball.y + ball.sy) == level[i].y)||
                (ball.x < (level[i].x + level[i].sx) && (ball.x + ball.sx) > level[i].x && ball.y == (level[i].y + level[i].sy))){
                ball.my *= -1;
                level.splice(i,1);
                continue;
            }

            //left and right
            if((ball.x == (level[i].x + level[i].sx) && ball.y < (level[i].y + level[i].sy) && (ball.y + ball.sy) > level[i].y)||
                ((ball.x + ball.sx) == level[i].x && ball.y < (level[i].y + level[i].sy) && (ball.y + ball.sy) > level[i].y)){
                ball.mx *= -1;
                level.splice(i,1);
                continue;
            }
        }

        //Bord
        //top and bottom 
        if((ball.x < (bord.x + bord.sx) && (ball.x + ball.sx) > bord.x && (ball.y + ball.sy) == bord.y)||
            (ball.x < (bord.x + bord.sx) && (ball.x + ball.sx) > bord.x && ball.y == (bord.y + bord.sy))){
            ball.my *= -1;
        }

        //left
        if((ball.x < (bord.x + 20) && (ball.x + ball.sx) > bord.x && (ball.y + ball.sy) == bord.y)||
            (ball.x < (bord.x + 20) && (ball.x + ball.sx) > bord.x && ball.y == (bord.y + bord.sy))){
            ball.mx = -1;
        }

        //right
        if((ball.x < (bord.x + bord.sx) && (ball.x + ball.sx) > (bord.x + (bord.sx-20)) && (ball.y + ball.sy) == bord.y)||
            (ball.x < (bord.x + bord.sx) && (ball.x + ball.sx) > (bord.x + (bord.sx-20)) && ball.y == (bord.y + bord.sy))){
            ball.mx = 1;
        }


        //left and right
        if((ball.x == (bord.x + bord.sx) && ball.y < (bord.y + bord.sy) && (ball.y + ball.sy) > bord.y)||
            ((ball.x + ball.sx) == bord.x && ball.y < (bord.y + bord.sy) && (ball.y + ball.sy) > bord.y)){
            ball.mx *= -1;
        }
    }

    function Reset(){
        bord = {'x':Math.floor(canvas.width/2-25),'y':140, 'sx':50, 'sy':5};
        ball = {'x':Math.floor(canvas.width/2),'y':100, 'sx':3, 'sy':2, 'mx':RandOneOrnOne(), 'my':RandOneOrnOne()};
        level=[]
        state = 1;

        for(let i = 0; i < lvlsize[1]; i ++){
            for(let j = 0; j < lvlsize[0]; j ++){
                level.push({'x':i* 20 + 15,'y':j* 10 + 10, 'sx':15, 'sy':5, 'color':rainbow[j]});
            }
        }
    }

    function RandOneOrnOne(){
        var y = Math.random();
        if(y<0.5){
            y = -1;
        }
        else{
            y = 1;
        }
        return y;
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'a') {
            Key.a = true;
        }
        if (event.key === 'd') {
            Key.d = true;
        }
        if (event.keyCode === 37) {
            Key.a = true;
        }
        if (event.keyCode === 39) {
            Key.d = true;
        }
        if (event.keyCode === 32) {
            if(state==1){
                state=2;
                gameloop = setInterval(onTimerTick, 16);
            }
            else if(state==3 ||state==4){
                Reset();
                gameloop = setInterval(onTimerTick, 16);
            }
        }
    });

    document.addEventListener('keyup', function (event) {
        if (event.key === 'a') {
            Key.a = false;
        }
        if (event.key === 'd') {
            Key.d = false;
        }
        if (event.keyCode === 37) {
            Key.a = false;
        }
        if (event.keyCode === 39) {
            Key.d = false;
        }
    });
};