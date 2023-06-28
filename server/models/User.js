const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    const document = this;
    bcrypt
      .hash(this.password, saltRounds)
      .then(hashedPassword => {
        document.password = hashedPassword;
        next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});


UserSchema.methods.isCorrectPassword = async function(password) {
  try {
    const same = await bcrypt.compare(password, this.password);
    return same;
  } catch (err) {
    throw err;
  }
};


module.exports = mongoose.model('User', UserSchema);