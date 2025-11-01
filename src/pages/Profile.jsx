import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const { register, handleSubmit } = useForm();

    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
    });
    const getUser = async () => {
        try {
            // const token = localStorage.getItem("ecomweb-token");
            const user = JSON.parse(localStorage.getItem("user"))
            console.log(user._id)

            const res = await axios.get(`https://ecomweb-backend-u6x8.onrender.com/users/user/${user._id}`);
            console.log(res.data);
            setUser(res.data.data);
            setForm({
                firstname: res.data.data.firstname || "",
                lastname: res.data.data.lastname || "",
                email: res.data.data.email || "",
                phone: res.data.data.phone || "",
            });
        } catch (error) {
            toast.error("Failed to load user data");
            console.log(error);
        }
    };


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const formData = new FormData();
            formData.append("image", file);

            const res = await axios.post(
                `https://ecomweb-backend-u6x8.onrender.com/users/profile/${user._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(res.data);
            // console.log(res.data.updatedUser);
            localStorage.setItem("user", JSON.stringify(res.data.data));
            toast.success("Profile image updated!");
            getUser();
        } catch (error) {
            toast.error("Image upload failed!");
            console.log(error);
        }
    };


    const submitHandler = async (data) => {
        try {
            const token = localStorage.getItem("ecomweb-token");
            const res = await axios.put(`https://ecomweb-backend-u6x8.onrender.com/users/user/${user._id}`, data)
            console.log(res.data);
            toast.success("Profile updated successfully!");
            setEditing(false);
        } catch (error) {
            toast.error("Error updating profile");
            console.log(error);
        }
    };

    const deleteuser = async () => {
        try {

            const res = await axios.delete(`https://ecomweb-backend-u6x8.onrender.com/users/user/${user._id}`)
            toast.success('🎉 User deleted successfully..')
            localStorage.removeItem("ecomweb-token")
            localStorage.removeItem("user")
            console.log(res.data)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getUser();
    }, []);

    if (!user) return <p className="text-center my-5">Loading profile...</p>;

    return (
        <div className="profile-page">
            <div className="section-header" data-aos="fade-up">
                <h2>My Profile</h2>
                <p>Manage your personal information and account details</p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className="php-email-form settings-form">

                <div className="profile-content" data-aos="fade-up" data-aos-delay={100}>
                    <div className="profile-card p-4 shadow-sm rounded-3">
                        <div className="profile-header d-flex align-items-center gap-3 mb-4">
                            <div style={{ position: "relative" }}>
                                <img
                                    src={
                                        user.img
                                            ? `https://ecomweb-backend-u6x8.onrender.com${user.img}`
                                            : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                    }
                                    alt="Profile Avatar"
                                    width="80"
                                    height="80"
                                    className="rounded-circle border"
                                    style={{ cursor: "pointer", objectFit: "cover" }}
                                    onClick={() =>
                                        document.getElementById("profile-image-input").click()
                                    }
                                />
                                <input
                                    type="file"
                                    id="profile-image-input"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div>
                                <h4>
                                    {user.firstname} {user.lastname}
                                </h4>
                                <p className="text-muted">{user.email}</p>
                            </div>
                        </div>

                        <div className="profile-info">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("firstname")}
                                        value={form.firstname}
                                        onChange={(e) =>
                                            setForm({ ...form, firstname: e.target.value })
                                        }
                                        disabled={!editing}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("lastname")}
                                        value={form.lastname}
                                        onChange={(e) =>
                                            setForm({ ...form, lastname: e.target.value })
                                        }
                                        disabled={!editing}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={form.email}
                                        {...register("email")}
                                        disabled // email typically not editable
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        value={form.phone}
                                        {...register("phone")}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        disabled={!editing}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Member Since</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={new Date(user.createdAt).toLocaleDateString()}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="mt-4 d-flex gap-2">
                                {!editing ? (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={(e) => {
                                            e.preventDefault(); // ✅ stop default form submit
                                            e.stopPropagation(); // ✅ stop bubbling
                                            setEditing(true);
                                        }}
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-success" type="submit">
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={(e) => {
                                                e.preventDefault(); // ✅ prevent accidental form submit
                                                e.stopPropagation();
                                                setEditing(false);
                                                // Optional: reset form to original user data
                                                setForm({
                                                    firstname: user.firstname,
                                                    lastname: user.lastname,
                                                    email: user.email,
                                                    phone: user.phone,
                                                });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </form>

            <div className="settings-content">

                <div
                    className="settings-section"
                    data-aos="fade-up"
                    data-aos-delay={100}
                >
                    <h3>Email Preferences</h3>
                    <div className="preferences-list">
                        <div className="preference-item">
                            <div className="preference-info">
                                <h4>Order Updates</h4>
                                <p>Receive notifications about your order status</p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="orderUpdates"
                                    defaultChecked=""
                                />
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-info">
                                <h4>Promotions</h4>
                                <p>Receive emails about new promotions and deals</p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="promotions"
                                />
                            </div>
                        </div>
                        <div className="preference-item">
                            <div className="preference-info">
                                <h4>Newsletter</h4>
                                <p>Subscribe to our weekly newsletter</p>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="newsletter"
                                    defaultChecked=""
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="settings-section danger-zone"
                    data-aos="fade-up"
                    data-aos-delay={300}
                >
                    <h3>Delete Account</h3>
                    <div className="danger-zone-content">
                        <p>
                            Once you delete your account, there is no going back.
                            Please be certain.
                        </p>
                        <button type="button" onClick={() => deleteuser()} className="btn-danger">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
