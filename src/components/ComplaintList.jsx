import { useEffect, useState } from "react";
import axios from "axios";

const API =
  "https://69959f48b081bc23e9c3db2b.mockapi.io/api/v1/complaints";

function ComplaintList({ refresh }) {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId") || "user_1";

  const load = async () => {
    const res = await axios.get(`${API}?ownerId=${userId}`);
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, [refresh]);

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  return (
    <>
      <div className="card-grid">
        {data.map((c) => (
          <div key={c.id} className="card">
            <div className="top">
              <img src={c.avatar} alt="" />
              <div>
                <h4>{c.name}</h4>
                <p>{c.mobile}</p>
              </div>
            </div>

            <h5>{c.problem}</h5>
            <p className="desc">{c.description}</p>

            <div className="meta">
              {c.location} • {c.pincode}
            </div>

            <button className="delete" onClick={() => remove(c.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 15px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .top {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }

        .top img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        h5 {
          margin: 5px 0;
          color: #2563eb;
        }

        .desc {
          font-size: 14px;
          color: #555;
        }

        .meta {
          font-size: 12px;
          color: #777;
          margin-top: 8px;
        }

        .delete {
          margin-top: 10px;
          background: none;
          border: none;
          color: #dc2626;
          cursor: pointer;
          font-size: 13px;
        }

        .delete:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export default ComplaintList;
