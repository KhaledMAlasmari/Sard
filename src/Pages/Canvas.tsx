import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Panel,
  ReactFlowProvider,
  ReactFlowInstance,
  XYPosition,
} from 'reactflow';

import nodeTypes from '../utils/NodeTypes'

import 'reactflow/dist/style.css';
import useStore from '../utils/nodeStore';
import { shallow } from 'zustand/shallow';
import Sidebar from '@/components/Sidebar';
import styled, { ThemeProvider, } from 'styled-components';
import { useCallback, useState } from 'react';
import { darkTheme, lightTheme } from '@/utils/theme';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  addChildNode: state.addChildNode,
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
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addChildNode, addNode } = useStore(selector, shallow);
  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const onDragOver = useCallback((event: { preventDefault: () => void; dataTransfer: { dropEffect: string; }; }) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback(
    (event: { preventDefault: () => void; dataTransfer: { getData: (arg0: string) => any; }; clientX: any; clientY: any; }) => {
      event.preventDefault();

      const data_string = event.dataTransfer.getData('application/reactflow');
      const data = JSON.parse(data_string);
      // check if the dropped element is valid
      if (typeof data?.type === 'undefined' || !data?.type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const element = document.elementFromPoint(event.clientX, event.clientY)
      const parent_position = element?.getBoundingClientRect();
      const parent_position_object: XYPosition = ({
        x: Number(parent_position?.left),
        y: Number(parent_position?.top),
      });
      const position: XYPosition = ({
        x: Number(event.clientX),
        y: Number(event.clientY),
      });
      console.log({ position })
      console.log({ drop_x: event.clientX, drop_y: event.clientY })
      console.log(element)

      if (element?.className.includes('chapter')) {
        console.log("wow!!")
        if (data.type === 'copy') {
          addChildNode(element.id,  { x: (50 + Math.random() * 100), y: (50 + Math.random() * 100) }, data?.node_info.type, data?.node_info.data)
        }
        else {
          if (data?.node_info.type === 'action' || data?.node_info.type === 'character') {
            addChildNode(element.id,  { x: (50 + Math.random() * 100), y: (50 + Math.random() * 100) }, data?.node_info.type, data?.node_info.data)
          }

        }
      }
      else if (element?.className.includes('react-flow__pane')) {
        if (data?.node_info.type === 'chapter') {
          addNode(position, data?.node_info.type, { name: null, image: null, title: "Chapter Title" })
        }
      }
    },
    [reactFlowInstance],
  );

  return (
    <ReactFlowProvider>
      <ThemeProvider theme={theme}>
        <ReactFlowStyled
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitViewOptions={{duration: 1000}}
          fitView
        >
          <Sidebar themeState={{ mode, setMode }} />
          <BackgroundStyled />
          <ControlsStyled style={{ backgroundColor: '' }} />
          <MiniMapStyled />
        </ReactFlowStyled>
      </ThemeProvider>
    </ReactFlowProvider>
  )
}

export default Canvas;
