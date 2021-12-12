import mongoose from "mongoose";
import Profile from "../models/Profile";
import Simulator from "../models/Simulator";
import Favorite from "../models/Favorite";
import { DBURL } from "../configs";

(async () => {
  mongoose.connect(DBURL);

  const profile = new Profile({
    name: "String",
    nickname: "String",
    email: "test@test.test",
    capital: 123,
    divisa: "String",
    preferred_cryptocurrency: "String",
  });
  const savedProfile = await profile.save();

  const simulator = new Simulator({
    profile_id: savedProfile._id,
    name: "String",
    start_date: "01/05/2021",
    check_date: "01/05/2021",
    cryptocurrency: "String",
    divisa: "String",
    crypto_price_start: 123,
    crypto_price_check: 123,
  });
  await simulator.save();

  const favorite = new Favorite({
    profile_id: savedProfile._id,
    name: "String",
    favorites: ["String", "String", "String"],
  });
  await favorite.save();

  mongoose.disconnect();
})();
