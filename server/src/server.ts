import { PrismaClient } from "@prisma/client";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";

const app = fastify();
const prisma = new PrismaClient()

const urls = ["http://localhost:3000"];

app.register(cors, {
  origin: urls,
  methods: ['GET', 'POST'],
  credentials: true
})

app.get('/users/attributes', async () => {
  const attributes =  await prisma.usersAttributes.findMany()
  return attributes;
})

app.get('/users/attributes/:page', async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = request.params as { page: string };
  const attributes = await prisma.usersAttributes.findMany({
    skip: parseInt(page) * 10,
    take: 10,
  })
  return reply.send(attributes);
})

app.get('/users/attributes/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const count =  await prisma.usersAttributes.count()
  return reply.send(count);
})

app.get('/institutes/attributes', async (request: FastifyRequest, reply: FastifyReply) => {
  const attributes =  await prisma.instituteAttributes.findMany()
  return reply.send(attributes);
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333');
})