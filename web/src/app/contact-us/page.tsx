'use client';

import { useState } from 'react';
import Header from '../../components/protected/header';
import Image from 'next/image';
import { IoIosAttach } from "react-icons/io";

const ContactUs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // To control the visibility of the modal

    // Function to open the modal
    const openModal = () => {
        setIsVisible(true); // Make modal visible
        setTimeout(() => {
            setIsModalOpen(true); // Start the transition after it's visible
        }, 10); // Small delay to ensure visibility before transition
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false); // Start the closing transition
        setTimeout(() => {
            setIsVisible(false); // Hide the modal after transition
        }, 300); // Delay matches the duration of the transition (300ms)
    };


    return (
        <div className="flex flex-col min-h-screen bg-[linear-gradient(45deg,_#82245C,_#81245C,_#732783,_#561C90,_#561C90,_#37249E,_#3D55B8)] text-white">
            <Header /> 
            <div className="px-[90px] mb-2">
                <h1 className="text-sm text-white font-light">Home / Contact Us</h1>
            </div>
            <div className="flex-grow space-y-[100px] bg-white rounded-2xl shadow-lg mx-16 mb-16">
                <div className="flex flex-row h-full px-[150px]">
                    <div className="flex-1 flex-col py-16 pl-16 mt-[100px]">
                        <h2
                        className="text-6xl my-5 text-[#69369B] font-[700]"
                        style={{ textShadow: "3px 3px 2px rgba(0, 0, 0, 0.2)" }}
                        >
                        Contact Us
                        </h2>
                        <p className="text-lg my-5 text-[#2B2B2B] font-regular">
                        We’re here to help you get the most out of Sync(). Whether you have questions about our features, need technical support, or would like to provide feedback, our team is always ready to assist.
                        </p>
                        <button 
                            onClick={openModal} 
                            className="mt-6 px-6 py-3 bg-[#69369B] text-white text-lg font-regular rounded-full hover:bg-[#572A81] transition duration-300"
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="flex-[1.55] py-16"> 
                        <Image
                            src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2Fwebsite-pictures%2Fcontact-us1.png?alt=media&token=f7d17230-5561-447b-ab0d-27f02bace754"
                            alt="Contact Us"
                            width={3000}
                            height={3000}
                            priority
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isVisible && (
                <div 
                    className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-200 ease-in-out ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className={`bg-white rounded-lg p-10 max-w-lg w-full transform transition-transform duration-300 ease-in-out ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-semibold mb-4 text-[#69369B]">Get in Touch</h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 transition">
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <p className="text-lg text-[#2B2B2B] mb-6">
                            Please fill out the form or contact us for more information.
                        </p>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full p-3 bg-[#EDEDED] rounded-full pl-5 mb-4" 
                            placeholder="Enter your name" 
                            style={{ color: '#242424' }} 
                        />
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-3 bg-[#EDEDED] rounded-full pl-5 mb-4" 
                            placeholder="Enter your email" 
                            style={{ color: '#242424' }}
                        />
                        <textarea 
                            id="message" 
                            rows={4}
                            className="w-full h-56 p-3 bg-[#EDEDED] rounded-2xl pl-5 mb-4" 
                            placeholder="Enter your message" 
                            style={{ color: '#242424' }}
                        />
                        <div className="flex flex-row items-center gap-4 justify-end">
                            <div className="bg-transparent hover:bg-[#EDEDED] active:bg-[#DADADA] rounded-full p-3 transition-all duration-150">
                                <IoIosAttach 
                                    className="text-[#69369B] text-2xl hover:text-[#572A81] transition-transform duration-150 active:scale-95"
                                />
                            </div>
                            <button 
                                onClick={closeModal} 
                                className="px-7 py-3 bg-[#69369B] text-white rounded-full hover:bg-[#572A81] transition duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;