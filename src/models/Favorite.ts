import { Schema, model } from "mongoose";
import type { FavoriteSchema } from "../@types/favorite";

const schema = new Schema<FavoriteSchema>(
  {
    profile_id: String,
    name: String,
    favorites: Array,
  },
  {
    timestamps: true,
  }
);

export default model("Favorite", schema);
