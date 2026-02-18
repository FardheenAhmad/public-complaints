import { useState, useEffect } from "react";
import axios from "axios";

const API =
  "https://69959f48b081bc23e9c3db2b.mockapi.io/api/v1/complaints";

function ComplaintForm({ onSaved, editing, onCancel }) {
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

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (editing) {
      await axios.put(`${API}/${editing.id}`, {
        ...form,
        age: Number(form.age),
      });
    } else {
      await axios.post(API, {
        ...form,
        age: Number(form.age),
        ownerId: userId,
        avatar:
          form.avatar ||
          `https://i.pravatar.cc/150?u=${form.mobile || Math.random()}`,
      });
    }

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

    onSaved();
  };

  return (
    <>
      <form className="form-card" onSubmit={submit}>
        <h2>{editing ? "Update Complaint" : "Submit Complaint"}</h2>

        <div className="grid">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Age" required />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" required />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" required />
          <input name="problem" value={form.problem} onChange={handleChange} placeholder="Problem" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL" />
        </div>

        <div className="actions">
          <button type="submit">
            {editing ? "Update" : "Submit"}
          </button>
          {editing && (
            <button type="button" className="cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <style>{`
        .form-card {
          background:white;
          padding:25px;
          border-radius:12px;
          box-shadow:0 4px 18px rgba(0,0,0,0.08);
          margin-bottom:30px;
        }

        .form-card h2 {
          margin-bottom:20px;
          color:#2563eb;
        }

        .grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
          gap:12px;
        }

        input, textarea {
          padding:12px;
          border:1px solid #d1d5db;
          border-radius:8px;
          font-size:14px;
        }

        textarea {
          grid-column:span 2;
          min-height:90px;
        }

        .actions {
          margin-top:15px;
          display:flex;
          gap:10px;
        }

        button {
          padding:10px 18px;
          border:none;
          background:#2563eb;
          color:white;
          border-radius:8px;
          cursor:pointer;
          font-weight:600;
        }

        .cancel {
          background:#6b7280;
        }

        @media(max-width:600px){
          textarea { grid-column:span 1; }
        }
      `}</style>
    </>
  );
}

export default ComplaintForm;
