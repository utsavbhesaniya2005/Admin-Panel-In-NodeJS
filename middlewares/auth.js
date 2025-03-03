const auth = (req, res, next) => {

    try{
        let {uId} = req.cookies;

        if(uId){
            next();
        }else{
            res.redirect('/signIn');
        }
    }catch(err){
        
        res.redirect('/signIn');
    }
}

const loginMiddleware = (req, res, next) => {

    try{

        let {uId} = req.cookies;
    
        if(uId){
            res.redirect('/');
        }else{
            next();
        }
    }catch(err){

        next();
    }
}

module.exports = {auth, loginMiddleware};