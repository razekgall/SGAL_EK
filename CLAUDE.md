# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

generate a complete map of the application structure

*Session: 255bea43510771616b291a7cb51292be | Generated: 9/3/2025, 11:32:37 AM*

### Analysis Summary

# Application Structure Map

## High-Level Architecture
The application appears to follow a **Model-View-Controller (MVC)** pattern, primarily implemented using **Node.js** for the backend and **plain JavaScript/HTML/CSS** for the frontend. It interacts with a **SQL database**.

*   **Backend (Server-side):** Handled by Node.js, responsible for API endpoints, business logic, and database interactions. Located in the [src](src/) directory.
*   **Frontend (Client-side):** Consists of HTML views, JavaScript for interactivity, and CSS for styling. Located in the [frontend](frontend/) directory.
*   **Database:** A SQL database, with its schema defined in [BD_LEMBO.sql](db/BD_LEMBO.sql).
*   **Static Assets:** Images and other static files are served from various locations, including [frontend/public/](frontend/public/) and [SGL CODE/img/](SGL CODE/img/).
*   **Uploads:** Dedicated directories for uploaded crop and sensor images: [uploads-crop/](uploads-crop/) and [uploads-sensor/](uploads-sensor/).

## Backend Structure ([src/](src/))
The backend is built with Node.js, organizing its components into `controllers`, `models`, `routes`, `middlewares`, and `validators`.

### Entry Point
*   The main application entry point is [index.js](src/index.js), which likely initializes the server and connects to the database.

### Configuration
*   **Database Configuration:** [config/db.js](src/config/db.js) handles the connection to the SQL database.

### Controllers ([src/controllers/](src/controllers/))
Controllers are responsible for handling incoming requests, processing them, and sending responses. They interact with models to perform operations.
*   **Consumable Controller:** [consumable.controller.js](src/controllers/consumable.controller.js) manages operations related to consumables.
*   **Crop Controller:** [crop.controller.js](src/controllers/crop.controller.js) manages operations related to crops.
*   **Cycle Controller:** [cycle.controller.js](src/controllers/cycle.controller.js) manages operations related to crop cycles.
*   **Sensor Controller:** [sensor.controller.js](src/controllers/sensor.controller.js) manages operations related to sensors.
*   **User Controller:** [user.controller.js](src/controllers/user.controller.js) manages user-related operations (e.g., authentication, user data).

### Models ([src/models/](src/models/))
Models define the data structures and interact directly with the database.
*   **Consumable Model:** [consumable.model.js](src/models/consumable.model.js) defines the structure and methods for consumable data.
*   **Crop Model:** [crop.model.js](src/models/crop.model.js) defines the structure and methods for crop data.
*   **Cycle Model:** [cycle.model.js](src/models/cycle.model.js) defines the structure and methods for crop cycle data.
*   **Sensor Model:** [sensor.model.js](src/models/sensor.model.js) defines the structure and methods for sensor data.
*   **User Model:** [user.model.js](src/models/user.model.js) defines the structure and methods for user data.
*   **Counters:** [models/counters/](src/models/counters/) likely contains models or logic for managing unique IDs or counters.

### Routes ([src/routes/](src/routes/))
Routes define the API endpoints and map them to corresponding controller functions.
*   **Authentication Routes:** [auth.routes.js](src/routes/auth.routes.js) handles user authentication related endpoints.
*   **Consumable Routes:** [consumable.routes.js](src/routes/consumable.routes.js) defines API endpoints for consumables.
*   **Crop Routes:** [crop.routes.js](src/routes/crop.routes.js) defines API endpoints for crops.
*   **Cycle Routes:** [cycle.routes.js](src/routes/cycle.routes.js) defines API endpoints for crop cycles.
*   **Sensor Routes:** [sensor.routes.js](src/routes/sensor.routes.js) defines API endpoints for sensors.
*   **User Routes:** [user.routes.js](src/routes/user.routes.js) defines API endpoints for user management.
*   **Other Route Files:** Several other files like [consumables.js](src/routes/consumables.js), [cropCycle.js](src/routes/cropCycle.js), [crops.js](src/routes/crops.js), [cuadros.js](src/routes/cuadros.js), [integrador.js](src/routes/integrador.js), [sensors.js](src/routes/sensors.js), [server.js](src/routes/server.js), and [users.js](src/routes/users.js) also exist, suggesting a mix of API routes and potentially some server-side rendered content or legacy routes. Notably, [admsj.html](src/routes/admsj.html) is an HTML file within the routes directory.

### Middlewares ([src/middlewares/](src/middlewares/))
Middlewares are functions that have access to the request and response objects, and the next middleware function in the application’s request-response cycle.
*   **Authentication Middleware:** [auth.js](src/middlewares/auth.js) likely handles token verification or session management.
*   **Validation Middleware:** [validate.js](src/middlewares/validate.js) likely handles request body validation using schemas defined in the validators.

### Validators ([src/validators/](src/validators/))
Validators define schemas for input data validation, used by the middleware.
*   **Consumable Validator:** [consumable.validator.js](src/validators/consumable.validator.js) validates consumable data.
*   **Crop Validator:** [crop.validator.js](src/validators/crop.validator.js) validates crop data.
*   **Cycle Validator:** [cycle.validator.js](src/validators/cycle.validator.js) validates crop cycle data.
*   **Sensor Validator:** [sensor.validator.js](src/validators/sensor.validator.js) validates sensor data.
*   **User Validator:** [user.validator.js](src/validators/user.validator.js) validates user data.

## Frontend Structure ([frontend/](frontend/))
The frontend consists of HTML views, JavaScript logic, and static assets.

### JavaScript Modules ([frontend/js/](frontend/js/))
These modules contain the client-side logic for various parts of the application.
*   **Authentication:** [js/auth/](frontend/js/auth/) contains scripts for user authentication, session management, and role-based access.
    *   [dashboard.js](frontend/js/auth/dashboard.js)
    *   [login.js](frontend/js/auth/login.js)
    *   [printUser.js](frontend/js/auth/printUser.js)
    *   [rol_auth.js](frontend/js/auth/rol_auth.js)
    *   [session_auth.js](frontend/js/auth/session_auth.js)
    *   [visitantVerification.js](frontend/js/auth/visitantVerification.js)
*   **Consumables:** [js/Consumables/](frontend/js/Consumables/) contains scripts for managing consumables.
    *   [buscarConsumable.js](frontend/js/Consumables/buscarConsumable.js)
    *   [listarConsumables.js](frontend/js/Consumables/listarConsumables.js)
    *   [update_consumable.js](frontend/js/Consumables/update_consumable.js)
    *   [validar_consumables.js](frontend/js/Consumables/validar_consumables.js)
    *   [viewConsumables.js](frontend/js/Consumables/viewConsumables.js)
*   **Crop Cycle:** [js/CropCycle/](frontend/js/CropCycle/) contains scripts for managing crop cycles.
    *   [actualizarCropCycle.js](frontend/js/CropCycle/actualizarCropCycle.js)
    *   [buscarCropcycle.js](frontend/js/CropCycle/buscarCropcycle.js)
    *   [listarCiclos.js](frontend/js/CropCycle/listarCiclos.js)
    *   [validar_CropCycle.js](frontend/js/CropCycle/validar_CropCycle.js)
    *   [visualizarCiclo.js](frontend/js/CropCycle/visualizarCiclo.js)
*   **Crops:** [js/crops/](frontend/js/crops/) contains scripts for managing crops.
    *   [actualizar_crop.js](frontend/js/crops/actualizar_crop.js)
    *   [buscar_crops.js](frontend/js/crops/buscar_crops.js)
    *   [listar_crops.js](frontend/js/crops/listar_crops.js)
    *   [validar_crops.js](frontend/js/crops/validar_crops.js)
    *   [visualizar_crop.js](frontend/js/crops/visualizar_crop.js)
*   **Integrator:** [js/integrador/](frontend/js/integrador/)
*   **Sensor:** [js/sensor/](frontend/js/sensor/)
*   **Users:** [js/users/](frontend/js/users/)

### HTML Views ([frontend/views/](frontend/views/))
These are the main HTML files that define the user interface.
*   **Main Index:** [index_main.html](frontend/views/index_main.html) is likely the primary entry point for the frontend.
*   **Categorized Views:** The directory contains subdirectories for different sections of the application, such as [crops/](frontend/views/crops/), [cycle_crops/](frontend/views/cycle_crops/), [home/](frontend/views/home/), [insumes/](frontend/views/insumes/), [integrator/](frontend/views/integrator/), [produccion/](frontend/views/produccion/), [sensors/](frontend/views/sensors/), and [users/](frontend/views/users/).
*   **Charting Libraries:** Directories like [chart.js/](frontend/views/chart.js/) and [ek-js charts/](frontend/views/ek-js charts/) suggest the use of charting libraries for data visualization.
*   **Standardization:** [Estandarizacion/](frontend/views/Estandarizacion/)
*   **SGAL Specific Views:** Several directories prefixed with `sgal` (e.g., [sgal ciclo cultivo/](frontend/views/sgal ciclo cultivo/), [sgal cultivos/](frontend/views/sgal cultivos/), [sgal home (ek)/](frontend/views/sgal home (ek)/), [sgal insumos/](frontend/views/sgal insumos/), [sgal main (sanchez)/](frontend/views/sgal main (sanchez)/), [sgal sensores/](frontend/views/sgal sensores/)) indicate specific modules or versions of views related to the "SGAL" system.

### Public Assets ([frontend/public/](frontend/public/))
*   **CSS:** [public/css/](frontend/public/css/) for stylesheets.
*   **Images:** [public/img/](frontend/public/img/) and [public/img_/](frontend/public/img_/) for images used in the frontend.

## Database Structure
*   The database schema and initial data are defined in [BD_LEMBO.sql](db/BD_LEMBO.sql).

## Other Notable Directories
*   **Node Modules:** [node_modules/](node_modules/) contains third-party dependencies for the Node.js backend.
*   **Uploads:**
    *   [uploads-crop/](uploads-crop/) stores uploaded images related to crops.
    *   [uploads-sensor/](uploads-sensor/) stores uploaded images related to sensors.
*   **Tests/Examples:**
    *   [pruebas/](pruebas/) contains test or example files, including [ESTANDAR_TIPO1.html](pruebas/ESTANDAR_TIPO1.html) and [js/prueba.js](pruebas/js/prueba.js).
*   **SGAL Codebase:** [SGL CODE/](SGL CODE/) appears to be a separate or legacy codebase, containing its own assets and structure, including [img/](SGL CODE/img/) and [sgal usuario viejo/](SGL CODE/sgal usuario viejo/).
*   **Root CSS:** [root.css](root.css) is a global CSS file.
*   **Git Configuration:** [.git/](.git/) and [.gitignore](.gitignore) for version control.
*   **VS Code Configuration:** [.vscode/settings.json](.vscode/settings.json) for editor settings.
*   **README:** [README.md](README.md) for project documentation.

