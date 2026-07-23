import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "./firebase";

const productsRef = collection(db, "products");

// Get Products
export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add Product
export const addProduct = async (product) => {
  await addDoc(productsRef, product);
};

// Delete Product
export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};