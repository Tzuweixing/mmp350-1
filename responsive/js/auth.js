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


const displayName = document.getElementById("user-name");
const profileButton = document.getElementById("profile-button");

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		document.body.classList.add('auth');
		const userRef = firebase.database().ref('users').child(user.uid);
		userRef.once('value', function(snapshot) {
			const userInfo = snapshot.val();
			displayName.textContent = "Welcome, " + userInfo.userName;
			profileButton.onclick = function() {
				location.href = "profile.html?uid=" + user.uid;
			};
		});
	} else {
		document.body.classList.remove('auth');
		displayName.textContent = "";
	}
});

/* log out */
const logoutButton = document.getElementById("logout-button");
logoutButton.onclick = function() {
	firebase.auth().signOut();
};


