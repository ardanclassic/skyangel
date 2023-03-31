import { db } from '../firebase/config';
import { collection, setDoc, onSnapshot, doc, query, orderBy, limit } from "firebase/firestore";

const playersQuery = query(collection(db, "players"), orderBy("stars", "desc"), limit(10));

export const getAllPlayers = async () => {
  return new Promise(async (resolve, reject) => {
    onSnapshot(playersQuery, (docsnap) => {
      const dataplayer = []
      docsnap.forEach(doc => dataplayer.push(doc.data()))
      resolve(dataplayer);
    });
  })
}

export const addPlayer = async (dataPlayer) => {
  // addDoc(collection(db, "players"), dataPlayer);
  await setDoc(doc(db, 'players', dataPlayer.name), dataPlayer);
}
