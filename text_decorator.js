window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('increaseFontSizeBtn').addEventListener('click', () => increaseFontSize());
    document.getElementById('bling').addEventListener('click', () => makeTextBling());
    document.getElementById('malovichBtn').addEventListener('click', () => malovich());
    document.getElementById('convertToPigLatinBtn').addEventListener('click', () => convertToPigLatin());
})

function displayAlert() {
    alert("Clicked!!!");
}

function makeTextBling() {
    var checked = document.getElementById("bling").checked;
    if (checked) {
        document.getElementById("text").style.fontWeight = "bold";
        document.getElementById("text").style.color = "green";
        document.getElementById("text").style.textDecoration = "underline";
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(http://www.cs.washington.edu/education/courses/190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg)";

    } else {
        document.getElementById("text").style.fontWeight = "";
        document.getElementById("text").style.color = "";
        document.getElementById("text").style.textDecoration = "";
        document.getElementsByTagName("body")[0].style.backgroundImage = "";
    }
}

function malovich() {
    var inputText = document.getElementById("text").value;
    var inputTextArray = inputText.split(" ");
    var newTextArray = [];
    inputTextArray.forEach(word => {
        if (word.length >= 5) {
            newTextArray.push("Malkovich");
        } else {
            newTextArray.push(word);
        }
    });
    document.getElementById("text").value = newTextArray.join(" ");
}

function convertToPigLatin() {
    var text = document.getElementById("text").value;
    var newWord = "";
    const vowels = ["a", "e", "i", "o", "u"];
    var newTextArray = [];
    var textArray = text.split(" ");
    textArray.forEach(word => {
        const firstLetter = word.charAt(0);
        if (vowels.includes(firstLetter)) {
            newWord = word + "ay";
        } else {
            let clusterEnd = 1;
            while (!vowels.includes(word.charAt(clusterEnd))) {
                clusterEnd++;
            }
            newWord = word.slice(clusterEnd) + word.slice(0, clusterEnd) + "ay";
        }
        newTextArray.push(newWord);
    });
    document.getElementById("text").value = newTextArray.join(" ");
}

function increaseFontSize() {
    var currentSize = document.getElementById("text").style.fontSize;
    setInterval(() => {
        if (currentSize === "") {
            document.getElementById("text").style.fontSize = currentSize = "12pt";
        }
        var newSize = parseInt(document.getElementById("text").style.fontSize) + 2;
        document.getElementById("text").style.fontSize = newSize + "pt";
    }, 500);
}