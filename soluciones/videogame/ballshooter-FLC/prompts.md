**You are an expert in web game development. I want you to help me create a video game using JavaScript, HTML, and CSS. Below are the game requirements and technical specifications:**  

1. **Game Overview:**  
   **Player:**  
   - The game will be single-player.  
   - The player can move horizontally using the left and right arrow keys.  
   - When a movement key is held down, the player continues moving until the key is released.  
   - The player can shoot bullets upward by pressing the spacebar.  

   **Game Mechanics:**  
   - Balls will fall from the top of the screen, aiming to touch the player.  
   - If a ball touches the player, the game ends.  
   - The player must shoot the balls to destroy them.  
   - When a bullet hits a ball:  
     - The ball splits into two smaller balls at the point of impact.  
     - The smaller balls continue falling.  
   - Once a ball is completely destroyed, a larger ball will fall from the sky.  
   - Balls must bounce when hitting the ground, reaching a minimum height.  
     - The minimum bounce height must be higher than the player's height, allowing the player to pass underneath and shoot.  

2. **Technical Requirements:**  
   - Use plain JavaScript without external libraries.  
   - All game code must be in a single HTML file:  
     - Use `<script>` for JavaScript.  
     - Use `<style>` for CSS.  
   - Ensure compatibility with Chrome, Firefox, and Safari.  
   - Structure the game logic into clear, well-defined functions.  

3. **Game Styling:**  
   - **Player:** Use a smiley face emoji as the player avatar.  
   - **Balls:** Balls should be in different colors for better identification.  
   - **Canvas and Background:**  
     - The game area must occupy the entire screen of the device.  
     - Use a brick-pattern background with a gray color.  
   - Ensure the design is responsive and visually clear on various screen sizes.  

4. **Optimization & Testing:**  
   - Comment the code to explain key parts and improve readability.  
   - Test the game in multiple browsers to ensure smooth and consistent gameplay.  

5. **Final Deliverable:**  
   - A single HTML file containing:  
     - All necessary HTML, CSS, and JavaScript for the game.  
     - Inline comments explaining the game logic.  

6. **Priorities:**  
   - **Functionality:** Ensure the game meets all outlined specifications.  
   - **Code Clarity:** Focus on readable and well-structured code.  
   - **Specifications:** Strictly follow the provided technical and design requirements.  

**This project aims to practice integrating JavaScript, CSS, and HTML, showcasing your skills in developing interactive web-based games.**

---

**You are an expert in web game development. I want you to help me add a small instruction guide to the top-right corner of the screen for a video game. The guide should explain how to play the game clearly and concisely. Below are the requirements:**  

1. **Position and Design:**  
   - Place the instructions in the top-right corner of the screen.  
   - The guide should be styled as a small, visually distinct box or panel.  
   - Use a semi-transparent background with rounded corners for the panel.  
   - Use clear and readable text (e.g., white text with a slight shadow for visibility).  
   - Ensure the panel does not obstruct gameplay.  

2. **Content:**  
   - Include the following instructions:  
     - **Move:** Use the arrow keys (← and →) to move left or right.  
     - **Shoot:** Press the spacebar to shoot upward.  
     - **Objective:** Avoid falling balls and destroy them by shooting.  
   - Use bullet points or icons for clarity if possible.  

3. **Responsiveness:**  
   - Ensure the instruction panel is responsive and remains in the top-right corner across different screen sizes and orientations.  
   - On smaller screens, adjust the panel size or font size to maintain readability without obstructing gameplay.  

4. **Technical Requirements:**  
   - Implement the instruction panel using CSS for styling and positioning.  
   - Include the instructions directly within the HTML file.  
   - Keep the code concise and organized for easy modifications.  

5. **Priorities:**  
   - Ensure the instructions are visually clear and easy to read.  
   - The panel should enhance the user experience without disrupting the game.  

**Deliverable:** Update the game's single HTML file to include a styled instruction panel in the top-right corner, meeting all the specified requirements.