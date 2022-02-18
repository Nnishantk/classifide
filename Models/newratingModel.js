const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RateSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noOfStars: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Rate = mongoose.model('Rate', RateSchema);

module.exports = { Rate }