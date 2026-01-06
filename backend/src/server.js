import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path" //

dotenv.config(); // to read env file 

const app = express();
const PORT = process.env.PORT || 5001; //take from env file or 5001 by default
const __dirname = path.resolve(); //__dirname convention, path resolve provides the current backend/src folder
//middleware
if (process.env.NODE_ENV !== "production") { // for development
    app.use( // add cors before reateLimiter - only needed in development
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json()); //middleware - add before the routing - allows parsing JSON body (req.body)
app.use(rateLimiter); // rate limiter before routes

//simple custom middleware
// app.use((req, res, next) => {
//     console.log(`request method: ${req.method} | req URL: ${req.url}`);// `` allows adding variables to string
//     next(); // next method jumps to the next function being called. This will then redirect to one of the reqest methods after logging.
// });


app.use("/api/notes", noteRoutes); // when we create more URLs, we would create more similars files for each service

//join domains and serve the application for production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); // join domains of frontend and backend __dirname
    app.get("*", (req, res) => { // * = for directories other than api/notes 
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html")); // serve joined domain content with frontend at dist/index.html
    });
}
connectDB().then(() => {// connectDB function in db.js. Best practice: Connect first THEN start app/listen to port
    app.listen(PORT, () => {
        console.log("Server started on port:", PORT);
    });
});

