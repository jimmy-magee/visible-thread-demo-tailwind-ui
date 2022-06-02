import React, { ReactElement, useState } from 'react';
import { Routes, Route, Switch, Link, Navigate } from "react-router-dom";
import logo from './logo.svg';
import Dashboard from './pages/Dashboard';
import Example from './pages/Example';
import ProjectContainer  from './pages/ProjectContainer'
import { ProjectDetails } from './pages/ProjectDetails'
import Drawings from './pages/Drawings'
import Accounts from './pages/Accounts'

import AddOrganisation from "./components/organisation/AddOrganisation";
import Organisation from "./components/organisation/Organisation";
import OrganisationList from "./components/organisation/OrganisationList";

import AddTeam from "./components/team/AddTeam";
import Team from "./components/team/Team";
import TeamList from "./components/team/TeamList";

import AddUser from "./components/user/AddUser";
import User from "./components/user/User";
import UserList from "./components/user/UserList";




const App: React.FC = () => {
  //const [count, setCount] = useState(0)

  return (
    <div className="h-full overflow-hidden">
 
          <Routes>

              <Route path="organisations" element={<OrganisationList />} />
              <Route path="organisations/:id" element={<Organisation />} />
              <Route path=":organisationId/teams/:teamId" element={<Team />} />
              <Route path=":organisationId/users/:userId" element={<User />} />
              <Route path="dashboard" element={<Dashboard />} >
                   <Route path="projects" element={< ProjectContainer />}>
                    <Route path=":projectId" element={<ProjectDetails />} >
                    <Route index element={<OrganisationList />} />
                    <Route path="accounts" element={<Accounts />} />

                    </Route>
                    </Route>
                </Route>

         </Routes>

    </div>
  );
}

export default App
