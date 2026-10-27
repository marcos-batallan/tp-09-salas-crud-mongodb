const express = require("express");
const { validarReemplazoReserva } = require("../middleware/cambios-reservas");

function crearRouterReservasApi(controladorReservas, validarReserva) {
  const router = express.Router();

  router.get("/", controladorReservas.listarApi);
  router.get("/:id", controladorReservas.obtenerApi);
  router.post("/", validarReserva, controladorReservas.crearApi);
  router.delete("/:id", controladorReservas.eliminarApi);
  router.put(
    "/:id",
    validarReserva,
    validarReemplazoReserva,
    controladorReservas.reemplazarApi,
  );

  return router;
}

module.exports = { crearRouterReservasApi };
