import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetMediaCommentReply } from '../../apis/Instagram/GetMediaCommentReply';
import { useAuth } from '../../context/AuthProvider';
import { useTheme } from '../../context/ThemeProvider';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native';
import { CustomText } from '../../components/Themed';
import Loader from '../../constants/Loader';

import MediaCommentActions from './MediaCommentActions';
import { HideComment } from '../../apis/Instagram/HideComment';
import { UnHideComment } from '../../apis/Instagram/UnHideComment';
import { DeleteComment } from '../../apis/Instagram/DeleteComment';
import Colors from '../../constants/Colors';
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
    timestamp: string
}
export default function CommentReplies({ comment_id }: { comment_id: string }) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { color } = useTheme()
    const getCommentReplies = async () => {
        try {
            setIsRefreshing(true);
            const result = await GetMediaCommentReply(comment_id, user);


            // Assuming comments in `result` have a "timestamp" property
            const sortedComments = result.sort((a: any, b: any) => {
                const timestampA: any = new Date(a.timestamp);
                const timestampB: any = new Date(b.timestamp);
                return timestampA - timestampB;
            });

            setComments(sortedComments);
        } finally {
            setIsRefreshing(false);
        }
    };


    useEffect(() => {
        getCommentReplies();
    }, []);
    useEffect(() => {
        console.log(comments)
    }, [comments]);

    const hideComment = async (commentId: string) => {
        await HideComment(commentId, user);
        getCommentReplies();
    }

    const unhideComment = async (commentId: string) => {
        await UnHideComment(commentId, user);
        getCommentReplies();
    }

    const deleteComment = async (commentId: string) => {
        await DeleteComment(commentId, user);
        getCommentReplies();
    }
    const renderItem = ({ item }: { item: Comment }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, opacity: item.hidden ? 0.5 : 0.8 }}>
            <View style={{ flexDirection: 'row' }}>
                <CustomText style={{ fontWeight: '500', fontSize: 14 }}>{item.from.username} :</CustomText>
                <View style={{ gap: 5, }}>
                    <View style={{ width: 200 }}><CustomText ellipsizeMode='tail' style={{ fontSize: 16, width: 'auto' }}>{item.text}</CustomText></View>



                    <CustomText style={{ fontSize: 12, }}>Likes: {item.like_count}</CustomText>



                </View>
            </View>
            <MediaCommentActions
                comment={item}
                hideComment={() => hideComment(item.id)}
                unhide={() => unhideComment(item.id)}
                deleteAction={() => deleteComment(item.id)}
                reload={getCommentReplies}
            />
        </View>
    );
    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={getCommentReplies}
                />
            }

            ListEmptyComponent={<Loader onRetry={() => getCommentReplies()} data={comments} loading={isRefreshing} type='Comment Replies' />}
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ marginLeft: '18%', width: 'auto', backgroundColor: Colors[color].background }}
            contentContainerStyle={{ width: 'auto' }}

        />
    )
}