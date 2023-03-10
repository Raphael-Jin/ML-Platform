// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import RecordList from "./record";

import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
  } from 'reactflow';
// ==============================|| SAMPLE PAGE ||============================== //

const Dashboard = () => (
    <div className="App" style={{ height: '100vh' }}>
        {/* <DnDFlow /> */}
        <p>Those are the ai models</p>
        <RecordList />
    </div>
);

export default Dashboard;
