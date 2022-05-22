import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      min: [3, 'Name at least minimum 3 character long'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: [true, 'Email address should be unique'],
      trim: true,
      max: [
        100,
        'Email address should not exceed more than 100 characters long',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [6, 'Password at least minimum 6 character long'],
    },
    parentId: {
      type: String,
      required : [true, 'Parent ID is required'],
      trim: true,
    }, 
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(Number(process.env.JWT_PWD_SALT));
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

export default User;
