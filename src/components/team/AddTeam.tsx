import React, { useEffect, useState, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import TeamService from "../../services/TeamService";
import ITeam from '../../types/Team';
import IUser from '../../types/User';

type Props = RouteComponentProps<RouterProps>;

interface RouterProps { // type for `match.params`
  organisationId: string; // must be type `string` since value comes from the URL
}

const AddTeam: React.FC<Props> = (props: Props) => {
  const initialTeamState = {
    id: null,
    organisationId: "",
    name: "",
    description: "",
    users: new Array<IUser>(),
    published: false
  };
  const [team, setTeam] = useState<ITeam>(initialTeamState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [organisationId, setOrganisationId] = useState<string>("");

  useEffect(() => {
      setOrganisationId(props.match.params.organisationId);
   }, [props.match.params.organisationId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };

  const saveTeam = () => {
    var data = {
      organisationId: organisationId,
      name: team.name,
      description: team.description,
      published: false,
    };

    //let orgId: string = this.organisationId;

    TeamService.create(organisationId, data)
      .then((response: any) => {
        setTeam({
          id: response.data.id,
          organisationId: response.data.organisationId,
          name: response.data.name,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newTeam = () => {
    setTeam(initialTeamState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTeam}>
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
              value={team.name}
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
              value={team.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTeam} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTeam;
