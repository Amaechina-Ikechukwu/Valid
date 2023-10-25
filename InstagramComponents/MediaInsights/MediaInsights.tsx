import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { CustomButton, CustomText } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useTheme } from "../../context/ThemeProvider";
import { useBottomSheet } from "../../context/BottomSheetProvider";
import MediaComments from "./MediaComments";
import { GetMediaComments } from "../../apis/Instagram/GetMediaComments";
import { ValidStore } from "../../store";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../constants/Loader";
import { useModal } from "../../context/ModalProvider";
import NormalLoader from "../../constants/NormalLoader";
const ViewColors = [{
    body: "#fca5a5",
    text: "#fee2e2"
}
    ,
{
    body: "#4ade80",
    text: "#ecfdf5"
}
    ,
{
    body: "#0ea5e9",
    text: "#bae6fd"
}
    ,
{
    body: "#a78bfa",
    text: "#ddd6fe"
}
    ,
{
    body: "#c026d3",
    text: "#f5d0fe"
}
]
const InformationModal = ({ item, closeModal, index }: { item: any, closeModal: () => void, index: number }) => {
    const { color } = useTheme();
    function replaceMediaObject(text: string) {
        if (typeof text !== 'string') {
            return text; // Return the input unchanged if it's not a string
        }

        // Use the replace method with regular expressions to perform the replacements
        const replacedText = text
            .replace(/the media object/g, 'your post')

        return replacedText;
    }

    return (
        <View style={{ gap: 30, padding: 20, backgroundColor: ViewColors[index].body, borderRadius: 10 }}>

            <View style={{ gap: 10, alignItems: 'center' }}>
                <CustomText style={{ fontSize: 20, color: ViewColors[index].text }}>{replaceMediaObject(item.description)}</CustomText>
                <CustomText style={{ fontWeight: '500', color: ViewColors[index].text }}>Number of {item.title} since posted: </CustomText>
                <CustomText style={{ fontSize: 50, fontWeight: "500", color: ViewColors[index].text }}>{item.values[0].value}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <CustomButton onPress={closeModal} text="Close" />

            </View>
        </View>
    );
};

export default function MediaInsights({ insightsData, retry }: { insightsData: any, retry: () => void }) {

    const { color } = useTheme();
    const { showBottomSheet, hideBottomSheet } = useBottomSheet();
    const { mediaData } = ValidStore(useShallow((state: any) => ({
        mediaData: state.mediaData
    })))
    const { showModal, hideModal } = useModal();

    const handleShowBottomSheet = () => {
        showBottomSheet(
            <MediaComments />
        );
    };

    const openModal = (item: any, index: number) => {
        showModal(
            <InformationModal item={item} index={index} closeModal={hideModal} />
        )
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical

        >
            <View style={{
                // backgroundColor: Colors[color].tabIconDefault,
                // padding: 15,
                // borderRadius: 5,
                gap: 10,
            }}>
                <TouchableOpacity onPress={handleShowBottomSheet}><View style={{ height: 150, justifyContent: "space-between", padding: 20, backgroundColor: Colors[color].tabIconDefault, borderRadius: 10 }}>
                    <CustomText style={{ fontSize: 20, fontWeight: "200" }}>Comments</CustomText>
                    {mediaData.comments_count !== undefined ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <CustomText style={{ fontSize: 50, fontWeight: "500" }}>{mediaData.comments_count}</CustomText><CustomText style={{ fontSize: 14, fontWeight: "200" }}>Tap to view</CustomText></View> : <View style={{ alignItems: 'flex-start' }}><ActivityIndicator size={"large"} color={Colors[color].text} /></View>}


                </View></TouchableOpacity>

                <View style={{ justifyContent: "space-around", gap: 7 }}>
                    {insightsData ? insightsData?.map((insight: any, index: number) => (
                        <TouchableOpacity key={index} onPress={() => openModal(insight, index)}>
                            <View key={index} style={{ height: 150, justifyContent: "space-between", padding: 20, backgroundColor: ViewColors[index].body, borderRadius: 10 }}>
                                <CustomText style={{ fontSize: 20, fontWeight: "300", color: ViewColors[index].text }}>{insight.title} :</CustomText>
                                <CustomText style={{ fontSize: 50, fontWeight: "500", color: ViewColors[index].text }}>{insight.values[0].value}</CustomText>
                            </View>
                        </TouchableOpacity>


                    )) : <NormalLoader type="Post Insights" loading={!insightsData} onRetry={() => retry()} data={mediaData} />}

                </View>
            </View>
        </ScrollView>
    );
}
