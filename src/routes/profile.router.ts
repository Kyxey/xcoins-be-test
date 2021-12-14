import { Router } from "express";
import Joi from "joi";
import Profile from "../models/Profile";
import { handleError } from "../utils/error";

const router = Router();

router.get("/api/profile", async (_req, res) => {
  const profile = await Profile.find().lean();
  console.log(profile);
  res.json({ profile });
});

router.post("/api/profile", async (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(50),
    nickname: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    capital: Joi.number(),
    divisa: Joi.string(),
    preferred_cryptocurrency: Joi.string().required().min(3).max(6),
  });

  const reqBody = req.body;

  const { error } = schema.validate(reqBody);

  if (error) {
    return handleError(error);
  }

  const { email, nickname } = reqBody;

  const profile =
    (await Profile.findOne({
      $or: [{ email }, { nickname }],
    }).exec()) || (await Profile.create(reqBody));

  res.json(profile);
});

export default router;
