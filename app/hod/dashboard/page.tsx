"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HodDashboard() {
  const [approvals, setApprovals] = useState([
    { id: "EX-601", enr: "210101001", name: "Dharm Paresh Koshiya", sem: "Sem VI", fee: "Cleared", att: "87.4%", status: "Pending" },
    { id: "EX-602", enr: "210101002", name: "Kavya R. Patel", sem: "Sem VI", fee: "Cleared", att: "88.4%", status: "Pending" },
    { id: "EX-603", enr: "210101003", name: "Aarav S. Joshi", sem: "Sem VI", fee: "Cleared", att: "84.2%", status: "Pending" }
  ]);

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(item => item.id === id ? { ...item, status: "Endorsed" } : item));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b1120", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", backgroundColor: "#0f172a", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", paddingLeft: "8px" }}>
          <img src="/images/sigma-logo.jpg" alt="Sigma Crest" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#ec4899" }}>HOD EXECUTIVE</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Department Administration</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {[
            { label: "Endorsement Ledger", icon: "🛡️", active: true },
            { label: "Faculty Allocations", icon: "👨‍🏫", active: false },
            { label: "Curriculum & Syllabus", icon: "📖", active: false },
            { label: "Institutional Records", icon: "🏛️", active: false }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                background: item.active ? "#1e293b" : "transparent",
                color: item.active ? "#ec4899" : "#94a3b8",
                fontWeight: item.active ? 700 : 500,
                fontSize: "0.9rem",
                cursor: "pointer"
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: "12px", background: "#1e293b", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ec4899", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800 }}>K</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>Dr. K. S. Trivedi</div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>HOD &bull; Computer Eng.</div>
          </div>
          <Link href="/" style={{ color: "#ef4444", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>✕</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Exam Forms Endorsement Ledger</h1>
            <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>Mid-Semester Final Examination Eligibility Approvals &bull; Session 2025-26</p>
          </div>
        </div>

        {/* Ledger Grid */}
        <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "12px" }}>Form ID</th>
                <th style={{ padding: "12px" }}>Enrollment</th>
                <th style={{ padding: "12px" }}>Student Name</th>
                <th style={{ padding: "12px" }}>Attendance</th>
                <th style={{ padding: "12px" }}>Fee Status</th>
                <th style={{ padding: "12px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "14px 12px", fontWeight: 700, color: "#ec4899" }}>{item.id}</td>
                  <td style={{ padding: "14px 12px" }}>{item.enr}</td>
                  <td style={{ padding: "14px 12px", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: "14px 12px", color: "#10b981", fontWeight: 700 }}>{item.att}</td>
                  <td style={{ padding: "14px 12px", color: "#38bdf8" }}>{item.fee}</td>
                  <td style={{ padding: "14px 12px" }}>
                    {item.status === "Pending" ? (
                      <button
                        onClick={() => handleApprove(item.id)}
                        style={{ background: "#ec4899", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.8rem" }}
                      >
                        Endorse Form
                      </button>
                    ) : (
                      <span style={{ color: "#10b981", fontWeight: 700, fontSize: "0.85rem" }}>✓ Endorsed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}