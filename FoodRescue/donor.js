import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("donorForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");

  try {
    await addDoc(collection(db, "donations"), {
      name: inputs[0].value,
      food: inputs[1].value,
      contact: inputs[2].value,
      state: inputs[3].value.toLowerCase(),
      city: inputs[4].value.toLowerCase(),
      map: inputs[5].value,
      createdAt: Date.now()
    });

    alert("Donation submitted successfully!");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Error submitting donation. Check console.");
  }
});
