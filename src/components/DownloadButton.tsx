import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const DownloadButton = ({ textOutput, label, file_name }: { textOutput: string|undefined, label: string, file_name: string }) => {
    const file = new Blob([textOutput || ""], { type: 'text/plain' });

    return (
        <div className="flex justify-center">
            <a className="text-black" download={file_name} target="_blank" rel="noreferrer" href={URL.createObjectURL(file)} style={{
                textDecoration: "inherit",
                color: "black",
                display: 'block'
            }}>
                <Button className='py-2 px-4 rounded-lg w-48 !bg-green-500 text-white -align-center m-4 self-center h-[40px]'>
                    <DownloadIcon className="h-4 w-4 text-black" />
                    {label}
                </Button>
            </a>
        </div>
    )
}

export default DownloadButton;
