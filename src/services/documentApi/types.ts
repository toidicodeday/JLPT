export type DocumentT = {
  id: number
  userId: number
  ref: string
  documentId: number
  type: string
  document: {
    id: number
    name: string
    url: string
    size: number
    mineType: string
    status: number
  }
}

export type UploadDocumentResponse = {
  status: string
  uploadedLink: {
    originalFile: string
    downloadLink: string
  }[]
  createdDocs: {
    id: number
    status: number
  }[]
}

export type UploadDocumentRequest = File

export type UploadMultiDocumentRequest = File[]

export type CreateDocumentResponse = {
  status: string
  rs: { id: string }[]
}

export type CreateDocumentRequest = {
  userId: number
  ref: string
  type: string[]
  docs: (string | number)[]
}
