const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const submitButton = document.querySelector(".submit-button");

const handleRegister = async () => {
    const data = fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "test",
            password: "test"
        })
    })
} 

submitButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    console.log(username, password);
    handleRegister();
});