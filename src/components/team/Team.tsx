import React, {useState, useEffect, ChangeEvent, Fragment} from "react";
import {useParams, useNavigate, Link} from 'react-router-dom';
import Select, {components} from 'react-select';

import TeamService from "../../services/TeamService";
import ITeam from "../../types/Team";
import UserService from "../../services/UserService";
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

    // https://github.com/JedWatson/react-select/issues/4686
    const Input = props => (
        <components.Input
            {...props}
            inputClassName="outline-none border-none shadow-none focus:ring-transparent"
        />
    )

    let options = [];

    const [currentTeam, setCurrentTeam] = useState<ITeam>(initialTeamState);
    const [message, setMessage] = useState<string>("");
    const [organisationId, setOrganisationId] = useState<string>("");
    const [organisationUsers, setOrganisationUsers] = useState<Array<IUser>>([]);
    const [selectedOption, setSelectedOption] = useState(null);
    let params = useParams();

    useEffect(() => {
        setOrganisationId(params.organisationId);
        getTeam(params.organisationId, params.teamId);
        populateUserSelectOptions(params.organisationId);
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
        const {name, value} = event.target;
        setCurrentTeam({...currentTeam, [name]: value});
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
                setCurrentTeam({...currentTeam, published: status});
                setMessage("The status was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const populateUserSelectOptions = (organisationId: string | null) => {
        if(organisationId == null || organisationId == '') {
            return
        }
        UserService.getAll(organisationId)
            .then((response: any) => {
                console.log(response.data);
                setOrganisationUsers(response.data);
                getOptions();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    const addUserToTeam = () => {
        console.log('Adding user ', selectedOption.value);
        console.log('to team', currentTeam.id);
        TeamService.addUser(organisationId, currentTeam.id, selectedOption.value)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The team was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const removeUserFromTeam = (userId: string) => {
        console.log('Removing user ', userId);
        console.log('from team', currentTeam.id);
        TeamService.removeUser(organisationId, currentTeam.id, userId)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The team was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const getOptions = () => {
        organisationUsers.map((user, index) => (
         { value: user.id, label: user.firstname }
    ));
    }



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
        console.log('Deleting team with id ' + currentTeam.id)
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
                        <div>
                            <div>
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            FirstName
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            LastName
                                        </th>
                                        <th scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
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
                                                <Link to={`/${user.organisationId}/users/${user.id}`}
                                                      className="text-indigo-600 hover:text-indigo-900">
                                                    View<span className="sr-only">, {user.lastname}</span>
                                                </Link>
                                                <button onClick={() => removeUserFromTeam(user.id)}>Delete</button>

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flexbox">
                                <br/>
                                <p>Add User to Team...</p>



                                <Select options={
                                    organisationUsers.map((user, index) => (
                                          { value: user.id, label: user.firstname }
                                      ))
                                     }
                                        className="relative inline-block px-4 py-4"
                                        components={{Input}}
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                />

                                {selectedOption &&
                                    <div>
                                        <p>Selected Option: {selectedOption.value}</p>
                                        <button onClick={addUserToTeam}> Add to Team</button>
                                    </div>
                                }


                            </div>
                        </div>


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
                    <br/>
                    <p>Please click on a Team...</p>

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                Options
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Account settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                License
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <form method="POST" action="#">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    type="submit"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block w-full text-left px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Sign out
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </form>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                </div>
            )}
        </div>
    );
};

export default Team;
