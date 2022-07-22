import React from "react";

export interface Data {
  Firstname: string;
  Lastname: string;
  Username: string;
  Gender: string;
  Email: string;
  Department: string;
  Designation: string;
  Salary: string;
}

interface IStateType {
  arrUsers: Data[];
}

const sampleAppContext: IStateType = {
  arrUsers: [],
};

const GlobalContext = React.createContext<IStateType>(sampleAppContext);

export default GlobalContext;
