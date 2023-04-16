import React, { useEffect, useState, useContext, useMemo, useCallback, useRef, useReducer } from "react"
import Card from 'react-bootstrap/Card';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../App'
const ENDPOINT = "http://localhost:8080/ws"


function PatientChat() {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [destinationUsername, setDestinationUsername] = useState('');

    const [chat, updateChat] = useReducer((state, message) => {
        state.filter(x => x.to === "").forEach(x => x.to = message.from)
        return [...state, message]
    }, [])


    const stompClient = useMemo(() => {
        const socket = SockJS(ENDPOINT);
        // Set stomp
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log("Stomp client connected.");
            if (user.roles.includes("PATIENT")) {
                stompClient.subscribe(`/topic/${user.sub}/private`, (data) => {
                    const message = JSON.parse(data.body);
                    updateChat(message)
                })
            }
        })
        return stompClient;
    }, [])

    const sendMsg = () => {
        const payload = { id: uuidv4(), from: user.sub, to: destinationUsername, text: message };
        console.log("eehe", user.sub)

        updateChat(payload)

        stompClient.send('/topic/secretary', {}, JSON.stringify(payload));
        setMessage('');
    }

    const userChats = useMemo(() => {
        const groups = {}

        chat.forEach(message => {
            console.log(message.from, user.sub, message.from === user.sub, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
            console.log("eehe", message.to)
            if (message.from === user.sub) {
                if (!groups[message.to])
                    groups[message.to] = [message]
                else
                    groups[message.to].push(message)
                return
            }

            if (!groups[message.from]) {
                groups[message.from] = [message]
            }
            else
                groups[message.from].push(message)
        }
        )

        console.log("CHAT CHANGED TO", chat)

        return groups
    }, [chat])

    const chats = Object.entries(userChats).map(([userEmail, messages], index) => <Panel key={index} email={userEmail} socket={stompClient} updateChat={updateChat} messages={messages} />);
    function WhichChat(props) {
        console.log('chats: ', userChats)
        let chatp = props.chat;
        if (chatp !== undefined && chatp.length !== 0) {
            return chats;
        }
        else return (<InitialPanel socket={stompClient} updateChat={updateChat} chat={chat} ></InitialPanel>)
    }
    return (
        <>
            <div>
                {console.log(chat, "chatche")}
                {console.log(chat.text, "text")}
                {console.log(chat.from, "from")}
                {console.log(chat.length, "length")}
                <WhichChat chat={chat} />
            </div>
        </>
    )
}

const Panel = ({ email, messages, updateChat, socket }) => {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("")


    const sendMsg = () => {
        const payload = { 'id': uuidv4(), 'from': user.sub, 'to': email, 'text': message };
        updateChat(payload)
        socket.send('/topic/secretary', {}, JSON.stringify(payload));
    }
    if (email === undefined || email === 'undefined') return;
    return (
        <form onSubmit={e => {
            e.preventDefault()
            sendMsg()
            setMessage('')
        }} className="d-flex justify-content-center">
            <Card className='m-4' border="info" style={{ width: '70rem' }}>
                <Card.Title>Chat with {email}</Card.Title>
                <Card.Body>
                    {messages.map(message => <div key={message.id}>
                        <Card.Header>From: {message.from}</Card.Header>
                        <Card.Text>{message.text}</Card.Text>
                    </div>)}
                    <input id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message}></input>
                    <button onClick={() => sendMsg()}>SEND</button>
                </Card.Body>

            </Card>
        </form>
    )

}


const InitialPanel = ({ updateChat, socket, chat }) => {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState("")

    const sendMsg = () => {
        const payload = { 'id': uuidv4(), 'from': user.sub, 'text': message, 'to': 'secretary@gmail.com' };
        updateChat(payload)
        socket.send('/topic/secretary', {}, JSON.stringify(payload));
    }
    return (
        <div className="d-flex justify-content-center">
            <Card className='m-4' border="info" style={{ width: '70rem' }}>
                <Card.Title className='p-2' > Write your question here</Card.Title>
                <div className="d-flex justify-content-evenly mb-2">
                    <input className="form-control form-rounded" id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message} style={{ width: '40rem' }}></input>
                    <button className="rounded-pill border border-info bg-info" onClick={() => sendMsg()} style={{ width: '20rem' }}>Send message</button>
                </div>
            </Card>
        </div>
    )

}
export default PatientChat