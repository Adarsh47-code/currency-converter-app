async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (amount === "" || amount <= 0) {
        document.getElementById("output").innerText = "Please Enter a valid amount!";
        return;
    }
    try {
        const url = `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log("API data:", data);

        if (data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const total = (amount * rate).toFixed(2);

            document.getElementById("output").innerText =
                `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
            // Trigger this once the conversion is successful!
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#C0C0C0', '#6c63ff'], // Gold, Silver, and your button color
                zIndex: 999
            });
        } else {
            document.getElementById("output").innerText = "Conversion failed, Try Again";

        }
    } catch (error) {
        document.getElementById("output").innerText = "Error Fetching Data.";
        console.error(error);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.frankfurter.app/currencies')
        .then(res => res.json())
        .then(data => {
            const currencyList = Object.entries(data);
            populateDropdowns(currencyList);
        });
});

function populateDropdowns(currencyList) {
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    currencyList.forEach(([code, name]) => {
        const fromOption = new Option(`${code} - ${name}`, code);
        const toOption = new Option(`${code} - ${name}`, code);

        fromSelect.add(fromOption);
        toSelect.add(toOption);
    });
};
