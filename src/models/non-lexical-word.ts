import mongoose from 'mongoose';

interface NonLexicalWordAttrs {
    word: string;
}

interface NonLexicalWordModel extends mongoose.Model<NonLexicalWordDoc> {
    build(attrs: NonLexicalWordAttrs): NonLexicalWordDoc;
}

interface NonLexicalWordDoc extends mongoose.Document {
    word: string;
}

const nonLexicalWordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.id;
                delete ret.__v;
            }
        }
    }
)

nonLexicalWordSchema.statics.build = (attrs: NonLexicalWordAttrs) => {
    return new NonLexicalWord(attrs);
}

const NonLexicalWord = mongoose.model<NonLexicalWordDoc, NonLexicalWordModel>('NonLexicalWord', nonLexicalWordSchema);
export { NonLexicalWord };
