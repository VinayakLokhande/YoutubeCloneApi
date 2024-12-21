class ApiResponse {
    constructor(
        statusCode, data, message = "success"
    ) {
        this.statusCode = statusCode,
        this.data = data, 
        this.message = message,
        this.success = statusCode < 400
    }
}

export { ApiResponse }

/*
54) so ya class cha constructor madhe alwyas statusCode trr dyavach lagnar, then data jo dyaychay to response madhe user la and message jo dyaychay to jyat default success thevla bec he res chay so hi class tenvach apan execute karnar jenva res success hoil na tyamule and same ithe pn this ne ya fields na pn fill kela. and success ek ghetla and tyat status code la pass kela and tyat takla ki status code less than 400 asla pahije karat 400 pasun errors chalu hotat na tyamule. 
*/