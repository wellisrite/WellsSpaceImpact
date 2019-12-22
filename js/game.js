var x = 0;
var tresh = 0;
var skor = 0;
var myGamePiece;
var food = [];
var tothealth = 5;
var shiphealth = 20;
var ex = [];
var bullet = [];

function startGame() {
    $("#well").hide();
    myGameArea.start();
    bg = new background("12.png");
    myGamePiece = new component(50, 30, "red", myGameArea.canvas.width / 5, myGameArea.canvas.height / 2 - 30);
    score = new createScore(0);
    health = new showHealth();
    for (var i = 0; i < 3; i++) {
        food[i] = new Food(60, 64, "green", Math.floor((Math.random() * 1100 + 1000) - 20), Math.floor((Math.random() * 670) + 100) - 20);
    }
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.id = "myCanvas";
        this.canvas.width = 1200;
        this.canvas.height = 670;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Food(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.canvas.getContext("2d");
    src = "w.png";
    this.im = new Image();
    this.im.src = src;
    this.im.onload = function () {
        ctx.drawImage(this.im, x, y);
    }
    this.update = function () {
        ctx.drawImage(this.im, this.x, this.y);
    }
}
function explosion(width, height, x, y, sarc) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.canvas.getContext("2d");
    src = "aa.png";
    ime = new Image();
    ime.src = sarc;
    ime.onload = function () {
        ctx.drawImage(ime, x, y);
    }
    this.update = function () {
        ctx.drawImage(ime, this.x, this.y);
    }
}
function showHealth(type) {
    ctx2 = myGameArea.context;
    ctx2.font = "30px arial";
    ctx2.fillStyle = "black";
    ctx2.fillText("health: 0", myGameArea.canvas.width / 14, myGameArea.canvas.height / 16);
    this.update = function () {
        ctx2.fillStyle = "white";
        ctx2.fillText("Health:" + shiphealth, myGameArea.canvas.width / 14, myGameArea.canvas.height / 16);
    }
    this.update2 = function () {
    }

}
function createScore(score1) {
    ctx2 = myGameArea.context;
    this.score1 = score1;
    ctx2.font = "30px arial";
    ctx2.fillStyle = "black";
    ctx2.fillText(score1, myGameArea.canvas.width / 14, myGameArea.canvas.height / 10);
    this.update = function () {
        ctx2.fillStyle = "white";
        ctx2.fillText("Score:" + this.score1, myGameArea.canvas.width / 14, myGameArea.canvas.height / 10);
        skor = parseInt(score.score1);
        localStorage.setItem("score", skor);
    }
    this.stop = function () {
        clearInterval(myGameArea.interval);
        ctx.font = "100px arial";
        myGameArea.clear();
        if (shiphealth <= 0) {
            aw = new explosion(100, 100, myGamePiece.x - 100, myGamePiece.y - 100, "as.png");
            aw.update();
        }
        bg.update();
        ctx.fillText("Game over", 300, 350);
        ctx.font = "30px arial";
        setInterval(this.redirect, 5000);
    }
    this.redirect = function () {
        if (localStorage.getItem("highscore") < skor) {
            localStorage.setItem("highscore", skor);
        }
        window.location = "end.html";
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    ctx = myGameArea.canvas.getContext("2d");
    src = "42.png";
    img = new Image();
    img.src = src;
    img.onload = function () {
        ctx.drawImage(img, x, y);
    }
    this.update = function () {
        ctx.drawImage(img, this.x, this.y);
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > 1200) { this.x = 1200; }
        if (this.x < 100) { this.x = 100; }
        if (this.y < 100) { this.y = 100; }
        if (this.y > 610) { this.y = 610; }
    }
    this.hitBottom = function () {
        var bottom = 610;
        if (this.y > bottom) {
            this.y = bottom;
        }

    }
    this.impactWith = function (obj) {
        var myleft = this.x;
        var myright = this.x + (this, width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var foodleft = obj.x;
        var foodright = obj.x + obj.width;
        var foodtop = obj.y;
        var foodbot = obj.y + obj.height;
        var impact = true;
        if ((mybottom < foodtop) ||
            (mytop > foodbot) ||
            (myright < foodleft) ||
            (myleft > foodright)) { impact = false; }
        return impact;
    }
    this.accelerate = function (n) {
        this.gravity = n;
    }
}
function bullette(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    ctx = myGameArea.canvas.getContext("2d");
    src = "24.png";
    imel = new Image();
    imel.src = src;
    imel.onload = function () {
        ctx.drawImage(imel, x, y);
    }
    this.update = function () {
        ctx.drawImage(imel, this.x, this.y);
    }
    this.newPos = function () {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.impactWith = function (obj) {
        var myleft = this.x;
        var myright = this.x + (this, width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var foodleft = obj.x;
        var foodright = obj.x + obj.width;
        var foodtop = obj.y;
        var foodbot = obj.y + obj.height;
        var impact = true;
        if ((mybottom < foodtop) ||
            (mytop > foodbot) ||
            (myright < foodleft) ||
            (myleft > foodright)) { impact = false; }
        return impact;
    }
    this.accelerate = function (n) {
        this.gravity = n;
    }
}
function background(src) {
    imge = new Image();
    imge.src = src;
    imge.onload = function () {
        ctx.drawImage(imge, 0, 0);
    }
    this.update = function () {
        ctx.drawImage(imge, 0, 0);
    }

}
function updateGameArea() {
    myGamePiece.gravity = 0.05;
    myGameArea.clear();
    bg.update();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -4; }
    if (myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 4; }
    if (myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -4; }
    if (myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 4; }
    if (myGameArea.keys && myGameArea.keys[32] && tresh < 1) { bullet[x] = new bullette(20, 20, myGamePiece.x + myGamePiece.width, myGamePiece.y + myGamePiece.height / 3); bullet[x].speedX = 8; x++; tresh += 1; }
    if (myGameArea.frameNo > 35) {
        tresh = 0;
        myGameArea.frameNo = 0;
    }
    for (var i = 0; i < bullet.length; i++) {
        bullet[i].x += 8;
        bullet[i].update();
    }
    for (var n = 0; n < bullet.length; n++) {
        for (var y = 0; y < food.length; y++) {
            if (bullet[n].impactWith(food[y])) {
                bullet[n].x = 1300;
                meteor = new explosion(100, 100, food[y].x, food[y].y, "aa.png");
                food[y].x = Math.floor((Math.random() * 1100 + 1000) - food[y].width);
                food[y].y = Math.floor((Math.random() * 670) + 100) - food[y].height;
                score.score1 += 1;
                if (food[y].y < 100) {
                    food[y].y = 100;
                }
                if (food[y].y > 610) {
                    food[y].y = 600;
                }
                if (food[y].x > 1300) {
                    food[y].x = 1300;
                }
                food[y].x -= 4;
                food[y].x += 1;
            }
        }
    }
    for (var i = 0; i < food.length; i++) {
        if (myGamePiece.impactWith(food[i])) {
            meteor = new explosion(100, 100, myGamePiece.x, myGamePiece.y, "aa.png");
            food[i].x = Math.floor((Math.random() * 1100 + 1000) - food[i].width);
            food[i].y = Math.floor((Math.random() * 670) + 100) - food[i].height;
            shiphealth -= 2;
            if (food[i].y < 100) {
                food[i].y = 100;
            }
            if (food[i].y > 610) {
                food[i].y = 600;
            }
            if (food[i].x > 1300) {
                food[i].x = 1300;
            }
        }
        food[i].x -= 4;
        food[1].x += 1;
        if (shiphealth <= 0) { score.stop(); }
        if (food[i].x < 100) {
            ex[i] = new explosion(76, 90, food[i].x, food[i].y, "aa.png");
            ex[i].update();
            food[i].x = Math.floor((Math.random() * 1300 + 1200) - food[i].width);
            food[i].y = Math.floor((Math.random() * 670) + 100) - food[i].height;
            tothealth -= 1;
            if (tothealth <= 0) { score.stop(); }
        }
        food[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
    health.update();
    score.update();
    myGameArea.frameNo += 1;
}