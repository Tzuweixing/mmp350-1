/* database query */
const tag = location.search.split('=')[1];
const posts = document.getElementById('posts');
const postRef = firebase.database().ref('posts').orderByChild('tag').orderByChild(tag).equalTo(true);
const userRef = firebase.database().ref('users').child(uid);

userRef.on('value', function(snapshot) {
	const userInfo = snapshot.val();
	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.val(), userInfo, snapshot.key);  
	});
});

