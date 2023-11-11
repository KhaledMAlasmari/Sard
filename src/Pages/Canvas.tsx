import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    Panel,
} from 'reactflow';

import nodeTypes from '../utils/NodeTypes'

import 'reactflow/dist/style.css';
import useStore from '../utils/nodeStore';
import { shallow } from 'zustand/shallow';
import Sidebar from '@/components/Sidebar';
import styled, { ThemeProvider,  } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from '@/utils/theme';

const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const MiniMapStyled = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

const BackgroundStyled = styled(Background)`
  button {
    background-color: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.primary};
  }
`;

function Canvas() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
    const [mode, setMode] = useState('dark');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <ReactFlowStyled
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onConnect={onConnect}
                fitView
            >
                <BackgroundStyled  />
                <Sidebar themeState={{mode, setMode}} />
                <ControlsStyled style={{ backgroundColor: '' }} />
                <MiniMapStyled />
            </ReactFlowStyled>
        </ThemeProvider>
    )
}

export default Canvas;
