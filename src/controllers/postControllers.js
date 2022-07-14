import { db } from "../databases/mongodb.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

async function pollPost(req, res) {
  const { title, expireAt } = req.body;
  let date = expireAt;

  if (title === "") return res.sendStatus(422);

  if (expireAt === "") {
    const defaultPoll = dayjs().add("30", "day");
    date = defaultPoll.format("YYYY-MM-DD HH:mm");
  }

  try {
    const pollTitle = await db.collection("polls").findOne({ title: title });

    if (pollTitle) return res.sendStatus(409);

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

    await db
      .collection("choices")
      .insertOne({ title, poolId: ObjectId(poolId) });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function pollVote(req, res) {
  const { id } = req.params;
  const creationDate = dayjs().format("YYYY-MM-DD HH:mm");

  try {
    const vote = await db.collection("choices").findOne(ObjectId(id));

    if (!vote) res.sendStatus(404);

    const existingPoll = await db.collection("polls").findOne(ObjectId(poolId));

    if (!existingPoll) return res.sendStatus(404);

    const inicialDate = Date.parse(existingPoll.expireAt);
    const currentDate = Date.parse(creationDate);
    const timeDifference = inicialDate - currentDate;

    if (timeDifference <= 0) return res.sendStatus(403);

    await db.collection("vote").insertOne({
      createdAt: creationDate,
      choiceId: ObjectId(id),
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { pollPost, pollChoices, pollVote };
