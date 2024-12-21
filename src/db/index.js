import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
        console.log(`\n MY MONGODB CONNECTED -> HOST : ${connectionInstance.connection.host}`)      
    } catch (error) {
        console.log("MY MONGODB CONNECTION ERROR : ", error)
        process.exit(1)
    }   
}

export default connectDb

 
/*

22) so mongoose and dbname la import kela. so connection cha function cha ek lambda banavla and tyala connect variable madhe store kela so mg ya connect variable la apan directly aplya scr madhil index.js file amdhe call karnar so he connection cha lambda function mg tithe call zalyamule execute honar. async lavla same and try catch lavla then error la print kela. d

23) --------- PROCESS IN NODEJS ---------- : now apan tikade directly error la throw kelela na. but nodejs apnala process mhanun ek asta tyacha access det asta. process global asta so apnala tyala import nahi karav lagat bec te nodejsach provide karta apnala. process means apli current application kutlya na kutlya process var chalu aste tyach process cha reference apnala nodejs process through deta. so nodejs cha process topic vachaycha bagtana tyat multiple listeners miltat apnala like apla android madhe onCreate() onStart onDestroy mehtods miltat na jya activity cha current position nusar execute hotat tasech ya nodejs cha process madhe pn apnala listeners miltat like exit() jo process purn band honar aste tenva hi chalte and hi chalyavar apan kahich karu shakat nahi like chukun process exit vayla lagli trr ya method madhe apnala process la exit vaycha timelach lagech parat restart karaychay trr he apan nahi karu shakat exit means totally exit karnarach te. then tasach yat asta beforeExit ji process exit vaycha adi execute hote asech barech listeners ahet te bagayche jaun nantrr. so process.exit() takla and tya exit madhe vegvegle codes astat exit karnyasathi 1, 0 etc. he codes pn bagaychet. kutle kutle kashasathi ahet te. so ashi apan error trr handle keli. 

24) now try madhe connect cha code same await laun lihila. then mongoose connection zalyavar apnala ek returned object det asta so tyala connectionInstance variable madhe store kela. so yat connection zalyavar response alay aplyakade so now apan ithe express cha app cha on, listen to code nahi lihinar bec ithe only apan purely db connection chach only code lihinare. so console kela so apan tya connectionInstance madhun host vagere kadu shakto. and then ya connect variable la export kela.

25) now chala src madhil index.js file madhe ya connectDb la call karu.

*/