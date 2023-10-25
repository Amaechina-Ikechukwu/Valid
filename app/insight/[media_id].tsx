import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { CustomButton, CustomText, CustomView } from '../../components/Themed';
import Colors from "../../constants/Colors";
import { useTheme } from "../../context/ThemeProvider";
import { useAuth } from "../../context/AuthProvider";
import MediaInformation from '../../InstagramComponents/MediaInsights/MediaInformation';
import { ValidStore } from '../../store';
import MediaInsights from '../../InstagramComponents/MediaInsights/MediaInsights';
import { BottomSheetProvider, useBottomSheet } from '../../context/BottomSheetProvider';
import { GetMediaInsights } from '../../apis/Instagram/GetMediaInsights';
import MediaComments from '../../InstagramComponents/MediaInsights/MediaComments';
import { GetMediaComments } from '../../apis/Instagram/GetMediaComments';
export default function MediaFullInformation() {
    const { media_id } = useLocalSearchParams();
    const { user } = useAuth();
    const { color } = useTheme();
    const [userMedia, setUserMedia] = useState<any[]>();



    const getUserMediaObjects = async () => {


        const result = await GetMediaInsights(media_id, user);

        setUserMedia(result.data);


    };
    const retry = async () => {

        const result = await GetMediaInsights(media_id, user);

        setUserMedia(result.data);


    };

    useEffect(() => {

        getUserMediaObjects()
    }, [])
    return (
        <CustomView style={{ flex: 1, marginTop: 14 }} >
            <View style={{ height: '100%', gap: 10 }}>
                <MediaInformation />
                <MediaInsights insightsData={userMedia} retry={() => retry()} />

            </View>


        </CustomView>
    )
}