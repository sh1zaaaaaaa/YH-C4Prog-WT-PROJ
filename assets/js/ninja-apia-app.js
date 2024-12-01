document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".api-checkbox");
    const inputField = document.getElementById("api-input");
    const responseMessage = document.getElementById("response-message");
    const constantMessage = document.getElementById("constant-message");
    const getResponseButton = document.getElementById("Get-Response");

    const API_KEY = "gAHnS0qzogBqCXBdNv2mzA==uQMAoj2GbN0PZ2zz";

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            checkboxes.forEach((cb) => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });

            if (checkbox.checked) {
                inputField.placeholder =
                    checkbox.value === "recipe-finder"
                        ? "Enter ingredient or recipe"
                        : "Enter password length";
            } else {
                inputField.placeholder = "Select API first";
            }
        });
    });

    getResponseButton.addEventListener("click", () => {
        const selectedCheckbox = Array.from(checkboxes).find(cb => cb.checked);
        const userInput = inputField.value.trim();

        if (!selectedCheckbox) {
            responseMessage.textContent = "Please select an API.";
            constantMessage.style.display = "none";
            responseMessage.style.display = "block";
            return;
        }

        const apiRoute = selectedCheckbox.value;

        if (!userInput) {
            responseMessage.textContent = "Please enter a valid input.";
            constantMessage.style.display = "none";
            responseMessage.style.display = "block";
            return;
        }

        if (apiRoute === "password-generator") {
            const passwordLength = parseInt(userInput, 10);
            if (isNaN(passwordLength) || passwordLength <= 0) {
                responseMessage.textContent = "Invalid input. Please enter a positive number.";
                constantMessage.style.display = "none";
                responseMessage.style.display = "block";
                return;
            }

            if (passwordLength > 30) {
                responseMessage.textContent = "Password length cannot exceed 30 characters.";
                constantMessage.style.display = "none";
                responseMessage.style.display = "block";
                return;
            }
        }

        const apiUrl =
            apiRoute === "recipe-finder"
                ? `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(userInput)}`
                : `https://api.api-ninjas.com/v1/passwordgenerator?length=${encodeURIComponent(userInput)}`;

        fetch(apiUrl, {
            headers: { "X-Api-Key": API_KEY },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                // throw new Error(
                //     `Error: ${response.status} - ${response.statusText}`
                return response.json().then((errorData) => {
                    throw new Error(errorData.error || "Unknown error occurred");
                });
            }
        })
        .then((data) => {
            constantMessage.style.display = "block";
            responseMessage.style.display = "block";

            if (apiRoute === "recipe-finder") {
                if (data.length > 0) {
                    const randomRecipe =
                        data[Math.floor(Math.random() * data.length)];

                    responseMessage.textContent = `Title: ${randomRecipe.title}\n\nIngredients: ${
                        randomRecipe.ingredients.replace(/\|/g, ", ")
                    }\n\nServings: ${randomRecipe.servings}\n\nInstructions: ${
                        randomRecipe.instructions
                    }`;
                } else {
                    responseMessage.textContent = "No recipes found.";
                }
            } else if (apiRoute === "password-generator") {
                responseMessage.textContent = data.random_password
                    ? `Generated Password: ${data.random_password}`
                    : "Error generating password.";
            }
        })
        .catch((error) => {
            constantMessage.style.display = "none";
            responseMessage.style.display = "block";
            responseMessage.textContent = `API request failed: ${error.message}`;
        })
        .finally(() => {
            inputField.value = "";
        });
    });
});
