import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

const ordersRef = collection(db, "orders");

// Add Order
// The `order` object may contain a custom display number (e.g. field `id`
// holding "SGM-ORD-763002"). Firestore always assigns its own document ID
// via addDoc — that real ID is what must be used for all later
// update/delete operations, and is returned here.
export const addOrder = async (order) => {
  try {
    const docRef = await addDoc(ordersRef, order);
    return docRef.id;
  } catch (error) {
    console.error("Failed to add order to Firestore:", error);
    throw error;
  }
};

// Normalize a Firestore order document into a plain order object.
// IMPORTANT: the real Firestore document ID is placed in `firestoreId`
// and is spread AFTER `...docSnap.data()` so that a same-named `id` field
// stored inside the document (the custom SGM-ORD-xxxxxx order number)
// can never overwrite it. `id`/other custom fields remain available
// exactly as stored, for display purposes only.
const mapOrderDoc = (docSnap) => ({
  ...docSnap.data(),
  firestoreId: docSnap.id
});

export const getOrders = async () => {
  try {
    const q = query(ordersRef, orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapOrderDoc);
  } catch (error) {
    console.error("Failed to fetch orders from Firestore:", error);
    throw error;
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(mapOrderDoc);
  } catch (error) {
    console.error("Failed to fetch user orders from Firestore:", error);
    throw error;
  }
};

// `firestoreId` must be the actual Firestore document ID (docSnap.id),
// never the custom SGM-ORD-xxxxxx order number, or Firestore will throw
// "No document to update".
export const updateOrderStatus = async (firestoreId, status) => {
  console.log("Updating Firestore document:", firestoreId);

  if (!firestoreId) {
    throw new Error("updateOrderStatus: Firestore ID is missing.");
  }

  await updateDoc(doc(db, "orders", firestoreId), {
    status,
  });
};

export const deleteOrder = async (firestoreId) => {
  if (!firestoreId) {
    throw new Error("deleteOrder: a valid Firestore document ID is required.");
  }
  try {
    await deleteDoc(doc(db, "orders", firestoreId));
  } catch (error) {
    console.error(`Failed to delete order ${firestoreId}:`, error);
    throw error;
  }
};