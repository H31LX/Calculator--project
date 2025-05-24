

const display = document.getElementById("display");
const results = document.getElementById("results");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");

document.getElementById("history-toggle").onclick = () => {
    historyPanel.classList.toggle("open");
};

function appendToDisplay(input) {
    if (display.innerText === "0") {
        display.innerText = input;
    } else {
        display.innerText += input;
    }
}

function clearDisplay() {
    display.innerText = "0";
    results.innerText = "";
}

function calculate() {
    try {
        const expression = display.innerText;
        const result = eval(expression);
        results.innerText = "= " + result;

        // Save to history
        const entry = document.createElement("li");
        entry.textContent = `${expression} = ${result}`;
        historyList.prepend(entry); // Newest at top

        display.innerText = result;
    } catch {
        results.innerText = "= Error";
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault(); // prevent form submission
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key.toLowerCase() === "c") {
        clearDisplay();
    }
});

function backspace() {
    let current = display.innerText;
    if (current.length > 1) {
        display.innerText = current.slice(0, -1);
    } else {
        display.innerText = "0";
    }
}

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    saved.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        historyList.appendChild(li);
    });
};

function saveHistory(expression, result) {
    const entry = `${expression} = ${result}`;
    const existing = JSON.parse(localStorage.getItem("history")) || [];
    existing.unshift(entry);
    localStorage.setItem("history", JSON.stringify(existing));
}

entry.addEventListener("click", () => {
    display.innerText = expression; // optionally parse it from the text
});
