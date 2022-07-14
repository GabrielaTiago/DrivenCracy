import { db } from "../databases/mongodb.js";

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

export { getPolls, getChoices };
