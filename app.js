document.getElementById('generate-password').addEventListener('click', function() {
    var generatedPassword = generateStrongPassword();
    document.getElementById('password').value = generatedPassword; // Set the password input to the generated password
    // Trigger the input event to update the strength indicator
    var event = new Event('input', {
        bubbles: true,
        cancelable: true,
    });
    document.getElementById('password').dispatchEvent(event);
});

function generateStrongPassword() {
    var length = 12, // Password length
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

/*document.getElementById('show-password').addEventListener('change', function() {
    var passwordInput = document.getElementById('password');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});*/

/*document.getElementById('password').addEventListener('input', function(e) {
    var passwordInput = e.target.value.trim(); // Remove leading and trailing whitespaces
    var strengthIndicator = document.getElementById('password-strength');
    
    // Check if the input field is empty
    if (passwordInput === '') {
        strengthIndicator.innerText = ''; // Clear the strength indicator if input is empty
        strengthIndicator.classList.remove('active'); // Remove 'active' class
    } else {
        var strengthText = checkPasswordStrength(passwordInput);
        strengthIndicator.innerText = 'Strength: ' + strengthText;
    
        // Update the class for CSS styling based on strength
        strengthIndicator.classList.add('active'); // Add 'active' class
    }
});
*/

document.getElementById('password').addEventListener('input', function(e) {
    var strengthText = checkPasswordStrength(e.target.value);
    var strengthIndicator = document.getElementById('password-strength');
    strengthIndicator.innerText = 'Strength: ' + strengthText;

    // Update the class for CSS styling
    strengthIndicator.className = 'strength-indicator ' + strengthText.toLowerCase().replace(/\s/g, '-');
});

function checkPasswordStrength(password) {
    // Define regex patterns
    var lengthRegex = /^.{8,}$/; // At least 8 characters long
    var uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    var lowercaseRegex = /[a-z]/; // At least one lowercase letter
    var numberRegex = /[0-9]/; // At least one number
    var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; // At least one special character

    // Check password against each regex pattern
    var lengthValid = lengthRegex.test(password);
    var uppercaseValid = uppercaseRegex.test(password);
    var lowercaseValid = lowercaseRegex.test(password);
    var numberValid = numberRegex.test(password);
    var specialCharValid = specialCharRegex.test(password);

    // Calculate the strength score
    var strengthScore = 0;
    if (lengthValid) strengthScore++;
    if (uppercaseValid) strengthScore++;
    if (lowercaseValid) strengthScore++;
    if (numberValid) strengthScore++;
    if (specialCharValid) strengthScore++;

    // Determine strength level based on score
    if (strengthScore === 5) {
        return "Very Strong";
    } else if (strengthScore === 4) {
        return "Strong";
    } else if (strengthScore === 3) {
        return "Moderate";
    } else if (strengthScore === 2) {
        return "Weak";
    } else {
        return "Very Weak";
    }
}
