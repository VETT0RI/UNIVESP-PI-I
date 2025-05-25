import { Storage } from '@google-cloud/storage'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const keyFilePath = path.resolve(
  __dirname,
  '/Users/juliovettori/Downloads/univesp-pi-i-c44ab6cfcdba.json'
)

const storage = new Storage({
  projectId: 'UNIVESP-PI-I',
  keyFilename: keyFilePath,
})
const bucketName = process.env.GCS_BUCKET_NAME || 'univesp-pi-i'
const bucket = storage.bucket(bucketName)

export async function uploadBufferGetUrl(
  buffer: Buffer,
  originalname: string,
  folder: string
): Promise<string> {
  const destPath = `${folder}/${Date.now()}_${originalname}`
  const file = bucket.file(destPath)

  await file.save(buffer, {
    metadata: { contentType: 'application/octet-stream' },
    resumable: false,
  })

  await file.makePublic()

  return `https://storage.googleapis.com/${bucket.name}/${destPath}`
}
