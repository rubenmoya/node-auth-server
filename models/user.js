import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  description: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  name: String,
  password: String,
  screen_name: String,
  twitter_id: Number,
  url: String,
});

userSchema.pre('save', function (next) { // eslint-disable-line func-names
  bcrypt.genSalt(10, (err, salt) => {
    console.log('adasdasd', err);
    if (err) return next(err);

    bcrypt.hash(this.password, salt, null, (error, hash) => {
      console.log('adasdasd', error);
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
