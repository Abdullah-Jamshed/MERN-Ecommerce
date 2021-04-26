import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Container, Spinner, Table } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";
import ModalComponent from "../components/ModalComponent";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../store/actions/userActions";

const UserListScreen = ({ history }) => {
  //STATE
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE HOOK
  const { isLoading, errorMessage, usersList, user, token, deleteSuccess } = useSelector((state) => state.userReducer);

  // HANDLER FUNCTIONS

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const modalHandler = (id) => {
    setId(id);
    setModalShow(true);
  };

  useEffect(() => {
    if (token) {
      if (!isLoading) {
        if (user && user.isAdmin) {
          dispatch(getUsers());
        } else {
          history.push("/login");
        }
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, user, history, deleteSuccess]);

  return (
    <Container className='py-4'>
      <ModalComponent id={id} handlerFunction={deleteUserHandler} show={modalShow} onHide={() => setModalShow(false)}>
        Are sure you want to delete user ?
      </ModalComponent>

      {isLoading ? (
        <div className='text-center'>
          <Spinner animation='border' />
        </div>
      ) : errorMessage ? (
        <Message variant='danger'>{errorMessage}</Message>
      ) : (
        <>
          <h1>Users</h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td className='text-center'>
                    {user.isAdmin ? <i className='fa fa-check' style={{ color: "green" }} /> : <i className='fa fa-times' style={{ color: "red" }} />}
                  </td>
                  <td>
                    <Button as={Link} to={`/user/${user._id}`}>
                      <i className='fa fa-edit' />
                    </Button>
                    {/* <Button onClick={() => deleteUserHandler(user._id)} to={`/user/${user._id}`}> */}
                    <Button onClick={() => modalHandler(user._id)} to={`/user/${user._id}`}>
                      <i className='fa fa-trash ' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default UserListScreen;
