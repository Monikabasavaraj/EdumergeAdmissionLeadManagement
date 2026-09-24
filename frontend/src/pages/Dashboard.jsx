// import { useEffect, useState } from "react";
// import API from "../services/api";

// function Dashboard() {

//     const [leads, setLeads] = useState([]);

//     useEffect(() => {
//         API.get("leads/")
//             .then(response => {
//                 setLeads(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, []);

//     const totalLeads = leads.length;

//     const newLeads = leads.filter(
//         lead => lead.status === "New"
//     ).length;

//     const converted = leads.filter(
//         lead => lead.status === "Converted"
//     ).length;

//     return (
//         <div>
//             <h1>Admission Lead Dashboard</h1>

//             <div>
//                 <h3>Total Leads</h3>
//                 <p>{totalLeads}</p>
//             </div>

//             <div>
//                 <h3>New Leads</h3>
//                 <p>{newLeads}</p>
//             </div>

//             <div>
//                 <h3>Converted</h3>
//                 <p>{converted}</p>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;




import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [followUps, setFollowUps] = useState([]);
    const [counsellors, setCounsellors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [leadsResponse, followUpsResponse, counsellorsResponse] =
                await Promise.all([
                    API.get("leads/"),
                    API.get("followups/"),
                    API.get("counsellors/"),
                ]);

            setLeads(leadsResponse.data);
            setFollowUps(followUpsResponse.data);
            setCounsellors(counsellorsResponse.data);
        } catch (error) {
            console.error("Error loading dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    // -----------------------------
    // STATUS COUNTS
    // -----------------------------

    const totalLeads = leads.length;

    const newLeads = leads.filter(
        (lead) => lead.status === "New"
    ).length;

    const contactedLeads = leads.filter(
        (lead) => lead.status === "Contacted"
    ).length;

    const followUpLeads = leads.filter(
        (lead) => lead.status === "Follow-up"
    ).length;

    const interestedLeads = leads.filter(
        (lead) => lead.status === "Interested"
    ).length;

    const applicationLeads = leads.filter(
        (lead) => lead.status === "Application"
    ).length;

    const convertedLeads = leads.filter(
        (lead) => lead.status === "Converted"
    ).length;

    const lostLeads = leads.filter(
        (lead) => lead.status === "Lost"
    ).length;

    // -----------------------------
    // FOLLOW-UP COUNTS
    // -----------------------------

    const pendingFollowUps = followUps.filter(
        (followUp) => followUp.status === "Pending"
    );

    const completedFollowUps = followUps.filter(
        (followUp) => followUp.status === "Completed"
    );

    const now = new Date();

    const overdueFollowUps = pendingFollowUps.filter(
        (followUp) => new Date(followUp.scheduled_date) < now
    );

    // -----------------------------
    // UNASSIGNED LEADS
    // -----------------------------

    const unassignedLeads = leads.filter(
        (lead) => !lead.counsellor
    ).length;

    // -----------------------------
    // LEAD AGEING
    // -----------------------------

    const getLeadAge = (createdAt) => {
        const createdDate = new Date(createdAt);

        const difference =
            now.getTime() - createdDate.getTime();

        return Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );
    };

    const ageing = {
        zeroToThree: 0,
        fourToSeven: 0,
        eightToFourteen: 0,
        fifteenPlus: 0,
    };

    leads.forEach((lead) => {
        const age = getLeadAge(lead.created_at);

        if (age <= 3) {
            ageing.zeroToThree++;
        } else if (age <= 7) {
            ageing.fourToSeven++;
        } else if (age <= 14) {
            ageing.eightToFourteen++;
        } else {
            ageing.fifteenPlus++;
        }
    });

    // -----------------------------
    // SOURCE COUNTS
    // -----------------------------

    const sourceCounts = {};

    leads.forEach((lead) => {
        if (!sourceCounts[lead.source]) {
            sourceCounts[lead.source] = 0;
        }

        sourceCounts[lead.source]++;
    });

    // -----------------------------
    // COUNSELLOR WORKLOAD
    // -----------------------------

    const counsellorWorkload = counsellors.map(
        (counsellor) => {
            const assignedLeads = leads.filter(
                (lead) =>
                    lead.counsellor === counsellor.id
            ).length;

            const pending = leads.filter(
                (lead) =>
                    lead.counsellor === counsellor.id &&
                    lead.status !== "Converted" &&
                    lead.status !== "Lost"
            ).length;

            return {
                id: counsellor.id,
                name: counsellor.name,
                assignedLeads,
                pending,
            };
        }
    );

    return (
        <div style={{ padding: "20px" }}>

            <h1>Admission Lead Dashboard</h1>

            <p>
                Management overview of admission leads,
                follow-ups and counsellor workload.
            </p>

            <hr />

            {/* STATUS OVERVIEW */}

            <h2>Lead Overview</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(4, 1fr)",
                    gap: "15px",
                }}
            >

                <div>
                    <h3>Total Leads</h3>
                    <p>{totalLeads}</p>
                </div>

                <div>
                    <h3>New</h3>
                    <p>{newLeads}</p>
                </div>

                <div>
                    <h3>Contacted</h3>
                    <p>{contactedLeads}</p>
                </div>

                <div>
                    <h3>Follow-up</h3>
                    <p>{followUpLeads}</p>
                </div>

                <div>
                    <h3>Interested</h3>
                    <p>{interestedLeads}</p>
                </div>

                <div>
                    <h3>Applications</h3>
                    <p>{applicationLeads}</p>
                </div>

                <div>
                    <h3>Converted</h3>
                    <p>{convertedLeads}</p>
                </div>

                <div>
                    <h3>Lost</h3>
                    <p>{lostLeads}</p>
                </div>

            </div>

            <hr />

            {/* FOLLOW-UP INSIGHTS */}

            <h2>Follow-up Insights</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(3, 1fr)",
                    gap: "15px",
                }}
            >

                <div>
                    <h3>Pending Follow-ups</h3>
                    <p>{pendingFollowUps.length}</p>
                </div>

                <div>
                    <h3>Overdue Follow-ups</h3>
                    <p>{overdueFollowUps.length}</p>
                </div>

                <div>
                    <h3>Completed Follow-ups</h3>
                    <p>{completedFollowUps.length}</p>
                </div>

            </div>

            <hr />

            {/* ASSIGNMENT INSIGHTS */}

            <h2>Assignment</h2>

            <div>
                <h3>Unassigned Leads</h3>
                <p>{unassignedLeads}</p>
            </div>

            <hr />

            {/* AGEING */}

            <h2>Lead Ageing</h2>

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Age</th>
                        <th>Number of Leads</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>0 - 3 days</td>
                        <td>{ageing.zeroToThree}</td>
                    </tr>

                    <tr>
                        <td>4 - 7 days</td>
                        <td>{ageing.fourToSeven}</td>
                    </tr>

                    <tr>
                        <td>8 - 14 days</td>
                        <td>{ageing.eightToFourteen}</td>
                    </tr>

                    <tr>
                        <td>15+ days</td>
                        <td>{ageing.fifteenPlus}</td>
                    </tr>

                </tbody>

            </table>

            <hr />

            {/* SOURCE INSIGHTS */}

            <h2>Lead Sources</h2>

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Number of Leads</th>
                    </tr>
                </thead>

                <tbody>

                    {Object.entries(sourceCounts).map(
                        ([source, count]) => (
                            <tr key={source}>
                                <td>{source}</td>
                                <td>{count}</td>
                            </tr>
                        )
                    )}

                </tbody>

            </table>

            <hr />

            {/* COUNSELLOR WORKLOAD */}

            <h2>Counsellor Workload</h2>

            <table border="1" cellPadding="8">

                <thead>
                    <tr>
                        <th>Counsellor</th>
                        <th>Total Assigned</th>
                        <th>Active Leads</th>
                    </tr>
                </thead>

                <tbody>

                    {counsellorWorkload.map(
                        (counsellor) => (
                            <tr key={counsellor.id}>

                                <td>
                                    {counsellor.name}
                                </td>

                                <td>
                                    {counsellor.assignedLeads}
                                </td>

                                <td>
                                    {counsellor.pending}
                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;