// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;
    if (this.x > 505) 
    {
       this.x = Math.random() * (-65 + 95) -95;
       this.speed = Math.random() * (70 - 35) +35;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Enemies our player must avoid
var Player = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.orig_x = x;
    this.orig_y = y;
    this.speed = speed;
}

Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
          this.y = this.orig_y; 
          this.x = this.orig_x; 
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
}

var randInt = function(min, max)
{
    return Math.random() * (max - min) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(290, 290, 10);
var allEnemies = [new Enemy(30, 60, 40), new Enemy(320, 130, 35), new Enemy(230, 210, 38), new Enemy(180, 60, 63), new Enemy(60, 130, 45), new Enemy(-10, 210, 41)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
