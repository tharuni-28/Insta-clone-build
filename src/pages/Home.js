import { useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Upload from "../components/upload";
import Post from "../components/post";

function Home() {
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // 🔥 Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // 🔥 Save profile (Firebase)
  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Login first");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      photoURL: photoURL
    });

    alert("Profile saved!");
  };

  // 🔥 Theme toggle
  const toggleTheme = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);

  // 🔥 FULL RESET METHOD (100% WORK)
  document.body.className = newMode ? "dark" : "";

  localStorage.setItem("theme", newMode ? "dark" : "light");
};

  // 🔥 Load saved theme on start
  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.className = "dark";
    setDarkMode(true);
  } else {
    document.body.className = "";
  }
}, []);

  return (
    <div>

      {/* 🔥 HEADER */}
      <div className="header">
        <h2>Instagram</h2>

        <div>
          <button onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* 🔥 PROFILE UPDATE */}
      <div className="profile-box">
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Profile Image URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />

        <button onClick={saveProfile}>Save</button>
      </div>

      {/* 🔥 EXISTING UI */}
      <Upload />
      <Post />

    </div>
  );
}

export default Home;