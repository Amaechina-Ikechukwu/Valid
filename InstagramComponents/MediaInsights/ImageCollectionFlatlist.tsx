import { View, Text, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import Loader from '../../constants/Loader';
import { useTheme } from '../../context/ThemeProvider';
import { Image } from 'react-native';
import Colors from '../../constants/Colors';
import { CustomText } from '../../components/Themed';
import NormalLoader from '../../constants/NormalLoader';

export default function ImageCollectionFlatlist({ items }: any) {
    const { color } = useTheme();
    const { width, height } = Dimensions.get('window');
    const renderItem = ({ item }: { item: any }) => {
        console.log('Rendering item:', item); // Check if 'renderItem' is called and 'item' is correct
        return (
            <Image
                source={{ uri: item?.media_url }}
                style={{
                    aspectRatio: 1,
                    width: '100%',
                    borderRadius: 5,
                    height: '100%',
                }}
                resizeMode='contain'
                progressiveRenderingEnabled
            />
        );
    };


    return (
        <FlatList
            horizontal
            ListEmptyComponent={<ActivityIndicator color={Colors[color].accent} />}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} scrollEnabled scrollToOverflowEnabled indicatorStyle='default'
            contentContainerStyle={{
                height: '100%', width: '100%'
            }}
        />




    );
}