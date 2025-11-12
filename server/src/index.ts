import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.html(`<h1>AI Knowledge Hub Assistant Server is Running</h1>`);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
