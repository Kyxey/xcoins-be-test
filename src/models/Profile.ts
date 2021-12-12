import { Schema, model } from "mongoose";
import type { ProfileSchema } from "../@types/profile";

const schema = new Schema<ProfileSchema>({
  name: String,
  nickname: String,
  email: String,
  capital: Number,
  divisa: String,
  preferred_cryptocurrency: String,
});

export default model("Profile", schema);
