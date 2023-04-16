import React, { useEffect, useState, useContext, useMemo, useCallback, useRef, useReducer } from "react"
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../App'
import Card from 'react-bootstrap/Card';
import PatientChat from "../components/PatientChat";
const ENDPOINT = "http://localhost:8080/ws"


function NewChat() {
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
            } else if (user.roles.includes("SECRETARY")) {
                stompClient.subscribe('/topic/secretary', (data) => {
                    const message = JSON.parse(data.body);
                    updateChat(message)
                })
            }
        })
        return stompClient;
    }, [])

    const userChats = useMemo(() => {
        const groups = {}

        chat.forEach(message => {

            console.log(message.from, user.sub, message.from === user.sub, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
            console.log("eehe",user.sub )
            if (message.from === user.sub) {
                if (!groups[message.to])
                    groups[message.to] = [message]
                else
                    groups[message.to].push(message)
                return
            }

            if (!groups[message.from])
                groups[message.from] = [message]
            else
                groups[message.from].push(message)
        })

        console.log("CHAT CHANGED TO", chat)

        return groups
    }, [chat])

    return (
        <>
        {Object.entries(userChats).map(([userEmail, messages], index) => <UserChat key={index} email={userEmail} socket={stompClient} updateChat={updateChat} messages={messages} />)}
        </>
    )
}

const UserChat = ({ email, messages, updateChat, socket }) => {
    const { user } = useContext(UserContext);
    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const sendMsg = () => {
        const payload = { id: uuidv4(), from: user.sub, to: email, text: message };
        updateChat(payload)
        socket.send(`/topic/${payload.to}/private`, {}, JSON.stringify(payload));
        setMessage('');
    }

    return (
        <form  onSubmit={e => {
            e.preventDefault()
            sendMsg()
        }} className="d-flex justify-content-center">
            <Card className='m-4' border="info" style={{ width: '70rem' }}>
                <Card.Title>Chat with {email}</Card.Title>
                {isOpen ? <Card.Body>
                    {messages.map(message => <div key={message.id}>
                        <Card.Header>From: {message.from}</Card.Header>
                        <Card.Text>{message.text}</Card.Text>
                    </div>)}
                    <br></br>
                    <div className="d-flex justify-content-evenly mb-2">
                    <input className="form-control form-rounded" id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message} style={{ width: '40rem' }}></input>
                    <button  className= "rounded-pill border border-info bg-info" type="submit" style={{ width: '20rem' }}>send message</button>
                    <button className= "rounded-pill border border-info bg-danger" onClick={() => setOpen(false)} style={{ width: '10rem' }}>Close chat</button>
                    </div>
                </Card.Body> : <button onClick={() => setOpen(true)}>Open chat</button>
                }

            </Card>
        </form>
    )

}

export default NewChat