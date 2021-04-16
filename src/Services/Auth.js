import fb from "../firebase";

const _auth = fb.auth();

export const singIn = async (email, password) => {
  const request = await _auth.signInWithEmailAndPassword(email, password);
  document.location.reload();
  return request;
};

export const onStateChange = (callback) => {
  return _auth.onAuthStateChanged((state) => {
    callback(state);
  });
};

export const signOutUser = async () =>{
 await _auth.signOut();
 document.location.reload();
}
