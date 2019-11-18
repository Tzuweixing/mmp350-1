const postId = location.search.split('=')[1];
const postRef = firebase.database().ref('posts').child(postId);
const posts = document.getElementById('posts');

postRef.on('value', function(snapshot) {
	const postInfo = snapshot.val();
	const uid = postInfo.uid;
	const userRef = firebase.database().ref('users').child(uid);

	userRef.on('value', function(snapshot) {
		const userInfo = snapshot.val();
		createPost(postInfo, userInfo, postId);	   
	});
});
