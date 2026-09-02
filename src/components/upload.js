import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";

function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // Show selected image immediately
    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  };

  const uploadPost = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!caption) {
      alert("Please enter a caption");
      return;
    }

    try {
      /*
        Firebase Storage is currently unavailable
        in your Firebase project.

        So for now we use the local preview URL
        to display the selected image.
      */

      await addDoc(collection(db, "posts"), {
        imageUrl: preview,
        username: username || "user",
        profilePic:
          profilePic ||
          "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        caption: caption,
        likes: 0,
        comments: []
      });

      alert("Post uploaded successfully!");

      setImage(null);
      setPreview("");
      setCaption("");
      setUsername("");
      setProfilePic("");

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload">

      <h3>Create New Post</h3>

      {/* USERNAME */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* PROFILE IMAGE */}
      <input
        type="text"
        placeholder="Profile Pic URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
      />

      {/* IMAGE FILE */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "10px"
            }}
          />
        </div>
      )}

      {/* CAPTION */}
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* UPLOAD BUTTON */}
      <div>
        <button onClick={uploadPost}>
          Upload
        </button>
      </div>

    </div>
  );
}

export default Upload;