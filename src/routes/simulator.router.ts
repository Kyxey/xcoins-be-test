import { router } from "../utils/router";
import Simulator from "../models/Simulator";
import Joi from "joi";
import { handleError } from "../utils/error";

router.get("/api/simulator", async (_req, res) => {
  const simulator = await Simulator.find().lean();
  console.log(simulator);
  res.json({ simulator });
});

router.get("/api/simulator/:profile_id", async (req, res) => {
  const schema = Joi.object().keys({
    profile_id: Joi.string().required(),
  });

  const reqParams = req.params;

  const { error } = schema.validate(reqParams);

  if (error) {
    return handleError(error);
  }

  console.log("========== ");
  console.log(reqParams);
  const data = await Simulator.find(reqParams);
  res.json(data);
});

router.post("/api/simulator", async (req, res) => {
  const schema = Joi.object().keys({
    profile_id: Joi.string().required(),
    name: Joi.string().required().min(3).max(20).required(),
    cryptocurrency: Joi.string().required().min(3).max(6).required(),
    crypto_price_start: Joi.number().positive().required(),
    crypto_price_check: Joi.number().positive().required(),
    start_date: Joi.date().required(),
    check_date: Joi.date().required(),
    divisa: Joi.string().required(),
  });

  const reqBody = req.body;

  const { error } = schema.validate(reqBody);

  if (error) {
    return handleError(error);
  }

  console.log(reqBody);
  const simulator = await Simulator.create(reqBody);
  res.json(simulator);
});
