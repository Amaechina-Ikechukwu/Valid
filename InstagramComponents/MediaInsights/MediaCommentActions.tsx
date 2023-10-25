import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useTheme } from '../../context/ThemeProvider';
import { CustomButton, CustomText } from '../../components/Themed';
import { useModal } from '../../context/ModalProvider';
import { TextInput } from 'react-native';
import { ReplyComment } from '../../apis/Instagram/ReplyComment';
import { useAuth } from '../../context/AuthProvider';
const ActionHeader = ({ title, load }: { title: string, load: boolean }) => {
    const { color } = useTheme();
    useEffect(() => { }, [load])
    return (
        <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}><CustomText style={{ fontSize: 24 }}>{title}</CustomText>
            {load && <ActivityIndicator size={'large'} color={Colors[color].text} />}
        </View>

    )
}

const ReplyModal = ({ comment, closeModal, reload }: { comment: any; closeModal: () => void; reload: () => void }) => {
    const { color } = useTheme();
    const [text, onChangeText] = React.useState('');
    const { user } = useAuth();
    const [load, setLoad] = useState(false)
    const replyComment = async () => {
        setLoad(true)
        await ReplyComment(comment.id, text, user)
        reload();
        setLoad(false)
        closeModal();
    };

    return (
        <View style={{ gap: 30, padding: 20 }}>
            <ActionHeader title='Reply Comment' load={load} />
            <View style={{ gap: 20 }}>
                <CustomText style={{ fontSize: 20 }}>{comment.text}</CustomText>

                <TextInput
                    style={{ backgroundColor: Colors[color].background, color: Colors[color].tint, padding: 10, borderRadius: 10 }}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={"Reply to " + comment.from.username} placeholderTextColor={Colors[color].tabIconDefault} cursorColor={Colors[color].accent}

                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Pressable onPress={closeModal} style={{ padding: 10 }}><CustomText style={{ fontSize: 18 }}>Close</CustomText></Pressable>
                <CustomButton
                    onPress={replyComment}
                    text="Reply Comment"
                    style={{ width: '35%', paddingVertical: 10 }}
                />
            </View>
        </View>
    );
};
const DeleteModal = ({ comment, closeModal, deleteAction }: { comment: any; closeModal: () => void; deleteAction: () => void }) => {
    const { color } = useTheme();
    const [load, setLoad] = useState(false)
    const deleteComment = async () => {
        setLoad(true)
        await deleteAction();
        setLoad(false)
        closeModal();
    };

    return (
        <View style={{ gap: 30, padding: 20 }}>
            <ActionHeader title='Delete Comment' load={load} />
            <View style={{ gap: 10, alignItems: 'center' }}>
                <CustomText style={{ fontSize: 20 }}>{comment.text}</CustomText>
                <CustomText style={{ fontWeight: '500' }}>by: {comment.from.username}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <CustomButton onPress={closeModal} text="Close" style={{ width: '35%', paddingVertical: 10 }} />
                <CustomButton
                    onPress={deleteComment}
                    text="Delete Comment"
                    style={{ backgroundColor: Colors[color].danger, width: '35%', paddingVertical: 10 }}
                />
            </View>
        </View>
    );
};

const HideModal = ({ comment, closeModal, hideComment, unhide }: { comment: any; closeModal: () => void; hideComment: () => void; unhide: () => void }) => {
    const { color } = useTheme();
    const [load, setLoad] = useState(false)
    const hide = async () => {
        await hideComment();
        closeModal();
    };

    const unhideComment = async () => {
        setLoad(true)
        await unhide();
        setLoad(false)
        closeModal();
    };

    return (
        <View style={{ gap: 30, padding: 20 }}>

            <ActionHeader title={comment.hidden ? "Unhide Comment" : "Hide Comment"} load={load} />

            <View style={{ gap: 10, alignItems: 'center' }}>
                <CustomText style={{ fontSize: 20 }}>{comment.text}</CustomText>
                <CustomText style={{ fontWeight: '500' }}>by: {comment.from.username}</CustomText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <CustomButton onPress={closeModal} text="Close" style={{ width: '35%', paddingVertical: 10 }} />
                <CustomButton
                    onPress={comment.hidden ? unhideComment : hide}
                    text={comment.hidden ? "Unhide Comment" : "Hide Comment"}
                    style={{ backgroundColor: Colors[color].danger, width: '35%', paddingVertical: 10 }}
                />
            </View>
        </View>
    );
};

export default function MediaCommentActions({
    comment,
    hideComment,
    unhide,
    deleteAction, reload
}: { comment: any; hideComment: () => void; unhide: () => void; deleteAction: () => void; reload: () => void }) {
    const { color } = useTheme();
    const { showModal, hideModal } = useModal();

    const handleShowDeleteModal = () => {
        showModal(
            <DeleteModal comment={comment} closeModal={() => hideModal()} deleteAction={deleteAction} />
        );
    };
    const handleShowReplyModal = () => {
        showModal(
            <ReplyModal comment={comment} closeModal={() => hideModal()} reload={() => reload()} />
        );
    };


    const handleShowHideModal = () => {
        showModal(
            <HideModal
                comment={comment}
                hideComment={() => hideComment()}
                closeModal={() => hideModal()}
                unhide={unhide}
            />
        );
    };

    return (
        <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={handleShowReplyModal}>
                <MaterialCommunityIcons name="reply-all-outline" size={20} color={Colors[color].tint} />
            </Pressable>
            {comment.hidden ? (
                <Pressable onPress={handleShowHideModal}>
                    <MaterialCommunityIcons name="eye-plus-outline" size={24} color={Colors[color].tabIconDefault} />
                </Pressable>
            ) : (
                <Pressable onPress={handleShowHideModal}>
                    <MaterialCommunityIcons name="eye-remove-outline" size={20} color={Colors[color].tabIconDefault} />
                </Pressable>
            )}




            <Pressable onPress={handleShowDeleteModal}>
                <MaterialCommunityIcons name="delete-empty-outline" size={20} color={Colors[color].danger} />
            </Pressable>
        </View>
    );
}
