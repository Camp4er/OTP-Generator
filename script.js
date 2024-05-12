const input = document.querySelectorAll("input");
const button = document.querySelector("button");
const mobile = document.getElementById("mobile");
const expire = document.getElementById("expire");

let OTP = "";
let expireInterval = null;

function generateOTPs() {
    clearInterval(expireInterval); // Clear any existing interval
    OTP = (
        Math.floor(Math.random()*10) + "" +
        Math.floor(Math.random()*10) + "" +
        Math.floor(Math.random()*10) + "" +
        Math.floor(Math.random()*10) 
    );

    alert("Your OTP is:" + OTP);
    
    input[0].focus();
    expire.innerText = 10;
    expireInterval = setInterval(function() {
        if (expire.innerText == 0) {
            clearInterval(expireInterval);
        }
        expire.innerText--;
    },1000);
}

function clearOTPs() {
    input.forEach((input, i) => {
        input.value = "";
    });
    clearInterval(expireInterval);
    expire.innerText = 0;
    button.disabled = true;
    button.classList.remove("active");
};

input.forEach((input, index) => {
    input.addEventListener("keyup", function(e) {
        const currentInput = input;
        const nextInput = input.nextElementSibling;
        const prevInput = input.previousElementSibling;

        if (e.key === "Backspace") {
            if (prevInput) {
                prevInput.focus();
                prevInput.value = "";
            }
            return;
        }

        if(nextInput && nextInput.value === "") {
            nextInput.focus();
        }

        if(currentInput.value !== "" && nextInput === null) {
            button.disabled = false;
            button.classList.add("active");
        } else {
            button.disabled = true;
            button.classList.remove("active");
        }
    })
});

window.addEventListener("load", () => {
    let x = prompt("Please enter your mobile number to verify your account");
    if (x) {
        mobile.innerText = x;
        generateOTPs();
    }
})

button.addEventListener("click", () => {
    let verify = "";
    input.forEach((input) => {
        verify += input.value;
    });
    if (verify === OTP) {
        alert("Your account has been verified successfully!");
        clearOTPs();
    } else {
        alert("Your verification failed")
    }
});