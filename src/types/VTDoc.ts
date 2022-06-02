export default interface IVTDoc {
  id: any | null,
  organisationId: string,
  teamId: string,
  userId: string,
  fileName?: string,
  wordCount?: number,
  dateUploaded?: string,
  wordFrequency?: [],
  published?: boolean,
}