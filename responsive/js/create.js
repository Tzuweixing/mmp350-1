const userInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const createButton = document.getElementById("create-button");
const errorMessage = document.getElementById("error-message");

createButton.onclick = function() {
	const promise = firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value);
	promise.catch(function(error) {
		errorMessage.textContent = error.message;
	});
	promise.then(function(response) {
		createUser(response.user);
	});
};

function createUser(user) {
	const db = firebase.database();
	const ref = db.ref('users').child(user.uid);
	const promise = ref.update({
		displayName: userInput.value
	});
	promise.then(function() {
		location.href = 'index.html';
		response.user.updateProfile({displayName: userInput.value})
			.then(function() {
				location.href = "index.html";
			})
			.catch(function(error) {
				console.log(error);				
			})
	});
}