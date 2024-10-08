import dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import passport from "passport";
import session from "express-session";
import pgSession from "connect-pg-simple";
import https from "https";
import fs from "fs";
import path from "path";
import { initializePassport } from "./passport/passportConfig";
import router from "./routes/routes";
import { getDBPool } from "./db/utils";

dotenv.config();
const app = express();
app.use(express.json());

const corsOptions: CorsOptions = {
  origin: [
    "https://127.0.0.1:3000",
    "https://notesaver:3000"
  ],
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

const PgSession = pgSession(session);
const sessionStore = new PgSession({
  pool: getDBPool(),
  tableName: process.env.DB_SESSIONS_TABLE
});
app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(process.env.COOKIE_MINUTES_TTL!) * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/", router);

const port = process.env.BACKEND_PORT!;

const privateKey = fs.readFileSync(path.join(__dirname, "..", "ssl-certs", "cert-key.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "..", "ssl-certs", "cert.pem"), "utf8");
const httpsServer = https.createServer(
  { key: privateKey, cert: certificate },
  app
);
httpsServer.listen(port, () => {
  console.log(`HTTPS server listening on port ${port}`);
});
