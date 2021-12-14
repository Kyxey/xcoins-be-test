import { Router } from "express";
import Joi from "joi";
import { handleError } from "../utils/error";
import Favorite from "../models/Favorite";

const router = Router();

router.get("/api/favorite", async (_req, res) => {
  const favorite = await Favorite.find().lean();
  console.log(favorite);
  res.json({ favorite });
});

router.get("/api/favorite/:profile_id", async (req, res) => {
  const schema = Joi.object().keys({
    profile_id: Joi.string().required(),
  });

  const reqParams = req.params;

  const { error } = schema.validate(reqParams);

  if (error) {
    return handleError(error);
  }

  console.log(reqParams);
  const data = await Favorite.find(reqParams);
  res.json(data);
});

export default router;
