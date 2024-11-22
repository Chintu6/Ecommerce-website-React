import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Account.css";

function Account() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    profileImage: "",
    address: "",
  });
  const [imagePreview, setImagePreview] = useState(null); // To display the image preview

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const emailOrMobile = user?.emailOrMobile;

    if (!emailOrMobile) {
      alert("User not logged in");
      return;
    }

    axios
      .get(`http://localhost:5000/api/user/${emailOrMobile}`)
      .then((response) => {
        setUserDetails(response.data);
        setFormValues({
          name: response.data.name || "",
          mobile: response.data.mobile || "",
          profileImage: response.data.profileImage || "",
          address: response.data.address || "",
        });
        setImagePreview(response.data.profileImage || null); // Set preview of the existing image
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Show image preview
        setFormValues((prevValues) => ({
          ...prevValues,
          profileImage: file, // Store the file itself for uploading
        }));
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleProfileUpdate = () => {
    const emailOrMobile = userDetails?.emailOrMobile;

    // If there is a new image, we need to upload it
    if (formValues.profileImage instanceof File) {
      const formData = new FormData();
      formData.append("profileImage", formValues.profileImage);
      formData.append("name", formValues.name);
      formData.append("mobile", formValues.mobile);
      formData.append("address", formValues.address);

      axios
        .put(`http://localhost:5000/api/user/${emailOrMobile}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Update userDetails with the newly updated form values
          setUserDetails({
            ...userDetails,
            name: formValues.name,
            mobile: formValues.mobile,
            profileImage: response.data.profileImage, // Assuming the server returns the updated image URL
            address: formValues.address,
          });

          setEditMode(false); // Switch to view mode after successful update
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      // If no new image, update profile without image upload
      axios
        .put(`http://localhost:5000/api/user/${emailOrMobile}`, formValues)
        .then((response) => {
          // Update userDetails with the newly updated form values
          setUserDetails({
            ...userDetails,
            name: formValues.name,
            mobile: formValues.mobile,
            address: formValues.address,
          });

          setEditMode(false);
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  const nameFromEmail = userDetails?.emailOrMobile?.split("@")[0];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userDetails) {
    return <p>No user details found.</p>;
  }

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <div className="profile-card">
        <div className="profile-details">
          <img
            src={
              imagePreview ||
              "https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=195&h=195&c=7&r=0&o=5&pid=1.7"
            }
            alt="Profile"
            className="profile-image"
          />
          <div>
            {editMode ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                  className="form-control"
                />
                <input
                  type="text"
                  name="mobile"
                  value={formValues.mobile}
                  onChange={handleProfileChange}
                  placeholder="Enter your mobile"
                  className="form-control"
                />
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                  className="form-control"
                />
                <input
                  type="text"
                  name="address"
                  value={formValues.address}
                  onChange={handleProfileChange}
                  placeholder="Enter your address"
                  className="form-control"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Name:</strong> {nameFromEmail}
                </p>
                <p>
                  <strong>Mobile:</strong> {userDetails.mobile}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.emailOrMobile}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {userDetails.address || "No address provided"}
                </p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
