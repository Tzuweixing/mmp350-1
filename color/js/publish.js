const publishButton = document.getElementById('publish-post');
const postInput = document.getElementById('post-text');
publishButton.addEventListener('click', publishPost);

function publishPost() {
	const uid = firebase.auth().currentUser.uid;
	const db = firebase.database();
	const ref = db.ref('posts');
	const postInfo = {
		text: postInput.value,
		date: Date.now(),
		id: uid
	};
	ref.push(postInfo);
	postInput.value = "";
}