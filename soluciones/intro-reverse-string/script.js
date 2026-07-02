// script.js

// Main Module (IIFE to avoid global scope pollution)
(function() {
    'use strict';

    // Constants
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 20;
    const HIDE_DELAY = 10000; // 10 seconds

    // DOM Elements
    const textInput = document.getElementById('textInput');
    const reverseButton = document.getElementById('reverseButton');
    const alertContainer = document.getElementById('alert-container');
    const resultContainer = document.getElementById('resultContainer');
    const reversedText = document.getElementById('reversedText');

    // Event Listeners
    reverseButton.addEventListener('click', handleReverseAction);
    textInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleReverseAction();
        }
    });

    /**
     * Handles the reverse action when button is clicked or Enter key is pressed.
     */
    function handleReverseAction() {
        try {
            console.log('Reverse action triggered.');
            const input = textInput.value.trim();
            if (validateInput(input)) {
                const reversed = reverseString(input);
                displayResult(reversed);
                showSuccessAlert('Text reversed successfully!');
                resetInput();
                hideResultAfterDelay(HIDE_DELAY);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            showErrorAlert('An unexpected error occurred. Please try again.');
        }
    }

    /**
     * Validates the user input.
     * @param {string} input - The input string from the user.
     * @returns {boolean} - Returns true if input is valid, otherwise false.
     */
    function validateInput(input) {
        if (input.length === 0) {
            markInputError();
            showErrorAlert('Input cannot be empty.');
            return false;
        }
        if (input.length < MIN_LENGTH || input.length > MAX_LENGTH) {
            markInputError();
            showErrorAlert(`Input must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`);
            return false;
        }
        console.log('Input validation passed.');
        return true;
    }

    /**
     * Reverses the given string.
     * @param {string} str - The string to reverse.
     * @returns {string} - The reversed string.
     */
    function reverseString(str) {
        console.log('Reversing the string.');
        return str.split('').reverse().join('');
    }

    /**
     * Displays the reversed text to the user.
     * @param {string} text - The reversed text.
     */
    function displayResult(text) {
        reversedText.textContent = text;
        resultContainer.classList.remove('hidden');
    }

    /**
     * Resets the input field and removes error styles.
     */
    function resetInput() {
        textInput.value = '';
        textInput.classList.remove('border-red-500');
    }

    /**
     * Hides the result and success alert after a specified delay.
     * @param {number} delay - The delay in milliseconds.
     */
    function hideResultAfterDelay(delay) {
        setTimeout(() => {
            resultContainer.classList.add('hidden');
            clearAlerts();
            console.log('Result and alerts hidden after delay.');
        }, delay);
    }

    /**
     * Marks the input field with an error style.
     */
    function markInputError() {
        textInput.classList.add('border-red-500');
    }

    /**
     * Shows an error alert with the given message.
     * @param {string} message - The error message to display.
     */
    function showErrorAlert(message) {
        clearAlerts();
        const alert = createAlert('error', message);
        alertContainer.appendChild(alert);
    }

    /**
     * Shows a success alert with the given message.
     * @param {string} message - The success message to display.
     */
    function showSuccessAlert(message) {
        clearAlerts();
        const alert = createAlert('success', message);
        alertContainer.appendChild(alert);
    }

    /**
     * Creates an alert element.
     * @param {string} type - The type of alert ('success' or 'error').
     * @param {string} message - The message to display.
     * @returns {HTMLElement} - The alert element.
     */
    function createAlert(type, message) {
        const alert = document.createElement('div');
        alert.className = `border-l-4 p-4 ${
            type === 'error' ? 'border-red-500 bg-red-100' : 'border-green-500 bg-green-100'
        } mt-4`;
        const alertContent = `
            <div class="flex">
                <div class="flex-shrink-0">
                    <!-- Icon -->
                </div>
                <div class="ml-3">
                    <p class="text-sm text-${type === 'error' ? 'red' : 'green'}-700">
                        ${message}
                    </p>
                </div>
            </div>
        `;
        alert.innerHTML = alertContent;
        return alert;
    }

    /**
     * Clears all alerts from the alert container.
     */
    function clearAlerts() {
        alertContainer.innerHTML = '';
    }

})();
