const createButton = document.getElementById('create-button');
const userNameInput = document.getElementById('user-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const message = document.getElementById('create-message');

createButton.onclick = function() {
	message.textContent = 'Thank you for creating an account ' + userNameInput.value;
};