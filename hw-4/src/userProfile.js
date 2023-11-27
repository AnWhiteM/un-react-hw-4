import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
          { signal }
        );
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error("Error fetching user data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <h2>User Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
