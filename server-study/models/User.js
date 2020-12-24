const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;  // bcrypt, slat를 이용해서 암호화
const jwt = require('jsonwebtoken');

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

// 비밀번호 bcrypt로 암호화
// 'save' 함수 실행 전에!
userSchema.pre('save',function(next) {
    let user = this;

    // 비밀번호가 변경되었을때만 암호화를 해준다.
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds,function(err, salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 비밀번호 암호화
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch); // null 값은 err가 없다
    })
}

userSchema.methods.generateToken = function(cb) {
    let user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    let token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token,cb) {
    let user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰 비교
        user.findOne({"_id": decoded,"token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })

}

// 모델 안에 스키마 넣기
const User = mongoose.model('User',userSchema);

// 다른곳에서 사용할 수 있도록
module.exports = { User };