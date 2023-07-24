import { getAdvanceCashes, storeAdvanceCash } from "../Models/advanceCash.model.js";

export const getAdvanceCashesList = async (req, res) => {
  const advanceCashes = await getAdvanceCashes(req, res);
  return res.json(advanceCashes);
};

export const createAdvanceCash = async (req, res) => {
  const createdAdvanceCash = await storeAdvanceCash(req.body, null, req.user);

  if (!createdAdvanceCash) {
    return res.status(400).json({ message: 'Either the advance cash is already available or the restaurant settings not found!' })
  }

  return res.json({ advanceCash: createdAdvanceCash });
};