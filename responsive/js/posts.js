window.addEventListener('load', function() {

	const postsDiv = document.getElementById('posts');
	const postRef = firebase.database().ref('posts');

	postRef.on('child_added', function(snapshot) {
		createPost(snapshot.key, snapshot.val());
	});

	function makeElem(tag, _class, text) {
		const element = document.createElement(tag);
		element.classList.add(_class);
		element.textContent = text;
		return element;
	}

	function createPost(key, post) {
		const div = makeElem("div", "post");
		const text = makeElem("div", "text", post.text);
		
		const info = makeElem("div", "info");
		const author = makeElem("a", "author", post.author);
		author.href = '/user?id=' + post.uid;
		const dateString = new Date(post.date).toLocaleString('un-us', 
			{ month: 'long', year: 'numeric', weekday: 'long', day: 'numeric'});
		const date = makeElem("span", "date", dateString);

		info.appendChild(author);
		info.appendChild(date);

		div.appendChild(text);
		div.appendChild(info);

		posts.appendChild(div);
	}
});