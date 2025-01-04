import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    fullName: {
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },

    avatar: {
        type: String, // will come from cloudinary url
        required: true
    },

    coverImage: {
        type: String // will come from cloudinary url
    },

    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    refreshToken: {
        type: String
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


/*
56) so similarly mongoose la pahila import kela then ek userSchema object create kela and tyala export kela and database cha name thevla User. so first field create keli username chi tyat tyacha properties ky ky pahijet tya pn taklya. then tyat ek property takli index = true. so he index ky asta mongodb madhe ki jenva pn apnala kutlya field la searcheble banavaych asta optimise padhatine trr tenva tya field cha index true karaych. so yane jara expensive hota operation but jrr kutlya field la apan khup jast searching sathi use karnare asa mahiti asel tarach tya field la index true karaych. he pn nantrr vachaych mongodb madhil index cha. so ata hech lakshat theva ki jenva pn kutlya field la search sathi use karaych asel app madhe trr tya field ch index true kelela changla asta. and jari apan nahi kela tari chalta tari pn search karuch shakto asa kahi nasta ki he nahi lavla trr search nahi karu shakat but ya index ne search thoda fast hota evdach. then tasach mi fullname la pn index true kela tyacha basis var pn mala search karaychay tyamule but saglyach fields na index true nahi karaych nahitrr performance chi ekdam vat lagte. then next email ghetla then avatar ghetla so tyacha tyep string thevla bec apan images, videos sagle cloud platform var upload karnar first always like ata mi cloudinary var thevla samja trr cloudinary apnala ek url create karun deta tya image or video cha so tyach url trhough apan saglya images and videos na access karu shakto so tyach url la ithe ghenar. then coverImage pn ghetla so coverimage user lau pn shakto and nahi pn so tyamule required true nahi kela tyach. then watchHistory field so yachat multiple videos save karnar na apan so array ghetla and he video model var depend asnar na so tyasathi link karavi lagnar video cha id barobar na so tich keli. then password field la ghetla so string type dilay na bec ithe apan jo encrypted password string asnar ti thevnar. and ek refreshToken ek field ghetli he ky ahe bagu pudhe. so now asach video model pn create karu so chala video.model.js file madhe.

61) WHAT IS BCRYPT AND JSONWEBTOKEN PACKAGES : so apan kahi packages ata install karnar. so pahila mhanje bcrypt package. so bcrypt che pn don prakarche packages ahet ek is bcrypt and dusra is bcryptjs. so yanchat ha difference ahe ki bcrypt package core node library var banalay ani bcryptjs optimised ahe javascript barobar with zero dependency and te bcrypt barobar compatible pn ahe so most of the places var ya donhitlach kutla tari package disel doghanch almost almost samech working ahe. doghanch pn configuration vagere almost samech hota. so apan ithe bcrypt use karnare. so bcrypt ky karta trr navanach kaltay ki it helps to hash our passwords so password la encrypt karun server var thevaychay and tyala parat decrypt pn karaychay trr tenva apan hi library use karto and dusri ek library apnala lagnar ti mhanje jwt ti kashasathi trr token sathi so that library is jsonwebtoken so bcrypt pn and jwt pn doghepan cryptography var based ahet je tokens banavtat. so ya don libraries install kelya 'npm i bcrypt jsonwebtoken'.

62) WHAT IS HOOKS AND IMPLEMENTING BCRYPT AND JWT : now bcrypt and jwt la import kela. now apan directly trr yancha use karun fields na encrypted nahi banau shakat yasathi apnala mongoose cha kahi hooks chi need padte. hooks means tech apan thodya vel adi bagitle pre, post te vale so tyatil pre means mala ky pahije ki user jenva data save sathi call karel tenva save karaycha just adi mala kahi code execute karaychay or password encrypt karaychay trr tenva apan pre madhe to code lihu shakto. so mostly he hooks model files madhech astat professional code madhe pn. so he hooks apan lavto schema var like ithe schema ky create keliye apan userSchema na so tyachavar he hooks lavayche. so userSchema var pre hook lavla. so apan yachaadi bagitla na app.listen, app.use, app.on so tasech he hooks pn ahet so pre first gheta ki kutla event apan listen karu ichito so apan validate, save, remove, updateOne, deleteOne ya events var listen karu shakto so he events ahet mongoose cha docs madhe vachayche jaun. so mala ata password encrypt karaychay na so just save vaycha adi mala he execute karaychay so save evet takla tyat. and tyachanantrr apnala milto callback so tyat apan apla jo code execute karaychay to lihu shakto. so apan ithe callback sathi arrow function use karnar. but ithe hooks madhe arrow function nahi use karaych ka trr because arrow function madhe aplyakade this cha reference nahi milat context ky ahe he arrow function la mahiti nasta but ithe context mahiti asna khup garajech ahe bec save event kasahvar chalvaychay userSchema means User var na so userSchema cha at Schema{} madhe apan jya fields apan use kelya ahet tyancha access pn lagnar na apnala. so tyasathi userSchema cha referece lagnar na bec in the end userSchema pn ek object ahe na so object cha values na apan access kasa karto dot ne na like userSchema.username, userSchema.email asa na so tyasathi userSchema cha reference lagnar so tyachmule ithe arrow function na use karta simple function use karaych jyat apnala this cha reference milto. and he je encryption vagere he usually thoda time gheta karan yat algorithm chalta thoda time gheta cpu processing hota so tyamule ya encryption cha functions na mostly async ne lihila jata so async lavla and we know err, res, req and next na so he apan middleware lihitoy na ata ki save vaycha adi he execute kara mhanun so tyamule yat next apan takla ki he middleware run zala ki next middleware varti 
java asa so tyamule next middleware cha reference ithe apnala milto so tya next la mg khali call karaych. so next middleware call hoil. now mala ky pahije ki jenva pn maza password save hoil tenva tya password field la ghya and tyala encrypt karun save kara. so thike mg this cha referenece ahe so this. ne password la access kela so yalach asa access karnyalach hooks boltat ki mi ek this cha reference gheun hook create kela and tyacha through fish hook kela or ithe fields na hook kela ithe asa. so encrypt karaychay so bcrypt lavla and . hash kela so hash don parameters magta kutlya field la hash karaychay so password la pass kela and dusra ki kiti rounds lau means salts vagere nasta ka tyache kiti rounds lau so yachabaddal vachaych nantrr so mi ithe 10 takle apan 8 pn taku shakto kahi jn default jevde astat tech thevtat and encrypt kela and last la next() la call kela. now he apan karu shakto but tyachat ek issue ahe ky trr jenva pn apan data madhe change karnar tenva tenva he password la pn again save karnar means suppose apan aplya profile madhil avatar change kela so mg hi userSchema parat call honar and baki saglya fields sobat password field pn parat save honar so password mg change honar na bec ata tyacha hash id vegla zalela asnar. so tyamule apnala asa havay ki mi jenva password field la pathaven updation sathi tenvach password field la change kara otherwise tyala change naka karu. so password field apan kadi pathavnar jenva first time taku tenva or jrr mala maza password update karaychay tenva ek so yasathi mala ek if condition ithe takavi lagnar ki this.isModified() so hi method apnala milte ithe bydefault so yat mg apnala tya field cha name pass karaych asta ji field change zaliye ka nahi te check karaychi ahe and ti string madhech pass karavi lagte so hi method check karte internally ki pass keleli field modify zaliye ka nahi te and tyala ! not lavla so jrr modify zalich nasel trr tithunach return kara next() la otherwise encryp kara so he zala encryption cha trr. decryption kasa karaych bagu.

63)HOW TO DECRYPT PASSWORD : so jase apan middlewares create karu shakto tasach mongoose madhe apan custom methods pn create karu shakto. jasa apnala mongoose methods deta na updateOne, deleteOne tasach apan custom methods pn create karu shatko. so he karnyasathi pn apnala userSchema lagnar and yat apnala ek method milte which is methods and ya method la ata apan function pass karu shakto so isPasswordCorrect method create keli and tyachat function pass kela so he function ek parameter gheta which is password ki jo password apnala check karaychay to password. and tyacha at mi maza password decryption cha logic lihinar. so hi bcrypt library field la ecrypt pn karu shakte and decrypt pn. so yat apnala ek method milte which is compare. so compare method parameter madhe mhanta ki mala ek trr data dya string madhe so password la pass kela bec user ne jo password taklay to string madhech asnar na so passsword la pass kela and dusra parameter magta ki mala encrypted password pn de. so encrypted password trr apnala database la ahe and database cha access trr aplyakade ahe na bec password kutlya schema madhe save ahe user madhe na and userSchema madhech apan ata ahe so tyacha reference ahe aplyakade this na so this through mg apan to password access pn karu shakto so this.password takla. and he encryption decryption karnar na so yala await kela pahije so await kela and yala return kela so hi compare method boolean value pathavte ki match zala trr true or false. so he zala decryption cha pn. 

64)WHAT IS JWT AND HOW TO USE IT : so he sagla trr kela but jwt la nustach import kelay apan tyala trr use kelach nahi na ajun. so jwt ky ahe ek bearer token ahe. bearer token means je yala bear kartay tyala mi data pathavnar means he token jyachakade asel tyalach only mi data pass karnar like a key. so he jwt tokens create karnyasathi apnala kahi strings define karun thevavya lagnar. so ya strings apan usually environemnt variable madhe thevto so .env file madhe taku. so ek ACCESS_TOKEN_SECRET takli ji ki kahi pn long string karun apan lihu shakto so chrome varun generate karu shakto. then ACCESS_TOKEN_EXPIRY jyat 1d asa lihilay ki he 1 day madhe expire honar then ek REFRESH_TOKEN_SECRET ek ghetli and tyat pn kahi pn taku shakto mi ti long string takli and anki ek asnar REFRESH_TOKEN_EXPIRY so ya refresh token cha expiry jast asto so 10 day takla and jo main token asto access token tyach aexpiry kami asto like 1 day or 2 hours etc. now apan trr user cha model madhe only refresh token la ghetlay na access token la ghetlach nahi. so yes apan ithe ghetoy karan apan sessoins and cookies donhina manage kartoy ya project madhe so khup changli security apan yat implement kartoy. so access token db madhe store nahi honar refresh token honar.

65) so apan ithe varti pre cha methods lihilya na so tyach pramane mi access token generate karycha pn methods lihu shakto ka so yes he pudhe jaun apli life khup easy banavnar.so same hach format asto apan kiti pn methods aplya schema madhe inject karu shakto. so yat lihili methods generateAccessToken and he name apan kahi pn deu shakto like varti dial isPasswordCorrect tithe pn kahi pn deu shakto. and yat ek function lihila. async nahi takla tari chalta bec he fastach asta. and tasach apan generateRefreshToken pn lihu shakto. so doghat antar ky ahe kahich nahi bec doghepn jwt tokens ahet just usage cha antar ahe ekala kasa use karaych ani ekala kasa use karaycha asa. so generateAccessToken lihu so jwt madhe aplyakade sign navachi method milte so token generate karayla help karte. so sign method payload magte, object magte, secretKey magte. so mi pahila deto hila payload ki ky ky data thevaychay maza so already saglya gosti mongodb la save asnaret so apnala this through sagla data trr milnarach na so this._id la ek ghetla. then apan fakt id la store karu shakto but mi ithe email pn ghetla and username and fullname pn ghetla. so pahila _id vagere he payload cha data chi key ahe and this. karun je ghetoy apan te db madhil ahe aplya. then ya sign method la lagta access token so env madhun te dila. then anki ek lagta te mhanje object so the object lihinyasathi ek curly bress open kela and tyat lihila expiresIn and tyat expiry cha constanct takla env madhil. so zala so he sign method ky karta ki jasa access token generate hota tasa tya token la return karta.so yala return kela. and je refreshtoken cha implementation ahe na so te pn same to same hech asnar just apnala constants chi names env file madhil refresh chi dyaychi. so jr same ahe trr double ka lihitoy na. so bec refresh token cha payload madhe data less pathavat asto apan. ka trr bec he satat refresh hot asta so tyamule only id la thevla tyat.

66) %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Video no. 10 started %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
so mostly file handling hi backend valech use karat astat means frontend valyach kam file handling karna nastach only file upload karaychi particular path varun yevdach kam frontend engineer cha asta baki tyala handle vagere karna he backend engineer cha kam asta and most of the production grade services jya chalelay ahet ata tithe file handling hi aplya swatacha server var nahi keli jat, so ek trr yasathi specialized services use kelya jatat or commonly apan aikto aws varti upload kara so tyacha pn tarika same asto and third party services cha pn tarika same asto. so pratek endpoint la aplyakade koni file upload karnyasathi nahi denare na like login cha endpoint hit kelyavar or signup cha endpoint hit kelyavar koni file upload ne login or signup nahi na karnar so tyach mule pratek controller madhe file handling cha code lihina ha better approach nasto. so tyamulech file handling cha ek separate utility function banavla pahije, so kahi vela middleware banavla jata and kadi kadi utility aplya usecase nusar pn yala apna nehmi veglach thevto ki resuse karu saku mhanun. so same code la apan image upload kartana pn use karu shakto, video kartana pn or pdf, file kahi pn upload kartana same code cha use karu shakto. so saglya end point madhe use nahi use hot ye so jya end point madhe he use karaychay tyachat as a middleware yala inject karto apan. so middleware la lakshat thevaycha asel ki middleware ky astat trr ek sentence lakshat thevaycha ki middleware mhantay ki jata jata mala bhetun java means req ali ki ti direct server var nahi jat first middleware la bhetun jate.

67) WHAT IS CLOUDINARY : so first service apan bagnare ti mhanje cloudinary. so cloudinary file uploading sathi khup famous service ahe baryach companies hilach use kartat. so cloudinary pn behind the schenes google cloud, aws yachach services na use karat asta. so apan file upload sathi only cloudinary nasto use karat apan don packages na pn use karat asto. ek mhnaje 'express-fileupload' and another is 'multer'. so doghe pn almost samech ahet ajkal multer lach use kela jatay jast industry madhe. apan ata multer lach use karnare. so multer cha documentation tyacha github page var jaun vachu shakto. so first 'npm install cloudinary' karun install kela cloudinar cha package. and also 'npm i multer' karun multer la pn install kela. so cloudinary cha website var jar gela trr tithe documentation ahe so tyat dilay ki configuration vagere kasa karaychay te. so first mala cloudinary la as a v2 import karav lagnar and then kahi configurations mala set karaychet. and configurations madhe cloud_name, apli api key, api secred jya apnala cloudinary generate karun deta jenva apan signup karto tenva. and hi sagli names apan .env madhe taknar na bec he sensitive infor ahe. so apan ky karnare so user kadun file upload karun ghenar, so file upload hi apan multer throughch karu shakto directly apan cloudinary var file upload nahi karu shakat. so cloudinary hi ek just service ahe like aws service ahe google cloud service ahe tashich cloudinary pn ek service ahe or we can say aws, cludinary ya sdk ahet. so clludinary ky karta aplyakadun file gheta and cloud var tila upload karta. so apan ky karnar ki multer cha use karun user ne ji file upload keliye tila temporary aplya local server varti thevnar and tyacha nantrr cloudinary cha use karun apan tya local server varil file la ghenar and tila server varti upload karnar. so he don steps karaychi ky need ahe na so directly multer through file gheun direct cloudinary var upload nahi ka karu shakat. so yes apan karu shakato tasa. but production grade code madhe always temporary aplya server var pahila file la store kela jata ki jar kahi fail zala, kahi issue ala trr atleast ti file aplya local server var available aste so tila gheun again apan upload cha attemp karu shakto and tyacha nantrr local server var store keleli file apan lagech delete pn karun takto. so cloudinary la apan as a utility use karnare so utility folder madhe cloudinary.js file create keli. so chala tya file madhe.
*/