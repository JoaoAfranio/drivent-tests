import { notFoundError, requiredPaymentError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketService from "../tickets-service";

async function getAllHotels(idUser: number) {
  await validateTicketHotel(idUser);

  const result = await hotelRepository.findAllHotels();

  return result;
}

async function validateTicketHotel(idUser: number) {
  const ticketResult = await ticketService.getTicketByUserId(idUser);

  if (
    ticketResult.status === "RESERVED" ||
    ticketResult.TicketType.isRemote === true ||
    ticketResult.TicketType.includesHotel === false
  ) {
    throw requiredPaymentError();
  }
}

async function getHotelAndRoomsById(idHotel: number, idUser: number) {
  await validateTicketHotel(idUser);

  const result = await hotelRepository.getHotelAndRoomsById(idHotel);

  if (!result) {
    throw notFoundError();
  }

  return result;
}

const hotelService = {
  getAllHotels,
  getHotelAndRoomsById,
};

export default hotelService;
