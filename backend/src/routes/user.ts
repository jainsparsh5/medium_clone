import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@jainsparsh17/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      error: "Input Validation Failed",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());


  try {
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env?.JWT_SECRET);
    return c.json({
      jwt,
    });
  } catch (err) {
    return c.json({
      error: "Error While Signing Up",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      error: "Input Validation Failed",
    });
  }
  
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
    },
  });
  if (!user) {
    c.status(403);
    return c.json({
      error: "User not found",
    });
  }

  if (user.password !== body.password) {
    c.status(403);
    return c.json({
      error: "Invalid Password",
    });
  }

  const jwt = await sign({ id: user.id }, c.env?.JWT_SECRET);

  return c.json({
    jwt,
  });
});
