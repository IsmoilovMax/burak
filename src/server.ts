import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";


// Подключение к MongoDB с использованием переменной среды MONGO_URL
mongoose.set('strictQuery', false);
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl as string, {})
    .then(data => {
        console.log("MONGO-DB connectin succeed!");

     // Установка порта из переменной среды PORT или использование порта 3003 по умолчанию
    const PORT = process.env.PORT ?? 3003;
    
    // Запуск сервера
    app.listen(PORT, () => {
        console.log(`The server is running on ${PORT}`);

    })

}).catch(err => {
    console.log("ERROR on connection MONGODB", err);

});