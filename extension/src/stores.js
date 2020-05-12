import { writable } from 'svelte/store'
import { ROUTES } from './routes'

function createLocation() {
  const { subscribe, set } = writable(ROUTES.default)

  return {
    navigate: (location) => set(location),
    subscribe,
  }
}

export const location = createLocation()
