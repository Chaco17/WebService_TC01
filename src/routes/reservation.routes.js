const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");

// Endpoints de reservas
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationById);
router.delete("/:id", reservationController.cancelReservation);

router.get("/user/:id", reservationController.getReservationsByUser);
router.get("/restaurant/:id", reservationController.getReservationsByRestaurant);

module.exports = router;
