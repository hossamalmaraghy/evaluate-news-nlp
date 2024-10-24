// src/client/js/nameChecker.js

function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    const regex = /^[a-zA-Z\s]+$/;

    if (inputText.match(regex)) {
        return true;
    } else {
        alert("Enter a valid captain name");
        return false;
    }
}

export { checkForName };
