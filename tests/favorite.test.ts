import Request from "supertest";
import App from "../src/api";
import Joi from "joi";

const favoriteSchema = Joi.object().keys({
  _id: Joi.string().required(),
  profile_id: Joi.string().required(),
  name: Joi.string().required(),
  favorites: Joi.array().items(Joi.string()),
});

describe("Favorite", () => {
  it("Should get all favorites", async () => {
    const res = await Request(App).get("/api/favorite");

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const schema = Joi.object().keys({
      favorite: Joi.array().items(favoriteSchema),
    });

    const { error } = schema.validate(res.body);

    expect(error).toBeNull();
  });

  it("Should get favorite of profile ID", async () => {
    const profileRes = await Request(App).get("/api/profile");
    const res = await Request(App).get(
      `/api/favorite/${profileRes.body.profile[0]._id}`
    );

    expect(res.statusCode >= 200 && res.statusCode < 300).toBeTruthy();

    const { error } = favoriteSchema.validate(res.body);

    expect(error).toBeNull();
  });
});
