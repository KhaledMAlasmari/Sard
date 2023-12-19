import useStore from '@/utils/nodeStore';
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeResizer,
  useNodeId,
  useReactFlow,
  Node,
  NodeProps,
  ResizeParamsWithDirection,
  ResizeDragEvent,
} from 'reactflow';
import acceptedFormats from '../../utils/acceptedFormats';
import { FileUploader } from '../FileUploader';
import { useRef, useState } from 'react';
import ImageViewer from '../ImageViewer';
export type Props = {
  children: JSX.Element;
  BodyClassName: string;
  TextClassName: string;
  title: string;
  uploadIsAllowed: boolean;
  nodeData?: any
  & NodeProps;
};
function BaseNode({ children, BodyClassName, TextClassName, title, uploadIsAllowed, nodeData }: Props) {
  const nodeId = useNodeId()
  const node = useRef<HTMLDivElement>(null)
  const [widthAndHeight, setWidthAndHeight] = useState<{ width: number, height: number }>({ width: node.current?.offsetWidth!, height: node.current?.offsetHeight! })
  const instance = useReactFlow();
  const [base64Img, setBase64Img] = useState<string | undefined>(nodeData?.image ? nodeData.image : "")
  const changeNodeData = useStore(state => state.changeNodeData)
  const changeNodePosition = useStore(state => state.changeNodePosition)
  const changeNodeWidthHeight = useStore(state => state.changeNodeWidthHeight)
  const nodes = useStore(state => state.nodes)
  const handleImageUpload = (file: File) => {
    if (acceptedFormats.includes(file.type)) {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        console.log('called: ', reader)
        setBase64Img(reader.result?.toString())
        changeNodeData(nodeId!, { image: reader.result?.toString() })
      }
    }
  }


  const deleteNode = () => {
    instance.deleteElements({ nodes: [{ id: nodeId! }] });
  }

  const updateHeightAndWidth = (event: ResizeDragEvent, params: ResizeParamsWithDirection) => {
    setWidthAndHeight({ width: params.width, height: params.height })
    updateChildHeightAndWidth(event, params)
  }

  const updateChildHeightAndWidth = (event: ResizeDragEvent, params: ResizeParamsWithDirection) => {
    const vp = instance!.getViewport()
    const parentNode = nodes.find((node: Node) => node.id === nodeId)
    nodes.forEach((node: Node) => {
      const xDiff = node.position.x + Number(node.width) - Number(params.width)
      if (node.parentNode === nodeId && xDiff > 0 && (node.position.x + Number(node.width) > Number(params.width))) {
        changeNodePosition(node.id, { x: node.position.x - xDiff, y: node.position.y })
      }
      const yDiff = node.position.y + Number(node.height) - Number(params.height)
      if (node.parentNode === nodeId && yDiff > 0 && (node.position.y + Number(node.height) > Number(params.height))) {
        changeNodePosition(node.id, { x: node.position.x, y: node.position.y - yDiff })
      }
    })
  }

  return (
    <>
      {title === 'Chapter' ? <NodeResizer minHeight={300} minWidth={300} onResize={updateHeightAndWidth} /> : null}
      <Handle type="target" position={Position.Top} />
      <div ref={node} id={nodeId!} className={BodyClassName} style={{ width: widthAndHeight.width, height: widthAndHeight.height }}>
        <button onClick={deleteNode} className={`absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors`} />
        {
          uploadIsAllowed ?
            <div>
              <FileUploader handleFile={handleImageUpload} />
              <ImageViewer title={title} image={base64Img} />
            </div>
            :
            null
        }
        {children}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>

  )
}

export default BaseNode
