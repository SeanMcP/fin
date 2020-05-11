const isChrome = typeof chrome !== 'undefined'
const isWeb = typeof localStorage !== 'undefined'

/** Async: Takes an array of keys and returns a promise with the result */
export function get(keyArray) {
  if (isChrome) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keyArray, resolve)
    })
  } else if (isWeb) {
    return new Promise((resolve) => {
      const response = {}
      keyArray.forEach(key => {
        const value = JSON.parse(localStorage.getItem(key))
        if (value != null) response[key] = value
      })
      resolve(response)
    })
  }
}

/**
 * Removes keys from storage (async)
 * @param {string[]} keyArray - A list of keys that will be removed from storage
 * */
export function remove(keyArray) {
  if (isChrome) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(keyArray, resolve)
    })
  } else if (isWeb) {
    return new Promise((resolve) => {
      keyArray.forEach(key => localStorage.removeItem(key))
      resolve()
    })
  }
}

/** Async: Takes an object of key/values to append to the store */
export function set(updateObject) {
  if (isChrome) {
    return new Promise((resolve) => {
      chrome.storage.local.set(updateObject, resolve)
    })
  } else if (isWeb) {
    return new Promise((resolve) => {
      for (const [key, value] of Object.entries(updateObject)) {
        localStorage.setItem(key, JSON.stringify(value))
      }
      resolve()
    })
  }
}