import React, { Suspense } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// import { Counter } from './features/counter/Counter';
// import { Users } from './features/users/Users';

import './App.css';
import 'react-tabs/style/react-tabs.css';

const Counter = React.lazy(() => import('./features/counter/Counter'));
const Users = React.lazy(() => import('./features/users/Users'));
const Users2 = React.lazy(() => import('./features/users/Users2'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <header className="App-header">
          Tabs test code splitting
        </header>
        <section className="users">
          <Tabs>
            <TabList>
              <Tab>Counter</Tab>
              <Tab>Users</Tab>
            </TabList>
            <TabPanel>
              <Counter />
              <Users2/>
            </TabPanel>
            <TabPanel>
              <Users/>
              <Users2/>
            </TabPanel>
          </Tabs>
        </section>
      </Suspense>
    </div>
  );
}

export default App;
