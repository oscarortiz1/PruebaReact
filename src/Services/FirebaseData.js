import fb from "../firebase";
import "firebase/firebase-database";
import "firebase/firestore";
import "firebase/firebase-firestore";

const _firestore = fb.firestore();
const _storage = fb.storage();
const competitorCollectionRef = _firestore.collection("Competidores");

export const addCompetitor = async (
  competitor,
  scoreSetOne,
  scoreSetTwo,
  scoreSetThree,
  scoreSetFour,
  scoreSetFive,
  score
) => {
  const request = await competitorCollectionRef.add({
    name: competitor,
    scoreSetOne: scoreSetOne,
    scoreSetTwo: scoreSetTwo,
    scoreSetThree: scoreSetThree,
    scoreSetFour: scoreSetFour,
    scoreSetFive: scoreSetFive,
    score: score,
  });
  return request;
};

export var getCompetitor = async (callback) => {
  return competitorCollectionRef.onSnapshot(callback);
};

export const handleUpload = async (image) => {
  const uploadTask = await _storage.ref(`images/${image.name}`).put(image);
  return uploadTask
};
