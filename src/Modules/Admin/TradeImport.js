import axios from 'axios';
import React, { useState } from 'react'

const TradeImport = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('excel_file', file);

        try {
            const response = await axios.post('http://localhost:8000/rolebased/upload_excel/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file: ', error);
            alert('Error uploading file');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default TradeImport