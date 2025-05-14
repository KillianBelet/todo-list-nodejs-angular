const mongoose = require("mongoose");

const tagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

},
{
    timestamps: true
}
);

const Tague = mongoose.model("Tague", tagueSchema);
module.exports = Tague;