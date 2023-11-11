import { useRef } from 'react';
import acceptedFormats from '../utils/acceptedFormats';
export const FileUploader = ({ handleFile }: any) => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        // @ts-ignore
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        handleFile(fileUploaded);
    };
    return (
        <>
            <button onClick={handleClick} className={`absolute top-2 right-5 p-1 rounded-full bg-green-500 hover:bg-green-600 transition-colors`} />
            <input
                type="file"
                accept={acceptedFormats.join(",")}
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: 'none' }} // Make the file input element invisible
            />
        </>
    );
}
