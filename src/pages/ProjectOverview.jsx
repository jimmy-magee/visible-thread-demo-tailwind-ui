import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const ProjectOverview = ({ user }) => {
    const [projectDetails, setProjectDetails] = useState(null);

    useEffect(() => {
        (async () => {
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
            {projectDetails && (
                <>
                    <ul>
                        <li>Name: {projectDetails.name}</li>
                        <li>Company: {projectDetails.company.name}</li>
                    </ul>

                    <Link to={`/dashboard/projects/${projectDetails.id}`}><button>View Project Details</button></Link>
                </>
            )}
        </div>
    );
}