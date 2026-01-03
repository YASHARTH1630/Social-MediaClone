const posts = [{ //two posts 
                id: 1,
                username: "john_doe",
                image: "https://picsum.photos/500/400",
                likes: 120,
                liked: false,
                comments: []
            }, {
                id: 2,
                username: "jane_smith",
                image: "https://picsum.photos/500/401",
                likes: 89,
                liked: false,
                comments: []
            }];
 const feed = document.getElementById("feed");

            function renderPosts() {//creating a function
                feed.innerHTML = "";

                posts.forEach(post => {
                            const postDiv = document.createElement("div");
                            postDiv.className = "post";
                            postDiv.dataset.id = post.id;

                            postDiv.innerHTML = `
      <div class="post-header">
        <img src="https://i.pravatar.cc/100?u=${post.username}">
        <strong>${post.username}</strong>
      </div>

      <div class="post-image">
        <img src="${post.image}">
      </div>

      <div class="post-actions">
        <span class="like-btn">${post.liked ? "❤️" : "🤍"}</span>
        <span class="likes">${post.likes} likes</span>
      </div>

      <div class="comments">
        ${post.comments.map(c => `<p>${c}</p>`).join("")}
      </div>
        <div class="comment-box">
        <input type="text" placeholder="Add a comment...">
        <button class="comment-btn">Post</button>
      </div>
    `;

    feed.appendChild(postDiv);
  });
}

renderPosts(); //function call
 feed.addEventListener("click", (e) => {//adding like and comment UI changes
                const postDiv = e.target.closest(".post");
                if (!postDiv) return;

                const postId = Number(postDiv.dataset.id);
                const post = posts.find(p => p.id === postId);

                //  LIKE TOGGLE
                if (e.target.classList.contains("like-btn")) {
                    post.liked = !post.liked;
                    post.likes += post.liked ? 1 : -1;
                    renderPosts();
                }

                // COMMENT
                if (e.target.classList.contains("comment-btn")) {
                    const input = postDiv.querySelector("input");
                    if (input.value.trim()) {
                        post.comments.push(input.value);
                        input.value = "";
                        renderPosts();
                    }
                }
            });
