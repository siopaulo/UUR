import React, { createContext, useContext, useState, useEffect } from 'react';
import defaultData from './Profiles/default.json';
import { getProfile, saveProfile } from './useLocalStorage';

const ProfileContext = createContext();


export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(() => getProfile() || defaultData);

    useEffect(() => {
        saveProfile(profile);
    }, [profile]);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
