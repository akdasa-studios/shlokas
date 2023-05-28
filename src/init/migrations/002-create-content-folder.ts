import { Directory, Filesystem } from '@capacitor/filesystem'


export default async function migrate() {
  Filesystem.mkdir({
    path: 'content',
    directory: Directory.Data,
    recursive: true
  })
}