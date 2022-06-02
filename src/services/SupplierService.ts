import http from "../http-common";
//import ISupplier from "../types/ISupplier";

interface ISupplier  {
         id?: any | null,
         title: string,
         description: string,
         published?: boolean,
       }

const supplier1: ISupplier = {
    id: "",
    title: "title 1",
    description: "",
    published: true
}

const getAll = () => {
  return http.get<Array<ISupplier>>("/suppliers");
};

const get = (id: any) => {
  return http.get<ISupplier>(`/suppliers/${id}`);
};

const create = (data: ISupplier) => {
  return http.post<ISupplier>("/suppliers", data);
};

const update = (id: any, data: ISupplier) => {
  return http.put<any>(`/suppliers/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/suppliers/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/suppliers`);
};

const findByTitle = (title: string) => {
  return http.get<Array<ISupplier>>(`/suppliers?title=${title}`);
};

const SupplierService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default SupplierService;
