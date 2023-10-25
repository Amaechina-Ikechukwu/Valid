import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeProvider';
import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import { ResizeMode, Video } from 'expo-av';
import { ValidStore } from '../../store';
import { CustomText, CustomView } from '../../components/Themed';
import { useShallow } from 'zustand/react/shallow'
import ImageCollectionFlatlist from './ImageCollectionFlatlist';

const AppropriateMediaDisplay = ({ item }: any) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const { color } = useTheme();
    const { width, height } = Dimensions.get('window');
    function extractHashtagsFromCaption(caption: string) {
        if (caption == undefined) {
            return ''
        }

        // Regular expression to match hashtags (words starting with #)
        const hashtagRegex = /#(\w+)/g;

        // Use the regular expression to find all hashtags in the caption
        const hashtags = caption.match(hashtagRegex);

        if (hashtags) {
            const formattedHashtags = hashtags.map((tag) => `${tag}`).join(' ');

            return formattedHashtags;
        } else {
            return ''
        }
    }
    function removeHashtagsFromString(inputString: string) {
        // Regular expression to match hashtags (words starting with #)
        if (inputString == undefined) {
            return ''
        }
        const hashtagRegex = /#(\w+)/g;

        // Replace all matched hashtags with an empty string
        const stringWithoutHashtags = inputString.replace(hashtagRegex, '');

        return stringWithoutHashtags;
    }
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
    }, [item]);

    if (item !== undefined) {
        if (item?.media_type === "VIDEO") {
            return (
                <View style={{ backgroundColor: 'transparent' }}>
                    {isVideoLoading ? (
                        <ActivityIndicator size="large" color={Colors[color].accent} />
                    ) : (
                        <Video
                            ref={video}
                            source={{ uri: item?.media_url }}
                            style={{ height: height / 0.99, width: width / 0.99, borderRadius: 5 }}
                            useNativeControls={false}
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            onPlaybackStatusUpdate={(status) => {
                                if (status.isLoaded) {
                                    if (status.isPlaying) {
                                        setIsVideoLoading(false); // Video is no longer loading
                                    } else if (status.isBuffering) {
                                        setIsVideoLoading(true); // Video is buffering
                                    }
                                } else {
                                    console.log('Video is not loaded:', status.error);
                                    // Handle error or retry loading the video
                                }
                                setStatus(() => status);
                            }}
                        />

                    )}
                </View>
            );
        }
        if (item?.media_type === "IMAGE") {
            return (
                <View style={{ backgroundColor: Colors[color].tabIconDefault, padding: 20, borderRadius: 5, justifyContent: 'space-evenly', gap: 15 }} >
                    <Image
                        source={{ uri: item?.media_url }}
                        style={{
                            aspectRatio: 1, // Set a fixed aspect ratio of 1:1 (for a square)
                            width: '100%', // Make sure the image fills the available width
                            borderRadius: 5,
                        }}
                        resizeMode='contain' // You can use 'cover' for a centered, cropped square image
                        progressiveRenderingEnabled
                    />
                    <CustomText inverse={true}>{removeHashtagsFromString(item?.caption)}</CustomText>
                    <CustomText style={{ color: Colors[color].tabIconSelected }} >{extractHashtagsFromCaption(item?.caption)}</CustomText>

                </View>
            );
        }
        if (item?.media_type === "CAROUSEL_ALBUM") {
            return (
                <View style={{ backgroundColor: Colors[color].tabIconDefault, padding: 20, borderRadius: 5, justifyContent: 'space-evenly', gap: 15, }} >
                    <View style={{ height: height * 0.4, width: "100%" }}><ImageCollectionFlatlist items={item.children} /></View>

                    <CustomText inverse={true}>{removeHashtagsFromString(item?.caption)}</CustomText>
                    <CustomText style={{ color: Colors[color].tabIconSelected }} >{extractHashtagsFromCaption(item?.caption)}</CustomText>

                </View>
            );
        }
    }

    return null;
}
export default function MediaInformation() {
    const { mediaData } = ValidStore(useShallow((state: any) => ({
        mediaData: state.mediaData
    })))

    return (
        <View>
            <AppropriateMediaDisplay item={mediaData} />
        </View>
    )
}