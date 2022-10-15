import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUser,
  toggleStatus,
  usersSelector,
} from "../../store/reducers/usersSlice";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

const Wraper = styled.div`
  background-color: #f3f3f9;
  height: 85vh;
  overflow: auto;
  width: 100%;
`;
const TableWraper = styled.div`
  /* width: 90%; */
  margin: 25px 8px;
  box-shadow: 0px 0px 6px #b2b2b2;
  background-color: white;
  border-radius: 5px;
  padding: 4px 14px;
  color: #3c4858;
`;
const IconWraper = styled.div`
  display: inline-block;
  margin: 0 4px;
  color: ${(props) => (props.color ? props.color : "inherit")};
  cursor: pointer;
`;
const Customer = () => {
  // redux
  const dispatch = useDispatch();
  const allUser = useSelector(usersSelector);
  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  // handle toggle
  const handleToggle = (id) => {
    dispatch(toggleStatus(id));
  };
  return (
    <Wraper>
      <TableWraper>
        <h3>Customer List</h3>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>BirtDay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((user) => {
              if (user.username !== "") {
                return (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>
                      {" "}
                      <Avatar
                        alt="Remy Sharp"
                        sx={{ width: 30, height: 30 }}
                        src="https://mui.com/static/images/avatar/1.jpg"
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.fName + " " + user.lName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthday}</td>
                    <td>
                      {" "}
                      <Button
                        // style={{ fontSize: "8px" }}
                        onClick={() => handleToggle(user.user_id)}
                      >
                        {user.isBlocked === 1 ? "Blocked" : "Active"}
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </TableWraper>
    </Wraper>
  );
};

export default Customer;
