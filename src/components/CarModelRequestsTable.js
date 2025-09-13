import React, { useEffect, useState } from "react";

const CarModelRequestsTable = () => {
  const databaseApiUrl = process.env.REACT_APP_DATABASE_API_URL;
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // store file sizes per request
  const [fileInfo, setFileInfo] = useState({});

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {

    fetch(`${databaseApiUrl}get_requests.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status_id === "1") {
          setRequests(data.data);
          setFiltered(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, [databaseApiUrl]);

  // Apply filters
  useEffect(() => {
    let data = [...requests];

    if (search) {
      data = data.filter(
        (r) =>
          r.customer_name.toLowerCase().includes(search.toLowerCase()) ||
          r.customer_email.toLowerCase().includes(search.toLowerCase()) ||
          r.model_name.toLowerCase().includes(search.toLowerCase()) ||
          r.model_description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) data = data.filter((r) => r.status === status);
    if (email) data = data.filter((r) => r.customer_email.includes(email));
    if (name) data = data.filter((r) => r.customer_name.includes(name));

    if (dateFrom) data = data.filter((r) => new Date(r.created_at) >= new Date(dateFrom));
    if (dateTo) data = data.filter((r) => new Date(r.created_at) <= new Date(dateTo));

    setFiltered(data);
  }, [search, status, email, name, dateFrom, dateTo, requests]);

  // Change status
  const handleStatusChange = async (id, newStatus) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", newStatus);

    try {
      const res = await fetch(`${databaseApiUrl}update_request_status.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status_id === "1") {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  // Change notes
  const handleNotesChange = async (id, newNotes) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("notes", newNotes);

    try {
      const res = await fetch(`${databaseApiUrl}update_request_notes.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status_id === "1") {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, notes: newNotes } : r))
        );
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update notes");
    }
  };

  // Delete request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    const formData = new FormData();
    formData.append("id", id);

    try {
      const res = await fetch(`${databaseApiUrl}delete_request.php`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status_id === "1") {
        setRequests((prev) => prev.filter((r) => r.id !== id));
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete request");
    }
  };

  // helper: format size in KB/MB
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // fetch file sizes via HEAD request
  const fetchFileSizes = async (id, files) => {
    let totalSize = 0;

    for (let file of files) {
      try {
        const res = await fetch(`${databaseApiUrl}${file}`, { method: "HEAD" });
        const size = res.headers.get("Content-Length");
        if (size) totalSize += parseInt(size, 10);
      } catch (err) {
        console.error("Failed to fetch file size", err);
      }
    }

    setFileInfo((prev) => ({
      ...prev,
      [id]: { count: files.length, size: totalSize },
    }));
  };

  // Download all files
  const handleDownloadAll = (files) => {
    try {
      const fileList = JSON.parse(files);
      fileList.forEach((file) => {
        window.open(`${databaseApiUrl}${file}`, "_blank");
      });
    } catch (err) {
      console.error("Invalid file JSON", err);
    }
  };


  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-danger">Custom Car Model Requests</h2>

      {/* Filters */}
      {/* ... same as before ... */}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Model Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Details</th>
              <th>Files</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((req) => {
                let fileLinks = [];
                if (req.reference_files) {
                  try {
                    fileLinks = JSON.parse(req.reference_files);
                  } catch (err) {
                    console.error("Invalid JSON for files", err);
                  }
                }
                
                const info = fileInfo[req.id];

                return (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.customer_name}</td>
                    <td>{req.customer_email}</td>
                    <td>{req.model_name}</td>
                    <td>{req.model_category}</td>
                    <td>{req.model_description}</td>
                    <td>{req.additional_details}</td>
                    <td>
                      {fileLinks.length > 0 ? (
                        <>
                          <button
                            className="btn btn-sm btn-success mb-1"
                            onClick={() => handleDownloadAll(req.reference_files)}
                          >
                            View
                          </button>
                          <br />
                          {info ? (
                            <small>
                              {info.count} files ({formatSize(info.size)})
                            </small>
                          ) : (
                            <small>Loading...</small>
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        rows="1"
                        defaultValue={req.notes}
                        onBlur={(e) => handleNotesChange(req.id, e.target.value)}
                        placeholder="Add notes..."
                      />
                    </td>
                    <td>{new Date(req.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(req.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="12" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarModelRequestsTable;
