import React, { useState, ChangeEvent } from "react";
import OrganisationDataService from "../../services/OrganisationService";
import IOrganisationData from '../../types/Organisation';

const AddOrganisation: React.FC = () => {
  const initialOrganisationState = {
    name: "",
    description: ""
  };
  const [organisation, setOrganisation] = useState<IOrganisationData>(initialOrganisationState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrganisation({ ...organisation, [name]: value });
  };

  const saveOrganisation = () => {
    var data = {
      name: organisation.name,
      description: organisation.description
    };

    OrganisationDataService.create(data)
      .then((response: any) => {
        setOrganisation({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newOrganisation = () => {
    setOrganisation(initialOrganisationState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newOrganisation}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={organisation.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={organisation.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveOrganisation} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOrganisation;
