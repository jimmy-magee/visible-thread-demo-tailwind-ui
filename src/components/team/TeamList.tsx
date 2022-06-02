import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import TeamService from "../../services/TeamService";
import ITeam from '../../types/Team';

interface RouterProps { // type for `match.params`
  organisationId: string;
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const TeamList: React.FC<Props> = (props: Props) => {
  const [teams, setTeams] = useState<Array<ITeam>>([]);
  const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchName, setSearchName] = useState<string>("");
  const [organisationId, setOrganisationId] = useState<string>("");

    useEffect(() => {
         setOrganisationId(props.match.params.organisationId);
    }, [props.match.params.organisationId]);

  useEffect(() => {
    retrieveTeams();
  }, []);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveTeams = () => {
    console.log('Looking up teams..')
    TeamService.getAll()
      .then((response: any) => {
        console.log('Received teams..')
        console.log(response.data);
        setTeams(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTeams();
    setCurrentTeam(null);
    setCurrentIndex(-1);
  };

  const setActiveTeam = (team: ITeam, index: number) => {
    setCurrentTeam(team);
    setCurrentIndex(index);
  };

  const findByName = () => {
      TeamService.findByName(organisationId, searchName)
        .then((response: any) => {
          setCurrentTeam(response.data);
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
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Teams List</h4>

        <ul className="list-group">
          {teams &&
            teams.map((team, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTeam(team, index)}
                key={index}
              >
                {team.name}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentTeam ? (
          <div>
            <h4>Team</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTeam.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTeam.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTeam.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/teams/" + currentTeam.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Team...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamList;
