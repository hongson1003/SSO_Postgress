import axios from "axios";
require('dotenv').config();
const unCheck = ['/'];


let isLogin = async (req, res, next) => {
    if (unCheck.includes(req.path)) {
        return next();
    }
    let jwt = req.cookies?.accesstoken;
    // call sso
    if (jwt) {
        axios.post(`${process.env.API_SSO_ACCESSTOKEN}`, { jwt })
            .then(res => {
                console.log('check', res);
                if (res.data.errCode === 0) {
                    return next();
                } else {
                    return res.status(400).json({
                        errCode: 1,
                        message: 'Not Authenticated'
                    })
                }
            })
            .catch(e => {
                console.log(e);
                return res.status(400).json({
                    errCode: 2,
                    message: 'Not Authenticated'
                })
            })
    } else {
        return res.status(400).json({
            errCode: 1,
            message: 'Not Authenticated'
        })
    }

}

// let checkPermission = async (req, res, next) => {
//     if (unCheck.includes(req.path)) {
//         return next();
//     }
//     let temp = verifyJWT(req.roles.access);
//     if (temp) {
//         let roles = temp.roles;
//         let path = req.path;
//         if (!roles || roles.length == 0) {
//             return res.status(200).json({
//                 errCode: 403,
//                 message: 'unUser Authenticated'
//             })
//         }
//         let access = roles.some(item => item.Url === path)
//         if (!access)
//             return res.status(200).json({
//                 errCode: 403,
//                 message: 'unUser Authenticated'
//             })
//         return next();
//     } else {
//         return res.status(200).json({
//             errCode: -1,
//             message: 'UnUser Authenticated'
//         })
//     }
// }

module.exports = {
    isLogin,
    // checkPermission
}