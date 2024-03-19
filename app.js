
document.getElementById('password').addEventListener('input', function(e) {
    var passwordInput = e.target.value.trim(); // Remove leading and trailing whitespaces
    var strengthIndicator = document.getElementById('password-strength');
    
    // Check if the input field is empty
    if (passwordInput === '') {
        strengthIndicator.innerText = ''; // Clear the strength indicator if input is empty
        strengthIndicator.className = 'strength-indicator'; // Reset class
    } else {
        var strengthText = checkPasswordStrength(passwordInput);
        strengthIndicator.innerText = 'Strength: ' + strengthText;
    
        strengthIndicator.className = 'strength-indicator ' + strengthText.toLowerCase().replace(/\s/g, '-');
    }
});


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
