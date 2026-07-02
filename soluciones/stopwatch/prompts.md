<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    h2 { font-size: 28px; color: #2c3e50; font-weight: bold;}
    h3 { font-size: 24px; color: #34495e; margin-top: 30px; }
    h4 { font-size: 20px; color: #7f8c8d; margin-top: 25px; }
    h5 { font-size: 18px; color: #95a5a6; margin-top: 20px; }
    h6 { font-size: 16px; color: #95a5a6; margin-top: 15px; }
    ul, ol { margin-left: 30px; }
    code { background-color: #f0f0f0; padding: 2px 4px; border-radius: 4px; }
</style>

<h2>Prompt 1️⃣ + Stopwatch.png</h2>
<small>Note: This project was made with https://claude.ai by Luis Urdaneta</small>

<!-- Main Instruction -->
<h5> ###  Main Instruction:</h5> 
<p>The goal of this project is to develop a digital stopwatch using only vanilla HTML, CSS, and JavaScript, with no reliance on external libraries or frameworks. The stopwatch will feature a modern and clean user interface, allowing users to easily measure elapsed time with millisecond precision. The UI will include large, clear time displays and two control buttons for ease of use.</p>

<!-- Current Setup -->
<h5>### Current Setup</h4>
<pre>
<code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Timer and Countdown&lt;/title&gt;
    &lt;link rel="stylesheet" href="styles.css"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Timer and Countdown - Luis Urdaneta&lt;/h1&gt;
    &lt;script src="script.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code>
</pre>

<h5>###  Project Requirements Document (PRD) - Digital Stopwatch with Vanilla JavaScript, CSS, and HTML</h5>
<small>Note: This is a text added with the first prompt.</small>

<h3>1. Project Overview</h3>
<p>The goal of this project is to develop a digital stopwatch using only vanilla HTML, CSS, and JavaScript, with no reliance on external libraries or frameworks. The stopwatch will feature a modern and clean user interface, allowing users to easily measure elapsed time with millisecond precision. The UI will include large, clear time displays and two control buttons for ease of use.</p>

<h3>2. Functional Requirements</h3>

<h4>2.1 Start/Pause/Continue Button (Primary Button)</h4>
<h5>Label States:</h5>
<ul>
    <li><strong>"Start":</strong> Default state when the stopwatch is first loaded or after being reset.</li>
    <li><strong>"Pause":</strong> Displayed when the stopwatch is running.</li>
    <li><strong>"Continue":</strong> Displayed when the stopwatch is paused.</li>
</ul>

<h5>Button Functionality:</h5>
<ul>
    <li><strong>Start:</strong> Begins the stopwatch, initiating time counting from zero and changing the label to "Pause".</li>
    <li><strong>Pause:</strong> Pauses the stopwatch, freezing the current time display, and changing the label to "Continue".</li>
    <li><strong>Continue:</strong> Resumes time counting from the paused state, with the label reverting to "Pause".</li>
</ul>

<h4>2.2 Clear Button (Secondary Button)</h4>
<h5>Label State:</h5>
<ul>
    <li>Always labeled as <strong>"Clear"</strong>.</li>
</ul>

<h5>Button Functionality:</h5>
<ul>
    <li><strong>Clear:</strong> Resets the stopwatch to <code>00:00:00:000</code>, halts any ongoing time counting, and reverts the primary button label to "Start".</li>
</ul>

<h3>3. User Interface (UI) Requirements</h3>

<h4>3.1 Time Display</h4>
<h5>Time Format:</h5>
<p>The stopwatch will display time in the following format:</p>
<ul>
    <li><strong>HH:</strong> Hours (00-99).</li>
    <li><strong>MM:</strong> Minutes (00-59).</li>
    <li><strong>SS:</strong> Seconds (00-59).</li>
    <li><strong>MS:</strong> Milliseconds (000-999).</li>
</ul>

<h5>Appearance:</h5>
<ul>
    <li><strong>Hours, Minutes, and Seconds:</strong> These should be displayed in a large, bold font to ensure readability at a glance.</li>
    <li><strong>Milliseconds:</strong> Displayed in a smaller font size to differentiate it visually from the main time units.</li>
</ul>

<h5>Alignment:</h5>
<p>The entire time display should be centered within the stopwatch container, providing a balanced and visually appealing layout.</p>

<h4>3.2 Button Styling</h4>
<h5>Primary Button ("Start/Pause/Continue"):</h5>
<ul>
    <li><strong>Default State:</strong> A black background with white text and rounded corners.</li>
    <li><strong>Pause State:</strong> A light gray background with black text to indicate the pause function.</li>
</ul>

<h5>Secondary Button ("Clear"):</h5>
<ul>
    <li><strong>Color:</strong> Red background with white text to indicate the destructive nature of the action (reset).</li>
</ul>

<h5>Button Consistency:</h5>
<p>Both buttons should be consistent in size and font, with bold, clear text to enhance usability.</p>

<h3>4. Technical Requirements</h3>

<h4>4.1 HTML Structure</h4>
<ul>
    <li>The HTML should be structured semantically, with appropriate use of tags such as <code>&lt;div&gt;</code>, <code>&lt;span&gt;</code>, <code>&lt;button&gt;</code>, etc.</li>
    <li>The stopwatch interface should include a main container that houses the time display and control buttons.</li>
</ul>

<h4>4.2 CSS Styling</h4>
<ul>
    <li><strong>Responsive Design:</strong> The stopwatch layout should be responsive, ensuring usability across various device sizes, including mobile and desktop.</li>
    <li><strong>Consistent Styling:</strong> Use consistent spacing, margins, and padding to maintain a clean and organized UI.</li>
    <li><strong>Font Choices:</strong> Use system fonts or web-safe fonts (e.g., Arial, sans-serif) to ensure cross-browser compatibility.</li>
</ul>

<h4>4.3 JavaScript Functionality</h4>
<ul>
    <li><strong>Time Management:</strong> Use JavaScript to manage the counting of hours, minutes, seconds, and milliseconds. Ensure the logic is precise and handles edge cases (e.g., time overflow).</li>
    <li><strong>Event Handling:</strong> Implement event listeners for button clicks, handling the start, pause, continue, and clear actions.</li>
    <li><strong>Display Update:</strong> Ensure that the time display updates in real-time, with accurate formatting for each time unit.</li>
    <li><strong>Good Practices:</strong>
        <ul>
            <li><strong>Clean Code:</strong> Follow clean code principles, such as meaningful variable names, modular functions, and avoiding global variables where possible.</li>
            <li><strong>SOLID Principles:</strong> Apply SOLID principles where applicable, ensuring that the code is maintainable, scalable, and easy to understand.</li>
        </ul>
    </li>
</ul>

<h4>5. Best Practices</h4>
<ul>
    <li><strong>Modularity:</strong> Break down the JavaScript code into smaller, reusable functions to enhance maintainability and testing.</li>
    <li><strong>Single Responsibility Principle (SRP):</strong> Ensure each function has a single responsibility, simplifying debugging and future modifications.</li>
    <li><strong>Code Comments:</strong> Provide clear and concise comments where necessary to explain complex logic or important sections of the code.</li>
    <li><strong>Error Handling:</strong> Implement basic error handling to manage unexpected inputs or conditions gracefully.</li>
    <li><strong>Cross-Browser Compatibility:</strong> Test the stopwatch across different browsers to ensure consistent functionality and appearance.</li>
</ul>

<br/>
<hr/>
<br/>

<h2>Prompt 2️⃣</h2>
<h5>### ADD:</h5>
<p>We are going to create the unit tests, without any libraries in a separate script, and you are going to tell me how to run the tests:</p>
<ul>
<li>Verify that the "Start", "Pause", and "Continue" functionalities work as expected, with correct label updates.</li>
<li>Verify that the time its working as expected.</li>
</ul>
<h5>#
## FIX:</h5>
<br/><p>We have to set the width of each measurement time, its expansion and contraction depending on the content.</p>
<hr/>
<br/>

<h2>Prompt 3️⃣</h2>
<h3>Objective:</h3>
<p>Enhance the existing digital stopwatch interface by adding two interactive tabs below it. The first tab should be labeled <strong>"Read Me"</strong>, and the second should be labeled <strong>"Prompts"</strong>. Each tab will display its respective content when clicked, ensuring that only one tab's content is visible at any given time.</p>

<h3>Requirements:</h3>
<h4>1. Tab Functionality:</h4>
<ul>
<li><strong>Single-Tab Display:</strong> When a tab is clicked, its associated content should be displayed, while the other tab's content is hidden.</li>
<li><strong>Interactive Behavior:</strong> Ensure smooth transitions when switching between tabs to enhance user experience.</li>
</ul>

<h4>2. Markdown Integration:</h4>
<ul>
<li><strong>File Extraction:</strong> Each tab will load content from a corresponding Markdown (.md) file:
<ul>
<li><code>readme.md</code> for the <strong>"Read Me"</strong> tab.</li>
<li><code>prompts.md</code> for the <strong>"Prompts"</strong> tab.</li>
</ul>
</li>
<li><strong>Markdown Conversion:</strong> The content from these Markdown files must be converted to HTML before being displayed in the respective tab.</li>
</ul>

<h4>3. Rendering:</h4>
<ul>
<li>The converted HTML should be rendered inside the project, within a designated content area that is visually integrated with the stopwatch interface.</li>
</ul>

<h3>Implementation Details:</h3>
<ul>
<li><strong>JavaScript:</strong> Use JavaScript to handle the tab interactions and to fetch and convert the Markdown files to HTML. Libraries like <code>marked.js</code> can be used for Markdown-to-HTML conversion.</li>
<li><strong>HTML/CSS:</strong> Design the tabs and content areas with a consistent style, ensuring they complement the existing stopwatch interface.</li>
</ul>

<br/>
<hr/>
<br/>

<h2>Prompt 4️⃣</h2>
<p>Create a Readme file talking about our project as an expert in copywriting and markdown, make the writing fun with emojis</p>

<br/>
<hr/>
<br/>

<h2>Prompt 5️⃣</h2>
<h3>Objective:</h3>
<p>Enhance the digital stopwatch interface by adding a title ("Timer and Countdown") and a subtitle ("Luis Urdaneta") with a clickable link to www.luiseum.dev. Ensure the stopwatch is centered both vertically and horizontally within the viewport, and that it is visually separated from the tabs below. Implement a responsive design that adapts seamlessly across different screen sizes.</p>

<h3>Requirements:</h3>
<ul>
<li><strong>Title and Subtitle:</strong> Bold, prominent title with responsive typography. Clickable, styled subtitle link that opens in a new tab.</li>
<li><strong>Stopwatch Positioning:</strong> Keep the stopwatch centered in the viewport on all devices. Ensure a clear visual separation between the stopwatch and the tabs.</li>
<li><strong>Responsive Design:</strong> Use Flexbox/Grid for layout. Adjust font sizes and spacing for readability on all screen sizes.</li>
</ul>

<h3>Implementation Details:</h3>
<ul>
<li>Ensure responsive typography and layout using CSS.</li>
<li>Maintain visual separation between the stopwatch and tabs.</li>
<li>Test across multiple devices for consistency and readability.</li>
</ul>
