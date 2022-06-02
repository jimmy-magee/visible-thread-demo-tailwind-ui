import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Project from './Project';


export const ProjectDetails = (user: Project) => {
    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        (async () => {
            console.log('je;;p')
            const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`);
            const json = await resp.json();
            setProjectDetails(json);
        })();
    }, [user]);

    if (!projectDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1> project details for {user}</h1>
        </div>
    );
};
