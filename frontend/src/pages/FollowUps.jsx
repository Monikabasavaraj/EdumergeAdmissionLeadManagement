import { useEffect, useState } from "react";
import API from "../services/api";

function FollowUps() {
    const [followUps, setFollowUps] = useState([]);
    const [leads, setLeads] = useState([]);

    const [form, setForm] = useState({
        lead: "",
        scheduled_date: "",
        notes: "",
        next_action: "",
        status: "Pending",
    });

    useEffect(() => {
        fetchFollowUps();
        fetchLeads();
    }, []);

    const fetchFollowUps = async () => {
        try {
            const response = await API.get("followups/");
            setFollowUps(response.data);
        } catch (error) {
            console.error("Error fetching follow-ups:", error);
        }
    };

    const fetchLeads = async () => {
        try {
            const response = await API.get("leads/");
            setLeads(response.data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        }
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const addFollowUp = async (event) => {
        event.preventDefault();

        if (!form.lead || !form.scheduled_date || !form.notes) {
            alert("Please fill in Lead, Date and Notes.");
            return;
        }

        try {
            await API.post("followups/", form);

            alert("Follow-up created successfully.");

            setForm({
                lead: "",
                scheduled_date: "",
                notes: "",
                next_action: "",
                status: "Pending",
            });

            fetchFollowUps();
        } catch (error) {
            console.error("Error creating follow-up:", error);
            alert("Unable to create follow-up.");
        }
    };

    const updateStatus = async (followUpId, status) => {
        try {
            await API.patch(`followups/${followUpId}/`, {
                status: status,
            });

            fetchFollowUps();
        } catch (error) {
            console.error("Error updating follow-up:", error);
            alert("Unable to update follow-up.");
        }
    };

    const getLeadName = (leadId) => {
        const lead = leads.find((item) => item.id === leadId);
        return lead ? lead.name : "Unknown Lead";
    };

    return (
        <div>
            <h1>Follow-up Management</h1>

            <h2>Schedule Follow-up</h2>

            <form onSubmit={addFollowUp}>
                <div>
                    <label>Lead: </label>

                    <select
                        name="lead"
                        value={form.lead}
                        onChange={handleChange}
                    >
                        <option value="">Select Lead</option>

                        {leads.map((lead) => (
                            <option key={lead.id} value={lead.id}>
                                {lead.name} - {lead.course}
                            </option>
                        ))}
                    </select>
                </div>

                <br />

                <div>
                    <label>Scheduled Date & Time: </label>

                    <input
                        type="datetime-local"
                        name="scheduled_date"
                        value={form.scheduled_date}
                        onChange={handleChange}
                    />
                </div>

                <br />

                <div>
                    <label>Notes: </label>

                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Enter follow-up notes"
                    />
                </div>

                <br />

                <div>
                    <label>Next Action: </label>

                    <input
                        type="text"
                        name="next_action"
                        value={form.next_action}
                        onChange={handleChange}
                        placeholder="Example: Call again tomorrow"
                    />
                </div>

                <br />

                <button type="submit">
                    Schedule Follow-up
                </button>
            </form>

            <hr />

            <h2>Follow-up List</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Lead</th>
                        <th>Scheduled Date</th>
                        <th>Notes</th>
                        <th>Next Action</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {followUps.map((followUp) => (
                        <tr key={followUp.id}>
                            <td>
                                {getLeadName(followUp.lead)}
                            </td>

                            <td>
                                {new Date(
                                    followUp.scheduled_date
                                ).toLocaleString()}
                            </td>

                            <td>
                                {followUp.notes}
                            </td>

                            <td>
                                {followUp.next_action || "-"}
                            </td>

                            <td>
                                {followUp.status}
                            </td>

                            <td>
                                {followUp.status === "Pending" && (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                followUp.id,
                                                "Completed"
                                            )
                                        }
                                    >
                                        Mark Completed
                                    </button>
                                )}

                                {followUp.status === "Completed" && (
                                    <span>
                                        Completed
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FollowUps;