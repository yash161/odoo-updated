import mongoose, { Schema, Document } from 'mongoose';

interface IPreferences extends Document {
  authors: string[];
  genre: string[];
}

const PreferencesSchema: Schema = new Schema({
  authors: {
    type: [String],
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
});

const PreferencesModel = mongoose.models.Preferences || mongoose.model<IPreferences>('Preferences', PreferencesSchema);

export default PreferencesModel;
