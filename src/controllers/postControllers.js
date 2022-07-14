import { db } from "../databases/mongodb.js";
import { ObjectId } from "mongodb";
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

async function pollChoices(req, res) {
  const { title, poolId } = req.body;

  try {
    const existingPoll = await db.collection("polls").findOne(ObjectId(poolId));

    if (!existingPoll) return res.sendStatus(404);

    if (title === "") return res.sendStatus(422);

    const choice = await db.collection("choices").findOne({ title: title });

    if (choice) return res.sendStatus(409);

    const inicialDate = Date.parse(existingPoll.expireAt);
    const currentDate = Date.parse(dayjs().format("YYYY-MM-DD HH:mm"));
    const timeDifference = inicialDate - currentDate;

    if (timeDifference <= 0) return res.sendStatus(403);

    await db.collection("choices").insertOne({ title, poolId });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { pollPost, pollChoices };
