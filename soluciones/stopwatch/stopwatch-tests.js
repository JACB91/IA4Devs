// stopwatch-tests.js
function runTests() {
  let testsPassed = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      testsPassed++;
      console.log(`✅ Test passed: ${message}`);
    } else {
      console.error(`❌ Test failed: ${message}`);
    }
  }

  // Helper function to wait for a specified time
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Test start functionality
  async function testStart() {
    clearTimer();
    startPauseButton.click();
    assert(
      startPauseButton.textContent === "Pause",
      "Button should display 'Pause' after starting"
    );
    await wait(1100);
    const time = getDisplayTime();
    assert(
      time.seconds === "01" && parseInt(time.milliseconds) > 0,
      "Timer should start counting"
    );
  }

  // Test pause functionality
  async function testPause() {
    startPauseButton.click(); // Pause
    assert(
      startPauseButton.textContent === "Continue",
      "Button should display 'Continue' after pausing"
    );
    const timeBefore = getDisplayTime();
    await wait(1000);
    const timeAfter = getDisplayTime();
    assert(
      JSON.stringify(timeBefore) === JSON.stringify(timeAfter),
      "Time should not change while paused"
    );
  }

  // Test continue functionality
  async function testContinue() {
    startPauseButton.click(); // Continue
    assert(
      startPauseButton.textContent === "Pause",
      "Button should display 'Pause' after continuing"
    );
    await wait(1100);
    const time = getDisplayTime();
    assert(
      time.seconds === "02" && parseInt(time.milliseconds) > 0,
      "Timer should continue counting"
    );
  }

  // Test clear functionality
  function testClear() {
    clearButton.click();
    const time = getDisplayTime();
    assert(
      time.hours === "00" &&
        time.minutes === "00" &&
        time.seconds === "00" &&
        time.milliseconds === "000",
      "Timer should reset to 00:00:00:000"
    );
    assert(
      startPauseButton.textContent === "Start",
      "Button should display 'Start' after clearing"
    );
  }

  // Helper function to get current display time
  function getDisplayTime() {
    return {
      hours: document.getElementById("hours").textContent,
      minutes: document.getElementById("minutes").textContent,
      seconds: document.getElementById("seconds").textContent,
      milliseconds: document.getElementById("milliseconds").textContent,
    };
  }

  // Run all tests
  async function runAllTests() {
    await testStart();
    await testPause();
    await testContinue();
    testClear();

    console.log(`Tests completed: ${testsPassed}/${totalTests} passed`);
  }

  runAllTests();
}

// Run tests when the page is loaded
window.addEventListener("load", runTests);
