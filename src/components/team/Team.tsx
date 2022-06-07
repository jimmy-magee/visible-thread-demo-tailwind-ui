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
    const people = [
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Member',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More people...
    ]
    let params = useParams();

    useEffect(() => {
        setOrganisationId(params.organisationId);
        getTeam(params.organisationId, params.teamId);
        getAllOrganisationUsers(params.organisationId);
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


    const getAllOrganisationUsers = (organisationId: string | null) => {
        if (organisationId == null || organisationId == '') {
            return
        }
        UserService.getAll(organisationId)
            .then((response: any) => {
                console.log(response.data);
                setOrganisationUsers(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


    const addUserToTeam = () => {

        TeamService.addUser(organisationId, currentTeam.id, selectedOption.value)
            .then((response: any) => {
                console.log(response.data);
                setCurrentTeam(response.data)
                setMessage("The team was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const removeUserFromTeam = (userId: string) => {
        TeamService.removeUser(organisationId, currentTeam.id, userId)
            .then((response: any) => {
                console.log(response.data);
                setCurrentTeam(response.data)
                setMessage("The team was updated successfully!");
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
                    <Link to={`/${currentTeam.organisationId}/teams/${currentTeam.id}/users`}>Add User</Link>

                    <h4>Team</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Team Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
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
                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                    <div className="sm:flex-auto">
                                        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A list of all the users in your team including their name, title, email and
                                            role.
                                        </p>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

                                        <Select options={

                                            organisationUsers.map((user, index) => (
                                                //console.log('Adding user ', user.firstname, ' to select options');
                                                {value: user.id, label: user.firstname}
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
                                <div className="mt-8 flex flex-col">
                                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div
                                                className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-300">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col"
                                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                            Name
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Title
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Status
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                            <span className="sr-only">Edit</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                    {people.map((person) => (
                                                        <tr key={person.email}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 flex-shrink-0">
                                                                        <img className="h-10 w-10 rounded-full"
                                                                             src={person.image} alt=""/>
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-medium text-gray-900">{person.name}</div>
                                                                        <div
                                                                            className="text-gray-500">{person.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <div className="text-gray-900">{person.title}</div>
                                                                <div className="text-gray-500">{person.department}</div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                            className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                                <a href="#"
                                                                   className="text-indigo-600 hover:text-indigo-900">
                                                                    Edit<span className="sr-only">, {person.name}</span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


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

                </div>
            )}
        </div>
    );
};

export default Team;
