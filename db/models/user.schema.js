const mongoose=require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema= mongoose.Schema;

const UserSchema = new Schema({
    fullusername: {
        type: String,
        trim: true,
        required: [true, 'Votre nom est requis'],
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'l\'email est requis'],
        unique: 'Deux utilisateurs ne peuvent pas partager le même e-mail ({VALUE})',
        lowercase: true,
        validate: [validateEmail, 'Veuillez remplir une adresse e-mail valide'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir une adresse e-mail valide']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Le mot de passe est requis']
    },
    phone: {
        type: String,
    },
    city: {
        type: String
    },
    avatar_url: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'GUEST'
    },
    isGranted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.plugin(beautifyUnique);

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const user = this;
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();

});


function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}


UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

module.exports=mongoose.model('User',UserSchema);