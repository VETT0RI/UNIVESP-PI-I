export function toBuffer(base64String?: string | null): Buffer | undefined {
  if (!base64String) return undefined
  try {
    return Buffer.from(base64String, 'base64')
  } catch (e) {
    console.error('Falha ao converter base64 para Buffer:', e)
    throw new Error('Formato base64 inválido')
  }
}
