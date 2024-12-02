import { Schema, Document, model } from "mongoose";

export interface ITodo extends Document {
  task: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default model<ITodo>("Todo", TodoSchema);
