import React from "react";

export interface Data {
  Person: string;
  Firstname: string;
  Lastname: string;
  Username: string;
  Gender: string;
  Email: string;
  Password: string;
  RePassword: string;
  Department: string;
  Designation: string;
  Salary: string;
}

export interface IStateType {
  arrUsers: Data[];
  loginUserIndex: number;
  isAuth: boolean;
  setState?: any;
}

export const defaultContextValue: IStateType = {
  arrUsers: [],
  loginUserIndex: -1,
  isAuth: false,
};

const GlobalContext = React.createContext<IStateType>(defaultContextValue);

export default GlobalContext;
