import React from 'react';
import apiService from '@/apiService';
import ChatForm from '@/components/ChatForm';
import ChatList from '@/components/ChatList';

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        };
    }

    componentDidMount() {
        this.getChatList();
    }

    handleChatCreate(params) {
        apiService.chat.create(params).then(() => this.getChatList());
    }

    getChatList() {
        apiService.chat
            .getMyChats(this.props.user.id)
            .then(response => response.data)
            .then(chats => this.setState({ chats }));
    }

    goHandler(id) {
        this.props.history.push(`/chat/${id}`);
    }

    joinHandler(id) {
        if (!confirm('Вступить в данный чат и початиться?')) return;

        apiService.chat.join(id).then(() => this.getChatList());
    }

    deleteHandler(id) {
        if (!confirm('Удалить данный чат и больше не чатиться?')) return;

        apiService.chat.delete(id).then(() => this.getChatList());
    }

    render() {
        const { user } = this.props;
        return (
            <>
                <audio controls src="http://localhost:3000/public/Mp3.1/welcome.mp3"></audio>
                <div className="Greentw">Ваш никнейм: {user.nickname}</div>
                <div className="SeaGreentw">Дата становления чатером: {new Date(user.createdAt).toLocaleString()}</div>

                <h3>Актуальные места для общения</h3>
                <ChatList
                    userId={user.id}
                    list={this.state.chats}
                    goHandler={id => this.goHandler(id)}
                    joinHandler={id => this.joinHandler(id)}
                    deleteHandler={id => this.deleteHandler(id)}
                />
                <ChatForm handleSubmit={data => this.handleChatCreate(data)} />
            </>
        );
    }
}
