let currentUser = null;
let users = {}; // temporary storage
let posts = [];

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (users[email]) {
    showError("User already exists. Please login.");
    return;
  }

  users[email] = { email, password, name: "", bio: "" };
  showError("Registered successfully! You can now login.");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!users[email] || users[email].password !== password) {
    showError("Invalid email or password.");
    return;
  }

  currentUser = users[email];
  document.getElementById("user-email").textContent = currentUser.email;
  document.getElementById("auth-container").classList.add("hidden");
  document.getElementById("app-container").classList.remove("hidden");
  document.getElementById("name").value = currentUser.name;
  document.getElementById("bio").value = currentUser.bio;
  renderFeed();
}

function logout() {
  currentUser = null;
  document.getElementById("auth-container").classList.remove("hidden");
  document.getElementById("app-container").classList.add("hidden");
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function updateProfile() {
  if (!currentUser) return;
  currentUser.name = document.getElementById("name").value;
  currentUser.bio = document.getElementById("bio").value;
  alert("Profile updated!");
}

function createPost() {
  const content = document.getElementById("post-content").value;
  if (!content) return;

  posts.unshift({
    user: currentUser.name || currentUser.email,
    content
  });

  document.getElementById("post-content").value = "";
  renderFeed();
}

function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "feed-post";
    div.innerHTML = `<strong>${post.user}</strong><p>${post.content}</p>`;
    feed.appendChild(div);
  });
}

function showError(message) {
  document.getElementById("auth-error").textContent = message;
}
