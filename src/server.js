import app from "./app";
import { connectDB, uri } from "./config/db";
import { errorLogger } from "./utils/logger";

const port = 3000;

app.listen(port, () => {
  connectDB();
  if (process.env.NODE_ENV != "TEST") {
    app.use(errorLogger(uri));
    console.log(`=================================`);
    console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
    console.log(`🚀 App listening on the port ${port}`);
    console.log(`=================================`);
  }
});
