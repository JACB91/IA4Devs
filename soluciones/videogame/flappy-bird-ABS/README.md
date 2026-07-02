### INFO: He usado Chat GPT-4o y Copilot Chat

1. I want to make a videogame using javascript but I don't know what can I do. I need some examples of video games that I can do. It must be easy like snake, tetris or any basic arcade video game.

2. I want to make a **Flappy Bird** video game using **HTML, CSS & Javascript**. The videogame must consider these points:

- It has the **HTML**, **CSS**, and **Javascript** in different files.
- It must use **Phaser.js** library to simplify the game creation.
- It must use the **Canvas API** to draw and animate game elements.
- It must be supported by the most common web browser (Safari, Chrome etc...)  
  Before continuing, do you have any doubts or questions?

3. Yes, I need the assets and also is it possible use the phaser CDN?

4. Yes, I need the placeholder images.

5. It throws a CORS error when it loads the assets.

6. The videogame is not working correctly. The bird display so huge and is not moving in screen. I have attached an image. Also I would like the videogame to have a start and stop buttons.

- When loading the videogame, it must display the start button, and when clicks in the game starts.
- When you are playing, you must have a button to stop the game and when it click in the **Stop button**, the button changes and it must display a **Continue button** to continue the game.

7. The bird only falls and when it clicks on the space key doesn't do anything.

8. Now the bird works as expected, but the pipes do not work properly, they just fall down. You need to keep the pipes in the middle and change the position between up and down.

9. Now the pipe position is correct but some points are not working as expected:

- The pipe on the top must turn 50% to display correctly. Now is not displaying the tip of the pipe.
- When the bird collides with the pipe, the game is finished. And it must display a message with "Game Over" and the **Start button** to start a new game.
- The stop is displayed behind the pipes. It must be displayed above the pipes.
- The game must have a score counter that it displays on the bottom right of the screen.

10. The game is not finished when the bird collides with the pipe.

11. Now, is displaying the "Game over" when the game is finished but the **Start button** is not displayed.

12. The stop button is still displaying when is "Game over" and the start button must be displayed below the "Game over" text

13. Now the "Start button" is displayed but when it click to start a new game, there are two bird on the screen. The game must be reset after click on the start button again

### NOTA: Aquí empecé a usar Copilot Chat ya que con Chat GPT me estaba costando de explicar sin que tuviera el código.

14. @workspace /fix I need to reset the game when is game over and click the button start again

15. It doesn't work correclty. I need to reset the game when click in start button, I don't need the stop button

16. @workspace /fix Now the bird is not duplicate but when click on the start button the bird doesn't move

17. @workspace /fix the pipes are not moving after restart a game. In the first time work correctly but when you try to start a new game after game over is doesn't working

18. @workspace /fix The pipes doesn't appear in the second time and the scene is seems like stopped

19. It's working now! Let's do to fix some points:

- When the bird collides with the top or the bottom of the scene, the game is finished
- During the game, the columns should be displayed faster
