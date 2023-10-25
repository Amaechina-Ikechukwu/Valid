import React, { useEffect, useState } from "react";
import { FlatList, Image, View, ActivityIndicator, TouchableNativeFeedback, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { useTheme } from "../context/ThemeProvider";
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from "../context/AuthProvider";
import GetUserMediaObjects from "../apis/Instagram/GetUserMediaObjects";
import ImageViewModal from "./ImageViewModal";
import { useAlert } from "../context/AlertProvider";
import { Vibration } from "react-native";
import { router } from "expo-router";
import { ValidStore } from "../store";
import { GetMediaSmallData } from "../apis/Instagram/GetMediaSmallData";
import Loader from "../constants/Loader";
import { GetMediaFullData } from "../apis/Instagram/GetMediaFullData";


const AppropriateMediaDisplay = ({ item }: any) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    if (item !== undefined) {
        if (item?.media_type == "VIDEO") {
            return (<View style={{ margin: 5 }}>
                <Video ref={video} source={{ uri: item?.media_url }} style={{ height: 125, width: 125, borderRadius: 5 }} useNativeControls={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)} />
            </View>)

        }
        if (item?.media_type == "IMAGE" || item?.media_type == "CAROUSEL_ALBUM") {
            return (
                <View style={{ margin: 5 }}>
                    <Image source={{ uri: item?.media_url }} style={{ height: 125, width: 125, borderRadius: 5 }} progressiveRenderingEnabled />
                </View>
            )
        }
    }
}

export default function MediaPreviewFlatlist() {
    const { user } = useAuth();
    const { color } = useTheme();
    const [userMedia, setUserMedia] = useState<any[]>();
    const [singleUuserMedia, setSingleUserMedia] = useState<any[]>();
    const [open, setOpen] = useState<boolean>(false);
    const { showAlert } = useAlert()
    const { setMediaData } = ValidStore((state: any) => ({
        setMediaData: state.setMediaData
    }))


    const getUserSmallMediaData = async () => {

        const result = await GetMediaSmallData(user);

        setUserMedia(result);
    }
    const onLongPressIn = ({ item }: any) => {
        console.log("Pressed me")
        const feedbackDuration = 50; // Adjust as needed
        Vibration.vibrate(feedbackDuration);

        setSingleUserMedia(item)
        setOpen(true)
    }
    const onLongPressOut = () => {
        const feedbackDuration = 50; // Adjust as needed
        Vibration.vibrate(feedbackDuration);

        setSingleUserMedia([])
        setOpen(false)
    }
    const goToInsight = async ({ item }: any) => {
        setMediaData(item)
        const id = item.id;
        router.push(`/insight/${id}`);
        const result = await GetMediaFullData(id, item.media_type, user)

        setMediaData(result)
    };

    useEffect(() => {
        getUserSmallMediaData();
    }, []);


    const renderItem = ({ item }: { item: any }) => (
        <Pressable onLongPress={() => onLongPressIn({ item })} onPressOut={onLongPressOut} onPress={() => goToInsight({ item })} ><AppropriateMediaDisplay item={item} /></Pressable>

    );

    return (
        <><FlatList
            numColumns={3}
            ListEmptyComponent={<Loader onRetry={() => getUserSmallMediaData()} loading={userMedia == undefined} />}
            data={userMedia}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
            }}
        />
            <ImageViewModal item={singleUuserMedia} open={open} />
        </>

    );
}
