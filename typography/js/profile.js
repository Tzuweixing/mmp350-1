const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

const profileName = document.getElementById('profile-name');
const bioInput = document.getElementById('bio');
const updateButton = document.getElementById('update-profile');

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	profileName.value = userInfo.displayName;
	
	if (userInfo.bio) {
		bioInput.value = userInfo.bio;
	}

	if (userInfo.imageURL) {
		document.getElementById('profile-image').src = userInfo.imageURL;
		document.getElementById('add-image').style.display = 'none';
	}

	console.log(userInfo);
});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value
	});
};

/* image */
const submitButton = document.getElementById('submit-image');

submitButton.addEventListener('click', function() {
	const file = document.getElementById('profile-image-file').files[0];
	if (file) {
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-image');
		const promise = ref.put(file);

		promise.then(function(image) {
			return image.ref.getDownloadURL();
		}).then(function(url) {
			user.updateProfile({ url: url });
			document.getElementById('profile-image').src = url;
			firebase.database().ref('users').child(user.uid).update({ imageURL: url });
		});
	}
});
