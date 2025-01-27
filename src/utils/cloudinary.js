import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // need to update values of cloud_name, api_key and api_secret from cloudinary by creating account of cludinary
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("MY CLOUDINARY.JS : file is uploaded successfully on cloudinary ", response)

        fs.unlinkSync(localFilePath)

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}


export {uploadOnCloudinary}



/*
68) now apan toparyant local server varti file la save karun thevlay na. so ajun tyach implementation nahi kela but suppose ki apan kelay so mg apan ky karnare tya local server madla file path denar cloudinary la ki ithli file ghe and save kar asa. and also nantrr file successfully upload zali ki tila local server varun remove pn karaychay. so cloudinary la import kela v2 karayla sangtay cloudinary so v2 la kela and tyacha name dila as cloudinary apan v2 lach use karu shakto but samjaysathi dila. then anki ek import kela which is fs so he fs ky ahe trr 'file system'. so node cha at apnala file system pn milta. so hila install nahi karav lagat apnala nodejs madhunach default apnala hi library milte. so google la nodejs fs takla ki yach documentation yeta so te vachaycha. so tyat apnala file la read, write, update etc. karayche functions deta or open and close deirectories karaych deta so file handling sathi je kahi lagta te sagla apnala he deta. so file handling madhe ek concept aste link and unlink. so jenva pn apan file la delete karat asto aplya suppose file explorer madhun tenva ti unlink hot aste. karan file system madhe delete, remove asa kahi nahi bola jat and ase functions pn apnala nahit milat tyalach ithe link and unlink bola jata. so asa apan file cloudinary var upload zali ki tila unlink karu shakto.

69) so cloudinary la configure karav lagta so yacha doc madhe code mile to ghetla cloudinary.configure so te cloud_name, api_key, api_secret magta so he sagla apan cloudinary varunach gheu shakto he aplyasathi generate zalela asta. so ya keys, name apan .env file madhe thevnar so tithe CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET he ghetle and tyat tya keys anun thevlya. so ata ky karu shakto apan ki apan ek method banavaychi tya method cha parameter madhe apan apla local server cha file path denar and tyala mg nantrr upload karaych cloudinary var. so jrr upload zala ki tya file la unlink karaych. so file handling pn database sarkhach asta yat pn barech issues yeu shaktat so tyamulech try catch madhe lihaych and also yana time lagto so async await pn lavaych. so ek variable create kela uploadOnCloudinary and tyat arrow function lihila async laun and tyat ek param ghetla localFilePath jyach name apan kahi pn deu shakto. so he method kasa and kute use karaych he kalel apnala pudhe. so try catch lavla and try madhe condition lavli ki file path ahe ka nasel trr return kar. ithe apan error pn lau shakto ki file path nahi sapdla ashi. then next step karu file la upload karaych. so cloudinary madhe ek method milte apnala uploader and tyatun milte upload method so tyat ghetlya and tyat localfilepath la pass kela and also kahi ajun pn params deu shakto apan docs vachun bagu shakto so yat coma lavla trr tithe disel ki uploadOptions ek parameter ahe upload madhe so tyat milat resource_type so yat apan image or raw or video ase options specifically deu shakto ki maza file cha type ha ha asnare but ata mi auto ghetla so auto ne cloudinary automatic swataha file kutlay type chi ahe te detect kartat. so he time ghenar so await lavla and eka variable madhe store kela. then yala console log kela so yat apnala barich infor milte response madhe. so yala console kela so yatun apnala url milto ji file apan upload keli na so ti upload zalyanantrr apanala ek url mitlo so to print kela. and then user la saglacha sagla res return kela.

70) now file jrr successfully upload zali nasel trr pn ek catch cah option apanala banto and jrr localfilepath detana kahi mistake zali asel trr tenva pn kahi tri option apanala handle karnyasathi banto. so jrr filepath chukla asel or kahi issue ala asel file upload kartana trr tya case madhe apnaala aplya local server var ji ti file temporary upload karun thevli hoti tila unlink pn kela pahije na bec ti file trr bina kamachi resources kahnar na tenva. so tyamule catch madhe fs je apan ghetla file system tyat unlink cha ek option milto and dusra unlinkSync ek means jovar unlink hot nahi filepath toparyant pudhe jau naka ithech synchronously thamba and tyat localFilePath la pass kela and yatun return kela null. and uploadOnCloudinary la export kela. so zala asa apan upload karto file la cloudinary var. so ata video aso , pdf aso, image aso or kutlya pn type chi file aso apan tila asach upload karu shakto.

71) now mala ek middleware banavaychay. so ata apan multer cha use karun middleware banavnare. so without multer cha use karta pn apan lihuch shakto. so jithe jithe mala file uploading chi need asel tithe tithe mi multer middleware la inject karnar. for example, register kartana garaj padel so tithe yala inject karaych login madhe need nasel so tithe nahi inject karaych asa. so he utility sarkha nasnar but as a middlware apan yala saglikade use karu shakto. so middleware folder madhe multer.middleware.js file create keli so chala tyat.

*/