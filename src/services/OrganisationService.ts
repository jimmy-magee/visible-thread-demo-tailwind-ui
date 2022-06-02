import http from "../http-common";
import IOrganisation from "../types/Organisation";
import ITeam from "../types/Team"
import IUser from "../types/User"

const getAll = () => {
  console.log('Organisation Service getAll()')
  return http.get<Array<IOrganisation>>("/organisations");
};

const get = (id: any) => {
  return http.get<IOrganisation>(`/organisations/${id}`);
};

const getTeams = (id: any) => {
  return http.get<ITeam>(`/${id}/teams`);
};

const getTeamUsers = (team: ITeam) => {
  return http.get<IUser>(`/${team.id}/teams`);
};

const create = (data: IOrganisation) => {
  return http.post<IOrganisation>("/organisations", data);
};

const update = (id: any, data: IOrganisation) => {
  return http.post<any>(`/organisations/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/organisations/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/suppliers`);
};

const findByTitle = (title: string) => {
  return http.get<Array<IOrganisation>>(`/suppliers?title=${title}`);
};

const findByName = (title: string) => {
  return http.get<Array<IOrganisation>>(`/suppliers?title=${title}`);
};

const OrganisationService = {
  getAll,
  get,
  getTeams,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findByTitle,
};

export default OrganisationService;
