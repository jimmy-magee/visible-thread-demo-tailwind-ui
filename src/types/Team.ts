import IUser from './User';

export default interface ITeam {
  id?: any | null,
  organisationId: string,
  name: string,
  description: string,
  users?: IUser[],
  published?: boolean,
}