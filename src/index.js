// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDb from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './env'
})

connectDb()
.then(() => {

    app.on('error', (err) => {
        console.log("MY ERROR IN INDEX.JS FILE: ERROR OCCURED IN CONNECTDB THEN ", err);
        throw err
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`MY MESSAGE : SERVER IS RUNNING AT PORT : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MY ERROR IN INDEX.JS FILE : MONGODB CONNECTION FAILED ", err);
})


/*

26) now direct connectDb() la asa import karun call kelyavar apla kam zala pahije hota na. but apan mongoose la use kela db connect kartana na then apan express baddal pn boloy but dotenv baddal apan nahi boloy apan na. 

27) ---------- INFORMATION ABOUT DOTENV FILE HOW TO IMPORT AND ALL ----------- : so dotenv cha page var gela na npm web var so tithe lihilay ki as early as possible in our application, import and configure dotenv file. karan he environment variables ahet so apan ky ichito ki jevdya lavkar apli application load hoil tevdya lavkar aple sagle app che env variables pn load zale pahijet. karan main file measn ya src madhil index.js file madhe he env variables available zale ki apan kute jari index file lihili asel like db madhe or ani kute trr tithe lagech tya variables cha access milun jail. tyamule apli ji first file load hot aste app chi like ithe index.js src madhil trr tyach file madhe sagle env variables load vhavet. so npm cha docs madhe ya dotenv la import karaycha code require syntax vala dilay means 'require(dotenv).config({path:./env})' asa. so ha code barobarach ahe apan asa pn import karuch shakto apli app pn successfully run honar asa jari kela tri pn yachamule aplya code chi consistency break hote kashi trr bec apan baki sagla import laun import kartoy but hech only require laun import karaycha so yachamule apla code jara barobar nahi vatat. so adi trr always ha require valach syntax use karayla lagaycha but now ha evda common problem ahe ki yala solve kela gelay. so ata kasa karu shakto trr varti baga import kela simply dotenv la bakichasarkha but evdach karun nahi chalat apnala dotenv la configure pn karun bagav lagat. so config cha at samech kam honar ki maza env file cha path ahe root directory madhe .env file. but ky ahe na ki dotenv valyani pn tyancha documentation madhe asa syntax kutech mention nahi kelela ataparyant tithe ajun require valach syntax ahe so he je apan use kela import vala te ajun experimental syntax madhe modta so tyamulech apnala jrr yala use karaych asel aplya application madhe ata trr apnala ek kam karav lagnar te mhanje package.json file madhe jaycha and jo scripts vala tag ahe tyat dev cha tag madhe jaycha and tithe 'nodeman src/index.js' asa asel so tithe yacha madhe 'nodeman -r dotenv/config --experimental-json-modules src/index.js' ass takav lagnar.

28) ------- RUNNING APPLICATION ---------- : so ata yala run karaychay so kasa run karu shakto so package.json madhe ky lihiliye apan script ki dev script ahe ek tyacha through run kara. so terminal madhe takla 'npm run dev' but issue yenar.

29) so connectDb la ithe call kela and terminal madhe command chalavli npm run dev and run kela so db la apli app connect zali. so mongo db cha password create kartana kadihi tyat speial character nahi takaych like @ or $ or anything simple plane password create karaycha with chars and numbers bec mi special char takla and connect hot navta so mi nantrr password change kela mg zala.

30) %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% VIDEO NO. 9 START of hitesh chaudhary channel. now app.js file madhe kam karaychay so chala tyat%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

33) so now connectDb() madhun je promise yenare tyala handle kela so .then and catch lavla. so catch madhe ji error aliye tila print kela and then madhe pn resolve cha callback yetoch na so tyala handle karu so now app cha use kela and tya app through listen kela so tenvach trr server start honar na because ataparyant mongo db connect zalay but server tenvach start honar jenva apan tyala ya app through listen karu na and tya listen madhe dila ki kutlya port var apli app listen karnare te so env file madhun port ghetla and jrr ha port tyala nahi milala trr ek default port pn asava mhanun ek 8000 port dila ki server var deploy kelela port nahi milala trr ya 8000 var listen kara so yachamule jenva apla code apan server var taku tenva apla code crash honyapasun vachnar and tyachanantrr listen ky gheta trr callback so arrow function ne callback takla. and tyat port la print kela. now app.listen cha adi apan errors na pn listen kela pahije. like khali yach file madhe apna try catch cha use karun jo code lihilay tyat kelay na listen cha adi app.on so te karaych. 

34) now chala jara backend_notes.txt file madhe tithe jara charcha karu.
*/





// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";       
// import express from "express";

// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=> {
//             console.log("ERROR : ", error)
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("ERROR : ", error)
//         throw error
//     }
// })()


/*

18) so apan ithe first approach use kartoy so ithe apan function lihinare just db la connect karnyasathi tyacha peksha jast kahich nahi karnare. so apanala simple function lihaych mahitach ahe like function name() asa na so tasach js madhe ek asta function ife means function la lagech lihun tithe execute karaych means simple function la pahila lihun then execute karayla name() asa call karav lagta na but ife function la tasa nahi karav lagat directly jithe lihilay tithech te call houn jata. like (()=> {})() asa lihila jata. so simple first jo parenthesis ahe tyacha at ()=>{} asa kelay na means te function cha declaration sathi ahe apan lambda lihito na tasach ahe te just parenthesis cha at lihaych and second parenthesis jo ahe only mokla last cha () ha to tya function la call or execute karnyasathi ahe means apan function la call kartana () he lavtoch na so tasach ahe te pahilya parenthesis madhe apan function la declare kela and lagech second parenthesis madhe tya function la execute kela. so apan simple function pn lihu shakto and he pn but he thoda better syntax ahe.

19) so varti ife function ek create kela and db ch connection karaychay na so he kartana apan async await lavaychach mhantla hota na so tyamlech async lavla execute hotanach and then curly braces cha at gelo and tyat anki ek mhantlach ki exception yeu shakte na so try catch lavla. so catch madhe erro la print kela console.log karun pn karu shakto print and error ne pn karu shakto. and error la throw kela. then await lavla bec ata db cha connection cha code lihinare so await nahi takla trr kahi faydach nahi async cha so tyamule await takla and then varti apan mongoose la import kelay na so db la connect karayla tech help kartay na so tyala ghetla and mongoose apnala ek method deta which is connect jicha throughch apan connection karto db la. so connect method la db chi connection string dyavi lagte so process.env file madhe apan connection string thevliye na so ti tithe ghetli and db cha name pn dyava lagat asta connection kartana na so db cha name apan constants file madhe thevlay na so te ithe import kela pahila and tyala connect madhe pass kela.

20) and then kadi kadi ky hota ki yach src madhil index.js file madhech express la pn import karun tyacha pn code yach file madhe lihila jato. apan nahi lihinare asa but just example sathi baguya. so express la import kela. express cha object create kela. so baryach vela apnala code madhe db cha connection zalya zalya express che listeners pn disu shaktat. like db cha connection nantrr app je express cha obj ahe tyacha through listeners lavlele asu shaktat like on lavla error la listen karnyasathi. like asa pn hou shakta ki db apla successfully connect zalay but kahi vela express sever shi communicate nahi karu shakat means db cha part ok ahe but express kahi vela issue karu shakta. so tyamulech ashach kahi issues na handle karnyasathi pn ase listeners db cha connection nantrr lagech lavlele asu shaktat. and yachanantrr ek listen cha pn listener lau shaktat jyat port print karun bagtat ki apli app ata kutlya port var chaliye te. 

21) so ha sagla code pn changlach ahe but apan main index.js file lach khup jast messy karun taklay so tyamulech first approach peksha second approach mule apla code distributed rahto and toch changla mhanu shakto apan future cases cha vichar kela trr. so chala mg ata db folder madhe ek index.js file create keli tyat ata db cha connection cha code lihu. so chala db madhil index.js file madhe. 


*/