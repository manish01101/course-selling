const SECRET = process.env.SECRET
export const ADMIN_SECRET = SECRET + 'user'
export const USER_SECRET = SECRET + 'admin'