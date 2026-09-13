"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FacultyDashboard() {
  const [selectedClass, setSelectedClass] = useState("CE601 - Cloud Computing");
  const [punchSuccess, setPunchSuccess] = useState(false);

  const handlePunch = () => {
    setPunchSuccess(true);
    setTimeout(() => setPunchSuccess(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #334155", background: "#1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/images/sigma-logo.jpg" alt="Logo" style={{ height: "42px", borderRadius: "6px" }} />
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#38bdf8" }}>SIGMA UNIVERSITY</h2>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Faculty ERP Workspace &bull; ID: E1492</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>Prof. Paresh Patel</div>
            <div style={{ fontSize: "0.75rem", color: "#facc15" }}>Sr. Lecturer &bull; Computer Eng. Dept.</div>
          </div>
          <Link href="/" style={{ background: "#ef4444", color: "#fff", textDecoration: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
            Sign Out
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }}>
          {/* Lecture Punch & Attendance */}
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "16px" }}>Attendance Punch-In Terminal</h3>
            
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "6px" }}>Active Lecture</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "6px", background: "#0f172a", color: "#f8fafc", border: "1px solid #475569" }}
              >
                <option>CE601 - Cloud Computing (Sem VI - Div A)</option>
                <option>CE402 - Database Systems (Sem IV - Div B)</option>
                <option>CE603 - AI & ML Lab (Batch A1)</option>
              </select>
            </div>

            <div style={{ background: "#0f172a", padding: "16px", borderRadius: "8px", border: "1px solid #334155", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.85rem" }}>
                <span>Total Enrolled Students:</span>
                <strong style={{ color: "#f8fafc" }}>68</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span>Present Today:</span>
                <strong style={{ color: "#10b981" }}>62</strong>
              </div>
            </div>

            <button
              onClick={handlePunch}
              style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "none", background: "#10b981", color: "#0f172a", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer" }}
            >
              {punchSuccess ? "✓ Attendance Pushed to ERP" : "Submit Attendance Register"}
            </button>
          </div>

          {/* Quick Tasks & Student Approvals */}
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "16px" }}>Pending Department Tasks</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Mid-Term Question Paper Submission (CE601)", deadline: "Tomorrow, 05:00 PM" },
                { label: "Verify 4 Student Medical Leave Requests", deadline: "Today" },
                { label: "Lab Inventory Verification for Sanjeevani Bhavan", deadline: "Friday" }
              ].map((task, i) => (
                <div key={i} style={{ padding: "12px", background: "#0f172a", borderRadius: "6px", borderLeft: "3px solid #38bdf8" }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>{task.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "#f87171", marginTop: "4px" }}>Due: {task.deadline}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}