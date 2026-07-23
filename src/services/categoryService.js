import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function getCategories() {
  try {
    const snapshot = await getDocs(collection(db, "categories"));

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting categories:", error);
    return [];
  }
}