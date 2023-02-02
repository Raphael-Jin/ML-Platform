// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
  } from 'reactflow';
// ==============================|| SAMPLE PAGE ||============================== //

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const SamplePage = () => (
    <div className="App" style={{ height: '100vh' }}>
        {/* <DnDFlow /> */}
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </div>
);

export default SamplePage;
