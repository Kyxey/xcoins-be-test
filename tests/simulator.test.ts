import Request from "supertest";
import app from "../src";
import Joi from "joi";

const simulatorSchema = Joi.object().keys({
  _id: Joi.string().required(),
  profile_id: Joi.string().required(),
  name: Joi.string().required().min(3).max(20).required(),
  cryptocurrency: Joi.string().required().min(3).max(6).required(),
  crypto_price_start: Joi.number().positive().required(),
  crypto_price_check: Joi.number().positive().required(),
  start_date: Joi.date().required(),
  check_date: Joi.date().required(),
  divisa: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
  __v: Joi.number().required(),
});
const agent = Request.agent(app);

describe("Simulator", () => {
  it("Should get all simulators", async () => {
    const res = await agent.get("/api/simulator");

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const schema = Joi.object().keys({
      simulator: Joi.array().items(simulatorSchema),
    });

    const { error } = schema.validate(res.body);

    expect(error).toBeUndefined();
  });

  it("Should get simulator of profile ID", async () => {
    const profileRes = await agent.get("/api/profile");
    const res = await agent.get(
      `/api/simulator/${profileRes.body.profile[0]._id}`
    );

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = Joi.array().items(simulatorSchema).validate(res.body);

    expect(error).toBeUndefined();
  });

  it("Should create a new simulator for an specific profile ID", async () => {
    const profileRes = await agent.get("/api/profile");
    const sendObject = {
      profile_id: profileRes.body.profile[0]._id,
      name: "Test",
      start_date: "01/06/2021",
      check_date: "01/06/2021",
      cryptocurrency: "Test",
      divisa: "Test",
      crypto_price_start: 124,
      crypto_price_check: 124,
    };
    const res = await agent.post("/api/simulator").send(sendObject);

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = simulatorSchema.validate(res.body);

    expect(error).toBeUndefined();
  });
});
