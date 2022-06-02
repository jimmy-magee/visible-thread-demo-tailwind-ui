/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Link, useNavigate } from "react-router-dom";

const locations = [
    {
        name: 'Atlanta',
        people: [
            { id: '1', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '2', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    }, {
        name: 'South Africa',
        people: [
            { id: '3', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '4', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
    {
        name: 'Edinburgh',
        people: [
            { id: '5', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '6', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
    {
        name: 'Dublin',
        people: [
            { id: '7', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '8', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
    {
        name: 'New York',
        people: [
            { id: '9', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '10', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
    {
        name: 'London',
        people: [
            { id: '11', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '12', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
    {
        name: 'Boston',
        people: [
            { id: '13', name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
            { id: '14', name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserTable() {

    const navigate = useNavigate();
    const goRouteId = (id) => {
        navigate(`/dashboard/projects/${id}`);
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {locations.map((location) => (
                                        <Fragment key={location.name}>
                                            <tr className="border-t border-gray-200">
                                                <th
                                                    colSpan={5}
                                                    scope="colgroup"
                                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                                >
                                                    {location.name}
                                                </th>
                                            </tr>
                                            {location.people.map((person, personIdx) => (
                                                <tr
                                                    key={person.email}
                                                    className={classNames(personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                                    onClick={() => goRouteId(person.id)}
                                                >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.title}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <Link to="dashboard/projects/{person.name}" className="text-indigo-600 hover:text-indigo-900">
                                                            Edit<span className="sr-only">, {person.name}</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}