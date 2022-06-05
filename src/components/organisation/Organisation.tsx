import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import OrganisationDataService from "../../services/OrganisationService";
import IOrganisationData from "../../types/Organisation";
import ITeam from "../../types/Team";
import IUser from "../../types/User";


const Organisation: React.FC = () => {
  const initialOrganisationState = {
    id: null,
    name: "",
    description: "",
    published: false,
  };

  const initialTeamState = {
      id: null,
      organisationId: "",
      name: "",
      description: "",
      users: new Array<IUser>(),
   };

  const [currentOrganisation, setCurrentOrganisation] = useState<IOrganisationData>(initialOrganisationState);
  const [message, setMessage] = useState<string>("");
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [currentTeam, setCurrentTeam] = useState<ITeam>(initialTeamState);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(-1);


    let params = useParams();

    useEffect(() => {
        getOrganisation(params.id);
        getOrganisationTeams(params.id);
    }, []);

  const getOrganisation = (id: string | undefined) => {
    OrganisationDataService.get(id)
      .then((response: any) => {
        setCurrentOrganisation(response.data);
        getOrganisationTeams(id);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getOrganisationTeams = (id: string | undefined) => {
      OrganisationDataService.getTeams(id)
        .then((response: any) => {
          setTeams(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
       setCurrentOrganisation({ ...currentOrganisation, [name]: value });
    };

    const updatePublished = (status: boolean) => {
     var data = {
      id: currentOrganisation.id,
      name: currentOrganisation.name,
      description: currentOrganisation.description,
      published: status
    };

    OrganisationDataService.update(currentOrganisation.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentOrganisation({ ...currentOrganisation, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateOrganisation = () => {
      let navigate = useNavigate();
      OrganisationDataService.update(currentOrganisation.id, currentOrganisation)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The organisation was updated successfully!");
        navigate("/organisations");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteOrganisation = () => {
    console.log('Deleting team with id '+currentOrganisation.id)
      let navigate = useNavigate();
    OrganisationDataService.remove(currentOrganisation.id)
      .then((response: any) => {
        navigate("/organisations");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const setActiveTeam = (team: ITeam, index: number) => {
      setCurrentTeam(team);
      setCurrentTeamIndex(index);
      console.log('Set Active Team ' + team.name + ' index = ' + index)
  };

  return (
    <div>
      {currentOrganisation ? (
        <div className="edit-form">
          <h4>Organisation</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Organisation Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentOrganisation.name}
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
                value={currentOrganisation.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentOrganisation.published ? "Published" : "Pending"}
            </div>
          </form>

          <h4>Teams</h4>

           {teams && teams.length > 0 &&
                     <table className="min-w-full divide-y divide-gray-300">
                                     <thead className="bg-gray-50">
                                       <tr>
                                         <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                           Name
                                         </th>
                                         <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                           Description
                                         </th>

                                         <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                           <span className="sr-only">Edit</span>
                                         </th>
                                       </tr>
                                     </thead>
                                     <tbody className="divide-y divide-gray-200 bg-white">
                                       {teams.map((team, index) => (
                                         <tr key={team.id}>
                                           <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                             {team.name}
                                           </td>
                                           <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{team.description}</td>
                                           <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                             <Link to={`/${team.organisationId}/teams/${team.id}`} className="text-indigo-600 hover:text-indigo-900">
                                               View<span className="sr-only">, {team.name}</span>
                                             </Link>
                                           </td>
                                         </tr>
                                       ))}
                                     </tbody>
                                   </table>
           }

          {currentOrganisation.published ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteOrganisation}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateOrganisation}
          >
            Update
          </button>
          <p>{message}</p>





        </div>
      ) : (
        <div>
          <br />
          <p> Add Team</p>
        </div>
      )}
    </div>
  );
};

export default Organisation;
