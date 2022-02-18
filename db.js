const mongoose = require("mongoose");


module.exports = async function connection() {
    mongoose.connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database Connected Successfuly")
    }).catch(() => {
        console.log("Opps!!! Error in Connection");
    })
}
