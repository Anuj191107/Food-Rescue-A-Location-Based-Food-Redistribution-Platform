import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Read state & city from URL
const params = new URLSearchParams(window.location.search);
const state = params.get("state")?.toLowerCase();
const city = params.get("city")?.toLowerCase();

const list = document.getElementById("list");

// Fetch donations
const snapshot = await getDocs(collection(db, "donations"));

let found = false;

snapshot.forEach((docSnap) => {
  const d = docSnap.data();
  const timeAgo = getTimeAgo(d.createdAt);


  if (d.state === state && d.city === city) {
    found = true;

    // IMPORTANT: HTML is inside template string
    list.innerHTML += `
      <div class="donation-card">
      <span class="badge">Available</span>

        <h3>${d.food}</h3>
<p class="time">Posted ${timeAgo}</p>


        <p><strong>Contact:</strong> ${d.contact}</p>

        <p>
          <strong>Location:</strong>
          <a href="${d.map}" target="_blank">View on Google Maps</a>
        </p>

        <button onclick="pickup('${docSnap.id}')">
          Mark as Picked Up
        </button>
      </div>
    `;
  }
});

// If no donations found
if (!found) {
  list.innerHTML = `
    <div class="donation-card" style="text-align:center;">
      <p>No donations are currently available in your area.</p>
    </div>
  `;
}

function getTimeAgo(timestamp) {
  if (!timestamp) return "recently";

  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute(s) ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour(s) ago`;
  const days = Math.floor(hours / 24);
  return `${days} day(s) ago`;
}


// Remove donation after pickup
window.pickup = async (id) => {
  await deleteDoc(doc(db, "donations", id));
  alert("Donation picked up and removed.");
  location.reload();
};
