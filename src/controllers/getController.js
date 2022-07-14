import { db } from "../databases/mongodb.js";

async function getPolls(req, res) {
  const allPolls = await db.collection("polls").find().toArray();
  res.status(200).send(allPolls);
}

export { getPolls };