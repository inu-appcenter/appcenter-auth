const crypto = require('crypto')
const admin = require("firebase-admin")
const db = admin.firestore()


const doCrypto = require('../function/crypto')
const makeJWT = require('../function/makeJwt')

/*//////////////////////////////////
accountRef = doc에 직접 접근
getAccountRef = collection기준에서 접근
//////////////////////////////////*/
const accountRef = db.collection('users').doc()
const getAccountRef = db.collection('users')

module.exports = async (query,kind) => {
    let returnValue = false
    let returnToken = ""
    switch (kind) {
        case 'singUp': //디비에 회원정보 집어넣는 쿼리 (성공시 true리턴)
            let cryptoPasswd = await doCrypto(query.passwd)
            let setAda = accountRef.set({
                Id : query.id,
                Passwd : cryptoPasswd,
                Phone : query.tel,
                Major : query.major,
                Name : query.name,
                Type : query.type,
                Certification : false
              })
              returnValue = true
              break
        case 'checkId': //디비에서 중복된 아이디값을 가진 회원이 있나 확인하는 쿼리 (있을시 false리턴 없을 시 true 리턴)
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
            break
        case 'signIn' :
            await getAccountRef.where('Id','==',query.id).get()
            .then(async snapShot => {
                let arr = []
                snapShot.forEach(doc => {
                    arr.push(doc.data())
                })
                if(!(arr.size === 0)){
                    if(query.id === arr[0].Id){
                        if(doCrypto(query.passwd)===arr[0].Passwd){
                            if(arr[0].Certification){
                                let toJWT = {
                                    id : arr[0].Id,
                                    name : arr[0].Name,
                                    major : arr[0].Major,
                                    tel : arr[0].Phone,
                                    type : arr[0].Type
                                }
                                returnValue = true
                                returnToken = await makeJWT(toJWT)
                            }
                        }
                    }
                }
            })
            .catch(err => {
                console.log('Error getting documents', err)
            })

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