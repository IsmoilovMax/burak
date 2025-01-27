export const AUTH_TIMER = 24;
export const MORGAN_FORMAT = `:method :url  :response-time [:status] \n`;

// :method: Метод HTTP-запроса (например, GET, POST).
// :url: URL, на который был выполнен запрос.
// :response-time: Время ответа на запрос в миллисекундах.
// :status: Статусный код HTTP-ответа (например, 200, 404).

import mongoose from "mongoose";
export const shapeIntoMongooseObjectId = (target: any) => {
    return typeof target === 'string' ? new mongoose.Types.ObjectId(target) : target;
};