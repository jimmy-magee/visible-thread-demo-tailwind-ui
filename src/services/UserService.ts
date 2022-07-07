import http from "../http-common";
import axios from "axios";
import IUser from "../types/User"

const getAll = (organisationId: string) => {
  console.log('Organisation Service getAll()')
  return http.get<Array<IUser>>(`/${organisationId}/users`);
};

const getUser = (organisationId: string, id: string) => {
  return http.get<IUser>(`/${organisationId}/users/${id}`);
};

const getUserImage = (organisationId: string, id: string) => {
  return http.get<any>(`/${organisationId}/users/${id}`);
};

const downloadUserImageById = (organisationId: string, userId: string, fileId: string) => {
  console.log('Downloading image for user ', organisationId, userId, fileId)
  return http.get<any>(`/${organisationId}/users/${fileId}`);
};

const findByEmail = (organisationId: string, email: string) => {
  return http.get<IUser>(`/${organisationId}/users/query/${email}`);
};

const create = (organisationId: string, teamId: string, data: IUser) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return http.post<IUser>(`/${organisationId}/teams/${teamId}/users`, data, config);
};

const update = (organisationId: string, id: string, data: IUser) => {
  return http.post<IUser>(`/${organisationId}/users/${id}`, data);
};

const remove = (organisationId: string, id: string) => {
  return http.delete<any>(`/${organisationId}/users/${id}`);
};



const UserService = {
  getAll,
  getUser,
  getUserImage,
  findByEmail,
  create,
  update,
  remove,
};

export default UserService;
