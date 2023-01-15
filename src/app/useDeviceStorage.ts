interface Storage {
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<any>
}

let deviceStorage: Storage

export const useDeviceStore = function() {
  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function init(storage: Storage) {
    deviceStorage = storage
  }

  async function get(key: string): Promise<any> {
    return await deviceStorage.get(key)
  }

  async function set(key: string, value: any) {
    await deviceStorage.set(key, value)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { init, get, set }
}
