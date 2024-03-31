# Starstream-Striker

## [Play the Game!](https://jinishakheni.github.io/Starstream-Striker/)

![Logo](https://jinishakheni.github.io/Starstream-Striker/images/logo.png)

## Description

Starstream-Striker is the game where you pilot your warship and navigate through space, blasting asteroids, enemy warship and deep space creatures in this thrilling arcade adventure. Each successful blast earns you 1 point. The game concludes when your warship sustains a maximum of 3 hits from obstacles. After the game ends, a score is calculated based on the amount of blast.

## Main Functionalities

- Player can move warship using arrow keys(Up, Down, Right, Left).
- Player can destroy enemy warship by 4 bullet hits, deep space creatures by 3 bullet hits and asteroids by 2 bullet hits.
<!-- - Enemy ships and asteroids will be comming from top, while space creature's trajectory is defined from the side. -->
- Enemy ships and asteroids approch player from the top of the screen from random locations and random frequencies.
- Space creature's trajectory is defined from the side of the screen from random locations and random frequencies.
- Enemy ship will randomly fire bullets.
- Each successful blast of obstacles increases 1 point.
- Player will have 3 lives. Each life is reduced after hit by any obstacle or blast.
- Random power up card will come from top, which helps player by increasing fire rate in three different forms:- Gold Coin increasing just bullet speed, Magic card by firing 2 bullets at the same time and parallely increasing the bullet speed, Diamond by firing 3 bullets at the same time.
- The game difficulty increases as the game progresses. This changes both the moving speed of warship and frequency of obstacles.
- Game score is calculated based on the amount of obstacles destroyed.
- Top 8 high-Scores are tracked locally with a player name and score.

# Backlog Functionalities

- Consider game play time to calculate end score.
- Adding a boss fight when a time is reached.
- Add enemy warship with different trajectory.

## Technologies used in this game:

- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Classes
- Local Storage
- JS Audio() and JS Image()
- Superclasses and subclasses

# States

- Start Screen
- Game Screen
- Game Over Screen

# Proyect Structure

## app.js

- Start eventListener()
- Restart eventListener()
- Keydown eventListener()
- Keyup eventListener()
- toggleMute()

## Game.js

- Game()
  - this.introScreen
  - this.inputField
  - this.playerName
  - this.volume
  - this.gameScreen
  - this.scoreDisplay
  - this.lifeDisplay
  - this.endScreen
  - this.endScore
  - this.endMessage
  - this.highScoreList
  - this.highScore
  - this.player
  - this.obstacles
  - this.bullets
  - this.powers
  - this.score
  - this.life
  - this.gameIsOver
  - this.gameIntervalId;
  - this.gameLoopFrecuency
  - this.currentBulletFrame
  - this.currentObstacleFrame
  - this.currentPowerFrame
  - this.bulletSpeed
  - this.bulletSpeedFlag
  - this.bulletSpeedTimeLimit
  - this.boosterCount
  - this.boosterCountFlag
  - this.boosterCountTimeLimit
  - this.flickerPlayer
  - this.flickerPlayerTime
  - this.playerSpeedTimeInterval
  - this.obstaclesFrequency
  - this.explosionAudio
  - this.collisionAudio
  - this.bulletAudio
  - this.powerUpAudio
  - this.gameOverAudio
  - this.obstacleCollection
  - this.powerCardCollection
- startGame()
- restartGame()
- renderBullets()
- renderPowerCard()
- handleHighScore()
- endGame()
- animateGame()

## Player.js

- Player()
  - this.gameScreen
  - this.height
  - this.width
  - this.left
  - this.top
  - this.speed
  - this.directionX
  - this.directionY
  - this.element
- renderPlayer()
- movePlayer()
- didCollide(obstacle)

## PlayerBullet

- PlayerBullet()
  - this.gameScreen
  - this.player
  - this.height
  - this.width
  - this.top
  - this.left
  - this.element
  - this.remove
- renderBullet()

## SpaceObject

- SpaceObject()
  - this.gameScreen
  - this.width
  - this.height
  - this.type
  - this.element
  - this.remove
- renderObject()

## Obstacle

- Obstacle() extends SpaceObject
  - this.left
  - this.top
  - this.sustain
  - this.direction
  - this.shootTime
  - this.bulletCount
- moveObstacle()
- attackObstacle(bullet)

## EnemyBullet

- EnemyBullet() extends SpaceObject
  - this.left
  - this.top
  - this.sustain
  - this.obstacle = obstacle;
- moveObstacle()

## Power

- Power() extends SpaceObject
  - this.behaviour
  - this.left
  - this.top
- movePower()
- collectPower(player)

# Extra Links

## Trello

[Board](https://trello.com/b/CF9H8bC3/starstream-striker)

## Slides

[Presentation](https://docs.google.com/presentation/d/1ZdUQweuXioQ13f33umPvHWDFXR8MhG0bfxR80056RKk/edit#slide=id.p)

## Deploy

[Game](https://jinishakheni.github.io/Starstream-Striker/)
