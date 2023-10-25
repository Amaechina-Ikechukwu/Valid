// ModalProvider.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, Modal } from 'react-native';
import Colors from '../constants/Colors';
import { useTheme } from './ThemeProvider';

type ModalContent = ReactNode;

interface ModalContextType {
    showModal: (content: ModalContent) => void;
    hideModal: () => void;
}
interface ModalProviderProps {
    children: ReactNode; // Define the children prop here
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);
    const { color } = useTheme()
    const showModal = (content: ModalContent) => {
        setModalContent(content);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalContent(null);
        setModalVisible(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20, borderRadius: 20 }}>
                    <View style={{ width: '100%', backgroundColor: Colors[color].tabIconDefault, justifyContent: 'space-between', borderRadius: 20 }}>{modalContent}</View>

                </View>
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
