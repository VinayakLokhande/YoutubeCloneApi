
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch((err) => next(err))
    } 
}

export { asyncHandler }

/*
50) now promises cha use karun bagu so ithe pn ek function yenar jyach name dila requestHandler je ki kahi pn deu shakto. so try catch madhe apan execute karat hoto na but ithe apan direct return karnar function la promise cha format madhe. so yat pn req, res, next ghetla and yacha at ata ek promise manually invoke kela and tyach resolve and reject asta na so resolve ghetla and catch ghetla so reject cha jagi catch ghetlay reject pn gheu shakto. so jrr apan promise catch karat asu means tya case madhe promise fail zaly na so tenva ek error ghetli and next madhde ti error pass keli. so ha syntax nahi samjla ajun nantrr bagaychay. and solve madhe apan je requestHandler higher order function ghetlay tyala execute karaycha and tyat req, res, next params pn pass kele. so zala asa ek wrapper func apan create karu shakto.

51) ERROR STANDARDIZATION : now apan error pn nehimi pathavnar na. but apan error sathi asa kahi standard kela nahi na ki ashi nehmi error asnarach. like apla man zala ki json format pathvayvhay so tenva json format pathvla jrr vatla ki error code mala pathvaychay trr tenvach error code pn pathavla so asa hou shakta na error code apla pratek jagi veg vegla honar mg so tyasathi yala pn standardise kelela changla ahe na so tech karu. so yasathi apnala first node madhil error cha documentation bagav lagel. so google la search karaych nodejs api error. so nodejs apnala ek purn class deta ji ahe error class. so ya class madhe apnala constructor milto jyat apnala error che messages miltat, purn stacktrace milto, cause milto, code milto, message, stack etc. sagla milta. and also he apnala kahi veg veglya prakarcha error classes pn miltat. like AssertionError, RangeError, ReferenceError, SyntaxError, SystemError. so yasathi mg apan ek class create karu shakto and ya error class la override karun errors na pn handle karu shakto. so utils folder madhe ek ApiError.js file create keli. so chala tya file madhe.
*/




// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
        
//     }
// }

// export {asyncHandler}

/*
49) so hi file ky karnar trr ek method banavel and tya method la export karel. now apan donhi padhatine bagu first try catch ne create karu. so ithe ky zaly trr asyncHandler variable create kela right. so first yat apan function pass karnare na so te fn mhanun ek parameter ghetla ki te apan je function pass karnare tech ahe fn so now apan async pn lavto na like db madhil index.js file madhe async() => {} asa kelay na so tasach te function zla mg and tyala async lavla and tyat apnala req, res, next only pahije so te ghetla and err nko ahe so te nahi ghetla te pn gheu shakto. then apnala try catch pn pahije so try catch lavla karan je pn mi function as a parameter ghenare tyacha pudhe mi ek wrapper lavtoy na async and try catch cha tyamule. and catch cha at apnala jasa hava tasa res deu shakto. mostly apan ky karto trr res.status ek pathavto so status cha at apan error code pass karto so jrr apnala user pass kartoy error code trr apan just err.code karto and jrr nasel trr 500 pn default thevto and also further apan ek json res pn pathavto ki frontend valyala easy jata mg ky nemki error ahe samjayla. so ya json res madhe ek trr success flag asto ek so success la false kela ki fontend valyala lagech samjel ki kahi tari gadbad ahe false alay success and also message pn pass karu shakto kahi pn so mi ek pass kela to err madhilach message so ha zala catch part so try madhe ata async banavlaych trr await kela and je function apan parameter amdhe ghetlay tyala execute kela and tyala params pathavle. so he apnala vatel ki kashala kela but he pratek production grade code mdhe kelelach asta. just apan wrapper func create kelay je saglikade apan use karnare. so he zala try catch vala ata promises vala bagu yach file madhe varti ahe.


*/