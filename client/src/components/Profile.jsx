import React from "react";
import { Container, Stack, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const Profile = ({ user, isAuthenticated , setIsAuthenticated }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  console.log(user.avatarUrl)
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const deleteUser = async () => {
    try {
      
      await axios.delete(
        "http://localhost:4000/api/user/profile",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false)
      setIsDeleted(true);
      return <Navigate to={"/login"} />;

      // Handle any other necessary actions after successful deletion
    } catch (error) {
      console.error("Error deleting user profile:", error);
      // Handle error
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      deleteUser();
    }
  };

  if (isDeleted) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Container className="my-4">
        <h1 className="mb-3">PROFILE</h1>
        {user && (
          <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={1}>
            <Stack direction="horizontal" gap={3}>
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "100%",
                  marginBottom: "100px",
                }}
                src={user.avatarUrl}
                alt="avatar"
              />
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">PHONE:</p>
              <p>{user.phone}</p>
            </Stack>
            <Button variant="danger" onClick={handleDeleteProfile}>
              Delete Profile
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Profile;
