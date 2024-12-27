import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
    videoFile: {
        type: String, // will come from cloudinary url
        required: true
    },

    thumbnail: {
        type: String, // will come from cloudinary url
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number, // can get from cloudinary
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)



/*
57) now ithe pn videoFile, thumbnail fields create kelya so yacha pn url apnala cloudinary varunach milnar then video cha title, description ghetla then duration so he pn apnala cloudinarych denar because jenva apan cloudinary var video upload karto tenva tya file chi info apnala pathavat asta means saglech cloud services he kartat aws vagere sagle ki ha ghya video cha url, then video kiti duration chay te pn apnala pathavat asta then views ghetla so jas jasa loka video bagtil tas tasa apan ya views la update karnar default value yachi 0 thevli otherwise kutla pn number yeu shakto, then isPublished field ghetli means video jo apan upload kelay to saglyana disu de ka nahi ka only private thevaychay so tyasathi boolean banavla so default true thevla ki video sagle bagu shaktat. then owner field ghetli so owner means video jyana upload kelay to so tyala user ne link kela


58) then ji user model madhil watchHistory field ahe ti swataha aplya project la khup jast complex or advance banavte so yasathi apan aggregation queries vagere lihinar apan NOTE : AGGREGATION PIPELINE KY ASTE TE VACHAYCHAY. so ya aggregation quereis lihinyasathi mongoose apnala ek package deta which is 'mongoose-aggregate-paginate-v2'. so true power mongodb chi ya aggregation queries lihunach apan use karu shakto and production grade madhe pn yach queries lihilelya astat. NOTE : MONGOOSE CHA DOCUMENTATION MADHE AGGREGATION PIPELINE CHA PN AHE SO TE VACHAYCHAY. so yasathi he package install kela. and tyala ya file madhech import pn kela varti. 

59) now yala use apnala export karnyaadi ya file madhe karav lagnar. so mongoose cha documentation madhe jasa apan middleware section madhe jau trr tithe apnala disel types of middleware ki mongoose cha at apan khup prakarche middlewares lihu shakto then plugins na pn inject karu shakto like pre means data save honyadi just kahitari mala perform karaychay or post means data save zalya zalya mala he perform karaychay asa so ase middlewared apan pn lihinar. so mongoose middlewared apnala provide karta like validate, save, remove, updateOne, deleteOne, init ase. so yachabarobarach mongoose apnala ek anki option deta ki apan aple swatache plugins pn add karu shakto. so he aggregate framework mongodb made thodya vela nantrr alay so tyamule ya aggregate framework la apna plugin barobar add karat asto so varti kela baga videoSchema.plugin tya add kela. so now ata apan queries lihu shakto aggretion queries also regular queries inserOne, updateOne etc. ya trr lihuch shakto. so hech mongoose cha aggregation pipeline aplya project la advance level la gheun janar. 

60) now chala jara user.model.js file madhe karan tithe kahi charcha rahiliye apli ji ki khup important ahe so chala.
*/