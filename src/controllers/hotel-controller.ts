import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await hotelService.getAllHotels(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === "RequiredPaymentError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}

export async function getHotelAndRoomsById(req: AuthenticatedRequest, res: Response) {
  const idHotel = Number(req.params.idHotel);
  const { userId } = req;

  if (!idHotel) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const result = await hotelService.getHotelAndRoomsById(idHotel, userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "RequiredPaymentError") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}
