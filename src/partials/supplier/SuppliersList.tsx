import React, { useState, useEffect, ChangeEvent } from "react";
import SupplierDataService from "../../services/SupplierService";
import { Link } from "react-router-dom";

interface ISupplier  {
         id?: any | null,
         title: string,
         description: string,
         published?: boolean,
       }


const SuppliersList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Array<ISupplier>>([]);
  const [currentSupplier, setCurrentSupplier] = useState<ISupplier | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveSuppliers();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

//TODO - REMOVE - TEST DATA
  const supplier2: ISupplier = {
      id: "1",
      title: "title 2",
      description: "",
      published: true
  }

  const supplier3: ISupplier = {
      id: "2",
      title: "title 3",
      description: "description of title 3",
      published: true
  }

  const supplierList: ISupplier[] = [
      supplier2,
      supplier3,
  ];

  const retrieveSuppliers = () => {
   // SupplierDataService.getAll()
  //    .then((response: any) => {
        setSuppliers(supplierList);
        //console.log(response.data);
//      })
  //    .catch((e: Error) => {
   //     console.log(e);
  //    });
  };

  const refreshList = () => {
    retrieveSuppliers();
    setCurrentSupplier(null);
    setCurrentIndex(-1);
  };

  const setActiveSupplier = (supplier: ISupplier, index: number) => {
    setCurrentSupplier(supplier);
    setCurrentIndex(index);
  };

  const removeAllSuppliers = () => {
    SupplierDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    SupplierDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setSuppliers(response.data);
        setCurrentSupplier(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
    <Link to="/addSupplier">Add Supplier</Link>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Suppliers List</h4>

        <ul className="list-group">
          {suppliers &&
            suppliers.map((supplier, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveSupplier(supplier, index)}
                key={index}
              >
                {supplier.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllSuppliers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentSupplier ? (
          <div>
            <h4>Supplier</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentSupplier.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentSupplier.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentSupplier.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/suppliers/" + currentSupplier.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Supplier...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliersList;
