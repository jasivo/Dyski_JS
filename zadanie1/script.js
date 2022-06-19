var canvas = document.getElementById("dyski");
var ctx = canvas.getContext("2d");
var W = 1024;
var H = 768;
var dt = 0.020;

var N = 1000;
var discs = new Array(N);
var colours = ["red","green","blue","gray","purple","pink","lime","yellow","orange"];

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawDisc(disc){
    ctx.beginPath();
    ctx.fillStyle = disc.colour;
    ctx.arc(disc.x,disc.y,disc.r,0,2*Math.PI);
    ctx.stroke();
    ctx.fill();

    if((disc.x + disc.r + (disc.vx * dt) > W) || (disc.x - disc.r + (disc.vx * dt) < 0))
        disc.vx = -disc.vx;
    if((disc.y + disc.r + (disc.vy * dt) > H) || (disc.y - disc.r + (disc.vy * dt) < 0))
        disc.vy = -disc.vy;

    disc.x += disc.vx * dt;
    disc.y += disc.vy * dt;
}    

class Disc{
    constructor(m,r,x,y,vx,vy){
        this.m = m;
        this.r = r;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.colour = colours[randInt(0,8)];
    }
}

for(let i=0; i<N; i++)
{
    let vx,vy;
    if((randInt(0,10) % 2) == 0)
        vx = randInt(100,500);
    else
        vx = randInt(-500,-100);

    if((randInt(0,10) % 2) == 0)
        vy = randInt(100,500);
    else
        vy = randInt(-500,-100);

    discs[i] = new Disc(randInt(1,5),randInt(5,15),randInt(16,1012),randInt(16,752),vx,vy);
}

function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0; i<N; i++)
    {
        drawDisc(discs[i]);
    }
}

setInterval(draw,(dt*1000));