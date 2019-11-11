<<<<<<< HEAD
=======

>>>>>>> d7bd3b319b6aa07da37498bba48e0ed190ba051f
const publishButton = document.getElementById('publish');
const postText = document.getElementById('post-text');

publishButton.addEventListener('click', publishPost);

function publishPost() {

	const dbRef = firebase.database().ref('posts');
	const user = firebase.auth().currentUser;

	const post = {
		text: postText.value,
		date: Date.now(),
		author: user.displayName,
		id: user.uid
	};
	
	dbRef.push(post)
		.then(function(success) {
			console.log(success);
			postText.value = '';
		})
		.catch(function(error) {
			console.log(error.message);
		});
}
