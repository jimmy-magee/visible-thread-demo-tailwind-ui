import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';

import UserService from "../../services/UserService";
import IUser from '../../types/User';

interface RouterProps { // type for `match.params`
  organisationId: string;
  teamId: string;
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const UserList: React.FC<Props> = (props: Props) => {
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
     setOrganisationId(props.match.params.organisationId);
  }, [props.match.params.organisationId]);

  useEffect(() => {
      setTeamId(props.match.params.teamId);
  }, [props.match.params.teamId]);

  useEffect(() => {
    retrieveUsersByOrganisationId();
  }, []);

  const onChangeSearchEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const searchEmail = e.target.value;
    setSearchEmail(searchEmail);
  };

  const retrieveUsersByOrganisationId = () => {
    console.log('Looking up users by organisationId '+organisationId)
    UserService.getAll(organisationId)
      .then((response: any) => {
        console.log('Received teams..')
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsersByOrganisationId();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user: IUser, index: number) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findByEmail = () => {
    UserService.findByEmail(organisationId, searchEmail)
      .then((response: any) => {
        setUsers(response.data);
        setCurrentUser(null);
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
            placeholder="Search by email"
            value={searchEmail}
            onChange={onChangeSearchEmail}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEmail}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.email}
              </li>
            ))}
        </ul>


      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>First Name:</strong>
              </label>{" "}
              {currentUser.firstname}
            </div>
            <div>
              <label>
                <strong>Last Name:</strong>
              </label>{" "}
              {currentUser.lastname}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentUser.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
