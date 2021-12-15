import Request from "supertest";
import app from "../src";
import Joi from "joi";

const favoriteSchema = Joi.array().items(
  Joi.object().keys({
    _id: Joi.string().required(),
    profile_id: Joi.string().required(),
    name: Joi.string().required(),
    favorites: Joi.array().items(Joi.string()),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    __v: Joi.number().required(),
  })
);

const agent = Request.agent(app);

describe("Favorite", () => {
  it("Should get all favorites", async () => {
    const res = await agent.get("/api/favorite");

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const schema = Joi.object().keys({
      favorite: favoriteSchema,
    });

    const { error } = schema.validate(res.body);

    expect(error).toBeUndefined();
  });

  it("Should get favorite of profile ID", async () => {
    const profileRes = await agent.get("/api/profile");
    const res = await agent.get(
      `/api/favorite/${profileRes.body.profile[0]._id}`
    );

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = favoriteSchema.validate(res.body);

    expect(error).toBeUndefined();
  });
});
