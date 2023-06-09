import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import write_blob from 'capacitor-blob-writer'
import { ref } from 'vue'
import { useLogger } from './useLogger'

/**
 * Downloads and caches a file on the device.
 */
export function useDownloader() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger = useLogger('download')

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const isDownloading = ref(false)

  /**
   * Download a file from a URL and return device-specific URI
   * what can be used later.
   * @param url Url of the file to download.
   * @returns The URI of the downloaded file.
   */
  async function download(url: string): Promise<string> {
    // We don't need to download the file if we're on the web
    // because we can just use the URL directly.
    if (Capacitor.getPlatform() === 'web') { return url }

    // Check if the file already downloaded
    const pathName = new URL(url).pathname.split('/')
    const fileName = pathName.pop()
    const filePath = pathName.join('/') + '/' + fileName
    try {
      const stat = await Filesystem.stat({
        path: `content/${filePath}`, directory: Directory.Data
      })
      logger.debug(`Already downloaded ${filePath}`)
      return Capacitor.convertFileSrc(stat.uri)
    } catch (e) {
      // File not found, continue to download
    }

    // We need to download the file if we're on a mobile device
    // because users should be able to play the audio file even
    // if they're offline.
    isDownloading.value = true
    logger.debug(`Downloading ${url}`)
    const res = await fetch(url, {
      method: 'GET', mode: 'cors', headers: {}
    })

    // Write file to the filesystem
    logger.debug(`Writing ${filePath}`)
    await write_blob({
      path: `content/${filePath}`,
      directory: Directory.Data,
      blob: await res.blob(),
      recursive: true,
      fast_mode: true,
    })

    // Get the URI of the file
    const uri = await Filesystem.getUri({
      path: `content/${filePath}`,
      directory: Directory.Data
    })
    isDownloading.value = false
    return Capacitor.convertFileSrc(uri.uri)
  }

  /**
   * Check if a file is already being downloaded.
   * @param url Url to check
   * @returns If a file is already being downloaded, return true, otherwise false.
   */
  async function isDownloaded(
    url: string
  ): Promise<boolean> {
    const pathName = new URL(url).pathname.split('/')
    const fileName = pathName.pop()
    const filePath = pathName.join('/') + '/' + fileName
    try {
      await Filesystem.stat({
        path: `content/${filePath}`, directory: Directory.Data
      })
      return true
    } catch (e) {
      return false
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { download, isDownloading, isDownloaded }
}