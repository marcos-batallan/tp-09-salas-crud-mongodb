# TP09 — CRUD de reservas de salas con MongoDB

Aplicación web desarrollada con **Node.js, Express y MongoDB**, que permite administrar reservas de salas de estudio mediante una interfaz HTML y una API REST.

El proyecto continúa el desarrollo modular iniciado en los trabajos prácticos anteriores e incorpora operaciones CRUD completas sobre MongoDB Atlas, validaciones de datos, manejo centralizado de errores y persistencia de la información.

## Tecnologías utilizadas

- **Node.js:** >= 22.13.0
- **Express:** 5.2.1
- **Mongoose:** 9.11.2
- **EJS:** 6.0.1
- **express-ejs-layouts:** 2.5.1
- **Morgan:** 1.12.1
- **Prettier:** 3.9.9
- **ESLint:** 10.12.0
- **MongoDB Atlas:** base de datos `reservas_salas_u9`

## Requisitos previos

- Node.js 22.13.0 o superior.
- npm.
- Una cuenta y un clúster de MongoDB Atlas.
- Acceso de red al clúster de MongoDB Atlas.

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/marcos-batallan/tp-09-salas-crud-mongodb.git
```

Ingresar a la carpeta:

```bash
cd tp-09-salas-crud-mongodb
```

Instalar las dependencias:

```bash
npm install
```

## Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u9?retryWrites=true&w=majority
```

Reemplazar `USUARIO`, `CLAVE` y `HOST` por los datos correspondientes al clúster de MongoDB Atlas.

**Importante:** el archivo `.env` contiene información privada y está excluido del repositorio mediante `.gitignore`. No debe compartirse ni subirse a GitHub.

La aplicación utiliza los servidores DNS `8.8.8.8` y `1.1.1.1` para resolver las consultas DNS de MongoDB Atlas.

## Ejecución

Para iniciar la aplicación en el entorno local:

```bash
node --env-file=.env src/index.js
```

También se encuentra disponible el siguiente script:

```bash
npm run start:local
```

La aplicación queda disponible en:

```text
http://localhost:3000
```

El puerto puede modificarse mediante la variable `PORT`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia la aplicación sin cargar automáticamente `.env`. |
| `npm run start:local` | Inicia la aplicación cargando las variables de `.env`. |
| `npm run format` | Aplica Prettier sobre `src` y `scripts`. |
| `npm run format:check` | Comprueba el formato del código. |
| `npm run lint` | Ejecuta ESLint sobre `src` y `scripts`. |
| `npm run check` | Ejecuta la comprobación de formato y ESLint. |

## Estructura del proyecto

```text
tp-09-salas-crud-mongodb/
│
├── public/
│   ├── css/
│   │   └── estilos.css
│   └── img/
│       ├── favicon.svg
│       └── salas-estudio.svg
│
├── scripts/
│   ├── comprobar-conexion.js
│   ├── crear-reservas.js
│   ├── listar-reservas.js
│   └── validar-reserva.js
│
├── src/
│   ├── config/
│   │   ├── base-datos.js
│   │   └── entorno.js
│   │
│   ├── controladores/
│   │   └── reservas.js
│   │
│   ├── middleware/
│   │   ├── cambios-reservas.js
│   │   ├── errores.js
│   │   ├── reservas.js
│   │   └── solicitudes.js
│   │
│   ├── modelos/
│   │   └── reserva.js
│   │
│   ├── rutas/
│   │   ├── reservas-api.js
│   │   └── reservas.js
│   │
│   ├── servicios/
│   │   ├── reservas.js
│   │   └── reservas-mongo.js
│   │
│   ├── app.js
│   └── index.js
│
├── views/
│   ├── layouts/
│   │   └── main.ejs
│   ├── partials/
│   │   ├── encabezado.ejs
│   │   └── pie.ejs
│   ├── reservas/
│   │   ├── detalle.ejs
│   │   ├── lista.ejs
│   │   └── nueva.ejs
│   ├── inicio.ejs
│   └── no-encontrado.ejs
│
├── .env.example
├── .gitignore
├── eslint.config.js
├── package.json
└── package-lock.json
```

## Arquitectura y responsabilidades

El proyecto utiliza una organización modular para separar las responsabilidades de la aplicación.

### Punto de entrada

- `src/index.js`: lee la configuración, establece la conexión con MongoDB, instancia el servicio de reservas, crea la aplicación Express e inicia el servidor. También administra el cierre ordenado del servidor y de la conexión a la base de datos.

### Configuración

- `src/config/entorno.js`: valida las variables de entorno y obtiene la configuración del puerto, formato de registros y URI de MongoDB.
- `src/config/base-datos.js`: administra la conexión y desconexión de Mongoose.

### Aplicación

- `src/app.js`: configura Express, EJS, layouts, Morgan, archivos estáticos, parsers y montaje de rutas. También configura las respuestas para rutas inexistentes y el middleware centralizado de errores.

### Controladores

- `src/controladores/reservas.js`: recibe las solicitudes, coordina las operaciones con el servicio y devuelve respuestas JSON o renderiza las vistas correspondientes.

### Middleware

- `reservas.js`: prepara el área de reservas y valida los datos de creación.
- `cambios-reservas.js`: valida las operaciones PUT y PATCH.
- `solicitudes.js`: asigna identificadores consecutivos a las solicitudes y registra su duración.
- `errores.js`: centraliza el tratamiento de errores y las respuestas correspondientes.

### Modelos

- `src/modelos/reserva.js`: define el esquema de Mongoose y las reglas de validación de las reservas.

### Rutas

- `reservas.js`: define las rutas de la interfaz HTML.
- `reservas-api.js`: define los endpoints de la API REST.

### Servicios

- `reservas-mongo.js`: implementa las operaciones de persistencia mediante Mongoose.
- `reservas.js`: conserva la implementación del servicio de reservas utilizada en el desarrollo modular anterior.

### Vistas

Las plantillas EJS permiten visualizar el inicio, el listado de reservas, el formulario de creación, el detalle de cada reserva y las páginas de error.

## Modelo de reserva

Cada reserva contiene los siguientes campos:

| Campo | Tipo | Validación |
|---|---|---|
| `estudiante` | String | Obligatorio, sin espacios externos. |
| `email` | String | Obligatorio y debe contener `@`. |
| `sala` | String | Sala Norte, Sala Sur o Sala Multimedia. |
| `fecha` | String | Obligatoria. |
| `turno` | String | Mañana, Tarde o Noche. |
| `personas` | Number | Entero entre 1 y 6. |
| `estado` | String | `pendiente` o `confirmada`. |

El campo `estado` tiene como valor predeterminado `pendiente`.

MongoDB genera automáticamente el identificador `_id`, que se representa como `id` en las respuestas de la API.

## Interfaz web

La aplicación dispone de las siguientes rutas:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página de inicio. |
| GET | `/reservas` | Listado de reservas. |
| GET | `/reservas/nueva` | Formulario de creación. |
| POST | `/reservas` | Creación de una reserva desde el formulario. |
| GET | `/reservas/:id` | Detalle de una reserva. |
| GET | `/estado` | Estado del servicio y cantidad de reservas. |

La creación desde el formulario utiliza validaciones y, cuando los datos son correctos, redirige al listado de reservas. Cuando existen errores, devuelve el formulario con los valores ingresados y los mensajes correspondientes.

## API REST

La API se encuentra bajo el prefijo:

```text
/api/reservas
```

### Endpoints

| Método | Endpoint | Descripción | Respuesta esperada |
|---|---|---|---|
| GET | `/api/reservas` | Lista todas las reservas. | 200 OK |
| GET | `/api/reservas/:id` | Obtiene una reserva por ID. | 200 OK |
| POST | `/api/reservas` | Crea una reserva. | 201 Created |
| PUT | `/api/reservas/:id` | Reemplaza una reserva completa. | 200 OK |
| PATCH | `/api/reservas/:id` | Modifica parcialmente una reserva. | 200 OK |
| DELETE | `/api/reservas/:id` | Elimina una reserva. | 204 No Content |

### POST — Crear una reserva

El POST recibe los seis campos originales:

```json
{
  "estudiante": "Juan Pérez",
  "email": "juan@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-11-15",
  "turno": "Mañana",
  "personas": 3
}
```

La respuesta es `201 Created`, incluye la reserva creada y establece el encabezado `Location` con la dirección del nuevo recurso.

El campo `estado` no se acepta en el POST: se asigna automáticamente como `pendiente`.

Tampoco se permite enviar `_id` ni otros campos adicionales.

### PUT — Reemplazo completo

PUT reemplaza todos los campos editables de una reserva existente.

Debe recibir los siete campos:

- `estudiante`
- `email`
- `sala`
- `fecha`
- `turno`
- `personas`
- `estado`

No se admiten actualizaciones parciales mediante PUT. Si falta un campo obligatorio, la solicitud es rechazada con `400 Bad Request`.

El identificador del recurso se conserva.

### PATCH — Actualización parcial

PATCH permite modificar exclusivamente:

- `personas`
- `estado`

Se puede enviar uno de los campos o ambos.

Ejemplo:

```json
{
  "personas": 4,
  "estado": "confirmada"
}
```

No se aceptan cuerpos vacíos, propiedades adicionales ni operadores de actualización enviados por el cliente.

Los demás campos de la reserva permanecen sin modificaciones.

### DELETE — Eliminación

DELETE elimina una reserva existente.

- Si la reserva existe, responde `204 No Content`, sin cuerpo.
- Si no existe, responde `404 Not Found`.
- Una segunda eliminación del mismo identificador también responde `404 Not Found`.

La eliminación es persistente en MongoDB y se mantiene después de reiniciar el servidor.

## Validaciones y reglas de negocio

Las validaciones se aplican tanto en la capa de middleware como en el modelo de Mongoose.

- Los campos obligatorios no pueden estar vacíos.
- El email debe contener `@`.
- La sala debe corresponder a una de las opciones permitidas.
- El turno debe ser Mañana, Tarde o Noche.
- La cantidad de personas debe ser un entero entre 1 y 6.
- El estado solo puede ser `pendiente` o `confirmada`.
- POST no permite modificar el estado ni el identificador.
- PUT exige el conjunto completo de campos editables.
- PATCH restringe los cambios a `personas` y `estado`.
- Los identificadores deben tener un formato válido de ObjectId de MongoDB.

### Filtro adicional por sala

Se conserva una funcionalidad de filtrado por sala incorporada durante un trabajo práctico anterior.

Permite consultar las reservas correspondientes a una sala específica:

```http
GET /api/reservas?sala=Sala%20Norte
```

También se rechazan los parámetros `sala` repetidos en la URL. Express puede representarlos como un arreglo, por lo que se valida que el parámetro aparezca una sola vez.

Este filtro se documenta como una funcionalidad adicional heredada, no como un requisito específico del TP09.

## Manejo de errores

La aplicación cuenta con un middleware centralizado para gestionar los errores.

| Código HTTP | Situación |
|---|---|
| 400 Bad Request | Datos inválidos, JSON malformado o identificador con formato incorrecto. |
| 404 Not Found | Recurso inexistente o ruta no encontrada. |
| 500 Internal Server Error | Error inesperado durante el procesamiento. |

Las respuestas de error de la API se entregan en formato JSON.

Los errores internos no exponen detalles sensibles al cliente. La información de diagnóstico se registra en la consola del servidor.

## Identificación y duración de solicitudes

Cada solicitud recibe un identificador consecutivo con el formato:

```text
BIB-0001
BIB-0002
BIB-0003
```

Además, se registra:

- Identificador de solicitud.
- Método HTTP.
- URL original.
- Código de estado.
- Duración del procesamiento en milisegundos.

Morgan complementa estos registros con información de las solicitudes HTTP.

## Pruebas y verificaciones realizadas

Se realizaron pruebas funcionales mediante Postman, navegador y consola, utilizando MongoDB Atlas como almacenamiento persistente.

### Conexión y configuración

- Conexión con MongoDB Atlas mediante `scripts/comprobar-conexion.js`.
- Inicio de la aplicación con las variables de entorno.
- Comprobación del puerto configurado.
- Ejecución de Prettier y ESLint mediante `npm run check`.

### API REST

- POST válido y comprobación del estado predeterminado `pendiente`.
- Verificación del encabezado `Location`.
- Consulta posterior del recurso creado.
- Rechazo de campos adicionales y del identificador `_id` en POST.
- PUT completo y verificación del reemplazo.
- PUT incompleto y comprobación de que la reserva original permanece sin cambios.
- PUT con estado inválido.
- PUT sobre identificador inexistente.
- PATCH de `personas`.
- PATCH de `estado`.
- PATCH de ambos campos.
- PATCH vacío y con propiedades no permitidas.
- Validación de cantidades de personas válidas e inválidas.
- Validación de estados permitidos.
- Rechazo de valores numéricos no válidos, arreglos y objetos.
- Rechazo de JSON malformado.
- Distinción entre identificadores inválidos y recursos inexistentes.
- DELETE de una reserva existente.
- Segundo DELETE del mismo recurso.
- GET posterior a la eliminación.

### Persistencia

Se comprobó que las modificaciones realizadas mediante PUT y PATCH permanecen después de reiniciar el servidor.

También se verificó que las reservas eliminadas continúan ausentes después del reinicio.

La colección de MongoDB Atlas se consultó para comprobar la persistencia de los documentos.

### Interfaz HTML

- Visualización del inicio y listado de reservas.
- Acceso al formulario de creación.
- Creación válida desde el formulario y redirección al listado.
- Envío de datos inválidos y visualización de errores conservando los valores ingresados.
- Visualización del detalle de una reserva.
- Actualización de la información mostrada en HTML después de modificar los datos mediante la API.
- Comprobación del endpoint `/estado` y de la cantidad real de reservas almacenadas.

### Manejo de errores

- Acceso a rutas inexistentes de la API.
- Comprobación de respuestas JSON para errores de entrada.
- Simulación aislada de un error interno para verificar la respuesta `500 Internal Server Error` sin exponer el mensaje interno al cliente.

## Resultado

El TP09 implementa un CRUD completo de reservas de salas utilizando MongoDB Atlas como almacenamiento persistente.

La aplicación permite administrar las reservas desde una interfaz HTML y una API REST, con validaciones, control de errores, operaciones de reemplazo y actualización parcial, eliminación persistente y separación modular de responsabilidades.

El proyecto queda organizado como base para continuar el desarrollo del TP10.