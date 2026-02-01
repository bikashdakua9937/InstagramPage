import { Hono } from "hono";
import auth from "./routes/auth";

const app = new Hono<{ Bindings: Env }>();

app.route("/api/auth", auth);

export default app;
