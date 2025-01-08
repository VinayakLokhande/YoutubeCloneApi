import {asyncHandler} from "../utils/asyncHandler.js"


const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "OK"
    })    
})

export {registerUser}


/*
76) so apan async handler file lihili hoti na. so ti we know just helper file hoti so apnala tyachamule promises madhe vagere nahi takav lagnar sarkha sarkha or try catch madhe nahi takav lagnar so tyamulech apan ti file create keli hoti. so te apan ithe use karnar so asynchHanlder la import kela. then mala ek method create karaychi ahe ji just user la register karel. so registerUser variable create kela. now ha jo register karaycha syntax ahe to apan nehmi saglikade use karnre same to same jenva apnala user la register karvaycha asta tenva. so asyncHandler function la ithe call kela and te ek higher order function la magta na as a parameter so tyamule tyachat anki ek method lihinar mi so async takla and tyat arrow function lihayla chalu kela and tyat apnala req, res milta ka trr bec apan express through lihit asto na so tyamule aplyakade req, res astach means 4 gosti astat tasha req, res, next, err na. now he kelyavar tyacha body madhe just directly response dila so res.status karun tyat status code takla 200. apan ha status code kahi pn taku shakto and jo apan status code ithe taku toch postman la and user la pn milat asto. and also kahi data pn pass karu shakto as a json user la so .json() kela and tyat ek object apan pass karu shakto key value pair madhe jasa ki apan api madhe bagtoch na tasa. and registerUser la export pn kela. now our next is creating routes. means apan method trr create keli but hi method kutla tari url jenva hit hoil tenvach run zali pahije na. so hech sagle routes lihinyasathi apan routes folder create kelay. and sagle routes veg veglya files madhe apan maintain karat asto. so routes folder madhe user.routes.js file create keli jyat sagle user che routes asnar. so chala tya file madhe.
*/