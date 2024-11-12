import type { AppLoadContext } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/node";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cache } from "hono/cache";
import { serveStatic } from "@hono/node-server/serve-static";
import { setCookie } from "hono/cookie";

const isProduction = process.env.NODE_ENV === "production";

const app = new Hono();

// app.use(
//   "/assets/*",
//   serveStatic({
//     root: "./build/client",
//     onFound: (_path, c) => {
//       // Cache assets for 1 year
//       c.header(
//         "Cache-Control",
//         `public, max-age=${60 * 60 * 24 * 365}, immutable`
//       );
//     },
//   })
// );

app.use(
  "*",
  serveStatic({
    root: isProduction ? "./build/client" : "./public",
    onFound: (_path, c) => {
      // Cache all other files for 1 hour
      c.header(
        "Cache-Control",
        `public, max-age=${60 * 60 * 24 * 365}, immutable`
      );
    },
  })
);

app.use(async (c, next) => {
  await next();
  setCookie(c, "X-Powered-By", "Remix and Hono");
  c.header("X-Powered-By", "Remix and Hono");
});

app.all("*", async (c) => {
  const build = await import(
    isProduction ? "./build/server/remix.js" : "virtual:remix/server-build"
  );
  const handler = createRequestHandler(build, process.env.NODE_ENV);
  const remixContext = {
    assistant: c.env,
  } as unknown as AppLoadContext;
  return handler(c.req.raw, remixContext);
});

if (isProduction) {
  serve(
    {
      fetch: app.fetch,
      port: Number.parseInt(process.env.PORT! ?? "4000"),
    },
    ({ address, port }) => {
      console.log(`Starting server on port http://${address}:${port}`);
    }
  );
}

export default app;
