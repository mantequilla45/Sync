"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import HamburgerMenu from "./side-bar";
import SearchInput from "./search-bar";
import ProfileCard from "./profilecard";
import NotificationWall from "./notificationwall";
import { GoBellFill } from "react-icons/go";
import { useAuth } from "@/services/Auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/Firebase/FirebaseClient";
import Image from 'next/image';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const isSignUpPage = pathname === "/signup";
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { user } = useAuth();
  const [displayPicture, setDisplayPicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "userCredentials", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data();
          setDisplayPicture(
            data.displayPicture ||
              "https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/profile-pictures%2Fdefault.png"
          ); // Default profile picture if none is set
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [user]);

  const toggleCard = (cardType: string) => {
    setActiveCard((prevState) => (prevState === cardType ? null : cardType));
  };

  const logoutAndRedirect = async () => {
    try {
      await fetch("/api/logout", { method: "POST", headers: { "Content-Type": "application/json" } });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const bellRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);

  // Close profile card if click is outside the profile card or profile button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setActiveCard(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      {/* eslint-disable-next-line */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> 

      <div
        className={`top-0 left-0 right-0 w-full ${
          isLanding ? "bg-transparent text-white" : "bg-transparent text-white"
        }`}
        style={{ zIndex: 1000 }}
      >
        <div
          className={`flex items-center ${
            isLanding || isSignUpPage ? "justify-center" : "justify-between"
          } w-full`}
        >
          {!isLanding && !isSignUpPage && (
            <div className="flex flex-col items-center justify-between w-full mx-3 py-2">
              <div className="flex items-center w-full">
                <HamburgerMenu />
                <div className="flex items-center w-full ml-6">
                  <a href="/home" className="flex items-center">
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/hostingtest-aadc2.appspot.com/o/website-resources%2FSync%20Logo%2FSync%20Logo%20White%20Large.png?alt=media&token=7551d58d-337b-4106-b5da-9b23260c1d99"
                      alt="Logo"
                      width = {25}
                      height = {25}
                    />
                    <h1 className="text-2xl font-semibold ml-[7px]">Sync</h1>
                  </a>
                  <SearchInput
                    value={inputValue}
                    onChange={handleInputChange}
                    onClear={handleClearInput}
                    placeholder="Search Sync"
                    className="ml-4 max-w-xs mx-10 text-white"
                  />
                </div>
                <div className="flex flex-row m-1 items-center justify-center">
                <button
                  ref={bellRef}
                  className={`profile-button p-2 rounded-full bg-[#3D55B8] shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-gray-800 flex items-center justify-center mr-5 hover:bg-[#4B67DD] hover:text-white active:bg-[#2C3E9A] transition duration-200 ${
                    isOpen ? "scale-95 bg-[#2C3E9A] hover:bg-[#2C3E9A]" : "" // Keep active state when notification wall is open
                  }`}
                  onClick={handleToggle}
                >
                    <GoBellFill className="text-lg text-white w-[20px] h-[20px]" />
                  </button>

                  {/* Notification wall */}
                  <NotificationWall isOpen={isOpen} onClose={() => setIsOpen(false)} bellRef={bellRef} />

                  <button
                    ref={profileButtonRef}
                    className="profile-button w-[36px] h-[36px] rounded-full bg-white text-gray-800 shadow-[0_4px_8px_rgba(0,0,0,0.3)] flex items-center justify-center mr-16 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-300 active:scale-95 transition duration-200 overflow-hidden"
                    onClick={() => toggleCard("profile")}
                  >
                    <img
                      src={displayPicture || ''}
                      alt="Profile"
                      width = {36}
                      height = {36}
                      className="rounded-full object-cover"
                    />
                  </button>
                </div>
              </div>
              <ProfileCard
                ref={profileCardRef}
                activeCard={activeCard}
                toggleCard={toggleCard}
                logoutAndRedirect={logoutAndRedirect}
              />
            </div>
          )}
          {(isLanding || isSignUpPage) && (
            <>
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e206a20408ef8878dcb5118bce850f8f290c84cbd09da22c62f468d88dfbdc15?placeholderIfAbsent=true&apiKey=0cd5b3eb85e74a83a268d41d07a9c27f"
                alt="Logo"
                width = {25}
                height = {25}
              />
              <h1 className="text-2xl font-bold ml-[7px]">{isSignUpPage ? "Sync" : "Sync"}</h1>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
