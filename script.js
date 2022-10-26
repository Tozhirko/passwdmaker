const lenghtSlider = document.querySelector(".pass-lenght input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    numbers: "0123456789",
    symbols: "!#&@[]{}:;.,/*+-<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLenght = lenghtSlider.value;
    
    options.forEach(option => {// checks what is checked u stupid bitch
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if(option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLenght; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate) {
            if(!randomPassword.includes(randomChar) || randomChar == " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
    passIndicator.id = lenghtSlider.value <= 14? "weak" : lenghtSlider.value <= 25 ? "medium" : "strong";
}

const updateSlider = () => {
    //slider should work now u stupid bitch
    document.querySelector(".pass-lenght span").innerText = lenghtSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    },1500)
}

copyIcon.addEventListener("click", copyPassword);
lenghtSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);