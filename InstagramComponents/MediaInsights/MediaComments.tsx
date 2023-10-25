import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, TouchableOpacity, View } from 'react-native';
import Loader from '../../constants/Loader';
import { ValidStore } from '../../store';
import { useAuth } from '../../context/AuthProvider';
import { GetMediaComments } from '../../apis/Instagram/GetMediaComments';
import { CustomText, CustomView } from '../../components/Themed';
import MediaCommentActions from './MediaCommentActions';
import { HideComment } from '../../apis/Instagram/HideComment';
import { UnHideComment } from '../../apis/Instagram/UnHideComment';
import { DeleteComment } from '../../apis/Instagram/DeleteComment';
import Colors from '../../constants/Colors';
import { useTheme } from '../../context/ThemeProvider';
import CommentReplies from './CommentReplies';

interface Comment {
    id: string;
    text: string;
    like_count: number;
    hidden: boolean;
    from: {
        username: string;
    };
    replies: {
        data: any[]; // Update with the actual type if possible
    };
}

export default function MediaComments() {
    const { mediaData } = ValidStore((state: any) => ({
        mediaData: state.mediaData
    }));
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showReplies, setShowReplies] = useState<boolean[]>([]);
    const { color } = useTheme()
    const getComments = async () => {
        try {
            setIsRefreshing(true);
            const result = await GetMediaComments(mediaData.id, user);
            setComments(result);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    const hideComment = async (commentId: string) => {
        await HideComment(commentId, user);
        getComments();
    }

    const unhideComment = async (commentId: string) => {
        await UnHideComment(commentId, user);
        getComments();
    }

    const deleteComment = async (commentId: string) => {
        await DeleteComment(commentId, user);
        getComments();
    }
    useEffect(() => {
        if (comments) {
            setShowReplies(Array(comments.length).fill(false));
        }
    }, [comments]);

    // ...

    const toggleReplies = (commentIndex: number) => {
        const updatedShowReplies = [...showReplies];
        updatedShowReplies[commentIndex] = !updatedShowReplies[commentIndex];
        setShowReplies(updatedShowReplies);
    };

    const renderItem = ({ item, index }: { item: Comment, index: number }) => (
        <View style={{ gap: 10 }}><View style={{ flexDirection: 'row', gap: 10, height: 40, justifyContent: 'space-between', opacity: item.hidden ? 0.5 : 1, }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <CustomText style={{ fontWeight: '500', fontSize: 18 }}>{item.from.username} :</CustomText>
                <View style={{ gap: 5, }}>
                    <CustomText style={{ fontSize: 20 }}>{item.text}</CustomText>
                    <View style={{ gap: 10, flexDirection: 'row' }}>
                        <CustomText style={{ fontSize: 14 }}>Likes: {item.like_count}</CustomText>
                        <TouchableOpacity onPress={() => toggleReplies(index)}>
                            <CustomText style={{ fontSize: 14, color: Colors[color].accent }}>Replies: {item.replies ? item.replies.data?.length : '0'} </CustomText>
                        </TouchableOpacity>

                    </View>




                </View>
            </View>
            <MediaCommentActions
                comment={item}
                hideComment={() => hideComment(item.id)}
                unhide={() => unhideComment(item.id)}
                deleteAction={() => deleteComment(item.id)}
                reload={getComments}
            />
        </View>
            {showReplies[index] && <CommentReplies comment_id={item.id} />}
        </View>

    );

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={getComments}
                />
            }
            ListHeaderComponent={<CustomText style={{ fontWeight: '300', fontSize: 24 }}>Comments</CustomText>}
            ListEmptyComponent={<Loader onRetry={() => getComments()} data={comments} loading={isRefreshing} type='Comments' />}
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
                gap: 20, height: '100%'
            }}
            style={{ height: '100%' }}
        />
    );
}
