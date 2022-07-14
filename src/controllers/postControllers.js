import { db } from "../databases/mongodb.js";
import dayjs from "dayjs";

async function pollPost(req, res) {
  const { title, expireAt } = req.body;

  try {
    let date = expireAt;

    if (title === "") return res.sendStatus(422);

    if (expireAt === "") {
        const defaultPoll = dayjs().add("30", "day");
        date = defaultPoll.format("YYYY-MM-DD HH:mm");
    }

    await db.collection("polls").insertOne({ title, expireAt: date });
    res.sendStatus(201);

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { pollPost };