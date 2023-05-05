import { React, useEffect, useRef, useState } from "react";
import Message from "./Components/Message";
import { app } from "./firebase";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

const App = () => {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        name: user.displayName,
        email: user.email,
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      //Once the mesage is Sent the input tag becomes empty again.
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));

    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unsubscribeForMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsubscribe();
      unsubscribeForMessage();
    };
  }, []);

  return (
    <>
      {user ? (
        <div className="Components flex flex-col  h-screen sm:bg-blue-700 sm:w-3/4 sm:mx-auto sm:p-4">
          <div className="Button bg-blue-500 flex justify-center w-full    rounded-sm sm:">
            <button
              onClick={logoutHandler}
              className="bg-red-500 my-2 px-4 text-lg rounded-md text-white sm: "
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col h-full w-full bg-hero p-1 overflow-y-auto no-scrollbar">
            {messages.map((item) => (
              <Message
                key={item.id}
                user={item.uid === user.uid ? "me" : "other"}
                text={item.text}
                uri={item.uri}
              />
            ))}
            <div ref={divForScroll}></div>
          </div>

          <form onSubmit={submitHandler} className="flex w-full ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="name"
              placeholder="Enter a message..."
              className="border w-full"
            />
            <button
              className="bg-green-500 text-lg text-white py-2 rounded-md px-5 sm:rounded-none"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center my-56 text-white ">
          <button
            onClick={loginHandler}
            className=" bg-blue-400 py-4 px-5 text-6xl rounded-lg hover:bg-blue-500 "
          >
            Sign in with Google
          </button>
        </div>
      )}
    </>
  );
};

export default App;
