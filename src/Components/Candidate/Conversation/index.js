import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase";
import Lastmessage from "../../Common/conversationComponents/Lastmessage";
import MessageArea from "../../Common/conversationComponents/MessageArea";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const CandidateConversation = () => {
  const [userData, dispatch] = useContext(UserContext);
  const [lastMessages, setLastMessages] = useState(null);
  const [mobileViewLastMessage, setMobileViewLastMessage] = useState(true);
  const [allConversations, setAllConversations] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchLastMessages = async () => {
    const q = query(
      collection(db, "last_messages"),
      where("candidateId", "==", userData.user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      let lastMessages = [];
      querySnapshot.forEach((doc) => {
        lastMessages.push(doc.data());
      });
      console.log(lastMessages);
      setLastMessages(lastMessages);
    });
  };

  useEffect(() => {
    fetchLastMessages();
  }, []);

  useEffect(() => {
    if (selectedMessage) {
      fetchAllConversations();
    }
  }, [selectedMessage]);

  const fetchAllConversations = async () => {
    // call firebase conversation collection where conversationKey is equal to selectedMessage.conversationKey
    const q = query(
      collection(db, "conversations"),
      where("conversationKey", "==", selectedMessage.conversationKey)
    );
    onSnapshot(q, (querySnapshot) => {
      let conversations = [];
      querySnapshot.forEach((doc) => {
        conversations.push(doc.data());
      });
      console.log(conversations);
      conversations = conversations.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setAllConversations(conversations);
    });
  };

  const handleSelectMessage = (data) => {
    setMobileViewLastMessage(false);
    setSelectedMessage(data);
  };
  const sendMessage = async (message, setMessage) => {
    // add a doc to conversation collection with conversationKey and message
    // update last_messages collection with last message and last message time
    // set setMessage to ''
    const conversationId = uuidv4();
    await setDoc(doc(db, "conversations", conversationId), {
      conversationKey: selectedMessage.conversationKey,
      message: message,
      senderId: userData.user.email,
      createdAt: new Date().toISOString(),
    });
    await setDoc(
      doc(db, "last_messages", selectedMessage.last_message_id),
      {
        last_message: message,
      },
      { merge: true }
    );
    setMessage("");
  };

  return (
    <Grid container>
      <Grid
        sx={{
          display: {
            xs: mobileViewLastMessage ? "block" : "none",
            md: "block",
          },
        }}
        item
        xs={12}
        md={3}
      >
        <Lastmessage
          lastMessages={lastMessages}
          type={"candidate"}
          onClick={(data) => handleSelectMessage(data)}
          selectedMessage={selectedMessage}
        />
      </Grid>
      <Grid
        sx={{
          display: {
            xs: !mobileViewLastMessage ? "block" : "none",
            md: "block",
          },
        }}
        item
        xs={12}
        md={9}
      >
        {selectedMessage ? (
          <MessageArea
            allConversations={allConversations}
            selectedMessage={selectedMessage}
            type={"candidate"}
            sendMessage={sendMessage}
          />
        ) : (
          <div>select a message</div>
        )}
      </Grid>
    </Grid>
  );
};

export default CandidateConversation;
