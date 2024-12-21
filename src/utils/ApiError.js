
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.error = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


/*
52) so ek class create keli ApiError and tila extend kela Error class ne. so hi error class apnala constructors pn provide karte but apan apla ek create karu. so jo pn ha constructor use karnar means basically ApiError class cha obj create karnar tenva tyana statusCode la dilach pahije, then message pn dila pahije and jrr message nahi dila trr ek default msg lihun thevla something went wrong, then errors na pn saglya deu shakto like array madhe, then jrr error stack asel trr stack madhe tyala pass karaych otherwise default "" thevla tyala. and ya constructor cha body madhe Error class cha constructor la message la pass kela kasa trr Error class la extend kelay na apan so mg tyacha constructor la apan kasa access karu shakto super() ne na so super ne Error class cha constructor la call kela and tyat message la pass kela. then also baki fields na pn override karu shakto like statusCode la kela.  and ek data field ek ghetli jila gheu pn shakto and nahi pn so tila usually null kela jata. so he ka kela jata yachabaddla nodejs madhe vachaychay. so he bagaycha ki this.data field madhe asta ky, tila ka null thevla jata vagere. then meesage la pn override kela and success la false kela because apan api errors na handle kartoy api response la nahi so success code vagere yat nasnar so he false kelyana asa nahi ki success message janarach nahi trr nahi message janar but tyacha barobar ha flag false aslyamule to message konni detect nahi karu shakanar. and errors na pn override kela. now ek chota code lihila jato production grade code madhe to lihu. ek if case lihu jyat check karaych ki aplyakade stack ahe ka nahi. so kahi vela api error chi file khup mothya mothya bagayla miltat kahincha so te ya stack trace mulech hota ki ji properly error ahe na kutlya file madhe ky error ahe vagere sagla te ya stack trace mule milta. so jr stack asel trr tyala override kela otherwise Error class madhil capture stack trace method la override kela and tyat class cha reference pass kela. and ya class la ata export pn kela. 

53) so jasa error sathi handling kela tasach res sathi pn ek standard class create karu shakto ky. trr apan vichar karnar ki nodejs res sathi pn kahi classes det asel Error sarkhi but error trr node madhe trace hot astat but je apan req, res cha apan kam kartoy te core nodejs madhe nahi karate na yachasathi apan ek framework use kartoy na which is express. so res sathi pn ek class create karu ApiResponse navachi so utils madhe create keli so chala tyat. 
*/