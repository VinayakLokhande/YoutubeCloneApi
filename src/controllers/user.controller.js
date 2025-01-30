import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
}


const registerUser = asyncHandler( async (req, res) => {
    // res.status(200).json({
    //     message: "OK"
    // })  
    
    // 1) get user details from fontend.
    // 2) validations
    // 3) check if user already exists.
    // 4) check for images.
    // 5) upload images on cloudinary.
    // 6) create user object and create entry in db.
    // 7) remove password and refreshToken feild from response.
    // 8) check for user creation.
    // 9) teutnr response to fontend. 

    const { fullName, username, email, password} = req.body
    console.log(`USER CONTROLLER -> GOT INFO FROM USER : username : ${username}, fullname : ${fullName}, email : ${email}, password : ${password}\n`)

    // if (fullName === "") {
    //     throw new ApiError(400, "fullname is required")
    // }

    if ([fullName, username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");      
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create(
        {
            fullName,
            avatar:avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase() 
        }
    )

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    console.log(`USER CONTROLLER -> CREATED USER : ${createdUser.toString()}\n`)

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }


    return await res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})


const loginUser = asyncHandler( async (req, res) => {
    // 1) get user details from request.
    // 2) check if user or email correct.
    // 3) find the user in db.
    // 4) check password is correct.
    // 5) access refresh and access tokens.
    // 6) send refresh and access tokens through cookies.
    // 7) send response.

    const { username, email, password } = req.body

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )

})


const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )

})




export {
    registerUser,
    loginUser,
    logoutUser
}


/*
76) so apan async handler file lihili hoti na. so ti we know just helper file hoti so apnala tyachamule promises madhe vagere nahi takav lagnar sarkha sarkha or try catch madhe nahi takav lagnar so tyamulech apan ti file create keli hoti. so te apan ithe use karnar so asynchHanlder la import kela. then mala ek method create karaychi ahe ji just user la register karel. so registerUser variable create kela. now ha jo register karaycha syntax ahe to apan nehmi saglikade use karnre same to same jenva apnala user la register karvaycha asta tenva. so asyncHandler function la ithe call kela and te ek higher order function la magta na as a parameter so tyamule tyachat anki ek method lihinar mi so async takla and tyat arrow function lihayla chalu kela and tyat apnala req, res milta ka trr bec apan express through lihit asto na so tyamule aplyakade req, res astach means 4 gosti astat tasha req, res, next, err na. now he kelyavar tyacha body madhe just directly response dila so res.status karun tyat status code takla 200. apan ha status code kahi pn taku shakto and jo apan status code ithe taku toch postman la and user la pn milat asto. and also kahi data pn pass karu shakto as a json user la so .json() kela and tyat ek object apan pass karu shakto key value pair madhe jasa ki apan api madhe bagtoch na tasa. and registerUser la export pn kela. now our next is creating routes. means apan method trr create keli but hi method kutla tari url jenva hit hoil tenvach run zali pahije na. so hech sagle routes lihinyasathi apan routes folder create kelay. and sagle routes veg veglya files madhe apan maintain karat asto. so routes folder madhe user.routes.js file create keli jyat sagle user che routes asnar. so chala tya file madhe.

87) so juna res no apan pass kela hota dummy dyala comment kela. so apan kadi pn kutla big problem solve karat asto tenva tyala first small small sub problems madhe breakdown karaych. so like ithe mala ata register karaychay na user la. so mi direct trr nahi na karu shakat user la register mala kahi gosti check karavya lagnar na register karaycha adi so tyach apan first lihu varti ki ky ky gosti mala karavya lagtil ya user la register karnyacha problem la solve karnyasathi. so first step is to get user details from fontend so mg bolnar ki aplyakade trr ata fontend nahich na mg info kashi ghenar so backend lihitana frontend postman la manaych karan apan tithun params, body pass karu shakto na tyamule. so data kasa yenar jashi apan user model lihiliye tasa na. so mala tyatil watchhistory ek nako ahe karan te apan programatically add karnar and refreshToken ek nako ahe karan jrr user register zala asel trr refreshToken chi need nahi. so he sodun baki saglya feilds mala lagtil. thne mala validations lavave lagnar ki user ne empty trr nahi pathavla data or email correct ahe ka etc. then check kela user already exists trr nahi. so apan email ne pn or username ne pn check karu shakto like instagram madhe username ne unique user create hotat na so tasach apa ithe donhine karun bagu email var pn and username pn donhi pn unique asle pahijet asa kahi karu. then apan images pn ghenare so images alet ka nahi te check karaycha especially avtar alay ka nahi te check karaych bec te mandetory ahe coverImage nahi so te nahi ala tri chalel. then next te ale astil trr tyana cloudinary var upload karaycha and tyat again check karaych ki avtar successfully upload zalay ka. then mi ek user object create karnar ka trr mongodb madhe mala data save karaychay na so te trr object magtay na tyamule ya varcha saglya data la ektra karun ek user object create karnar mi so te karun mi ek db la create chi entry karnar. then ky asta ki jasa user create hoto tasa apnala jevdi pn info save keleli ti sagli response madhe return milte apnala. so email, username, password etc. je kahi dilay te sagla apnala return madhe milta so password la mi encrypt kelay but tari pn mala pass la frontend la return nahi karaychay karan tyala tyacha use pn kahi nahiye na. so pass la and refreshtoken la remove karaychay reponse pathavtana. and then check karaych ki res alay ka and jr ala asel trr tyala return karaycha. so asa apan aplya ya problme la steps madhe breakdown kela.

88) now apnala first ky gheychay user details na. so sagla data req madhe yet asto je req param ghetlay na apan tyat bec user ne req keliye na so tyat to yet asto. so req.body kela ki apnala saglya details miltat jya body req madhe alelya ahet but form madhun or direct json madhe data yet asel trr to apnala req.body madhe milun jail but url madhun yenara data apnala body madhe nahi milat tyasathi vegla kahi karav lagta te nantrr baguch. so req.body kela and ya body madhil feilds na extract kela kasa trr ata user details pass karnar ahe trr saglya feilds user.model madhil tyat trr asnarach na so mi javascript cha destructuring use kela tithe so const kela and {} ya madhe pratek feild cha name takla bec we know na user cha apan lihitoy na so fullName, email, username, password he trr yenarach ahet na so te ghetle and files cha ky ki avtar vagere pass karnar user tyach ky trr te apan nantrr baguch. so he ghetle and yana ekda print pn karun bagu to see ki data yetoy ka nhi. so he test kasa karnar trr postman varti jaun test karnar so apan register cha url create kelela na so tyacha use karun tithun req send karaychi so mg ithe tithun send kelela data print hoil. so tithun raw madhun body madhe data send kela trr ithe print zala means req.body madhe aplya data yetoy. now apan ajun file handling cha kahi nahi na kela. so apan directly file handle nahi karu shakat only data handle karu shakto. jevda pn json madhe yenar ahe to. but file handling pn karaychi ahe na apnala so yasathi apan janar routes madhil user.routes.js file madhe so chala.

90) now next step is what validations. so now apan eka eka field la check karu shakto ki empty ahe ka or email asel trr email correct ahe ka. like mi comment kelay code tasa. so first check kela ki fullName emtpy trr nahi jrr asel trr apan ek error throw keliye na and tyat apan use kutlya error cha kelay trr ApiError class cha na so apan hi file create keleli na utils folder madhe so tich ahe hi. so hila pahila import kela and then hi class cha constructor ky ky magta trr statusCode, message vagere na so status code dila 400 and message dila fullname is required. but ya syntax madhe problem ha ahe ki he trr check kela but apnala saglya fields sathi asach check karav lagnar. so barech ifelse honar. but he pn chaltaych asa kahi nahi ki he karuch shakat nahi. so ithe ek js cha ek syntax use karu apan. so ek if condition lavli and tyat ek arra start kela and tya array madhe saglya body madhil fields na takla. now yala one by one ghyaychay na so mg apan yachavar .map pn lau shakto je ki array madhe milta apnala function but apan ithe lau .some so he ky karnar ek ek feild ghenar array madhil and ti check karnar so he some function ek func block magta as a parameter so dial and tyat func cha param madhe field takla so tyach name apan kahi pn deu shakto te just param ch name ahe so tya field param madhe ky alela asnar trr array madhil ek ek value tyat yenar and tyachanantrr tya func cha block madhe tya alelya field la trim kela and tyachanantrr pn jrr ti field empty asel trr tithun true return honar na so mg if condition madhe pn true janar na so mg he if block madhe janar. so simple he evdach karnar ki array madhil pratek field la ghenar and tyala tyacha block madhe check karnar ki null trr nahi. jrr ek jri field null asel trr some true return karnar so if madhe pn true janar so if block execute honar and tyat apan mg ek ApiError la throw kartoy. then he zalyavar jrr apnala email cha format pn correct ahe ka he pn khali ek if condition laun check karu shakto ata mi nahi karat.

91) now next apnala check karaychay ki user exists ahe ka nahi. so yasathi apnala user.model.js la import karav lagnar so apan tithe export kelta na user la. so to jo user ahe jo user.model.js file madhun export kartoy apan to directly db barobar contact karu shakto ka trr bec to mongoose through create zalay na. so tyala ithe import kela so ata mongo db barobar sagle calls he user apnala karun deil. so mg ata mala db la vicharaychay ya user through ki mi tumhala ek email dein or username dein tyacha basis var mala ha user aplya db madhe exists kartoy ka nahi te sanga. so User madhe apnala ek findOne method milte so hi method ky karte ki jasa pahila user milel tyala user table madhe apan jo pass kelay tyacha sarkha tasa tyala te tyala return karnar. so mala trr ithe email and username donhi check karaychet karan donhi mala unique asle pahijet so yasath apan ky karu shakto ki findOne madhe ek block chalu karu shakto apan and tyat $ taklyavar apnala kahi operators miltat and, or, nor, where etc. so yat or takla and tyat ek array start kela and tya array madhe jevdya pn values check karaycha ahet tya saglya tyat takaycha. so don objects takle tyat and username and email donhila takla. and then return zalelay value la eka var madhe store kela and if madhe check kela so jrr existed asel trr error throw keli. so asach apan ek ek pn check karu shakto first username and then email. 

92) now next apnala check karaychay images. now req.body madhe apnala fields milalya na so apan routes madhe ek middleware add kela na register route madhe so to middleware ky karto trr aplya body madhe kahi more fields add karto. so jasa express ne apnala req.body default dilay na so tasach multer apnala req.files cha access deta so aplyakade multiple files ahet na so apnala files cha access yacha through milto so te ghetla and tyachavar ? lavla so to same kotlin sarkahch null check karto jrr value asel trr pudhe execute honar otherwise nahi honar asa. then tyacha nantrr mala avtar pahije so avtar takla ka trr bec apan user.routes file madhe middlware madhe tya files cha name dila na so tithe avtar dilay na apan so tyamule ithe pn avtar ghetla. so now hi ji property ahe ithe apnala baryach properties miltat ki file png ahe ka jpg ahe or tichi size ky ahe asha baryach gosti miltat and tyacha basis var pn validations lagtat. but apnala ithe pahije tyatil first property so [0] takla so first ka bec first property madhe apnala ek object milto tyala jrr apan tyala null check karun ghetla trr apan .path gheu shakto so yachamule jo pn tya file cha proper path ahe jo multer ne upload kelay to apnala ithe milel. so jashi file submit keli user ne tasa multer ne ti file aplya local server var tila upload kela so kasa kela trr apan multer.middleware.js file madhe sangitlay na storage madhe ki destination ghe kutla trr tyat apan purn path dilay na so te destination asnare file store karnyacha tithe ti file thev and tya file cha je pn original name ahe te mala de asa lihilay na tya middleware madhe so tithunach apnala ithe path yenar and yala eka variable madhe store kela path la so ha ajun trr local pathach asnar kutla trr aplya public/temp ithe yala ajun apan cloudinary var store nahi kelela so ata aplyakade localpathach ahe. so asach same to same apan coverImage cha pn path kadu shakto. so now he paths apnala miltilach asa nahi jrr user ne file uploadach keli nasel trr apnala path milnarach nahi na. but as we know ki avtar aplya project madhe mandetory ahe ki user la avtar sathi image upload karavich lagnar coverImage nasel tari chalel. so te check kela pahije so if condi lavli so jrr path nasel trr error throw karaychi.

93) now our next task is to upload these images to cludinary. so apan already images na cludinary varti upload karnyasthi methods lihun thevliye na kute trr utils madhe cludinary.js file madhe apan cludinary cha configuration pn karun thevlay and also uploadOnCludinary method pn ahe and tyala export pn kelay so tyala ithe import kela. so tya uploadOnCloudinary method madhe apna localFilePath he param ghetoy na so te yach sathi ghetoy bec aplyakade local file pathach ahe na jo apan ithe varti kadlay so toch tyala pass karnar and te mg tya file la cloudinary var upload karnar. so tya method la ithe call kela and tyat path la pass kela. now hi method upload karnyasathi time ghenar so tyamule await lavava lagnar so yachsathi apan hi asyncHandler chi method async banavli varti. so jari asyncHandler swata pn await karnare pn tari pn apnala asa optionally karav lagta karan pudhe gelach nahi pahije jovar he upload nahi karat tyamule. so then uploadOnCludinary response return karnar tyala avtar var madhe store kela. so asach mala coverImage upload karnyasathi pn same karaychay. then again check kela ki avtar properly alay ka so tyasathi ek if condition lavli.

94) now apli next step ky ahe trr ek object create kara and tychi db madhe entry kara. now ya file madhe db barobar bolnara ekach ahe na te kon ahe trr User he na je ki mongoose through apan create kelay na. so User takla and tyat apnala ek method milte .create() and he gheta ky trr ek object gheta. so tya object madhe je je pathvaychay te sagla tyat pathavaych. so fullname takla then avtar ghetla but avtar apan cludinary var upload kelya nantrr ky denare purn response na cloudinary cha file madhe jaun bagu shakto apan so response madhe trr sagli cha sagli mahiti asnar na upload zalelay file chi but apnala ithe db la only url save kela tari te sufficient ahe na so tyamulech apan avtar ya variable madhe response alela asnar na so tyatun only url kadla and avtar madhe takla. then coverImage ghetli but ithe apan ek chuk karnar ki direct coverImage.url karnar but apan varti kute check kelach nahi na ki coverImage upload zaliye trr ka nahi apan avtar sarkha kahi checkach nahi na kela coverIMage sathi so tyamulech coverIMage?.url kela ki nullable kela tyala jrr asel trr taka || or "" null theva tyala asa. then email, password la pn takla and username la first lowercase madhe covert kela and then takla mala tasa pahije. so asa saglya user model madhe jya fields ahet tya apan saglya taklet then watchHistory mala ata nahi save karaych te mi jas jasa user video bagel tas tasa mi ya user object la call karun takat jain then password field pn mi encrypt kartoy then taktoy he sagla mi user.model.js file madhe bagun lihitoy then refreshToken chi mala need nahi save karaychi. now apan ya file madhe user object create kela but as we know db sobat boltana error yeu shakte and also apla db dusrya continent madhe asu shakto so time lagu shakto so error la trr apan handle kelay kasa trr because apan ha varun khalparyant code asynchHanlder function madhe lihitoy na so asynchHandler.js file madhe apan promises lavlet and tithe catch madhe error la handle kelay na so tyach kahi tension nahi but ata tension ahe time cha so tyasathi await lavla user.create() cha pudhe and tyatun je pn yenare tyala user variable madhe store kela.

95) now next step is password refresh token remove karaychet but te baguch pudhe but next step ahe ki user successfully create zalay ka nahi te check karaychay so tyasathi apan directly karuch shakto null ahe ka nahi response but tyacha peksha better approach ek asu shakto ki direct db lach vichara ki user create zalay ka nahi. so yasathi User.findById hi ek method deta mongoose apnala jyat apan id la pass karu shakto. so as we know mongodb pratek entry barobar ek _id navachi field ek automatic generate kartach na ji pratek record chi unique id aste.so tyamulech jasa apnala he user milel na tasa tyat apnala saglya fields miltat jya apan pass kelelya save karnyasathi so tyachabarobarach apnala ek field milte _id. so tyat ti pass keli and jrr user milala trr user create zalela asnar db madhe and tyala pn await kela and tyala createdUser var madhe store kela. now apnala password and refreshToken la remove karaych hota na so aplyala User madhech anki ek method milte select navachi also so apan methods na chain karu shakto like User.findById.select asa. now ya select through apan aplyala pahijet tya fields na apan select karu shakto. so hi select method use kashi karaychi trr yat apnala string pass karavi lagte jara weird syntax ahe but kasa trr so yat apan te nahi takat ki apnala ky pahije trr apan yat lihito ky ky apnala nko ahe te bec bydefault trr sagle selected astat fields email, username etc. sagle but apnala password and refreshToken nakoy na so - asa minus sign laun tya tya field cha name takaych ji field apnala nakoy ti so -password takla and then dyaycha space and dusri field ji nakoy ti which is -refreshToken takli. so ithe ky honar ki apan pahila find karnar user la id ne so to user yenar and then tya alelya user object madhil password and refreshToken ya don fields na apan kadun taknar ka trr because ha jo user alay to as a response apnala pathavaychay so response madhe pass and refreshToken pathavun ky karaychay na tyachi ky need nahi. now jrr he createdUser empty asel check kela khali if madhe trr error dya but ata chuk apli asnar jrr user save zala nasel trr db la na so tyamule error madhe takla 500 ki server chi chuki ahe and ek message dila. so he pn apan kela user create zalay ka check pn kela and tya don fields na remove pn kela. 

96) now last step is ki jrr user successfully create zala asel trr tyala as a res return pn kara. now response sathi pn apan ek util class create keleli na ApiResponse so apan always tya class cha use karunach res send karaycha like ApiError jenekarun nehmi proper same structure cha res user la jail. so tya ApiResponse la import kela. so return kela res.status la and tyat takla 201 ki sagla kahi ok ahe then .json kela bec json res apnala send karaychay and tyat ek object pass karaych asta so apan tithe { createdUser } asa pathau shakat hoto but apan organised res pathavaychay so tyasathi ApiResponse class use karu so json madhe ek new object create kela ApiResonse class cha and tyat status code then data madhe createdUser la as it is pass kela. so zala hech yevda karaych asta user la save karnyasathi db la. so yala test karaych pudhe bagu ata.

97) %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% VIDEO NO. 15 STARTED %%%%%%%%%%%%%%%%%%%%%%%%%%%%% so ata bagu ata yache postman madhe collections vagere kase create karayche, postman la configure kasa karaych, data kasa send karaycha so sagla bagu so chala backend_notes.txt file madhe tithe charcha karu.

102) so ata jrr mi coverImage na thevta req send keli but error ali but mala asa nakoy na coverImage jari user ne dili nahi tari chalel na ti optional ahe but error ali so ti error ali bec of cover image cha local path kadtoy na coverImageLocalPath ya var madhe so tithe ? he lavlyamule issue yetoy ki ? yachamule nehmich proper check hota asa nahi sangu shakat apan ki coverIMage aliye ka nahi aliye and apan ? takun only direct tya cover image cha local path la cloudinary la pn pass kelay. so tyamule ithe apnala ek if condition lavavi lagnar ji check karel cover image actually aliye ka nahi. so if condition takli pahila check kela req.files ahe ka then and ji req.files madhe coverIMage yenare ti array ahe ka so req.files array madhech images na pass karta means coverImage{[]} asa object pass karta so coverIMage chay so tyacha object asnar and tyacha at array asnar so to array ky ahe trr images cha array ahe so tayt array madhe images asnar and tyat pratek image chi or file chi purn info aslela ek ek object asnar pratek file cha. so te check kela ki array ahe ka then check kela ki tyachi length greater than 0 ahe ka. so he sagla asel tarach tya variable madhe coverIMage la taka ortherwise te variable null rahil na so toch problem ala hota so apan pahila ? he laun varable madhe cover image cha path save kelta na but jrr tyala coverIMage nahi milali trr te undefined return karaych so coverIMageLocalPath var madhe pn undefined yaycha and undefined khali user create kartana apan coverImage la condition takliye na ki cover image asel trr tila pathav and jrr nasel trr null pathav so tya var madhe undefined aslyamule first condition satisfy vaychi and undefined jaych save honyasathi but apan undefined nahi na save karu shakat string madhe so tyamule TypeError: Cannot read properties of undefined hi error ali hoti so ata jr cover image asel trr tyat ti store hoil otherwise null asel tyat so khali user create kartana pn null vali condition satisfy hoil. 

103) %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% VIDEO NO. 16 STARTED %%%%%%%%%%%%%%%%%%%%%%%%%% so ata apan charcha karnare user la login and logout kasa karaych. so yasathi refresh token and access token yancha khup use karto apan. so user.model.js file madhe apan don tokens create kelet na refresh token and access token right. so yanchat mg difference ky ahe and he don ka ahet asa question asel. so saglikadech he donhi tokens nahit ghet just access token asel tari kam houn jata but modern practice nusar donhi pn aslela changla asta. so donhi pn tokens same astat but just tya doghat antar ha asto ki te expire kadhi hotait. so as we know access tokens he short lived astat means he lagech expire hotat but refresh tokens long lived astat. so yach time he depend asta aplya taknyavar like apan access token la 5 min or 10 min or 30 min kiti pn time madhe expire karu shakto tasach refresh token la 1 day or 1 week or 1 month or 1 year kiti pn asu shakto. so mg yanchat difference ky asto bagu. so suppose apan login zalo and apan file upload cha feature dilay aplya app madhe so file upload keli user ne. but apan access token cha time just 15 min thevlay so user nantrr jenva 15 min nantrr anki try karel file upload karaychi trr to tenva nahi karu shaknar na bec file upload tenvach karu dili pahije jenva user authorized asel na so apan user authorized ahe ka nahi he kashavarun bagnar access or refresh tokens varun na so tech jrr expire zala asel trr nahi na file upload karu dila pahije mg to ata file upload kasa karu shakto trr again tyacha login, password takun. but user ne jrr already login kelay and tari pn thodya time ne tyala again login karav lagtay that is not good practice na so tyamulech ithe scope madhe yeta refresh token. so as we know user.model.js file madhe apan refresh token la pn save kelay na. so refresh token db madhe pn save asta and user la tyacha cookies madhe pn dilela asta save karnyasathi. so user la apan validate trr access token nech karnar but jrr varcha scenario zala trr user la apan bolto ok tumala again password vagere takaychi need nahi tumchakade je refresh token ahe cookies madhe and mazakade je refresh token ahe tumcha user id sathi db madhe tyana mi match karen te jrr same astil tr ok ahe tumi app chi functionality use karu shakta asa.

104) so ata controller lihu login cha pn. so apan registerUser controller create kelaych ata karu loginUser controller. so same loginUesr var create kela and tyat asynchHandler la function pass kela and also loginUser la export pn kela. so pahila steps lihilya so pahila apan data req madhun ghenar jo user ne pass kelay. then check karaych user or email correct ahe ka so apan just username or just email var check karu shakto but apan ya project madhe donhi var check kartoy. then user la find karaych. so jrr user asel trr password check kara. then jrr asel trr access and refresh token user la pass karen kasa trr cookeis through and te pn secure cookies apan pass karto te kasa baguch and zla res pathava shevti. so chala ek ek karun he lihu. 

105) so req.body madhun email, username, password kadle. then check kela ki jrr username and email donhi nasel trr error throw keli. now jrr null nasel trr ata check kela pahije ki ya username or email cha user db madhe ahe trr ka. so tyasathi query lihu ek. so as we know aplyakade User ahe na apan varti import kelay na. so tya user through findOne() func call kela so he ky karta ki jasa yala pathavlelya username or email match zaleli ek jari entry yala milte tasa tila he return karta. so mostly username or email kahitari ekach check kela jata but apnala ithe donhi check karaychet na so tyasathi mongo query madhe apnala operators miltat or, and, nor, where, set etc. so yancha use karun apan same jasha sql queries madhe conditions taku shakto tashach taku shakto. so $or lavla and donhila array madhe objects madhe pass kela. so he ky karnar find karnar user la so jrr ti username cha base var milali tari tyala return karel or email cha base var milal tari tyala return karel. then await lavla. and jo user return hoil tyala store karun thevla. and jrr user milalach nahi tr to nahich na db madhe so tithe error throw keli. now jrr user milalay trr next step is password check karaych. so yasathi pn apan method lihili hotil na user.model.js file madhe isPasswordCorrect so tyala apnala pass ky karaychay trr password la jo ata user ne apnala pass kelay to so te ya password la and user madhe jo password ahe already tya doghat compare karel na. now ithe call karu tila. so now ya User through apan mongoose cha methods access karu shakto na like findOne, findById but apanala ithe aplya model cha methods access karaycha ahet na like apan ja user.model.js file madhe lihilya ahet isPasswordCorrect or generateAccessTokens ya so ya methods kashat asnar trr aplya user object madhe so ya apnala kasha through milnar mg trr ya user ya madhe je apan findOne karun apan user la kadla na aplya tyat apnala ya methods milanar. so tya user through tya method la access kela and tyat password la pass kela so te password kutun ala je apan varti req.body madhun kardlay tithun. so jrr pass correct ase trr aplyakade true or false value yeyil tila var madhe save kela. so jrr pass correct nasel trr error dili pahije so dili khali if madhe.

106) now next step is access and refresh token create karaychet na. so he create karna yevda common ahe ki yala apan eka separate method madhe lihu bec apan yala pudhe pn satat use karu shakto so varti ek generateAccessAndRefreshTokens var create kela. then async lavla so ata apnala ithe async handler chi need nahi bec apan kutli web request vagere nahi karate ithe just apla internal working kartoy. now refresh and access tokens create kartana apnala always userId lagnar so tyala as a param ghetla. so userId la apan easily gheu shakto na kasa trr apan khali loginUser madhe user la kadlay na findOne karun so tyacha through milel easily. then try catch lavla and catch madhe apierror throw keli. now try madhe pahila tya userId through tya particular user la find kela and tyala user var madhe thevla. so now apan user.model cha methods na pn access karu shakto so user through generateAccessToken and generateRefreshToke methods na call kela so te ata tya user sathi tokens generate karun denar na bec apan already tyach logic lihilay na user.model.js madhe ki kasa tyala token generate karaychay so te karnar and apnala token return karnar ithe. so jasa apan bolo ki access token la trr apan user la deto but refresh token la apan aplya db madhe save karun thevto na. so db madhe save kasa karaych, so khup easy ahe aplyakade user madhe tya particular user chi purn model aliye na so aplyakade tyatil saglya fields cha access ahe so user.refreshToken ghetla je ki user.model madhe ahech na aplya and tyat refreshToken la takla and ata yala save karnyasathi user.save() la call kela. now ithe ky hota jenva pn apan ashi ek or ek peksha jast field madhe change karto model madhe and save vagere karayla bagto tenva mongoose internally saglyach fields na tya case madhe trigger karta means apan ata change kelay only refreshToken field madhe but mongoose saglya fields trigger karta so hech na honyasathi apan ya save method madhe anki ek object pass karto which is validateBeforeSave la false karto ki tyala sangto apan mi ata fakt refreshToken la add kartoy mala he kartana kahi validations vagere check karaychi need nahi asa. now maze access and refresh donhi tokens ready ahet na so yana ata return karto just so object madhe return kela yana. now he kiti sufficient zala na ki jenva pn apnala tokens chi need asel tenva just ya method la apan userId pass karu shakto and he apnala donhi tokens create karun return karel.

107) now yala khali call pn karu so kela call loginUser madhe and tyat user chi _id pass keli. and yala await lavla bec he time gheu shakta and he return tokens karta na so tyana destructure karun don vars madhe store kela. now tokens generate zale ata next step is yana cookies madhe send kara. now cookies pn jast difficult nahi just kunacha cookies madhe pass karaychay kasa pass karaychay he apnala bagav lagnar. now kutla kutla data pass karaycha he tharvaych so password la trr apnala kadich user la send nahi kela pahije na. then refresh token vagere trr ahe aplyakade but apan jrr varti je user create kela na findOne karun yatach loginUser madhe so tyachat apnala refreshToken nahi milnar apnala. but apan bolnar ki varti ek method create karun tyat save kela na and tila ithe call pn kelay mg ka nahi honar. karan te user apan varti create kela na hi generateTokens vali method call karnyaadi so te user create kartana trr refreshToken emtpych hota na so tyat value ti generate chi method call kelyanantrr yenar so tyamule apnala anki ek db call karun user la ghyava lagnar jyat ata refreshToken apnala milel. so ithe bagaych ki db la call karna khup expensive operation hoil ky jrr hot asel trr just update karaych tevdya field la and jr nasel trr apan purn user la find karnyasathi db call karu shakto. so findById kela user la and tyat select method lavli ji ki apnala mahitach ahe ka lavto ja fields nko ahe tya tyat takaycha so pass and token takla and yala await lavla and loggedInUser var madhe save kela yala. means ata user login zalay karan tyana saglya credentials correct taklet so ata user la ji havi ahe ti info pass karaychi.

108) now cookies set karu so tyasathi apnala kahi options set karave lagtat so options kahi nastat just ek object asta te create karaycha and tyala pass karaych so tyat httpOnly and secure he don options asta tyana true kela. so yane ky hot asta ki bydefault aplya cookies na kon pn modify karu shakato frontent madhun pn but jenva apan he httpOnly and secure true karto tenva cookies just server kadunach modify hou shaktat frontend yana ya case madhe modify nahi karu shakat apan fontend madhe bagu shakto yana but tyana modify nahi karu shakat.

109) now ya saglya res la return karaychay so res.status kela and now apnala cookies pn set karaycha ahet na so .cookie .cookie karun apan kiti pahijet tevdya cookies na set karu shakto apan. now cookie cha access asnar ka apnala trr yes kasa trr apan yachi package.json madhe dependency add keliye na cookie-parser hi and also yala middleware madhe inject pn kela pahina na jrr yala use karaych asel trr, so te pn kelay apan kute trr app.json madhe app.use(cookie-parser) kelay na apan means tithech te configure zalay. so ithe res madhe cookie lavla and tayt key value madhe data pass karaycha asto so pahila access token la pass karu so accessToken key dili and tyat value dili and tyat options pn add kele. then ashach apan dot karun kiti pn cookies set karu shakto so then refreshToken la pn tasach pas kela. so tokens trr pass kele so ata apan ek json res pn pass karuya. so json takla and tyat api res class through data pass kela so tyat mala user pathavaychay so {} yachat user lihila and tyat kutlya kutlya fields apnala pass karaycha ahet tya takaycha so loggedInUser la pass kela jyat sagli user chi info asel then access and refresh tokens na pn pass kela. now question is ki apan ya tokens na cookies madhe set karun trr send kelach ahe na mg again yana pass karaychi ky need ahe, so ky hou shakta ki kahi case madhe user swataha aplya kadun access and refresh tokens na save karu ichito may be local storage madhe, or to mobile app develop karat asel like us so apan mobile madhe trr cookies na set nahi karu shakat na so tyamule asha cases na hanlde karnyasathi he pass karna good practice aste. and message and pass kela and that't it zala login user cha pn zala. now user la logout kasa karaych te pn bagu.

110) so tashich logoutUser ek method create keli so tyat same asyncHandler trr asnarach tyat aplyakade req, res trr asnarah and arrow func dila. now user jenva logout var click karel tenva tyala logout karaych tari kasa. so saglyat pahila tr apnala tyacha saglya cookies vagere clear kelya pahijet karan tya only server through manage hou shaktat so tyana pahila clear karaych ithun but anki ek saglyat important step aste ti mhanje je refreshToken ahe tyala pn apana null kela pahije na ya case madhe bec tenvach trr user actual madhe logout hoil na and jenva to parat login hoil tenva apan again reset karu shakto na tyala. so hi don kama apnala karavi lagtat ithe. but yasathi trr apanal user cha refrence lagnar na but user la anaych kasa na bec ya method madhe trr aplyakade userid cha vagere kashachach access nahiye na jenekarun apan tyacha through tya particular user la anla asta na. so varti logginUser method madhe trr login kartana user email, username pass karnar hota na and tyacha through apan user la find kela but ithe tasa kahich nahi na user direct logout button var click karnare. so apanala middlewares kase kam kartat te mahitach ahe na janyacha adi mala bhetu ja asa na. so hich concept apan ithe use karu shakto. so middlewares asa jrr madhech kahi execute karaych asel req cha trr khup usefull hota like apan multer cha case madhe pn kela na ki user la register karnyaadi files na upload kela like user.routes.js file madhe kela na so te kasha through kela middleware throughch na. now apan res.cookie karu shaklo na loginUser madhe so te kashamule karu shakto trr apan app.js file madhe cookie parser la configure kelay na so apnala jrr res madhe cookie milat asel trr req madhe pn milnarach na karan apan app.use() means basically cookie parser cha middleware add kelay na so tyamule te req and res madhe accesible ahe bec req and res he kasha through yetat express through na and app.js file maddhe app ky ahe express na so cookie parser configure kartana apan ky kela app.use() na so this can be also writen as express.use() na so te express madhe configure zalay or cookie parser as a middleware express madhe add zalay na and req and res pn express through yetay so that's why apan cookie parser la req and res madhe access karu shakto so mg tasach apan apla swatahach pn middleware express madhe add kela trr te pn apnala req and res through accessible hoil na. 

111) so yachsathi apan apla pahila middleware ek design karu so middlewares folder madhe auth.middleware.js file ek create keli. so yat pan smae multer.middleware.js file madhe jasa middlware apan lihila nad tyala route madhe inject kela na tasach karnare apan so chala tya file madhe.

117) now req madhe user ahe so tyatun mg ._id karun id kadli. so ata ky karnar mi just ya id ne db madhun tya user la access karnar and tyacha refresh token la delete karnar that's it evadach karaychay na ata apnala. so ata findById method pn use karu shakto but tyachamule apnala id ne user la find karav lagnar then user alay ka bagav lagnar then update sathi anki ek db call karava lagnar so he pn karuch shakto but tyachapeksha ek method pn aste update sathi mongoose apnala deta so ti use keli findByIdAndUpdate. so tyat ata query magta te ki kashathrough find karaychay means basically where condition so id la pass kela user madhun kadun. now update karaychay so ek {} object chalu karaycha and tyat ata mongodb che operators use karaych $set so he set same aplya update sql query sarkhach asta so set magta ki ky ky update karaychay te sangla te te dilelya user cha mi update karen. so tyat refreshToken la takla and tyala sangitla ki tyala krr undefined. then anki ek param yat pass karu shakto so anki ek khali object chalu kela andd tyat new: true kela. so yachamule ky honar ki apan ata update keli na value ek so ata ti update zalelya value cha object apnala milel ata. so he nahi kela trr apnala old objectach milnar tya user cha jyat ajun te token asnar na so mg ky fayda na so tyamule update kelyavar he always lavaych. so now token trr delete zala ata cookies na pn delete kela phaije na so tyasathi lagel options cookies che httponly and secure te vale so te takle. then ata return karaychay na response ki logout zalay mhanun so tyasathi return kela res tyat status code takla nad cookies na ithe apan clear karu shakto tyat apnala ek method milte clearCookie kashathrough trr cookie parser through and tyat tich key dyaychi ji apan add kartana dileli kutli trr user login kartana apna cookies add kelya na so tya add kartana key value madhil ji key dileli ti ghyaychi and tyachat dili and options pn pass kele karan te karave lagtat. so similarly refreshtoken la pn cookies madhun delete karaycha. so ata db madhun trr delete zalelech ahet token so user kadun pn delete zale ata and ek json res pass kela. so zala user logout zala. 

*/