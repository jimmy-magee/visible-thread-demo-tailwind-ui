import React, { useState, useEffect, ChangeEvent } from "react";
import OrganisationDataService from "../../services/OrganisationService";
import { Link } from "react-router-dom";
import IOrganisation from '../../types/Organisation';

const OrganisationList: React.FC = () => {
  const [organisations, setOrganisations] = useState<Array<IOrganisation>>([]);
  const [currentOrganisation, setCurrentOrganisation] = useState<IOrganisation | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveOrganisations();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveOrganisations = () => {
    console.log('Looking up organisations..')
    OrganisationDataService.getAll()
      .then((response: any) => {
        console.log('Received organisations..')
        console.log(response.data);
        setOrganisations(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOrganisations();
    setCurrentOrganisation(null);
    setCurrentIndex(-1);
  };

  const setActiveOrganisation = (supplier: IOrganisation, index: number) => {
    setCurrentOrganisation(supplier);
    setCurrentIndex(index);
  };

  const removeAllOrganisations = () => {
    OrganisationDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    OrganisationDataService.findByTitle(searchTitle)
      .then((response: any) => {
        setOrganisations(response.data);
        setCurrentOrganisation(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
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
        <h4>Organisation List</h4>

        <ul className="list-group">
          {organisations &&
            organisations.map((supplier, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveOrganisation(supplier, index)}
                key={index}
              >
                {supplier.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllOrganisations}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentOrganisation ? (
          <div>
            <h4>Organisation</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentOrganisation.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentOrganisation.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentOrganisation.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/organisations/" + currentOrganisation.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Organisation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganisationList;
