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
            console.log(uid);
            const data = await addColleagues(uid);
            setUid('');
            window.location.reload();
        } catch (err) {
            setError('Failed to add colleague. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-5 text-[#2b2b2b]">
            <h2 className="text-2xl font-semibold">Colleagues</h2>
            <div className="py-4 flex w-1/3 flex-col">
                <label htmlFor="colleagueUid" className="block mb-2">
                    Add a Colleague
                </label>
                {error && (
                    <p className="text-sm text-red-600 mb-4">{error}</p>
                )}
                <div className="flex flex-row items-center justify-center">
                    <input
                        id="colleagueUid"
                        type="text"
                        value={uid}
                        onChange={(e) => setUid(e.target.value)}
                        className="text-[#2b2b2b] block w-full font-light px-4 py-2 border border-gray-300 rounded-l-2xl focus:outline-none focus:border-[#2b2b2b]"
                        placeholder="Enter colleague UID"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="pr-4 pl-3 py-2 bg-[#69369B] text-white border border-[#69369B] rounded-r-2xl shadow-md hover:bg-[#5F1F9C] active:bg-[#44196D] active:scale-[.97] transition duration-200"
                    >
                        {isLoading ? 'Adding...' : 'Add'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddColleaguesForm;
