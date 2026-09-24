import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../services/api";

function LeadDetail() {
    const { id } = useParams();

    const [lead, setLead] = useState(null);
    const [followUps, setFollowUps] = useState([]);
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [leadResponse, followUpResponse, counsellorResponse] =
                await Promise.all([
                    API.get(`leads/${id}/`),
                    API.get("followups/"),
                    API.get("counsellors/"),
                ]);

            setLead(leadResponse.data);

            setFollowUps(
                followUpResponse.data.filter(
                    (followUp) => followUp.lead === Number(id)
                )
            );

            setCounsellors(counsellorResponse.data);
        } catch (err) {
            console.error(err);
            setError("Unable to load lead details.");
        } finally {
            setLoading(false);
        }
    };

    const assignCounsellor = async (event) => {
        try {
            await API.patch(`leads/${id}/`, {
                counsellor: event.target.value || null,
            });

            fetchData();
        } catch (err) {
            console.error(err);
            alert("Unable to assign counsellor.");
        }
    };

    const getCounsellorName = (counsellorId) => {
        const counsellor = counsellors.find(
            (item) => item.id === counsellorId
        );

        return counsellor ? counsellor.name : "Unassigned";
    };

    if (loading) {
        return <h2>Loading lead...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!lead) {
        return <p>Lead not found.</p>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/leads">← Back to Leads</Link>

            <h1>{lead.name}</h1>

            <hr />

            <h2>Lead Information</h2>

            <table border="1" cellPadding="8">
                <tbody>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td>{lead.name}</td>
                    </tr>

                    <tr>
                        <td><strong>Phone</strong></td>
                        <td>{lead.phone}</td>
                    </tr>

                    <tr>
                        <td><strong>Email</strong></td>
                        <td>{lead.email}</td>
                    </tr>

                    <tr>
                        <td><strong>Primary Course</strong></td>
                        <td>{lead.course}</td>
                    </tr>

                    <tr>
                        <td><strong>Secondary Course</strong></td>
                        <td>{lead.secondary_course || "-"}</td>
                    </tr>

                    <tr>
                        <td><strong>Source</strong></td>
                        <td>{lead.source}</td>
                    </tr>

                    <tr>
                        <td><strong>Status</strong></td>
                        <td>{lead.status}</td>
                    </tr>

                    <tr>
                        <td><strong>Priority</strong></td>
                        <td>{lead.priority}</td>
                    </tr>

                    <tr>
                        <td><strong>Created</strong></td>
                        <td>
                            {new Date(lead.created_at).toLocaleString()}
                        </td>
                    </tr>

                    <tr>
                        <td><strong>Last Updated</strong></td>
                        <td>
                            {new Date(lead.updated_at).toLocaleString()}
                        </td>
                    </tr>

                    {lead.status === "Lost" && (
                        <tr>
                            <td><strong>Lost Reason</strong></td>
                            <td>{lead.lost_reason || "-"}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <hr />

            <h2>Counsellor Assignment</h2>

            <p>
                Current counsellor:{" "}
                <strong>
                    {getCounsellorName(lead.counsellor)}
                </strong>
            </p>

            <select
                value={lead.counsellor || ""}
                onChange={assignCounsellor}
            >
                <option value="">Unassigned</option>

                {counsellors.map((counsellor) => (
                    <option
                        key={counsellor.id}
                        value={counsellor.id}
                    >
                        {counsellor.name}
                    </option>
                ))}
            </select>

            <hr />

            <h2>Follow-up History</h2>

            {followUps.length === 0 ? (
                <p>No follow-ups recorded for this lead.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>Scheduled Date</th>
                            <th>Notes</th>
                            <th>Next Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {followUps.map((followUp) => (
                            <tr key={followUp.id}>
                                <td>
                                    {new Date(
                                        followUp.scheduled_date
                                    ).toLocaleString()}
                                </td>

                                <td>{followUp.notes}</td>

                                <td>
                                    {followUp.next_action || "-"}
                                </td>

                                <td>{followUp.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <br />

            <Link to="/followups">
                <button>Manage Follow-ups</button>
            </Link>
        </div>
    );
}

export default LeadDetail;