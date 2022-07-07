export default interface IUser {
  id?: any | null,
  organisationId: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  phone?: string,
  imageId?: string,
  image?: [],
  published?: boolean,
}