import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function(req, file, cb) {
        // const uniqueSffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage: storage
})


/*
72) so multer la shiknyasathi apnala doc vachavech lagnar multer che so multer cha github page ahe doc cha tithe jaun vachu shakto. so asa apan router lihito na so adi apan kasa lihaycho app.post('/profile', function(req, res, next)) asa na so ata yatach middleware apan takat asto route and callback function cha madhe like app.post('/profile', upload.single('avtar'), funtion(req, res, next)) asa. so madhe upload.single() he apan middlware taklay ata upload.single he multer cha ahe like mala photo upload karaychay ki profile route hit zala ki mala photo first upload karaychay asa ahe te basically. so single photo upload karaycha asel or multiple apnala middlware lagnarach. so he sagla mi je sangtoy single, multiple he functions so he sagle multer cha documentation page je ahe github cha tithe ahe so tithe jaun bagaych parallely. so zala upload but mi save kasa karnar na. so apnala tya file information section madhe options distat so apan local server la means aplya phone or computer madhe first file la save karaych mhanlo la upload karaycha adi. so tithe apnala destination, buffer he disel so destination means he aplya diskstorage madhe save karnyacha option ahe and buffer ha aplya memory madhe. so memory madhe jrr save kela trr jrr clean nahi zali tr ti bharu shakte na so tyamule disk madhe save karaych. so tithe doc madhe apnala DiskStorage kasa use karaych yach implementation pn dialy so ahe tasach apnala pn karaychay. 


73) so multer la import kela. so destination function  req, file, cb ghetay na so cb means call back. so te file ahe na parameter te multer kadech asta. req trr aplyakade astech ji user kadun req aliye ti. ek file access ithe apnala ek anki milto jyacha mule saglya files cha access apnala milto. req cha at trr json data asto to apnala miltoch and jrr file pn yetiye so tyachasathich multer use hoto. bec req body madhe json data vagere apan configure trr kela express madhe but file nahi configure karu shakat. so yasathich multer or express cha file uploader use hoto. jenekarun mala madhe ek option milto jyacha through mi file upload karu shakto. now cb madhe first param trr null ahe which is error parameter so ata error la nahi handle karuyat so second param is destination. so means apan aple sagle files vagere je save karaychet apnala temporary to path ithe dyaycha. so mi thevnare same directory madhe so dot dila and then public and temp. so yachsathi baga apan ek folder create kelay na public/temp so to yachsathi kelay. so mi saglya files public folder madhe thevnar so mala easily tyacha access milel. then second option is filename. so file ji save keli na apan public folder madhe so ticha name apnala kasa thevaychay he aplyavar asta kahi pn theu shakto apan just unique asav. so tithe code bagu shakta varti comment kelay na uniqueSuffix ahe na so tasa apan file cha name generate karu shakto and then cb madhe tyala file name barobar attach kelay so file madhe pn barech options apnala miltat. like fieldName, fileName, destinationName, mimeType, then anki ek milta which is originalName means je user ne file cha name thevlela upload kartana tech apan access karu shakto. but originalName thevna kahi vela problem generate karu shakta. bec jrr user ne ekach name cha multiple files ekdam upload kelya trr files override hou shaktat na. but ithe aplya case madhe ti case khup kami ahe bec apan file cloudinary la upload zalya zalya lagech delete pn karnare na aplya local server varun so evdi need nahi but best practice hech ahe ki new unique name generate karun mg save karaycha. and then ya storage la export kela so ata apan ya upload variable la as a middlware controller lihitana madhe use karu shakto and easily file pass karu shakto. so zala he multer cha pn configuration zala. 

74) so jenva apan app.post('/profile', function(req, res, next)) he lihito so tenva /profile yala route boltat and function() je ahe pudhe tyala controllers boltat. so jenva apan routes and controller lihit asu trr jrr ekada route apnala file provide karat asel trr to route lihitana madhe ya multer cha upload.storage karun mi yala call karnar tithe and tithe mg apan file che operations karu shakto so yalach middlware boltat.so jenva pn apan ya storage la call karu tenva mala filename pn miltay na so localpath vali ji apli gost hoti ti ithe solve houn jate bec multer.diskStorage je function ahe te fileName lach return karta. means jo pn localpath ala pahije to sagla apan gheu shakto. like bolo na varti file dot karun options access karu shakto tithe. so almost 95% ready zaloy aplya project cha configuration karun. so apan ataparyant bagitla trr ky kela trr just project setup kelay. like apan ajunparyant ek single controller nahi lihila, route nahi lihila, aplya app file madhe pn ajun jast kahi nahi. so asach asta companies madhe pn production grade code lihitana ha sagla setup karavach lagto. so apan ata kahi routes and controllers lihu shakto like registration che vagere, te routes postman var kase use karayche vagere sagla bagnare.

75) &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Video no. 13 started &&&&&&&&&&&&&&&&&&&&&&&&&&&& : so ata controllers lihinare. so controller folder madhe ek file create keli user.controller.js, so apan pahila user cha controller lihinare. so chala tya file madhe.
*/