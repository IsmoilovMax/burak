export const MORGAN_FORMAT = `:method :url  :response-time [:status] \n`;

// :method: Метод HTTP-запроса (например, GET, POST).
// :url: URL, на который был выполнен запрос.
// :response-time: Время ответа на запрос в миллисекундах.
// :status: Статусный код HTTP-ответа (например, 200, 404).