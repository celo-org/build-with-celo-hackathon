import { Schema, model, models} from 'mongoose';

const sacudaSchema = new Schema({
  name: {
      type: String,
      required: false,
      unique: false
    },
  wallet: {
    type: String,
    required: true,
    unique: true,
  },

});

const Sacuda = models?.Sacuda || model('Sacuda', sacudaSchema);

export default Sacuda;

