const { db } = require("./firebase.js");
const {
  doc,
  getDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} = require("firebase/firestore");
require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once("ready", (c) => {
  console.log(`Ready!`);
});

client.on("message", (msg) => {
  if (msg.content === "gm")
    updateCscore(msg.author.username, msg.author.discriminator);
});

client.login(token);

const updateUserData = async (address, updatedCscore) => {
  const docRef = doc(db, "users", address);
  await updateDoc(docRef, {
    cscore: updatedCscore,
  });
};

const fetchUserData = async (address) => {
  const docRef = doc(db, "users", address);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  } else {
    console.log("No such document!");
  }
};

// need to hook up with the database to get relevant contract addresses
async function updateCscore(name, discriminator) {
  const username = `${name}#${discriminator}`;

  const q = query(collection(db, "users"), where("discord", "==", username));
  const querySnapshot = await getDocs(q);
  console.log("querySnapshot: ", querySnapshot.docs);
  let data;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = doc;
  });

  // doc.data() is never undefined for query doc snapshots
  // const querySnapshot = await getDocs(collection(db, "contracts"));
  // for (let i = 0; i < querySnapshot.docs.length; i++) {
  //   const doc = querySnapshot.docs[i];
  //   const data = doc.data();
  //   console.log(data.address);
  //   // if the contract has users
  //   if (!data.users) continue;

  console.log("updating cscore for user:", data.id);
  const existingUserData = await fetchUserData(data.id);
  const oldCscore = existingUserData.cscore;
  await updateUserData(data.id, oldCscore + 1);
}
