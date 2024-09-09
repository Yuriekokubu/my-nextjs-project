"use client";

import React from 'react';

interface Product {
    id: number;
    title: string;
    image: string;
    amount: string;
}

const products: Product[] = [
    {
        id: 1,
        title: 'Monitor',
        image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
        amount: '$2500.00',
    },
    {
        id: 2,
        title: 'Hard Disk/SSD',
        image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
        amount: '$2000.75',
    },
];

const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'white',
    fontWeight: 'bold',
};

const ActionButtons: React.FC<{
    onApprove: () => void;
    onReject: () => void;
}> = ({ onApprove, onReject }) => (
    <div className="flex space-x-2">
        <button
            style={{ ...buttonStyle, backgroundColor: 'green' }}
            onClick={onApprove}
        >
            Approve
        </button>
        <button
            style={{ ...buttonStyle, backgroundColor: 'red' }}
            onClick={onReject}
        >
            Reject
        </button>
    </div>
);

const ProductRow: React.FC<{ product: Product }> = ({ product }) => (
    <tr>
        <td className="px-6 py-4 whitespace-nowrap">
            <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {product.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {product.amount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <ActionButtons
                onApprove={() => console.log(`${product.title} approved`)}
                onReject={() => console.log(`${product.title} rejected`)}
            />
        </td>
    </tr>
);

const ProductTable: React.FC = () => (
    <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
                <ProductRow key={product.id} product={product} />
            ))}
        </tbody>
    </table>
);

export default ProductTable;
