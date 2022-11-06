import type { GeoPoint } from 'firebase/firestore'

import type { User } from '../users/users.interface'

export interface Route {
  id?: string
  coordinates: GeoPoint[]
  date: string
  description: string
  ecostories?: Ecostory[]
  title: string
  user?: User
}

export interface Ecostory {
  date: string
  description: string
  image: string
  points: number
  title?: string
  user?: User
}
