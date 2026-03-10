import logger from "./utils/logger.js";
import { app } from "./app.js";

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`);
})