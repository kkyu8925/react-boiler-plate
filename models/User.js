const mongoose = reqire('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname:  {
        type: String,
        maxlength: 50
    },
    role : {
        type: Number,
        default : 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// 모델 안에 스키마 넣기
const User = mongoose.model('User',userSchema);

// 다른곳에서 사용할 수 있도록
module.exports = { User };