import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { useState } from 'react';

export default function FilledDataModal({ show, onClose, filledData, copyToClipboard }) {
    const [copySuccess, setCopySuccess] = useState('');

    const formatDataForClipboard = (data) => {
        return data.map((formData, index) => {
            let formattedText = `Form ${index + 1}:\n`;
            formattedText += Object.entries(formData).map(([key, value]) => `${key}: ${value}`).join('\n');
            return formattedText;
        }).join('\n\n');
    };

    const handleCopyToClipboard = () => {
        const formattedData = formatDataForClipboard(filledData);
        navigator.clipboard.writeText(formattedData)
            .then(() => {
                setCopySuccess("Copied to clipboard!");
                setTimeout(() => setCopySuccess(''), 3000); // Clear message after 3 seconds
            })
            .catch(err => {
                console.error('Failed to copy!', err);
            });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Form Submitted Successfully</h2>
                <p>Here is the filled data:</p>
                <div className="bg-gray-100 p-2 rounded-md mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {filledData.map((formData, index) => (
                        <div key={index} className="mb-4 border-b border-gray-300 pb-2">
                            <h3 className="text-md font-semibold mb-2">Quotation {index + 1}</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(formData).map(([key, value]) => (
                                    <div key={key}>
                                        <strong>{key}:</strong> {value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between">
                    <SecondaryButton onClick={onClose}>Close</SecondaryButton>
                    <PrimaryButton onClick={handleCopyToClipboard}>Copy to Clipboard</PrimaryButton>
                </div>
                {copySuccess && <div className="text-green-600 mt-4">{copySuccess}</div>}
            </div>
        </Modal>
    );
}
