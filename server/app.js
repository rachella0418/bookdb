/* import modules
const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// db
mongoose
	.connect(process.env.MONGO_URL, {})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// routes
const testRoutes = require("./routes/test");
app.use("/", testRoutes);
app.post("/insertBook", insertBook);

// port
const port = process.env.PORT;

// listener
const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);
*/
