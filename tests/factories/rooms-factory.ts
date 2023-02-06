import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { Room } from "@prisma/client";

export function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.random.word(),
      capacity: Number(faker.random.numeric(2)),
      hotelId,
    },
  });
}
