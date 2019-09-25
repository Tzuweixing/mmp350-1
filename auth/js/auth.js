const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("login-message");

loginButton.onclick = function(event) {	
	const promise = firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value);
	promise.catch(function(error) {
		message.textContent = error.message;
	});
};

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		message.textContent = "Welcome, " + user.displayName;
		document.body.classList.add('auth')
	} else {
		document.body.classList.remove('auth');
		message.textContent = "";
	}
});