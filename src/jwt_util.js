import jwt from 'jsonwebtoken'
import config from 'config'

const jwtSecret = config.get('admin.jwt-secret')

/**
 * token
 * @param {content want to sign} payload 
 */
function signLoginToken(payload) {
    return jwt.sign(payload, jwtSecret, {expiresIn: '24h'})
}

export default {
    signLoginToken
}