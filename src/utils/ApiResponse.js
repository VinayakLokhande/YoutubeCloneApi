class ApiResponse {
    constructor(
        statusCode, data, message = "success"
    ) {
        this.statusCode = statusCode,
        this.data = data, 
        this.message = message,
        this.success = statusCode < 400
    }
}

export { ApiResponse }

/*
54) so ya class cha constructor madhe alwyas statusCode trr dyavach lagnar, then data jo dyaychay to response madhe user la and message jo dyaychay to jyat default success thevla bec he res chay so hi class tenvach apan execute karnar jenva res success hoil na tyamule and same ithe pn this ne ya fields na pn fill kela. and success ek ghetla and tyat status code la pass kela and tyat takla ki status code less than 400 asla pahije karat 400 pasun errors chalu hotat na tyamule.


55) VIDEO NO.10 STARTED -> now apan ata user and video model banavnare then access token, refresh token vagere create karnare, password la encrypt decrypt kasa karaych te shikanare so chala yasathi apnala kahi files create karavya lagnar so models madhe user.model.js file create keli and anki ek keli video.model.js file. so yach files ka create kelya. because apan jo project create kartoy tyat ya don files ek mekala interlink ahet. so we know na user cha at apana ID la lihit nahi because mongodb automatic swataha ek unique id generate karta bson type madhe na and baki user cha email, pass, vagere fields ahet. then video model madhe pn video id ji mongo create karel, owner, title, video je apnala aws or cloudinary var jo apan upload kelela asnar video tyachi link apnanala milel then thumbnail ch pn tasach and baki fields pn ahe. but user and video madhe link hote ti user madhil watchHistory navachi pn ek field ahe ticha through. so user cha watchHistory madhe ky asnar user ne kutle kutle videos bagitlet te na. but apnala videos kutun milnaret video model madhun na so mg jas jasa user video bagel tas tasa mala tya video chi id pn user cha watchHistory field madhe save karun thevli pahije na so tyach sathi apan bagitlach hota na apan don models madhe relation kasa create karto objectId and reference ne so tech ithe user karaych so watchHistory field madhe user ne je je videos bagitlet tya saglya videos cha ids save zalelya asnar so tyancha through mg apan eka list madhe te sagle videos kadu shakto je user ne watch kelet, also apnala youtube var tya video cha title, kunacha video ahe to, kiti views ahet tya video che he sagla pn dista na so ata aplyakade tya particular video cha id ahe so tyacha through apan tya video chi sagli info kadu shakto na ata. so chala pahila user model lihu. so chala user.model.js file madhe.%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/