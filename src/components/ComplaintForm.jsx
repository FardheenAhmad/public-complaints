import { useState } from "react";
import axios from "axios";

const API =
  "https://69959f48b081bc23e9c3db2b.mockapi.io/api/v1/complaints";

function ComplaintForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    location: "",
    pincode: "",
    problem: "",
    description: "",
    avatar: "",
  });

  const userId = localStorage.getItem("userId") || "user_1";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(API, {
      ...form,
      age: Number(form.age),
      ownerId: userId,
      avatar:
        form.avatar ||
        `https://i.pravatar.cc/150?u=${form.mobile || Math.random()}`,
    });

    setForm({
      name: "",
      age: "",
      mobile: "",
      location: "",
      pincode: "",
      problem: "",
      description: "",
      avatar: "",
    });

    onAdded();
  };

  return (
    <>
      <form className="form-card" onSubmit={submit}>
        <h2>Submit Complaint</h2>

        <div className="grid">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" required />
          <input name="problem" value={form.problem} onChange={handleChange} placeholder="Problem" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL (optional)" />
        </div>

        <button type="submit">Submit</button>
      </form>

      <style>{`
        .form-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

        .form-card h2 {
          margin-bottom: 15px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        input, textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        textarea {
          grid-column: span 2;
          min-height: 80px;
        }

        button {
          margin-top: 15px;
          padding: 10px;
          border: none;
          background: #2563eb;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        button:hover {
          background: #1d4ed8;
        }

        @media (max-width: 600px) {
          textarea {
            grid-column: span 1;
          }
        }
      `}</style>
    </>
  );
}

export default ComplaintForm;
