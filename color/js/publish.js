const publishButton = document.getElementById('publish-post');
const postInput = document.getElementById('post-text');
publishButton.addEventListener('click', publishPost);
publishButton.addEventListener('keyup', function(event) {
	// user hits enter button
	if (event.which == 13) {
		publishPost();
	}
});

// reference to location of posts in database
const ref = firebase.database().ref('posts');

function publishPost() {
	const post = {}; // object to store post information 
	post.text = postInput.value;
	post.date = Date.now();
	post.uid = firebase.auth().currentUser.uid;
	ref.push(post);
	
	postInput.value = ""; // reset post input
}