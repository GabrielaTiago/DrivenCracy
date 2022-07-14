import { ObjectId } from "mongodb";
import { db } from "../databases/mongodb.js";
import { count } from "../middleware/counter.js";

async function getPolls(req, res) {
  try {
    const allPolls = await db.collection("polls").find().toArray();
    res.status(200).send(allPolls);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function getChoices(req, res) {
  const { id } = req.params;

  try {
    const choicesForThePoll = await db
      .collection("choices")
      .find({ poolId: id })
      .toArray();

    res.status(200).send(choicesForThePoll);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function getResult(req, res) {
  const { id } = req.params;

  try {
    const poll = await db.collection("polls").findOne(ObjectId(id));

    if (!poll) return res.sendStatus(404);

    await db.collection("polls").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          result: {
            title: poll.title,
            votes: count,
          },
        },
      }
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export { getPolls, getChoices, getResult };
