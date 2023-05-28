import { Directory, Filesystem } from '@capacitor/filesystem'

export function useCleanCache() {
  async function cleanCache(): Promise<void> {
    await Filesystem.rmdir({
      path: 'content', directory: Directory.Data, recursive: true
    })
    await Filesystem.mkdir({
      path: 'content', directory: Directory.Data, recursive: true
    })
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { cleanCache }
}