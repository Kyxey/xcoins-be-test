import { Schema, model } from "mongoose";
import type { SimulatorSchema } from "../@types/simulator";

const schema = new Schema<SimulatorSchema>(
  {
    profile_id: Schema.Types.ObjectId,
    name: String,
    cryptocurrency: String,
    divisa: String,
    start_date: Date,
    check_date: Date,
    crypto_price_start: Number,
    crypto_price_check: Number,
  },
  {
    timestamps: true,
  }
);

export default model("Simulator", schema);
