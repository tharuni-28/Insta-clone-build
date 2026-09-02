import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc
} from "firebase/firestore";

function Post() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(collection(db, "posts"));

      setPosts(
        data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    };

    fetchData();
  }, []);

  // ❤️ LIKE
  const handleLike = async (id, likes) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
      likes: (likes || 0) + 1
    });
    window.location.reload();
  };

  // 💬 COMMENT
  const addComment = async (id) => {
    if (!comment) return;

    const postRef = doc(db, "posts", id);

    await updateDoc(postRef, {
      comments: arrayUnion(comment)
    });

    setComment("");
    window.location.reload();
  };

  // 🗑 DELETE
  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.reload();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Instagram Clone</h2>

      {posts.map((p) => (
        <div className="post" key={p.id}>

          {/* HEADER */}
          <div className="post-header">
           <img className="profile" src={p.profilePic} alt="profile" />
            <span className="username">
              {p.username || "user"}
            </span>
          </div>

          {/* IMAGE */}
          <img src={p.imageUrl} alt="post" />

          {/* ACTIONS */}
          <div className="actions">
            <span onClick={() => handleLike(p.id, p.likes)}>❤️</span>
            <span>💬</span>
          </div>

          {/* LIKES */}
          <p className="likes">{p.likes || 0} likes</p>

          {/* CAPTION */}
          <p><b>{p.username}</b> {p.caption}</p>

          {/* COMMENTS */}
          {p.comments?.map((c, i) => (
            <p key={i} className="comment">💬 {c}</p>
          ))}

          {/* ADD COMMENT */}
          <div className="comment-box">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => addComment(p.id)}>Post</button>
          </div>

          {/* DELETE */}
          <button className="delete" onClick={() => deletePost(p.id)}>
            🗑 Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default Post;