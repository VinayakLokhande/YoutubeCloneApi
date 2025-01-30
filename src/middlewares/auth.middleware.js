 import { ApiError } from "../utils/ApiError.js"
 import { asyncHandler } from "../utils/asyncHandler.js" 
 import jwt from 'jsonwebtoken'
 import { User } from "../models/user.model.js"


export const verifyJWT = asyncHandler(async( req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401, `MY ERROR : error?.message` || "Invalid access token")
    }
})


 /*
 112) now he middlware karnar ky trr he just check karnar ki user ahe ka nahi. so ek method create keli and tithech tila export pn kela so name dial verifyJWT so verify means what trr jenva apan user la login kela so tenva tyala access and refresh tokens dile na so tyancha basis varach mi ensure karnar na ki tumchakade correct tokens ahet ka nahi karan tech tya user cha true login asnar na so jrr mazakade je token ahe and tyacha kade je token ahe te jrr same astil trr mi ky karnar ki te je req.body ahe or req.cookie ahe tyacha at ek new object add karnar or req.user so yacha name user only asla pahije asa kahi nasta kahi pn deu shakto apan so he kasa lihaycha bagu. so async lavla and tyat req, res, next ghetla. now apnala ky pahije trr token cha access pahije na so to kasa ghyaycha. so as we know req javal cookies cha access ahe na kasa te apan magcha paragraph madhe bagitlach na so ithe req.cookies takla so ata req madhe or simply we can say express madhe aplya jevdya pn cookies ahet tyancha aplyakade access ahe ata. so apnala kutli cookie pahije trr accessToken hi so he accessToken kutun ala trr user.controller.js file madhe loginUser method madhe apan res send kartana cookie la key value madhe pass kela na so ti key ji ahe tich mi ithe takli but tyacha pudhe ? null check lavla ki access token milel nahi milel ky sangta yetay na. but asa kasa login kartana trr apan access token la save kelaych na so aplyala access token trr milalach pahije na but nahi ek scenario apan discuss kela na mobile cha case madhe so suppose ithun nahi yenar user ek custom header pathavat asel suppose so tyala pn check karu shakto req.header asa kela or karun tyat so te header pn ek key gheta so key ti aste ji fontend kadun yenar so mostly header key hi aste authorization so ha Authorization header postman madhe pn apan bagu shakto headers navachi ek tab aste tithe so tyat key madhe apan Authorization takto and vlaue madhe takto 'Bearer <access_token>' asa det asto means bearer takto apan then ek space deto madhe and aplyakade je access token ahe tyala takto tithe. so asa apan mobile app cha case madhe tokens na kadu shakto. now ithe yetana bearer pn yenar na access token sobat but apnala trr only acccess token pahije na so tyasathi apan js chi ek method use karu shakto replace so tyat takla 'Bearer ' ki jrr tula string madhe Bearer and space milala trr tyala replace kar emtpy string ne.
 
 113) so Bearere he replace honar empty string ne jyat space pn nahi and apnala ata only access token milnar tyatun. so tyala token var madhe store kela and apan access token lach ka use kartoy refresh la ka nahi he apan next video madhe bagnare. then jrr token nasel trr error throw keli. and jrr token asel trr jwt la vicharla pahije ki he token barobar trr ahe ka and ya token madhe ky ky info ahe. so info means apan user.model.js file madhe access token create kartana tyacha payload madhe id, name, email etc. dila na so apan ata kashacha shodhat ahe id cha na so apan tyatun id la gheu shakto na tya access token madhun but first tila decode pn kela pahije na. so tyasathi lagel jwt na so tyala import kela. so jwt madhe ek verify navachi method milte apnala so ti ghetli now he function kahi params magtay ek trr ki token dya je apnala decode karvaychay aplya case madhe ata access token denar apan then next param is secretOrpublicKey so apan tenvach decode karu shakto jenva aplyakade ya secred or public key astil na. so token ek dila and env file madhun access token secret chi key dili. now ata jrr he verify zala trr apnala decoded info milun jail na so tila eka var madhe store kela. now ya info cha use karun user la db madhun find karu so User la import kela and findById method takli and tyat decodedToken var madhun _id la dila. so _id hech name ka dila trr bec apan user.model.js file madhe he token generate kartana payload pass kela and so tyat key value madhe payload dila na so id la pass kartana tyachi key ky dili apan _id hi na left vali so tyamulech ithe pn _id ghetla tithe apli value asti _id but apan ki dili asti tya payload madhe userId jrr ithe pn .userId ghetla asta asa and tyala null check pn lavla. then yat pn apnala pass and refresh token nako ahet so te kadle select ne. and yatun jo user yeyil tyala user var madhe store kela. now ajun pn jrr user nahi milala trr ek error throw keli. now jrr asel user trr ata yala return kela pahije na but yala return nahi karaycha trr req je ahe express cha tyat ek object create karaych kahi pn name deu shakto tya object cha mi dila user and tyat equal to user jo apan kadlay to takla and he middleware ahe so next middleware var or next task var pathavla pahije compiler la so next() takla. and try catch madhe takaycha rahila hota so te takla sagla try catch madhe.

 114) now he middleware trr create kela apan but yala inject pn kela pahije na so chala user.routes.js file madhe yala inject karu tithe.
 */