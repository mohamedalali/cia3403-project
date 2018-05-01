var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new Schema({
    name: String,
    description: String,
    image_url: String,
    city: String,
    location: [Number]
});

module.exports = mongoose.model('Spot', SpotSchema);