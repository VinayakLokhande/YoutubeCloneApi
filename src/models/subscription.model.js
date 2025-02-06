import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema( 
    {
        subscriber : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },

        channel : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }

    }, 
    {
        timestamps : true
    }
)

export const Subscription = mongoose.model("Subscription", subscriptionSchema)


/*
124) so don feilds taklya subscriber and channel. so subscriber la mi bolo hoto array madhe ghetla pahije but I think mi maze kon kon subscribers ahet te nahi bagu shakat. so tyamule tyana array madhe dakhavaychi need nahi. then jrr apan suppose kunala tari subscribe kelay and tyacha channel madhe apan gelo trr tyachi and tyacha channel chi info trr distech apnala na but tyacha barobar tyala kiti janani subscribe kelay tyacha count pn disto na and also mi jrr tyala subscribe kelela asel trr tyacha channel madhe subscribe cha button subscribed asa change zalela asta na so te pn apnala maintain kela pahije so te baguch pudhe. now apnala lihaychet controllers. so chala user.controllers.js file madhe.


*/