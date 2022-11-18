import { Schema, model, models} from 'mongoose';

const sacudaSchema = new Schema({
  email: {
      type: String,
      required: true,
      unique: false
    },
  wallet: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: Number,
    required: false,
    unique: false
  },
  name: {
    type: String,
    required: false,
    unique: false
  },
  surname: {
    type: String,
    required: false,
    unique: false
  },
  linkedin: {
    type: String,
    required: false,
    unique: false
  },
  country: {
    type: String,
    required: false,
    unique: false
  },
  bname: {
    type: String,
    required: false,
    unique: false
  },
  big: {
    type: String,
    required: false,
    unique: false
  },
  blinked: {
    type: String,
    required: false,
    unique: false
  },
  bfb: {
    type: String,
    required: false,
    unique: false
  },
  bidea: {
    type: String,
    required: false,
    unique: false
  },
  bsector: {
    type: String,
    required: false,
    unique: false
  },
  bdiag: {
    type: String,
    required: false,
    unique: false
  },
  bscore: {
    type: String,
    required: false,
    unique: false
  }
});

const Sacuda = models?.Sacuda || model('Sacuda', sacudaSchema);

export default Sacuda;

