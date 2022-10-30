import type { GeoPoint } from 'firebase/firestore'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

import { db } from '../firebase-config'
import type { Ecostory, Route } from './routes.interface'

const routesCollectionRef = collection(db, 'routes')

export const getRoutes = async () => {
  try {
    const data = await getDocs(routesCollectionRef)
    return data.docs.map((docData) => ({ id: docData.id, ...docData.data() }))
  } catch (e) {
    return e
  }
}

export const getRouteById = async (id: string) => {
  try {
    const docRef = doc(db, 'routes', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { id, ...docSnap.data() }
    }
  } catch (e) {
    return e
  }
  return 'Route not found'
}

export const createRoute = async (route: Route) => {
  try {
    const newRoute = await addDoc(routesCollectionRef, route)
    const id = newRoute.id
    const routeData = await getRouteById(id)
    return routeData
  } catch (e) {
    return e
  }
}

export const updateRouteInfo = async (id: string, route: Route) => {
  try {
    const routeDoc = doc(db, 'routes', id)
    return await updateDoc(routeDoc, {
      date: route.date,
      description: route.description,
      title: route.title,
    })
  } catch (e) {
    return e
  }
}

export const updateRouteCoordinates = async (id: string, coordinates: GeoPoint[]) => {
  try {
    const routeDoc = doc(db, 'routes', id)
    return await updateDoc(routeDoc, {
      coordinates,
    })
  } catch (e) {
    return e
  }
}

export const updateRouteEcostories = async (id: string, ecostories: Ecostory[]) => {
  try {
    const routeDoc = doc(db, 'routes', id)
    return await updateDoc(routeDoc, {
      ecostories,
    })
  } catch (e) {
    return e
  }
}

export const deleteRouteById = async (id: string) => {
  try {
    const routeDoc = doc(db, 'routes', id)
    return await deleteDoc(routeDoc)
  } catch (e) {
    return e
  }
}
