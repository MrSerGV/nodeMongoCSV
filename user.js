var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var userSchema = new Schema({
    UserName: String,
    FirstName: String,
	LastName: String,
	Age: Number,
	created: { 
		type: Date,
		default: Date.now
	}
});

var User = mongoose.model('User', userSchema);

module.exports = User;