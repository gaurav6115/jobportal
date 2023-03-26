import React from "react";
import "./conversation.css";

import moment from "moment";

const Lastmessage = ({ lastMessages, type, onClick, selectedMessage }) => {
  return (
    <div className="last-message-container">
      {lastMessages && lastMessages.length === 0 ? (
        <div>No messages</div>
      ) : lastMessages && lastMessages.length > 0 ? (
        <div>
          {lastMessages.map((lastMessage) => {
            return (
              <div
                onClick={() => onClick(lastMessage)}
                className={`last-message ${
                  selectedMessage &&
                  selectedMessage.last_message_id ===
                    lastMessage.last_message_id &&
                  "last-message-text-selected"
                }`}
              >
                <div>
                  <h2>
                    {type === "employer"
                      ? lastMessage.candidateName
                      : lastMessage.employerName}
                  </h2>
                  <h3>
                    {moment(lastMessage.createdA).startOf("hour").fromNow()}
                  </h3>
                </div>
                <div className="last-message-text">
                  {lastMessage.last_message}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Lastmessage;
