import React, { useEffect, useState, ChangeEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import UserService from "../../services/UserService";
import IUser from '../../types/User';


interface RouterProps { // type for `match.params`
  organisationId: string;
  teamId: string;
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const AddUser: React.FC<Props> = (props: Props) => {
  const initialUserState = {
    id: null,
    organisationId: "",
    name: "",
    description: "",
    published: false,
  };
  const [user, setUser] = useState<IUser>(initialUserState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [organisationId, setOrganisationId] = useState<string>("");
  const [teamId, setTeamId] = useState<string>("");

  useEffect(() => {
     setOrganisationId(props.match.params.organisationId);
  }, [props.match.params.organisationId]);

  useEffect(() => {
      setTeamId(props.match.params.teamId);
  }, [props.match.params.teamId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      organisationId: organisationId,
    };

    UserService.create(organisationId, teamId, data)
      .then((response: any) => {
        setUser({
          id: response.data.id,
          organisationId: response.data.organisationId,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              required
              value={user.firstname}
              onChange={handleInputChange}
              name="firstname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
