"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioContextType {
	currentID: string | null;
	setCurrentID: React.Dispatch<React.SetStateAction<string | null>>
}

interface AudioProviderProps {
	children: ReactNode
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
	const context = useContext(AudioContext)
	if (!context) {
		throw new Error('useAudio must be used within an AudioProvider')
	}
	return context 
}

export const AudioProvider: React.FC <AudioProviderProps> = ({children}) => {
	const [currentID, setCurrentID] = useState<string | null>(null)
	return (
		<AudioContext.Provider value={{currentID, setCurrentID}}>
			{children}
		</AudioContext.Provider>
	)
}