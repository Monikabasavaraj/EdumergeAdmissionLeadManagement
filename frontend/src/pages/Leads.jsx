// // import { useEffect, useState } from "react";
// // import API from "../services/api";
// // import { Link } from "react-router-dom";

// // function Leads() {
// //     const [leads, setLeads] = useState([]);
// //     const [search, setSearch] = useState("");

// //     useEffect(() => {
// //         fetchLeads();
// //     }, []);

// //     const fetchLeads = async () => {
// //         try {
// //             const response = await API.get("leads/");
// //             setLeads(response.data);
// //         } catch (error) {
// //             console.error("Error fetching leads:", error);
// //         }
// //     };

// //     const filteredLeads = leads.filter((lead) =>
// //         lead.name.toLowerCase().includes(search.toLowerCase())
// //     );

// //     return (
// //         <div>
// //             <h1>Admission Leads</h1>

// //             <input
// //                 type="text"
// //                 placeholder="Search lead..."
// //                 value={search}
// //                 onChange={(event) => setSearch(event.target.value)}
// //             />

// //             <table border="1">
// //                 <thead>
// //                     <tr>
// //                         <th>Name</th>
// //                         <th>Phone</th>
// //                         <th>Email</th>
// //                         <th>Course</th>
// //                         <th>Source</th>
// //                         <th>Status</th>
// //                         <th>Priority</th>
// //                     </tr>
// //                 </thead>

// //                 <tbody>
// //                     {filteredLeads.map((lead) => (
// //                         <tr key={lead.id}>
// //                             <td>{lead.name}</td>
// //                             <td>{lead.phone}</td>
// //                             <td>{lead.email}</td>
// //                             <td>{lead.course}</td>
// //                             <td>{lead.source}</td>
// //                             <td>{lead.status}</td>
// //                             <td>{lead.priority}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //             <Link to="/add-lead">
// //                 <button>Add Lead</button>
// //             </Link>
// //         </div>
// //     );
// // }

// // export default Leads;




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API from "../services/api";

// function Leads() {
//     const [leads, setLeads] = useState([]);
//     const [counsellors, setCounsellors] = useState([]);
//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         fetchLeads();
//         fetchCounsellors();
//     }, []);

//     const fetchLeads = async () => {
//         try {
//             const response = await API.get("leads/");
//             setLeads(response.data);
//         } catch (error) {
//             console.error("Error fetching leads:", error);
//         }
//     };

//     const fetchCounsellors = async () => {
//         try {
//             const response = await API.get("counsellors/");
//             setCounsellors(response.data);
//         } catch (error) {
//             console.error("Error fetching counsellors:", error);
//         }
//     };

//     const assignCounsellor = async (leadId, counsellorId) => {
//         try {
//             await API.patch(`leads/${leadId}/`, {
//                 counsellor: counsellorId || null
//             });

//             // Refresh leads after assignment
//             fetchLeads();

//         } catch (error) {
//             console.error("Error assigning counsellor:", error);
//             alert("Unable to assign counsellor.");
//         }
//     };

//     const filteredLeads = leads.filter((lead) =>
//         lead.name.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div>

//             <h1>Admission Leads</h1>

//             <Link to="/add-lead">
//                 <button>Add Lead</button>
//             </Link>

//             <br />
//             <br />

//             <input
//                 type="text"
//                 placeholder="Search lead..."
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//             />

//             <br />
//             <br />

//             <table border="1" cellPadding="8">

//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Phone</th>
//                         <th>Course</th>
//                         <th>Source</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                         <th>Counsellor</th>
//                         <th>Action</th>
//                         <th>Secondary Course</th>
                        
//                     </tr>
//                 </thead>

//                 <tbody>

//                     {filteredLeads.map((lead) => (

//                         <tr key={lead.id}>

//                             <td>{lead.name}</td>

//                             <td>{lead.phone}</td>

//                             <td>{lead.course}</td>

//                             <td>{lead.source}</td>

//                             <td>{lead.status}</td>

//                             <td>{lead.priority}</td>

//                             <td>

//                                 <select
//                                     value={lead.counsellor || ""}
//                                     onChange={(event) =>
//                                         assignCounsellor(
//                                             lead.id,
//                                             event.target.value
//                                         )
//                                     }
//                                 >

//                                     <option value="">
//                                         Unassigned
//                                     </option>

//                                     {counsellors.map((counsellor) => (

//                                         <option
//                                             key={counsellor.id}
//                                             value={counsellor.id}
//                                         >
//                                             {counsellor.name}
//                                         </option>

//                                     ))}



//                                     <td>
//                                         <Link to={`/leads/${lead.id}`}>
//                                             <button>View</button>
//                                         </Link>
//                                     </td>


//                                     <td>{lead.secondary_course || "-"}</td>

//                                 </select>

//                             </td>

//                         </tr>

//                     ))}

//                 </tbody>

//             </table>

//         </div>
//     );
// }

// export default Leads;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Leads() {
    const [leads, setLeads] = useState([]);
    const [counsellors, setCounsellors] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    useEffect(() => {
        fetchLeads();
        fetchCounsellors();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await API.get("leads/");
            setLeads(response.data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        }
    };

    const fetchCounsellors = async () => {
        try {
            const response = await API.get("counsellors/");
            setCounsellors(response.data);
        } catch (error) {
            console.error("Error fetching counsellors:", error);
        }
    };

    const assignCounsellor = async (leadId, counsellorId) => {
        try {
            await API.patch(`leads/${leadId}/`, {
                counsellor: counsellorId || null,
            });

            fetchLeads();
        } catch (error) {
            console.error(error);
            alert("Unable to assign counsellor.");
        }
    };

    const filteredLeads = leads.filter((lead) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            lead.name.toLowerCase().includes(searchText) ||
            lead.phone.toLowerCase().includes(searchText) ||
            lead.email.toLowerCase().includes(searchText);

        const matchesStatus =
            !statusFilter || lead.status === statusFilter;

        const matchesSource =
            !sourceFilter || lead.source === sourceFilter;

        const matchesPriority =
            !priorityFilter || lead.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesSource &&
            matchesPriority
        );
    });

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admission Leads</h1>

            <Link to="/add-lead">
                <button>Add New Lead</button>
            </Link>

            <br />
            <br />

            <div>
                <input
                    type="text"
                    placeholder="Search name, phone or email..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                {" "}

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(event.target.value)
                    }
                >
                    <option value="">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Interested">Interested</option>
                    <option value="Application">Application</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                </select>

                {" "}

                <select
                    value={sourceFilter}
                    onChange={(event) =>
                        setSourceFilter(event.target.value)
                    }
                >
                    <option value="">All Sources</option>
                    <option value="Website">Website</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Fair">Fair</option>
                    <option value="Campaign">Campaign</option>
                    <option value="Other">Other</option>
                </select>

                {" "}

                <select
                    value={priorityFilter}
                    onChange={(event) =>
                        setPriorityFilter(event.target.value)
                    }
                >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                {" "}

                <button
                    onClick={() => {
                        setSearch("");
                        setStatusFilter("");
                        setSourceFilter("");
                        setPriorityFilter("");
                    }}
                >
                    Clear Filters
                </button>
            </div>

            <br />

            <p>
                Showing <strong>{filteredLeads.length}</strong> of{" "}
                <strong>{leads.length}</strong> leads
            </p>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Primary Course</th>
                        <th>Secondary Course</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Counsellor</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.course}</td>
                            <td>
                                {lead.secondary_course || "-"}
                            </td>
                            <td>{lead.source}</td>
                            <td>{lead.status}</td>
                            <td>{lead.priority}</td>

                            <td>
                                <select
                                    value={lead.counsellor || ""}
                                    onChange={(event) =>
                                        assignCounsellor(
                                            lead.id,
                                            event.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Unassigned
                                    </option>

                                    {counsellors.map(
                                        (counsellor) => (
                                            <option
                                                key={
                                                    counsellor.id
                                                }
                                                value={
                                                    counsellor.id
                                                }
                                            >
                                                {counsellor.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </td>

                            <td>
                                <Link
                                    to={`/leads/${lead.id}`}
                                >
                                    <button>View</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredLeads.length === 0 && (
                <p>No leads match the selected filters.</p>
            )}
        </div>
    );
}

export default Leads;