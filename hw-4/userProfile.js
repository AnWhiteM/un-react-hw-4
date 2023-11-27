import React, { useState, useEffect, useRef } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    const { signal } = abortControllerRef.current;

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
          { signal }
        );
        const userData = await response.json();

        if (isMounted.current) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.error("Error fetching user data:", error);
        }

        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current.abort();
      isMounted.current = false;
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
