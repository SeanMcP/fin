import shuffle from 'array-shuffle'
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

export const userId = writable('')

export const currentSectionId = writable('')

function createCurrentList() {
  const store = writable([])

  return {
    length: store.subscribe.length,
    set(array) {
      store.set(shuffle(array))
    },
    shuffle() {
      store.update((arr) => shuffle(arr))
    },
    ...store,
  }
}

export const currentList = createCurrentList()

function createIndex() {
  const store = writable(0)
  return {
    decrement: () => {
      store.update((index) => {
        let next = index - 1
        if (next <= 0) {
          next = currentList.length - 1
          currentList.shuffle()
        }
        return next
      })
    },
    increment: () => {
      store.update((index) => {
        let next = index + 1
        if (next >= currentList.length) {
          next = 0
          currentList.shuffle()
        }
        return next
      })
    },
    ...store,
  }
}

export const currentIndex = createIndex()
