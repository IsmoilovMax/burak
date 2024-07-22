

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORISED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    EXIST = 403,
    };
    
    export enum Message {
        SOMETHING_WENT_WRONG = "Something went wrong!",
        NO_DATA_FOUND = "No data is found!",
        CREATE_FAILED = "Create is failed!",
        UPDATE_FAILED = "Update is failed!",
    
        USED_NICK = "You are inserting already used nick or phone!",
        USER_EXIST = "User already exist, please sign in instead",
        BLOCKED_USER = "You have been blocked, contact restaurant!",
        NICK_NOT_FOUND = "No member with that member nick!",
        WRONG_PASSWORD = "Wrong password, please try again!",
        NOT_AUTHENTICATED = "You are not authenticated, Please login first! ",
        TOKEN_CREATION_FAILED = "Token creation error"
    }
    
    export default class Errors extends Error {
        public code: HttpCode;
        public message: Message;
    
        static standard = {
            code: HttpCode.INTERNAL_SERVER_ERROR,
            message: Message.SOMETHING_WENT_WRONG
        }
        constructor(statusCode: HttpCode, statusMessage: Message) {
            super( ) ;
            this.code = statusCode;
            this.message = statusMessage;
        }
    }
    
    