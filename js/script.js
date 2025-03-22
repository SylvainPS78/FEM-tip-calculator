const billTotalInput = document.getElementById("bill-total");
const tipBtns = document.querySelectorAll(".tip");
const customTipInput = document.getElementById("custom-tip");
const numberPeopleInput = document.getElementById("number-people");
const tipPerPersonOutput = document.getElementById("tip-person");
const totalPerPersonOutput = document.getElementById("total-person");
const resetBtn = document.getElementById("reset");
const errorMessage = document.getElementById("error-message");


// Initialisation
tipPerPersonOutput.textContent = "$0.00";
totalPerPersonOutput.textContent = "$0.00";
let tipPerCent = 0;
let peopleCount = 0;
let billValue = 0;

// Prevent page refresh on buttons
const handleSubmit = (e) => {
    e.preventDefault();
}

// Calculations
function calculateTipAmount() {
    tipPerPersonOutput.textContent = (tipPerCent === 0 || peopleCount === 0) ? "$0.00" : `$${parseFloat((billValue*(tipPerCent)/peopleCount).toFixed(2))}`;
}   

function calculateTotalAmount() {
    totalPerPersonOutput.textContent = (tipPerCent === 0 || peopleCount === 0) ? "$0.00" : `$${parseFloat((billValue*(1+tipPerCent)/peopleCount).toFixed(2))}`;
}

// Error message if Number of people = 0
function errorDisplay() {
    if (numberPeopleInput.value === "0") {
        numberPeopleInput.style.border = "1px solid var(--Red)";
        errorMessage.style.display = "block";
    }
    else {
        numberPeopleInput.style.border = "1px solid var(--White)";
        errorMessage.style.display = "none";
    }
}

function reset() {
    tipPerCent = 0;
    peopleCount = 0;
    billValue = 0;
    tipPerPersonOutput.textContent = "$0.00";
    totalPerPersonOutput.textContent = "$0.00";
    [billTotalInput, numberPeopleInput, customTipInput].forEach(input => input.value = "");
}

// Event handlers
tipBtns.forEach(button => {
    button.addEventListener("click", (e) => {
        handleSubmit(e);
        tipPerCent = Number(button.value)/100;
        if (!numberPeopleInput.value || numberPeopleInput.value == "0") {
            return
        }
        else {
            calculateTipAmount();
            calculateTotalAmount();
        }
    });
});

customTipInput.addEventListener("input", () => {
    tipPerCent = Number(customTipInput.value)/100;
    calculateTipAmount();
    calculateTotalAmount();
})

billTotalInput.addEventListener("input", ()=>{
    billValue = Number(billTotalInput.value);
    calculateTipAmount();
    calculateTotalAmount();
})

numberPeopleInput.addEventListener("input", () => {
    errorDisplay();
    peopleCount = Number(numberPeopleInput.value);
    calculateTipAmount();
    calculateTotalAmount();
})

resetBtn.addEventListener("click",reset)

