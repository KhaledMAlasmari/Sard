import useStore from '@/utils/nodeStore';
import {
  Handle,
  Position,
  useUpdateNodeInternals,
  NodeResizer,
  useNodeId,
  useReactFlow,
} from 'reactflow';
import acceptedFormats from '../../utils/acceptedFormats';
import { FileUploader } from '../FileUploader';
import { useState } from 'react';
type Props = {
  children: JSX.Element,
  BodyClassName: string,
  TextClassName: string,
  title: string,
  uploadIsAllowed: boolean
};
function  BaseNode({ children, BodyClassName, TextClassName, title, uploadIsAllowed }: Props) {
  const nodeId = useNodeId()
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


  return (
    <div >
      <Handle type="target" position={Position.Top} />
      <div id={nodeId!} className={BodyClassName}>
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

    </ div>

  )
}

export default BaseNode
