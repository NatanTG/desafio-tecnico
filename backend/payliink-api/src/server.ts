import express from "express";
import routes from "./config/routes";


const app = express();
app.use(express.json());

// Registrar as rotas
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
