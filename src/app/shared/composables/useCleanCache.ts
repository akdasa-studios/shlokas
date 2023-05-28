import { Directory, Filesystem } from '@capacitor/filesystem'

export function useCleanCache() {

  async function cleanCache(): Promise<void> {
    await Filesystem.rmdir({
      path: '', directory: Directory.Data, recursive: true
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { cleanCache }
}