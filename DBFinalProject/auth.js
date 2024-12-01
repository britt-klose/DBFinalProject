const jwt =require ("jsonwebtoken")
require("dotenv").config();

const secret = cafe_HASH || process.env.cafe_HASH

module.exports={
    authMiddleware: function({ req }) {
        let token=req.body.token || req.query.token || req.headers.authorization;
        console.log(token);
        if (re.headers.authorization){
            token=token.split(" ").pop().trim();
        }
        if (!token){
            return req:
        }

        try{
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user=data;
        } catch {
            console.log("Invalid token");
        }
    return req;
},


signToken: function ({ email, username_id}) {
    const payload= {email, username, _id};
    return jwt.sign({data: payload}, secret, {expiresIn: expiration} );

},
};