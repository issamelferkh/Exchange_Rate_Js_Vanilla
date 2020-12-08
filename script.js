const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const curr_one = currency_one.value;
    const curr_two = currency_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[curr_two];
            rate.innerText = `1 ${curr_one} = ${rate} ${curr_two}`;
            amount_two.value = (amount_one.value * rate).toFixed(2);
        });
}

// // Event listeners
currency_one.addEventListener('change', calculate);
currency_two.addEventListener('change',calculate);
amount_one.addEventListener('input',calculate);
amount_two.addEventListener('input',calculate);

// Swap
swap.addEventListener('click', () => {
    const tmp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = tmp;
    calculate();
});

calculate();