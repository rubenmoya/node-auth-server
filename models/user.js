import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

userSchema.pre('save', function (next) { // eslint-disable-line func-names
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, null, (error, hash) => {
      if (error) return next(error);

      this.password = hash;
      return next();
    });

    return undefined;
  });
});

// eslint-disable-next-line func-names
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    return callback(null, isMatch);
  });
};

const User = mongoose.model('user', userSchema);

export default User;
