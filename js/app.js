/*
* module: app.js
* author: Mariyan Stoyanov
* date: 8/20/2015
*
* This module contains code that describes objects and their properties and fuctionality.
* These object are used and are visualised by the engine module. Together the two modules
* form the basis for the implementation of working version of the classical Frogger game.
*/

"use strict";
var MovingSprite = function(x, y, speed, sprite) {
    /* Abstract object used as a basis for the different
    * visual object/sprites used in the game. That is
    * a basis for every object to be drawn on the canvas.
    * Each object on the canvas will have a x and y position,
    * link to an image (sprite) and speed of movement.
    */
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Declaring the constructor
MovingSprite.prototype.constructor = MovingSprite;

// Draw the sprite on the screen, required method for game
// Fallback lookup
MovingSprite.prototype.render = function() {
    //console.log('rendering enemy');
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the sprite on the screen, required method for game
MovingSprite.prototype.update = function() {
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    MovingSprite.call(this, x, y, speed, 'images/enemy-bug.png');
};

Enemy.prototype = Object.create(MovingSprite.prototype);
// Declaring the constructor
Enemy.prototype.constructor = Enemy;

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
    if (this.x > 505) {
       this.x = randInt(-65, -95);
       this.speed = randInt(70, 35);
    }
};

// Enemies our player must avoid
var Gem = function(time, tick) {
    // The gem is an object which the user strives to pick
    // the gam saves the user if hit by a bug.
    // time and tick define how long the gem will
    // stay at its place before disappearing
    MovingSprite.call(this, randInt(20, 460), randInt(20, 240), 0, 'images/Gem Green.png');

    this.time = time;
    this.clock = 0;
    this.tick = tick;
    this.visible = false;
};
Gem.prototype = Object.create(MovingSprite.prototype);
// Declaring the constructor
Gem.prototype.constructor = Gem;

Gem.prototype.update = function(dt) {
    // Similarly to enemy here dt helps to make
    // the time the gem stays visible independen of
    // computer cpu clock time.

    if (this.visible === true){
        this.clock = this.clock + this.tick * dt;

        if (this.clock > this.time) {
           this.clock = 0;
           this.visible = false;
        }
    } else {
        var gem_true = Math.round(randInt(0, 100));
        if (gem_true == 83) {
            this.visible = true;
            this.x = randInt(20, 460);
            this.y = randInt(20, 240);
        }
    }
};

// Draw the sprite on the screen, required method for game
// Fallback lookup
Gem.prototype.render = function() {
    if (this.visible === true){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Gem.prototype.disappear = function() {
    this.visible = false;
    this.x = -100;
    this.y = -100;
};


// Enemies our player must avoid
var Player = function(x, y, speed_x, speed_y) {
    /* This class is a representation of the object
    * the user is playing with.
    */
    MovingSprite.call(this, x, y, 0, 'images/char-boy.png');    
    this.sprite_id = 0;
    // The user can choose from a number of characters
    this.sprites = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    this.sprite_name = ['Boy', 'Cat Girl', 'Horn Girl', 'Pink Girl', 'Princess'];
    this.orig_x = x;
    this.orig_y = y;
    this.speed_x = speed_x;
    this.speed_y = speed_y;
    this.speed_x_orig = speed_x;
    this.speed_y_orig = speed_y;
    this.points = 0;
    this.gems = 0;
};

Player.prototype = Object.create(MovingSprite.prototype);
// Declaring the constructor
Player.prototype.constructor = Player;

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // Draw the player score on top right corner of the canvas
    ctx.textAlign = "left";
    ctx.fillStyle = 'white';
    ctx.fillRect( 0, 0, 500, 50);
    ctx.fillStyle = 'black';
    ctx.font = " 22px sans-serif";
    ctx.fillText('points : '.concat(this.points.toString()).concat(' gems : ').concat(this.gems.toString()).concat(' hero : ').concat(this.sprite_name[this.sprite_id]), 10, 30);
};

Player.prototype.reset = function() {
    // Reset the player character to the starting position
    this.x = this.orig_x; 
    this.y = this.orig_y; 
};

Player.prototype.gameOver = function() {
    // Reset player position and score
    if (this.gems > 0){
        this.gems--;
        this.x = this.orig_x; 
        this.y = this.orig_y;
    } else {
        this.points = 0;
        this.x = this.orig_x; 
        this.y = this.orig_y;
    } 
};

Player.prototype.addHP = function() {
    // Reset player position and score
    this.gems++;
};

Player.prototype.changeHero = function() {
    // Switch the sprite depicting the player character
    this.sprite_id++;
    this.sprite_id = this.sprite_id % this.sprites.length;
    this.sprite = this.sprites[this.sprite_id];

    if (this.sprite_id == 1){
        this.speed_x = 15;
        this.speed_y = 15;
    } else{
        this.speed_x = this.speed_x_orig;
        this.speed_y = this.speed_y_orig;
    }

};

Player.prototype.handleInput = function(allowedKeys) {
    // this function describes how to reach to each key stroke event
    if (allowedKeys == 'left'){
        if (this.x - this.speed > 5){
            this.x = this.x - this.speed_x;
        } else{
          this.x = 5;  
        }
    }  else if (allowedKeys == 'right'){
        //console.log(this.sprite_id);
        //console.log(this.speed_x);
        if (this.x + this.speed < 400){
            this.x = this.x + this.speed_x;
        } else{
          this.x = 400;  
        }
    } else if (allowedKeys == 'up'){
        if (this.y - this.speed > 30){
            this.y = this.y - this.speed_y;
        } else{
          // reached the water -> reset position and give point
          this.points++;
          this.reset();
        }
            
    } else if (allowedKeys == 'down'){
        if (this.y + this.speed < 420){
            this.y = this.y + this.speed_y;
        } else{
          this.y = 430;  
        }
    } else if (allowedKeys == 'changeHero'){
        this.changeHero();
    }
};

var randInt = function(min, max){
    // this is a helper function that returns
    // random ints in range [min, max)
    return Math.random() * (max - min) + min;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 350, 101, 83);
var gems = [new Gem(80, 8)];
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
