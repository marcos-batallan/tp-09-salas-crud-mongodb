const express = require("express");

function crearRouterReservasApi(controladorReservas, validarReserva) {
  const router = express.Router();

  router.get("/", controladorReservas.listarApi);
  router.get("/:id", controladorReservas.obtenerApi);
  router.post("/", validarReserva, controladorReservas.crearApi);
  router.delete("/:id", controladorReservas.eliminarApi);

  return router;
}

module.exports = { crearRouterReservasApi };
