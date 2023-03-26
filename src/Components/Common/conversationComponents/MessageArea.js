import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import "./conversation.css";
import SendIcon from '@mui/icons-material/Send';
const mock = [
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1645,
    message: "hello",
    senderId: 16,
  },
  {
    id: 21211,
    message: "hello",
    senderId: 21,
  },
  {
    id: 211,
    message: "hello",
    senderId: 21,
  },
  {
    id: 1212,
    message: "hello",
    senderId: 21,
  },
  {
    id: 211,
    message: "hello",
    senderId: 21,
  },
  {
    id: 11,
    message: "hello",
    senderId: 21,
  },
  {
    id: 211,
    message: "hello",
    senderId: 21,
  },
  {
    id: 121,
    message: "hello",
    senderId: 21,
  },
  {
    id: 21,
    message: "hello",
    senderId: 21,
  },
  {
    id: 12,
    message: "hello",
    senderId: 21,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1,
    message: "hello",
    senderId: 16,
  },
  {
    id: 1545,
    message: "hello",
    senderId: 16,
  },
  {
    id: 43451,
    message: "hello",
    senderId: 16,
  },
  {
    id: 2231,
    message: "hello",
    senderId: 16,
  },
];
function MessageArea({ allConversations, selectedMessage, type,sendMessage }) {
  const [useData, dispatch] = useContext(UserContext);
  const [textmessage, setTextMessage] = useState("");
  return (
    <div className="message-area-container">
      <div>
        <div className="message-area-container-header">
          {type === "employer"
            ? selectedMessage.candidateName
            : selectedMessage.employerName}
        </div>
      </div>
      <div className="message-area-container-messages">
        {allConversations &&
          allConversations.map((item) => {
            return (
              <div
                className="message-area-container-messages-message"
                style={{
                  justifyContent:
                    item.senderId === useData.user.email
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <div
                  style={{
                    borderRadius:
                      item.senderId === useData.user.email
                        ? "16px 0px 16px 16px"
                        : "0px 16px 16px 16px",
                  }}
                >
                  {item.message}
                </div>
              </div>
            );
          })}
      </div>
      <div className="message-area-container-text-area">
        <TextField
        fullWidth
        size="small"
        value={textmessage}
        onChange={(e)=>setTextMessage(e.target.value)}
        />
        <button
        disabled={textmessage.length===0}
        onClick={()=>sendMessage(textmessage,setTextMessage)}
        >Send <span><SendIcon/></span> </button>
      </div>
    </div>
  );
}

export default MessageArea;
