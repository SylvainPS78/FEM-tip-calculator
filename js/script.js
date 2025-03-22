const billTotal = document.getElementById("bill-total");
const tipBtns = document.querySelectorAll(".tip");
const customTip = document.getElementById("custom-tip");
const numberPeople = document.getElementById("number-people");
const tipPerPerson = document.getElementById("tip-person");
const totalPerPerson = document.getElementById("total-person");
const resetBtn = document.getElementById("reset");
const errorMessage = document.getElementById("error-message");


// Initialisation
tipPerPerson.textContent = "$0.00";
totalPerPerson.textContent = "$0.00";
let tipPerCent = 0;
let peopleCount = 0;
let billValue = 0;

// Prevent page refresh on buttons
const handleSubmit = (e) => {
    e.preventDefault();
}

// Error message if Number of people = 0
function errorDisplay() {
    if (numberPeople.value === "0") {
        numberPeople.style.border = "1px solid var(--Red)";
        errorMessage.style.display = "block";
    }
    else {
        numberPeople.style.border = "1px solid var(--White)";
        errorMessage.style.display = "none";
    }
}

// Calculations
function calculateTip() {
    tipPerPerson.textContent = (tipPerCent === 0 || peopleCount === 0) ? "$0.00" : `$${parseFloat((billValue*(tipPerCent)/peopleCount).toFixed(2))}`;
}   

function calculateTotal() {
    totalPerPerson.textContent = (tipPerCent === 0 || peopleCount === 0) ? "$0.00" : `$${parseFloat((billValue*(1+tipPerCent)/peopleCount).toFixed(2))}`;
}

function reset() {
    tipPerCent = 0;
    peopleCount = 0;
    billValue = 0;
    tipPerPerson.textContent = "$0.00";
    totalPerPerson.textContent = "$0.00";
    billTotal.value = "";
    numberPeople.value = "";
    customTip.value = "";
}


tipBtns.forEach(button => {
    button.addEventListener("click", (e) => {
        handleSubmit(e);
        tipPerCent = Number(button.value)/100;
        if (!numberPeople.value || numberPeople.value == "0") {
            return
        }
        else {
            calculateTip();
            calculateTotal();
        }
    });
});

customTip.addEventListener("input", () => {
    tipPerCent = Number(customTip.value)/100;
    calculateTip();
    calculateTotal();
})

billTotal.addEventListener("input", ()=>{
    billValue = Number(billTotal.value);
    calculateTip();
    calculateTotal();
})

numberPeople.addEventListener("input", () => {
    errorDisplay();
    peopleCount = Number(numberPeople.value);
    calculateTip();
    calculateTotal();
})

resetBtn.addEventListener("click",reset)

