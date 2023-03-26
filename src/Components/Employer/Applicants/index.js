import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase";
import Table from "../../Common/Table";
import toastMessage from "../../../Util/toastMsg";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const columns = [
  {
    Header: "Candidate Name",
    datakey: "candidateName",
    style: {
      width: "25%",
    },
  },
  {
    Header: "Job Title",
    datakey: "jobTitle",
    style: {
      width: "25%",
    },
  },
  {
    Header: "Resume",
    datakey: "resume",
    type: "doc",
    style: {
      width: "25%",
    },
  },
  {
    Header: "Action",
    datakey: "action",
    type: "action",
    style: {
      width: "25%",
    },
  },
];
const Applicants = () => {
  const [applicants, setApplicants] = useState(null);
  const [userData, dispatch] = useContext(UserContext);

  const fetchAllApplicants = async () => {
    // fetch all applicants from firebase
    const q = query(
      collection(db, "applications"),
      where("employerId", "==", userData.user.email)
    );
    onSnapshot(q, (querySnapshot) => {
      let apps = [];
      querySnapshot.forEach((doc) => {
        apps.push(doc.data());
      });
      setApplicants(apps);
      console.log(apps);
    });
  };

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  const handleAction = async (type, data) => {
    console.log(type, data);
    if (type === "accept") {
      try {
        const last_message_id = uuidv4();
        const conversationKey = uuidv4();
        const conversation_id = uuidv4();
        //1. add a document in last_message collection
        //2 generate a conversation key
        //3. add a document in conversations collection with a specific conversationKey
        //4. update the application status to accepted
        await setDoc(doc(db, "last_messages", last_message_id), {
          last_message_id,
          last_message: `hey ${data.candidateName}! we have accepted your application for the job ${data.jobTitle}`,
          createdAt: new Date().toISOString(),
          conversationKey,
          employerId: userData.user.email,
          candidateId: data.candidateId,
          candidateName: data.candidateName,
          employerName: data.employerName,
        });
        await setDoc(doc(db, "conversations", conversation_id), {
          conversation_id,
          conversationKey,
          senderId: userData.user.email,
          message: `hey ${data.candidateName}! we have accepted your application for the job ${data.jobTitle}`,
          createdAt: new Date().toISOString(),
        });
        await setDoc(
          doc(db, "applications", data.applicationId),
          {
            status: "accepted",
          },
          { merge: true }
        );
        toastMessage("Application accepted", "success");
      } catch (err) {
        console.log(err);
        toastMessage("Something went wrong", "danger");
      }
      // accept the application
    } else if (type === "reject") {
      // delete the application with application id
      try {
        const doc_ref = doc(db, "applications", data.applicationId);
        await deleteDoc(doc_ref);
        toastMessage("Application rejected", "success");
      } catch (err) {
        console.log(err);
        toastMessage("Something went wrong", "danger");
      }
    }
  };

  return applicants && applicants.length === 0 ? (
    <div>No applicants yet</div>
  ) : applicants && applicants.length > 0 ? (
    <Table handleAction={handleAction} columns={columns} data={applicants} />
  ) : (
    <div>Loading...</div>
  );
};

export default Applicants;
