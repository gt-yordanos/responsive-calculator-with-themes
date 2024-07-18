document.addEventListener('DOMContentLoaded', function() {
  const circle = document.querySelector('.circle');
  const toggler = document.querySelector('.bottom-toggler');
  const calcInput = document.querySelector('.display input');
  const buttons = document.querySelectorAll('.btn, .btn-longer');

  toggler.addEventListener('click', function(event) {
    const clickX = event.clientX - toggler.getBoundingClientRect().left;
    const togglerWidth = toggler.offsetWidth;
    
    // Calculate position as percentage
    const positionPercent = (clickX / togglerWidth) * 100;
    
    // Apply theme based on position
    if (positionPercent < 33) {
      applyTheme('theme-1');
      circle.style.marginLeft = `6%`;
    } else if (positionPercent < 66) {
      applyTheme('theme-2');
      circle.style.marginLeft = `35%`;
    } else {
      applyTheme('theme-3');
      circle.style.marginLeft = `69%`;
    }
  });

  // Helper function to apply theme classes
  function applyTheme(theme) {
    document.documentElement.className = ''; // Reset to remove all existing themes
    document.documentElement.classList.add(theme); // Add the selected theme class
  }

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const value = button.textContent.trim();

      if (button.classList.contains('reset')) {
        calcInput.value = '';
      } else if (button.classList.contains('delete')) {
        calcInput.value = calcInput.value.slice(0, -1);
      } else if (button.classList.contains('equal')) {
        try {
          calcInput.value = evaluateExpression(calcInput.value);
        } catch {
          calcInput.value = 'Error';
        }
      } else if (button.classList.contains('op')) {
        // Replace the last operator if consecutive operators are clicked
        if (/[+\-*/x]$/.test(calcInput.value)) {
          calcInput.value = calcInput.value.slice(0, -1) + value;
        } else {
          calcInput.value += value;
        }
      } else if (button.classList.contains('dot')) {
        // Allow only one dot per number segment
        const segments = calcInput.value.split(/[+\-*/x]/);
        const lastSegment = segments[segments.length - 1];

        if (!lastSegment.includes('.') && !(/[+\-*/x.]$/.test(lastSegment))) {
          calcInput.value += value;
        }
      } else {
        calcInput.value += value;
      }
    });
  });

  function evaluateExpression(expression) {
    // Replace 'x' with '*' for evaluation
    const evaluatedExpression = expression.replace(/x/g, '*');
    // Evaluate and return result
    return eval(evaluatedExpression);
  }
});
