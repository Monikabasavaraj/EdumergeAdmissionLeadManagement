// // import Dashboard from "./pages/Dashboard";

// // function App() {
// //     return (
// //         <Dashboard />
// //     );
// // }

// // export default App;

// // import Leads from "./pages/Leads";

// // function App() {
// //     return (
// //         <Leads />
// //     );
// // }

// // export default App;

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import AddLead from "./pages/AddLead";
// import Dashboard from "./pages/Dashboard";
// import Leads from "./pages/Leads";

// function App() {
//     return (
//         <BrowserRouter>

//             <nav>
//                 <Link to="/">Dashboard</Link>
//                 {" | "}
//                 <Link to="/leads">Leads</Link>
//             </nav>

//             <Routes>

//                 <Route
//                     path="/"
//                     element={<Dashboard />}
//                 />

//                 <Route
//                     path="/leads"
//                     element={<Leads />}
//                 />
//                 <Route
//                     path="/add-lead"
//                     element={<AddLead />}
//                 />

//             </Routes>

//         </BrowserRouter>
//     );
// }

// export default App;



import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddLead from "./pages/AddLead";
import FollowUps from "./pages/FollowUps";
import LeadDetail from "./pages/LeadDetail";

function App() {
    return (
        <BrowserRouter>

            <nav>
                <Link to="/">Dashboard</Link>
                {" | "}
                <Link to="/leads">Leads</Link>
                {" | "}
                <Link to="/followups">Follow-ups</Link>
            </nav>

            <hr />

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/leads"
                    element={<Leads />}
                />

                <Route
                    path="/add-lead"
                    element={<AddLead />}
                />

                <Route
                    path="/followups"
                    element={<FollowUps />}
                />

                <Route path="/leads/:id" element={<LeadDetail />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;