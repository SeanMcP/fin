const isChrome = typeof chrome !== 'undefined'

/** Async: Takes an array of keys and returns a promise with the result */
export function get(keyArray) {
  if (isChrome) {
    return new Promise((resolve) => {
      chrome.storage.local.get(keyArray, (result) => {
        resolve(result)
      })
    })
  }
}

/** Async: Takes an object of key/values to append to the store */
export function set(updateObject) {
  if (isChrome) {
    return new Promise((resolve) => {
      chrome.storage.local.set(updateObject, (result) => {
        resolve(result)
      })
    })
  }
}
