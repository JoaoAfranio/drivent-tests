import { Router } from "express";
import { getAllHotels, getHotelAndRoomsById } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken).get("/", getAllHotels).get("/:idHotel", getHotelAndRoomsById);

export { hotelsRouter };
