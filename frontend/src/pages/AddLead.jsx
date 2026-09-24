import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddLead() {

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        course: "",
        secondary_course: "",
        source: "Website",
        status: "New",
        priority: "Medium",
        counsellor: null
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
        await API.post("leads/", form);

        alert("Lead added successfully.");

        setForm({
            name: "",
            phone: "",
            email: "",
            course: "",
            secondary_course: "",
            source: "Website",
            status: "New",
            priority: "Medium",
            counsellor: null,
            lost_reason: "",
        });

    } catch (error) {
        console.error(error);

        const data = error.response?.data;

        if (data) {
            const messages = Object.values(data)
                .flat()
                .join(" ");

            setError(messages);
        } else {
            setError(
                "Unable to create lead. Please try again."
            );
        }
    }
};

    return (
        <div>

            <h1>Add New Lead</h1>


            {error && (
                <p>
                    {error}
                 </p>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Name</label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Phone</label>

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />

                <label>
                         Secondary Course Preference:
            </label>

            <br />

            <input
                type="text"
                name="secondary_course"
                value={form.secondary_course}
                onChange={handleChange}
                placeholder="Optional second preference"
                />

                <div>
                    <label>Course</label>

                    <input
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Source</label>

                    <select
                        name="source"
                        value={form.source}
                        onChange={handleChange}
                    >
                        <option value="Website">Website</option>
                        <option value="Walk-in">Walk-in</option>
                        <option value="Phone">Phone</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Fair">Fair</option>
                        <option value="Campaign">Campaign</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Status</label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Interested">Interested</option>
                        <option value="Application">Application</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                    </select>
                </div>

                {form.status === "Lost" && (
                <div>
                    <label>Lost Reason:</label>

                    <br />

                    <textarea
                        name="lost_reason"
                        value={form.lost_reason}
                        onChange={handleChange}
                        placeholder="Why was this lead lost?"
                    />
                </div>
            )}

                <div>
                    <label>Priority</label>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <br />

                <button type="submit">
                    Save Lead
                </button>

            </form>

        </div>
    );
}

export default AddLead;