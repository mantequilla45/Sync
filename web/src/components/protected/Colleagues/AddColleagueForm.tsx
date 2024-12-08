'use client'

import React, { useState } from 'react';
import { addColleagues } from './ColleagueFunctions';

const AddColleaguesForm: React.FC = () => {
    const [uid, setUid] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await addColleagues(uid);
            setUid('');
        } catch (err) {
            setError('Failed to add colleague. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add a Colleague</h2>
            <div className="mb-6">
                <label htmlFor="colleagueUid" className="block text-sm font-medium text-gray-600">
                    Colleague UID
                </label>
                <input
                    id="colleagueUid"
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter colleague UID"
                    required
                />
            </div>
            {error && (
                <p className="text-sm text-red-600 mb-4">{error}</p>
            )}
            <div className="flex justify-center">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                >
                    {isLoading ? 'Adding...' : 'Add Colleague'}
                </button>
            </div>
        </form>
    );
};

export default AddColleaguesForm;
