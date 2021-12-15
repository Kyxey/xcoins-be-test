import Request from "supertest";
import app from "../src";
import Joi from "joi";

const profileSchema = Joi.object().keys({
  _id: Joi.string().required(),
  name: Joi.string().min(3).max(50),
  nickname: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  capital: Joi.number(),
  divisa: Joi.string(),
  preferred_cryptocurrency: Joi.string().required().min(3).max(6),
  __v: Joi.number().required(),
});

const agent = Request.agent(app);

describe("Profile", () => {
  it("Should get all profiles", async () => {
    const res = await agent.get("/api/profile");

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const schema = Joi.object().keys({
      profile: Joi.array().items(profileSchema),
    });

    const { error } = schema.validate(res.body);

    expect(error).toBeUndefined();
  });

  it("Should get an specific profile", async () => {
    const sendObject = {
      email: "test@gmail.com",
      nickname: "String",
    };
    const res = await agent.post("/api/profile").send(sendObject);

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = profileSchema.validate(res.body);

    expect(error).toBeUndefined();

    expect(res.body.email).toEqual(sendObject.email);
    expect(res.body.nickname).toEqual(sendObject.nickname);
  });

  it("Should create a new profile", async () => {
    const sendObject = {
      name: "Test",
      nickname: "Test",
      email: "test1@gmail.com",
      capital: 124,
      divisa: "Strings",
      preferred_cryptocurrency: "string",
    };
    const res = await agent.post("/api/profile").send(sendObject);

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = profileSchema.validate(res.body);

    expect(error).toBeUndefined();
  });
});
