const router = require("express").Router();
const Rating = require("../Models/ratingModel");
const Advert = require("../Models/advertModel")


module.exports.GiveRating = async (req, res) => {
    let prod = await Rating.create({ total: "1000" })
    // display the newly created object with and without getters
    console.log(prod)
    console.log(prod.get('ratings', null, { getters: false }))

}

module.exports.getratingbyid = async (req, res) => {
    const id = req.params.id
    const { rating, advert_Id } = req.body
    let prod = await Rating.findById(id)
    /* const newratin = await new Rating({
        1: req.body.ratings */
    /*  1: req.body */
    /*  prod.ratings = 1
     
     prod.ratings = 3
     prod.ratings = 4
     prod.ratings = 5 */
    prod.ratings = 2
    /* }) */




    prod.markModified('ratings')  // Add markModified because ratings is a mixed object type
    prod.save()

    console.log(prod.get('ratings', null, { getters: false }))
    console.log(prod)

    function getArraySum(a) {
        var total = prod.ratings;
        for (var i in a) {
            total += a[i];
        }
        return total;
    }
    var payChecks = prod.ratings;
    var weeklyPay = getArraySum(payChecks);
    console.log(weeklyPay)
    console.log(prod.ratings)
}