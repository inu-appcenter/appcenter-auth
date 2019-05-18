const crypto = require('crypto')
const admin = require("firebase-admin")
const db = admin.firestore()


const doCrypto = require('../function/crypto')
const makeJWT = require('../function/makeJwt')
const sendMail = require('../function/mailing')

//////////////////////////////////////////
//accountRef = doc에 직접 접근/////////////
//getAccountRef = collection기준에서 접근//
//////////////////////////////////////////
const accountRef = db.collection('users').doc()
const getAccountRef = db.collection('users')

/////////////////////////////////////
////계정 고유 id값 생성을 위한 함수////
/////////////////////////////////////
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

module.exports = async (query,kind) => {
    let returnValue = false
    let returnToken = ""
    switch (kind) {
        //디비에 회원정보 집어넣는 쿼리 (성공시 true리턴)
        case 'singUp': 
            let cryptoPasswd = await doCrypto(query.passwd)
            let setAda = getAccountRef.add({
                Id : query.id,
                Passwd : cryptoPasswd,
                Phone : query.tel,
                Major : query.major,
                Name : query.name,
                Type : query.type,
                Certification : false
              }).then(ref =>{
                  sendMail(query.id+'@inu.ac.kr',ref.id,'account')
              })

              returnValue = true
              //return returnValue
            break
        //디비에서 중복된 아이디값을 가진 회원이 있나 확인하는 쿼리 (있을시 false리턴 없을 시 true 리턴)
        case 'checkId': 
            await getAccountRef.where('Id','==',query.id).get()
            .then(snapShot => {
                if(snapShot.size === 0){
                    returnValue = true
                }
                else{
                    returnValue = false
                }
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
            //return returnValue
            break
        //로그인 쿼리 성공시 토큰값 리턴
        case 'signIn' :
            await getAccountRef.where('Id','==',query.id).get()
            .then(async snapShot => {
                let arr = []
                snapShot.forEach(doc => {
                    arr.push(doc.data())
                })
                if(!(arr.size === 0||arr.size === "undefined")){
                    if(query.id === arr[0].Id){
                        if(doCrypto(query.passwd)===arr[0].Passwd){
                            returnValue = true
                            if(arr[0].Certification){
                                let toJWT = {
                                    id : arr[0].Id,
                                    name : arr[0].Name,
                                    major : arr[0].Major,
                                    tel : arr[0].Phone,
                                    type : arr[0].Type
                                }
                                returnToken = await makeJWT(toJWT)
                            }
                            else{
                                returnToken = 'certification'
                            }
                        }
                    }
                }
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })
            
            break

        case 'verify':
            getAccountRef.doc(query.id).update({Certification:true})
            returnValue = true
            //return returnValue
            break

        default:
            break
    }

    if(!(returnToken === "")){
        return returnToken
    }
    else{
        return returnValue
    }
}