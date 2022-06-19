var canvas = document.getElementById("dyski");
var ctx = canvas.getContext("2d");
var W = 1024;
var H = 768;

var N = 30;
var discs = new Array(N);
var colours = ["red","green","blue","gray","purple","pink","lime","yellow","orange"];
var dt = 0.02;

// lepkosc wody w 25 stopniach
var lepkosc = 0.89 * Math.pow(10,-10);

function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min,max) {
    return Math.random() * (max - min) + min;
};

function drawX() {
    ctx.beginPath();

    ctx.moveTo(0, 650);
    ctx.lineTo(1024, 650);

    ctx.stroke();
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

    //let aero_F = 6 * Math.PI * disc.r * lepkosc * Math.sqrt(Math.pow(disc.vx,2)+Math.pow(disc.vy,2));

    //let Fx = (disc.vx/(Math.sqrt(Math.pow(disc.vx,2)+Math.pow(disc.vy,2)))) * aero_F;
    //let Fy = (disc.vy/(Math.sqrt(Math.pow(disc.vx,2)+Math.pow(disc.vy,2)))) * aero_F;

    let Fx = 6 * Math.PI * disc.r * lepkosc * disc.vx;
    let Fy = 6 * Math.PI * disc.r * lepkosc * disc.vy;

    if (disc.y > 650)
    {
        disc.ax = Fx/disc.m;
        disc.ay = Fy/disc.m;

        disc.vx -= disc.ax * dt;
        disc.vy -= disc.ay * dt;
    }

    drawX();
}    

class Disc{
    constructor(r,x,y,vx,vy){
        this.m = r * Math.pow(10,-9);
        this.r = r;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ax = 0;
        this.ay = 0;
        this.colour = colours[randInt(0,8)];
    }
}

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
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

        discs[i] = new Disc(randInt(5,15),randInt(16,1012),randInt(16,752),vx,vy);
}

var punkt = new Point(W/2,H/2);

function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0; i<N; i++)
    {
        drawDisc(discs[i]);
    }
}

setInterval(draw,(dt*1000));