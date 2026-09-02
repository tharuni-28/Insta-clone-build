import React, { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";

function Comment({ postId }) {
  const [text, setText] = useState("");

  const addComment = async () => {
    await addDoc(collection(db, "comments"), {
      postId,
      text
    });
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={addComment}>Comment</button>
    </div>
  );
}

export default Comment;