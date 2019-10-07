const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');

const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.userName;
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
	}
});

updateButton.onclick = function() {
	userRef.update({
		userName: profileName.value,
		bio: bioInput.value
	});
};