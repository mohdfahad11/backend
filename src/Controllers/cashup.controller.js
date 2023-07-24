import { getAvailableCashupDates, getCashups, storeCashup } from '../Models/cashup.model.js'

export const getCashupList = async (req, res) => {
  const cashups = await getCashups(req, res);
  return res.json(cashups);
};

export const createCashup = async (req, res) => {
  const cashup = await storeCashup(req.body, res, req.user);

  if (!cashup) {
    return res.status(400).json({ message: 'Either the advance cash is already available or the restaurant settings not found!' })
  }

  return res.json({ cashup });
};

export const getCashupDates = async (req, res) => {
  const cashupDates = await getAvailableCashupDates(req.query, res);
  return res.json({ cashupDates });
}