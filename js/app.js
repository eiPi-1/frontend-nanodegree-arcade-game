var MovingSprite = function(x, y, speed, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Draw the sprite on the screen, required method for game
MovingSprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    MovingSprite.call(this, x, y, speed, 'images/enemy-bug.png');
}

Enemy.prototype = Object.create(MovingSprite.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    // if enemy reached the end of the canvas
    // loop back from some random distance before
    // beginning of the canvas
    if (this.x > 505) 
    {
       this.x = randInt(-65, -95);
       this.speed = randInt(70, 35);
    }
}

// Enemies our player must avoid
var Player = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    MovingSprite.call(this, x, y, speed, 'images/char-boy.png');    
    this.sprite_id = 0;
    this.sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    this.orig_x = x;
    this.orig_y = y;
    this.points = 0;
    this.gems = 0;
}

Player.prototype = Object.create(MovingSprite.prototype);

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.textAlign = "left";
    ctx.fillStyle = 'white';
    ctx.fillRect( 5, 5, 150, 40);
    ctx.fillStyle = 'black';
    ctx.font = " 22px sans-serif";
    ctx.fillText('points : '.concat(this.points.toString()), 10, 30);
}

Player.prototype.reset = function() {
    this.x = this.orig_x; 
    this.y = this.orig_y; 
}

Player.prototype.gameOver = function() {
    this.points = 0;
    this.x = this.orig_x; 
    this.y = this.orig_y; 
}

Player.prototype.changeHero = function() {
    this.sprite_id++;
    this.sprite_id = this.sprite_id % this.sprites.length;
    this.sprite = this.sprites[this.sprite_id];
}

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == 'left')
    {
        if (this.x - this.speed > 5)
        {
            this.x = this.x - this.speed;
        }
        else
        {
          this.x = 5;  
        }
    } 
    else if (allowedKeys == 'right')
    {
        if (this.x + this.speed < 440)
        {
            this.x = this.x + this.speed;
        }
        else
        {
          this.x = 435;  
        }
    }
    else if (allowedKeys == 'up')
    {
        if (this.y - this.speed > 10)
        {
            this.y = this.y - this.speed;
        }
        else
        {
          // reached the water -> reset and give point
          this.points++;
          this.reset()
        }
            
    }
    else if (allowedKeys == 'down')
    {
        if (this.y + this.speed < 420)
        {
            this.y = this.y + this.speed;
        }
        else
        {
          this.y = 430;  
        }
    }
    else if (allowedKeys == 'changeHero')
    {
        this.sprite_id++;
        this.sprite_id = this.sprite_id % this.sprites.length;
        this.sprite = this.sprites[this.sprite_id];
    }
}

var randInt = function(min, max)
{
    return Math.random() * (max - min) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 350, 10);
var allEnemies = [new Enemy(30, 30, 40), new Enemy(320, 150, 35), new Enemy(230, 190, 38), new Enemy(160, 65, 63), new Enemy(60, 100, 45), new Enemy(-10, 220, 41)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'changeHero'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
