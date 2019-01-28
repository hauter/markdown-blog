import jwt from 'jsonwebtoken'
import config from 'config'

const jwtSecret = config.get('admin.jwt-secret')

/**
 * sing the payload and return a token
 * @param {string} payload 
 */
function signLoginToken(payload) {
    return jwt.sign(payload, jwtSecret, {expiresIn: '24h'})
}

/**
 * token to verify
 * @param {string} token 
 */
function verifyLoginToken(token) {
    return jwt.verify(token, jwtSecret)
}

export default {
    signLoginToken,
    verifyLoginToken
}