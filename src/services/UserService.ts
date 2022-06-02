import http from "../http-common";
import IUser from "../types/User"

const getAll = (organisationId: string) => {
  console.log('Organisation Service getAll()')
  return http.get<Array<IUser>>(`/:organisationId/users`);
};

const get = (organisationId: string, id: string) => {
  return http.get<IUser>(`/${organisationId}/users/${id}`);
};

const findByEmail = (organisationId: string, email: string) => {
  return http.get<IUser>(`/${organisationId}/users/query/${email}`);
};

const create = (organisationId: string, teamId: string, data: IUser) => {
  return http.post<IUser>(`/${organisationId}/teams/${teamId}/users`, data);
};

const update = (organisationId: string, id: string, data: IUser) => {
  return http.post<IUser>(`/${organisationId}/users/${id}`, data);
};

const remove = (organisationId: string, id: string) => {
  return http.delete<any>(`/${organisationId}/users/${id}`);
};



const UserService = {
  getAll,
  get,
  findByEmail,
  create,
  update,
  remove,
};

export default UserService;
