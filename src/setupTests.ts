import { rest } from "msw";
// @ts-ignore
import campaigns from "../database.json"
import { setupServer } from "msw/node";
import { afterEach, beforeAll, afterAll } from "vitest";

// const campaigns =
export const restHandlers = [
  rest.get("http://localhost:3000/campaigns", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(campaigns.campaigns))
  }),
  rest.post('http://localhost:3000/campaigns', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(await req.json()))
  }),
  rest.delete('http://localhost:3000/campaigns/:id', async (req, res, ctx) => {
    return res(ctx.status(200))
  })
]

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error"}))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
