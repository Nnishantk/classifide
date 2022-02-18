var mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var FollowSchema = new Schema({

    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followee: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Follow', FollowSchema);