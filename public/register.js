const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const submitButton = document.querySelector(".submit-button");

const handleRegister = async (credits) => {
    const data = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credits)
    });
    if(data.ok) {
        window.location.href = "/login";
    }    
} 

submitButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    handleRegister({username, password});
});