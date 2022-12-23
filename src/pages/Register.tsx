import { FormEvent, FormEventHandler, SyntheticEvent, useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      displayName: { value: string };
      file: { files: File };
    };
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        target.email.value,
        target.password.value
      );
      console.log(response);
      console.log("jek");

      const storageRef = ref(storage, target.displayName.value);

      const uploadTask = uploadBytesResumable(storageRef, target.file.files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error: Error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName: target.displayName.value,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: target.displayName.value,
              email: target.email.value,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" name="displayName" />
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            name="file"
          />
          <label htmlFor="file">Add image</label>
          <button>Sign in</button>
          {err && <span>Something went wrong!</span>}
        </form>
        <p>You have an account? Login</p>
      </div>
    </div>
  );
}
