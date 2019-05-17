const crypto = require('crypto')
const config = require('../config/config')

module.exports = (passwd) => {
    const encrypted = crypto.createHmac('sha1', config.secret)
                                .update(passwd)
                                .digest('base64')

    return encrypted
}