import React, { useState, useEffect, ChangeEvent } from "react";
//import { RouteComponentProps } from 'react-router-dom';

import SupplierDataService from "../../services/SupplierService";
//import ISupplier from "../../types/ISupplier";

import {useParams} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
//interface RouterProps { // type for `match.params`
//  id: string; // must be type `string` since value comes from the URL
//}

//type Props = RouteComponentProps<RouterProps>;

interface ISupplier  {
         id?: any | null,
         title: string,
         description: string,
         published?: boolean,
       }

const Supplier: React.FC = () => {
  const params = useParams();
  let navigate = useNavigate();

  const initialSupplierState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentSupplier, setCurrentSupplier] = useState<ISupplier>(initialSupplierState);
  const [message, setMessage] = useState<string>("");

  const getSupplier = (id: string) => {
    SupplierDataService.get(id)
      .then((response: any) => {
        setCurrentSupplier(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log('Get supplier '+params.id)
    //let id: string = params.id;
    //getSupplier(params.id);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentSupplier({ ...currentSupplier, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentSupplier.id,
      title: currentSupplier.title,
      description: currentSupplier.description,
      published: status
    };

    SupplierDataService.update(currentSupplier.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentSupplier({ ...currentSupplier, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateSupplier = () => {
    SupplierDataService.update(currentSupplier.id, currentSupplier)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The supplier was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteSupplier = () => {
    SupplierDataService.remove(currentSupplier.id)
      .then((response: any) => {
        console.log(response.data);
         navigate("/suppliers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSupplier ? (
        <div className="edit-form">
          <h4>Supplier</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentSupplier.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentSupplier.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentSupplier.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentSupplier.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteSupplier}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSupplier}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Supplier...</p>
        </div>
      )}
    </div>
  );
};

export default Supplier;
