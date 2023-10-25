import { Image, ImageBackground, Modal, View, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { useTheme } from "../context/ThemeProvider";
import Colors from '../constants/Colors';

const AppropriateMediaDisplay = ({ item }: any) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const { color } = useTheme();
    const { width, height } = Dimensions.get('window');

    useEffect(() => {
        if (item?.media_type === "VIDEO" && video.current) {
            const onLoadStart = () => setIsVideoLoading(true);
            const onLoad = () => setIsVideoLoading(false);

            // Use optional chaining to access video.current safely
            video.current?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            video.current?.loadAsync({ uri: item?.media_url }, {}, false);
            video.current?.setOnLoadStart(onLoadStart);
            video.current?.setOnLoad(onLoad);

            return () => {
                video.current?.setOnPlaybackStatusUpdate(null);
                video.current?.unloadAsync();
                video.current?.setOnLoadStart(null);
                video.current?.setOnLoad(null);
            };
        }
    }, [isVideoLoading, item]);

    if (item !== undefined) {
        if (item?.media_type === "VIDEO") {
            return (
                <View style={{ margin: 5, backgroundColor: 'transparent' }}>
                    {isVideoLoading ? (
                        <ActivityIndicator size="large" color={Colors[color].accent} />
                    ) : (
                        <Video
                            ref={video}
                            source={{ uri: item?.media_url }}
                            style={{ height: height / 0.99, width: width / 0.99, borderRadius: 5 }}
                            useNativeControls={true} // Use native video controls
                            isLooping
                            onPlaybackStatusUpdate={(status) => {
                                // Handle playback status updates
                            }}
                        />


                    )}
                </View>
            );
        }
        if (item?.media_type === "IMAGE" || item?.media_type === "CAROUSEL_ALBUM") {
            return (
                <View style={{ margin: 5 }}>
                    <Image
                        source={{ uri: item?.media_url }}
                        style={{
                            aspectRatio: 1, // Set a fixed aspect ratio of 1:1 (for a square)
                            width: '100%', // Make sure the image fills the available width
                            borderRadius: 5,
                        }}
                        resizeMode='cover' // You can use 'cover' for a centered, cropped square image
                        progressiveRenderingEnabled
                    />

                </View>
            );
        }
    }

    return null;
}


export default function ImageViewModal({ open, item }: { open: boolean, item: any }) {
    const { color } = useTheme();
    // useEffect(() => {
    //     console.log(item)
    // }, [item])
    return (
        <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
            <Modal animationType="fade" visible={open} transparent>
                <View
                    style={{
                        backgroundColor: Colors[color].tabIconDefault,
                        justifyContent: "center",
                        alignItems: 'center',
                        flex: 1
                    }}
                >
                    <AppropriateMediaDisplay item={item} />


                </View>
            </Modal>
        </View>


    )
}