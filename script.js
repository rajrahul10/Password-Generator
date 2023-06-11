let sliderInputEl = document.getElementById('slider');
sliderInputEl.value = 8;

const handleSetPasswordLength = function() {
    document.querySelector('.length').innerText = sliderInputEl.value;
};

const handleCopyPassword = function() {
    let inputEl = document.querySelector('.password');

    inputEl.select();
    document.execCommand('copy');
};

const setPasswordStrength = (selectionCount, color) => {
    document.querySelectorAll('.strength-block').forEach((el, index) => {
        if (index < selectionCount) {
            el.style.backgroundColor = color;
        }
    });
}

const handleGeneratePassword = function() {
    let passwordLength = sliderInputEl.value;
    let allCharacterSet = '';
    const numbers = '0123456789';
    const upperCaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*';
    let password = '';
    let selectionCount = 0;

    document.querySelectorAll('.checkbox-input').forEach(el => {
        if (el.checked) {
            if (el.name === 'uppercase') {
                allCharacterSet += upperCaseAlphabets;
                selectionCount += 1;
            }
            else if (el.name === 'lowercase') {
                allCharacterSet += lowercaseAlphabets;
                selectionCount += 1;
            }
            else if (el.name === 'numbers') {
                allCharacterSet += numbers;
                selectionCount += 1;
            }
            else if (el.name === 'symbols') {
                allCharacterSet += symbols;
                selectionCount += 1;
            }
        }
    });

    if (!allCharacterSet) {
        allCharacterSet += upperCaseAlphabets;
        allCharacterSet += lowercaseAlphabets;
        allCharacterSet += numbers;
        allCharacterSet += symbols;
        selectionCount = 4;
    }

    let passwordStrengthEl = document.querySelector('.strength-text');

    document.querySelectorAll('.strength-block').forEach((el, index) => {
            el.style.backgroundColor = '';
    });
    
    if (selectionCount == 1) {
        passwordStrengthEl.innerHTML = 'WEAK';
        setPasswordStrength(selectionCount, 'red');
    }
    else if (selectionCount == 2) {
        passwordStrengthEl.innerHTML = 'MEDIUM';
        setPasswordStrength(selectionCount, '#fcba03');
    }
    else if (selectionCount == 3) {
        passwordStrengthEl.innerHTML = 'STRONG';
        setPasswordStrength(selectionCount, '#43e666');
    }
    else if (selectionCount == 4) {
        passwordStrengthEl.innerHTML = 'VERY STRONG';
        setPasswordStrength(selectionCount, '#165223');
    }
    
    for (let i=0; i<passwordLength; i++) {
        password += allCharacterSet[Math.floor(Math.random() * (allCharacterSet.length-1))];
    }

    document.querySelector('.password').value = password;
};

// change password length on input
sliderInputEl.addEventListener('input', handleSetPasswordLength);

// copy password on click
document.querySelector('.icon').addEventListener('click', handleCopyPassword);

// generate password on clicking generate button
document.querySelector('.btn').addEventListener('click', handleGeneratePassword);