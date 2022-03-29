const mongoose=require('mongoose');

const Schema= mongoose.Schema;

const ArticleSchema = new Schema({
    titre:{
        type: String,
        trim: true,
        required: [true, 'Le titre est obligatoire']
    },
    description:{
        type: String,
        trim: true,
        required: [true, 'La description est obligatoire']
    },
    photo:{
        type: String,
        required: [true, 'L\'image de l\'article est obligatoire']
    },
    mini_photo:{
        type: String,
    },
    nbreArticle:{
        type: Number,
        default: 1,
    },
    prix:{
        type: Number,
        trim: true,
        required: [true, 'Le prix de l\'article est obligatoire']
    },
    featured: {
        type : Boolean,
        default: false
    }
}, {
    timestamps: true
});


module.exports=mongoose.model('Article',ArticleSchema);