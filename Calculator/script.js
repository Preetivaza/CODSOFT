let display = document.getElementById('display');

// Append character to the display
function appendCharacter(char) {
  display.value += char;
}

// Clear the display
function clearDisplay() {
  display.value = '';
}

// Delete the last character from the display
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate the result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}
