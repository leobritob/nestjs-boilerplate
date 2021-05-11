import { Request } from 'express'

export interface AuthInterface {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface AuthRequestInterface extends Request {
  user: AuthInterface
  token: string
}
