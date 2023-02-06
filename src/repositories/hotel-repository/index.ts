import { prisma } from "@/config";

async function findAllHotels() {
  return prisma.hotel.findMany();
}

async function getHotelAndRoomsById(idHotel: number) {
  return prisma.hotel.findFirst({
    where: {
      id: idHotel,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  findAllHotels,
  getHotelAndRoomsById,
};

export default hotelRepository;
