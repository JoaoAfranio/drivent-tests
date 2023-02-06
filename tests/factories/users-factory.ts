import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "@/config";
import { generateValidToken } from "../helpers";
import { createEnrollmentWithAddress } from "./enrollments-factory";
import { createTicket, createTicketType } from "./tickets-factory";

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

export async function createUserWithTicket(params: CreateUserWithTicket): Promise<string> {
  const user = await createUser();
  const token = await generateValidToken(user);
  const enrollment = await createEnrollmentWithAddress(user);
  const ticketType = await createTicketType({ includesHotel: params.includesHotel, isRemote: params.isRemote });
  await createTicket(enrollment.id, ticketType.id, params.statusTicket);

  return token;
}

type CreateUserWithTicket = { includesHotel: boolean; isRemote: boolean; statusTicket: "RESERVED" | "PAID" };
