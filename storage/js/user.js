const uid = location.search.split('=')[1];
const userRef = firebase.database().ref('users').child(uid);

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	document.getElementById('posts-by-user').textContent = userInfo.displayName;
	const posts = document.getElementById('posts');
	const postRef = firebase.database().ref('posts').orderByChild('uid').equalTo(uid);
	
	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.val(), userInfo, snapshot.key);	   
	});
});












