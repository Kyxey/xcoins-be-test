import express from "express";
import { PORT, DBURL, CORS_ORIGINS, NODE_ENV } from "./configs";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import FavoriteRouter from "./routes/favorite.router";
import ProfileRouter from "./routes/profile.router";
import SimulatorRouter from "./routes/simulator.router";

const app = express();

async function main() {
  await mongoose.connect(DBURL);
  console.log(`Connected to DB ${DBURL}`);

  app.use(cors({ origin: CORS_ORIGINS }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(FavoriteRouter);
  app.use(ProfileRouter);
  app.use(SimulatorRouter);

  if (NODE_ENV !== "test") {
    app.listen(PORT, () =>
      console.log(`✅  Ready on port http://localhost:${PORT}`)
    );
  }
}

main();

export default app;
