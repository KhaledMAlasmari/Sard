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
export type Props = {
  children: JSX.Element;
  BodyClassName: string;
  TextClassName: string;
  title: string;
  uploadIsAllowed: boolean;
  data?: any
};
function BaseNode({ children, BodyClassName, TextClassName, title, uploadIsAllowed }: Props) {
  const nodeId = useNodeId()
  const node = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(node.current?.offsetWidth!)
  const [height, setHeight] = useState<number>(node.current?.offsetHeight!)
  const instance = useReactFlow();
  const [base64Img, setBase64Img] = useState<String | undefined>("")
  const handleImageUpload = (file: File) => {
    if (acceptedFormats.includes(file.type)) {
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        console.log('called: ', reader)
        setBase64Img(reader.result?.toString())
      }
    }
  }

  const handleImagePreview = () => {
    if (base64Img) {
      let base64_to_imgsrc = Buffer.from(base64Img, "base64").toString()

    }
  }
  const deleteNode = () => {
    instance.deleteElements({ nodes: [{ id: nodeId! }] });
  }

  const updateHeightAndWidth = (event: ResizeDragEvent, params: ResizeParamsWithDirection) => {
    setWidth(params.width)
    setHeight(params.height)
  }

  return (
    <>
      {title === 'Chapter' ? <NodeResizer minHeight={300} minWidth={300} onResize={updateHeightAndWidth} /> : null}
      <Handle type="target" position={Position.Top} />
      <div ref={node} id={nodeId!} className={BodyClassName} style={{ width: width, height: height }}>
        <button onClick={deleteNode} className={`absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors`} />
        {
          uploadIsAllowed ?
            <div>
              <FileUploader handleFile={handleImageUpload} />
              <button onClick={handleImagePreview} className={`absolute top-2 right-8 p-1 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors`} />
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
