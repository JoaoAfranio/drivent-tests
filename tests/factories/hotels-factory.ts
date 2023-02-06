import faker from "@faker-js/faker";
import { Hotel } from "@prisma/client";
import { prisma } from "@/config";

import { createRoom } from "./rooms-factory";

export function createHotel(params: Partial<Hotel> = {}): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: params.name || faker.company.companyName(),
      image: params.image || faker.image.imageUrl(),
    },
  });
}

export async function createHotelWithRoom() {
  const hotel = await createHotel();
  const room = await createRoom(hotel.id);

  return {
    id: hotel.id,
    name: hotel.name,
    image: hotel.image,
    createdAt: hotel.createdAt,
    updatedAt: hotel.updatedAt,
    Rooms: [room],
  };
}
