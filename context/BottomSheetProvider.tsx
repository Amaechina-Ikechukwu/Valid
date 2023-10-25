import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { CustomView } from '../components/Themed';

interface BottomSheetContextType {
    showBottomSheet: (content: ReactNode) => void;
    hideBottomSheet: () => void;
}
interface BottomSheetInterface {
    children: ReactNode
}
const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider: React.FC<BottomSheetInterface> = ({ children }) => {
    const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode | null>(null);
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    const showBottomSheet = (content: ReactNode) => {
        setBottomSheetContent(content);
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };

    const hideBottomSheet = () => {
        setBottomSheetContent(null);
        if (bottomSheetRef.current) {
            bottomSheetRef.current.collapse();
        }
    };

    return (
        <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet }}>
            {children}
            {
                bottomSheetContent && <BottomSheet
                    ref={bottomSheetRef}
                    index={0} enablePanDownToClose
                    snapPoints={['45%', '50%', '75%', '80%']} // You can define your own snap points
                    onClose={() => hideBottomSheet()}
                >
                    <CustomView >
                        <View style={{ flex: 1, width: '100%' }}>{bottomSheetContent}</View>

                    </CustomView>
                </BottomSheet>
            }

        </BottomSheetContext.Provider>
    );
};

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
    },
});

export const useBottomSheet = (): BottomSheetContextType => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};
