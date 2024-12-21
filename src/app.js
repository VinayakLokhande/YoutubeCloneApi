import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

export { app }





/*

31) now express lagel app means yat req, res cha code asto so express la import kela. express pasun usually app banate so mi variable cha pn name jyat express la store karnare apan tyach app thevla so kahi pn theu shakto but commonly appach asta. so express() throughch saglya properties like req, res, error ya saglya properties aplya app cha ya app variable madhe transfer hotat. and then app la export kela. 

32) so apan db cha asynchronous method lihiliye na db mdhil index.js file madhe. so ti async method jenva complete hote tenva ti apnala ek promise pn return karat asta. so promise la handle karu so chala src madhil index.js file madhe.

39) so cookie parser and cors na import kela. and he cors and cookie parser la apan app banalyanatrach use karu shakto bec apnala cors and cookie parser la configure karav lagta na so configure karnyasathi app.use() lagta na and te kashat asta app madhe na tyamule. so cors la configure kela app.use ne. so cors cha docs madhe bagitla trr cors apnala barech options deta. so tyatil ek mhanje origin ki kutlya kutlya origin through apan req accept karu ichito or kutlya domain la access dyaychay aplya domain la access karnyacha. so mostly apan ithe process.env madhunach gheto tithe cors cha url la declare karaych and ithe ghyaych. so tyamule process.env madhe CORS_ORIGIN la define kela. so atapurta * dilay ki konihi access karu shakta app la aplya but production madhe taktana aplya proper host cha url tithe takaycha. so tya origin la ithe cors madhe define kela. tyachbarobar yat ajun pn options miltat ki apnala headers kutle kutle allow karaychet, credentials kutle kutle allow karaychet and suppose mi credentials option la true kela.

40) so data ata multiple location varun yenar na like url varun yenar, or kahi loka json madhe data send karnar or kahi request form vagere submit karun body madhe data send karnar or kahincha direct form type madhe data yenar or kahincha json form madhe data yenar so yansathi kahi settings karavi lagtat and jrr json yet asel trr json aplya server var send karnyachi ek limit pn dyavi lagnar otherwise user khup mothya size chi json pathvayla lagla trr server crash hou shakto na.

41) so yasathi app.use() lavla bec configure karaychay and tyat express madhe json() apnala directly milta ki mi json la maza project madhe configure karu ichito and ya json madhe further apnala options miltat je vachayche ahet. so tyatil ek option asto limit mhanun so means apan eka time la kiti mb chi or kiti kb chi file accept karu ichito user kadun server var so suppose mi ata 16kb takli apan kiti pn taku shakto te depend asta aplya server cha power varti. now form madhun data alyavar apan tyala handle karu shakto ata na.

42) now url madhun data pn yeu shakto na aplya server kade so url madhe data alyavar thoda issue pn yeu shakto so issue means ky trr apan jenva kahi search karto so tenva tyacha url create hoto na so jrr mi suppose vinayak lokhande search kela trr tyacha url kasa create hoto kadi kadi vinayak+lokhande asa alela asta url madhe or kadi kadi vinayak%20lokhande asa alela asta na. so url cha pn apla encoder asto je gostina convert karta characters na like space la te convert karta %20 or + madhe so he sagla pn express la sangava lagta ki asa pn data yeyil so tyala samjun ja. so yasathi pn ek configuration karavi lagte.

43) so app.use() ghetla and yasathi pn apnala express urlencoded navach predefined function deta je varti sangitlelya gostila satisfy karta and ya pn apnala further options miltat like extended so yacha use karun apan objects cha at objects deu shakto mostly apan use nahich karat yacha and ya pn limit cha option milto apnala so same 16kb dili nantrr lagla trr change karaychi.

44) anki ek configuration karto apan that is static. so static ky karta trr static file folder store karayla help karta. like suppose pdf ali tila mi store karu ichito or images jya yetil tyana first mi mazach server varti store karu ichito jenekarun ya images na cloudnary vagere servers varti store kartana kahi issue ala tri te temporarily aplya server varti stored asnar mg nantrr issue resolve zalyanatrr anki ekda aplya server varun cloudnary cha server var ya images na store karaycha apan try karu shakto tysathi ek public folder banavto ki he public assets ahet mhanun. and tyach name dila public so publicach deu shakto asa kahi nahi kahi pn deu shakto apan name. like apan banavlay na public navacha folder so to ashach kamasathi create kelta ki asha gostina mala tithe store karun thevta yeyil. 

45) so apan cookieparser la trr useach nahi kela na so tyach kam ky ahe. so tyach kam evdach ahe ki mi maza server kadun jo user cha browser ahe na tyacha atla cookies access karu shaku and tyacha cookies set pn karu shaku or basically tyacha cookies var crud operations mi karu shaku yasathi apan cookieparser cha use karto. so apan cookies na pn securely store karu shakto so server only tyala read and access karu shakto. so yala pn configure karav lagta so same app.use madhe cookieparser la pn configure kela. so yat pn cors sarkhe options miltat apnala but te mostly useach nahit hot. 

46) now middlewares ky astat bagu so chala backend_notes.txt file madhe

*/