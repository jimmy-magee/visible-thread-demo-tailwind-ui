import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';

import TeamService from "../../services/TeamService";
import ITeam from "../../types/Team";
import IUser from "../../types/User";

const Team: React.FC = () => {
  const initialTeamState = {
    id: null,
    organisationId: "",
    name: "",
    description: "",
    users: new Array<IUser>(),
    published: false
  };
  const [currentTeam, setCurrentTeam] = useState<ITeam>(initialTeamState);
  const [message, setMessage] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");

  let params = useParams();

  useEffect(() => {
       setOrganisationId(params.organisationId);
       getTeam(params.organisationId, params.teamId);
  }, []);

  const getTeam = (organisationId: string, id: string) => {
    console.log('Looking up team by id and orgId', id, organisationId);
    TeamService.get(organisationId, id)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTeam(response.data);

      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentTeam({ ...currentTeam, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    var data = {
      id: currentTeam.id,
      organisationId: currentTeam.organisationId,
      name: currentTeam.name,
      description: currentTeam.description,
      published: status
    };

    TeamService.update(organisationId, currentTeam.id, data)
      .then((response: any) => {
        console.log(response.data);
        setCurrentTeam({ ...currentTeam, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateTeam = () => {
    TeamService.update(organisationId, currentTeam.id, currentTeam)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The supplier was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteTeam = () => {
    console.log('Deleting team with id '+currentTeam.id)
    let navigate = useNavigate();
    TeamService.remove(organisationId, currentTeam.id)
      .then((response: any) => {
        navigate("/suppliers");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTeam ? (
        <div className="edit-form">
          <h4>Team</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Team Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTeam.name}
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
                value={currentTeam.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTeam.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTeam.users && currentTeam.users.length > 0 &&
                               <table className="min-w-full divide-y divide-gray-300">
                                               <thead className="bg-gray-50">
                                                 <tr>
                                                   <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                     FirstName
                                                   </th>
                                                   <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                     LastName
                                                   </th>
                                                   <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                     Email
                                                   </th>

                                                   <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                     <span className="sr-only">View</span>
                                                   </th>
                                                 </tr>
                                               </thead>
                                               <tbody className="divide-y divide-gray-200 bg-white">
                                                 {currentTeam.users.map((user, index) => (
                                                   <tr key={user.id}>
                                                     <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                       {user.firstname}
                                                     </td>
                                                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.lastname}</td>
                                                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                                                     <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                       <Link to={`/${user.organisationId}/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                         View<span className="sr-only">, {user.lastname}</span>
                                                       </Link>
                                                     </td>
                                                   </tr>
                                                 ))}
                                               </tbody>
                                             </table>
                     }

          {currentTeam.published ? (
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

          <button className="badge badge-danger mr-2" onClick={deleteTeam}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTeam}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Team...</p>
        </div>
      )}
    </div>
  );
};

export default Team;
