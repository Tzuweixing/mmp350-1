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

	const posts = document.getElementById('posts');
	const postRef = firebase.database().ref('posts').orderByChild('uid').equalTo(uid);
	
	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.val(), userInfo);	   
	});

});

updateButton.onclick = function() {
	userRef.update({
		displayName: profileName.value,
		bio: bioInput.value
	});
};

const imageButton = document.getElementById('submit-image');
imageButton.addEventListener('click', function() {
	// get the file
	const file = document.getElementById('image-file').files[0];
	if (file) {
		// upload the file
		const storage = firebase.storage();
		const user = firebase.auth().currentUser;
		const ref = storage.ref('users').child(user.uid).child('profile-image');
		const promise = ref.put(file);
		
		promise.then(function(image) {
			return image.ref.getDownloadURL();
		}).then(function(url) {
			userRef.update({ imageURL: url });
			document.getElementById('profile-image').src = url;
			document.getElementById('add-image').style.display = 'none';
		});
	}
});

/* check auth */
firebase.auth().onAuthStateChanged(function(user) {
	if (user.uid == uid) {
		profileName.readOnly = false;
		bioInput.readOnly = false;
		document.body.classList.add('is-user');
	}
});












