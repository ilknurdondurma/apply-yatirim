import React from 'react';

function Table({ props, className }) {
    const headers = Object.keys(props[0]);

    return (
        <div>
            <table className={`${className} w-full table-auto border-collapse border border-gray-300`}>
                <thead>
                    <tr className='bg-primary/60'>
                        {headers.map((header, index) => (
                            <th key={index} className='border border-gray-300 px-4 py-2'>
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.map((item, index) => (
                        <tr key={index} className='hover:bg-gray-100'>
                            {Object.values(item).map((value, valueIndex) => (
                                <td 
                                    key={valueIndex} 
                                    className={`border border-gray-300 px-4 py-2 ${value === "" ? 'bg-red-400' : ''}`}
                                >
                                    {value !== null ? value : 'N/A'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
