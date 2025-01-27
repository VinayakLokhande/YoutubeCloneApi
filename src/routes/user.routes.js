import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
// router.route("/login").post(loginUser)


export default router

/*
77) now user che routes apan thevlet so apan ata router banavnar so router kasa banavaycha and export karaych te apan ata lihinare ata so hech same asach always repeat hot asta. so first Router la import kela je ki express throughch yenar karan dusra koni deu pn nahi shakat. so same jasa apan express ne app banavaycho tasach ata router ne routes banavnar. like apan express.app() asa karaycho na so tasach ek router variable create kela and tyat Router() asa karun banavla. and tyala shevti export kela default ne. so now apan code la sagrigate kelay. now saglya files create zalet routes sathi and tyana apan export pn kelay but now yana import kute karaych. so apan index.js file madhe directly karu shakto import yana and tyat code lihu shakto sagla but that is not good practice. so apli app.js file madhe pn apan just configurations kelet na so yana apan import karto app.js file madhech always production grade code madhe pn so chala app.js file madhe.

79) so router.route karun tyat route lihila /register now yachapudhe apan jr dot lavla trr pudhe apnala mg saglya methods miltat like get, post, delete, put etc. so now mi ghetla post. so ya post var kutli method apli call zali phije so registerUser na ji apan create keli na kashat trr user.controller.js file madhe na so tyala import kela ithe. now aplyakade don routes zali na /users ek and /register ek so kutlay route madhe jaychay na apnala so ky asta na so app.js file madhe jo pn route apan deto to hot asto prefix. like http://localhost:8080 ha zala base url right. then /users apan lihila ki mala /users var jaychaay then so gelo then apan tyat method call keli na userRouter so tyamule mg control tithun ithe yenar ya file mahe. then apan call kelay register. na so http://localhost:8080/users/register asa apla url bananar na. so asach apan userRouter la ekdach import kela app.js file madhe na so ata user sathi kiti jari routes lihayche astil apnala trr apnala app.js file madhe sarkha sarkha userRoute la import nahi na karav lagnar. apan ekdach call kelay so jenva pan /users var call honar tenva tenva controll lagech ya file madhe yenar and apan ithe mg routes lihinar users che so asach mi ata login cha pn route lihu shakto just register cha jagi login lihaycha and tyacha controller call karaycha. so jenva user /users taknar tenva app.js file madhe control asnar then to jenva /users/register takel tenva tihun controll ya file mahe yenar and te shodhanar /register vala route kute ahe so tyala iteh sapdel na so te /register cha route madhe yenar and tithun mg apan tyachavar kutli method lihiliye post na so te samjun janar and then ya post method cha execution la mala ky execute karaychay te apan mg yat lihinar so apan registerUser controller jo lihilay tyala call kelay na so control tya file madhe janar and to controller run honar means apan jo response dilay na to user la milnar so ashi process aste hi. so chala jara app.js file madhe. 

89) so apan middlware ek create kela hota na multer.midleware.js so apnala jithe pn multer cha storage la vagere use karaychay tithe apan tya middlware cha use karun local storage la access karu shakto na. so tyala use kasa karnar so pahila upload je export kelay tithun tyala ithe import kela. so as we know middleware process cha madhe execute hot astat na so we know na /register route var koni pn request karat asel trr registerUser hi method execute honar but hi method execute honyaadi mala maza middlware la execute karaychay. so post madhe jaych so tyat apan registerUser la taklela na so tyatach pudhe upload takaych and he upload multer ne dilay so he baryach methods deta apnala any, array, fields, single etc. so jrr mala single file upload karaychi asel trr mi .single laun upload karnar. but mala multiple file upload karaycha ahet then bolnar mg array ghya but array pn nahi gheu shakat bec array ekach array madhe multiple files gheta je ki nako ahe so tyamulech apan ithe use karnar .fields la. so ata he fields accept karta param madhe array. so tyat ek array create kela and mi don files accept kartoy na ek avtar and ek coverimage so don {} he objects create kele. so first object madhe takla ki hi ji file ghenare apan ti kutlya name ne thevaychi ahe so mi dila avtar. then next takla maxCount ki mala kiti files accept karaycha ahet so mi 1 dili. and coverImage pn tasach. so he zala asa apan middlware la inject karat asto ki main method execute honyacha just adi he execute honar. so yachamule ata ky honar trr apan ata images pathau shakto. so chala ata again user.controller.js file madhe rahilelya steps na lihu.
*/