import React, { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase";
import Table from "../../Common/Table";

const columns = [
  {
    Header: "Company",
    datakey: "employerName",
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
    Header: "Intrest Show",
    datakey: "createdAt",
    type: "date",
    style: {
      width: "25%",
    },
  },
  {
    Header: "Status",
    datakey: "status",
    style: {
      width: "25%",
    },
  },
];

const Applications = () => {

  const [applications, setApplications] = React.useState(null);

  const [userData, dispatch] = React.useContext(UserContext);

  const fetchAllApplications = async () => {

    try {
      const q = query(
        collection(db, "applications"),
        where("candidateId", "==", userData.user.email)
      );

      const data = await getDocs(q);
      let apps = [];
      data.forEach((doc) => {
        apps.push(doc.data());
      });

      setApplications(apps);
      console.log(apps);
    } 
    catch (err) {
      console.log(err);
      setApplications([]);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);
  
  return applications && applications.length === 0 ? (
    <div>No applications found</div>
  ) : applications && applications.length > 0 ? (
    <div>
      <Table columns={columns} data={applications} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Applications;
