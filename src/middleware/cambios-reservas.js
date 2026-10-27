function validarReemplazoReserva(req, res, next) {
  const datos = req.body;
  const permitidos = [
    "estudiante",
    "email",
    "sala",
    "fecha",
    "turno",
    "personas",
    "estado",
  ];

  for (const campo of Object.keys(datos)) {
    if (!permitidos.includes(campo)) {
      return res.status(400).json({
        error: "El campo " + campo + " no se puede modificar.",
      });
    }
  }

  if (!["pendiente", "confirmada"].includes(datos.estado)) {
    return res.status(400).json({
      error: "Estado debe ser pendiente o confirmada.",
    });
  }

  req.cambiosValidos = {
    ...req.reservaValidada,
    estado: datos.estado,
  };

  return next();
}

function validarActualizacionReserva(req, res, next) {
    const datos = req.body;
}

module.exports = { validarReemplazoReserva };
