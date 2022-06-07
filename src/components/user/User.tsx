import React, {useState, useEffect, ChangeEvent, FormEvent} from "react";
import {useParams, useNavigate, Link} from 'react-router-dom';

import UserService from "../../services/UserService";
import IUser from "../../types/User";
import VTDocService from "../../services/VTDocService";
import IVTDoc from "../../types/VTDoc";

type FormData = {
    image: FileList;
    title: string;
    description: string;
    created_at: string;
    latitude: string;
    longitude: string;
};

const User: React.FC = () => {
    const initialUserState = {
        id: null,
        organisationId: "",
        firstname: "",
        lastname: "",
        email: "",
        published: false
    };

    const [organisationId, setOrganisationId] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<IUser>(initialUserState);
    const [message, setMessage] = useState<string>("");

    const [userVTDocs, setUserVTDocs] = useState<IVTDoc[]>([]);
    const [uploadFileList, setUploadFileList] = useState<FileList | null>(null);
    const params = useParams();

    useEffect(() => {
        setOrganisationId(params.organisationId);
        setUserId(params.userId)
        getUser(params.organisationId, params.userId);
        getUserVTDocs(params.organisationId, params.userId);
    }, []);

    const getUser = (organisationId: string, id: string) => {
        UserService.get(organisationId, id)
            .then((response: any) => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const getUserVTDocs = (organisationId: string, id: string) => {
        VTDocService.getVTDocsByUserId(organisationId, id)
            .then((response: any) => {
                setUserVTDocs(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const downloadVTDoc = (id: string, fileName: string) => {
        console.log('Download VTDoc..', id, currentUser.id, organisationId);
        VTDocService.downloadVTDocById(organisationId, currentUser.id, id)
            .then((response: any) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch((e: Error) => {
                console.log(e);
            });

    };

    const deleteVTDoc = (id: string, fileName: string) => {
        console.log('Delete VTDoc..', id, fileName, currentUser.id, organisationId);
        VTDocService.remove(organisationId, currentUser.id, id)
            .then((response: any) => {
                console.log(response);
                getUserVTDocs(organisationId, currentUser.id);
            })
            .catch((e: Error) => {
                console.log(e);
            });

    };


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCurrentUser({...currentUser, [name]: value});
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const f = event.currentTarget.files;
        setUploadFileList(f);
        console.log("file input changed..", event.currentTarget.files);

    };

    const handleSubmitFile = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const userId: string = currentUser.id
        VTDocService.uploadVTDoc(organisationId, userId, userId, uploadFileList)
            .then((response: any) => {
                // setUserVTDocs(response.data);

                console.log(response.data);
                return getUserVTDocs(organisationId, userId);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        console.log("handleSubmitFile..", uploadFileList)


    };


    const updatePublished = (status: boolean) => {
        var data = {
            id: currentUser.id,
            firstname: currentUser.firstname,
            lastname: currentUser.lastname,
            email: currentUser.email,
            published: status
        };
        /*
            UserService.update(currentUser.id, data)
              .then((response: any) => {
                console.log(response.data);
                setCurrentUser({ ...currentUser, published: status });
                setMessage("The status was updated successfully!");
              })
              .catch((e: Error) => {
                console.log(e);
              });*/
    };

    const updateUser = () => {

        var data = {
            id: currentUser.id,
            firstName: currentUser.firstname,
            lastName: currentUser.lastname,
            email: currentUser.email,
            published: status
        };

         UserService.update(currentUser.organisationId, currentUser.id, data)
           .then((response: any) => {
             console.log(response.data);
             setMessage("The user was updated successfully!");
           })
           .catch((e: Error) => {
             console.log(e);
           });
    };

    const deleteUser = () => {
        console.log('Deleting user with id ' + currentUser.id)
        let navigate = useNavigate();
        UserService.remove(organisationId, currentUser.id)
            .then((response: any) => {
                navigate("/users");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                value={currentUser.firstname || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Last
                                Name</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="lastname"
                                name="lastname"
                                value={currentUser.lastname || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentUser.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentUser.published ? "Published" : "Pending"}
                        </div>
                    </form>


                    {currentUser.published ? (
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

                    <button className="badge badge-danger mr-2" onClick={deleteUser}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateUser}
                    >
                        Update
                    </button>


                    <form onSubmit={handleSubmitFile}>
                        <h1>File Upload</h1>
                        <input type="file" onChange={onChange}/>
                        <button type="submit">Upload</button>
                    </form>


                    {userVTDocs && userVTDocs.length > 0 &&
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    FileName
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Word Count
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Uploaded
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Download
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {userVTDocs.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {user.fileName}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.wordCount}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.dateUploaded}</td>
                                    <td>
                                        <button
                                            type="submit"
                                            className="badge badge-success"
                                            onClick={() => downloadVTDoc(user.id, user.fileName)}
                                        >
                                            Download
                                        </button>
                                        <button
                                            type="submit"
                                            className="badge badge-success"
                                            onClick={() => deleteVTDoc(user.id, user.fileName)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }

                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    );
};

export default User;
