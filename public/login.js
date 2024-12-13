const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const submitButton = document.querySelector(".submit-button");

const handleLogin = async (credits) => {
    const data = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credits)
    })
    if(data.ok) {
        window.location.href = "/user";
    }    
} 

submitButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    handleLogin({username, password});
});