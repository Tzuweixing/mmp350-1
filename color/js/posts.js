const posts = document.getElementById('posts');
const postRef = firebase.database().ref('posts');

function loadPosts() {
	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.val());
	});
}

function createDiv(_class, text) {
	const div = document.createElement('div');
	div.classList.add(_class);
	div.textContent = text;
	return div;
}

function createPost(data) {
	const post = createDiv('post');
	const text = createDiv('text', data.text);
	const info = createDiv('info');
	const author = createDiv('author', "by " + users[data.uid]);

	const d = new Date(data.date);
	const date = createDiv('date', "on " + (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear());

	post.appendChild(text);
	post.appendChild(info);
	info.appendChild(author);
	info.appendChild(date);

	/* reverse chronological order */
	posts.insertBefore(post, posts.firstElementChild); 
}

/* get user data then load posts */
let userCount = 0;
const users = {};
firebase.database().ref('users').on('child_added', function(snapshot) {
	const user = snapshot.val();
	users[snapshot.key] = user.displayName;
	userCount++;
});

firebase.database().ref('users').once('value', function(snapshot) {
	if (snapshot.numChildren() === userCount) {
		loadPosts();
	}
});