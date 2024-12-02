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
            className="max-w-md mx-auto p-4 bg-white shadow rounded-lg"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add a Colleague</h2>
            <div className="mb-4">
                <label htmlFor="colleagueUid" className="block text-sm font-medium text-gray-600">
                    Colleague UID
                </label>
                <input
                    id="colleagueUid"
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="Enter colleague UID"
                    required
                />
            </div>
            {error && (
                <p className="text-sm text-red-600 mb-4">{error}</p>
            )}
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isLoading ? 'Adding...' : 'Add Colleague'}
                </button>
            </div>
        </form>
    );
};

export default AddColleaguesForm;