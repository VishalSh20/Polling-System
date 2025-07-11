import {io} from "socket.io-client";

const socket = io("https://poll-backend.algobuzz.online");

export default socket;
