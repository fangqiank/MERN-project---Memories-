import jwt from 'jsonwebtoken'

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)

  /*const token = authHeader.split(' ')[1]
  // console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403)
    //invalid token
    // console.log({ decoded })
    req.userId = decoded?.id
    next()
  })*/

  let decoded

  try {
    const token = authHeader.split(' ')[1]

    const isCustomAuth = token.length < 500

    if (token && isCustomAuth) {
      decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.userId = decoded?.id
    } else {
      decoded = jwt.decode(token)

      req.userId = decoded?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}
