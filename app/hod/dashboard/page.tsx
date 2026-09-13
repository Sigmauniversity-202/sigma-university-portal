"use client";

import React from "react";
import Link from "next/link";

export default function HodDashboard() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #334155", background: "#1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/images/sigma-logo.jpg" alt="Logo" style={{ height: "42px", borderRadius: "6px" }} />
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#ec4899" }}>SIGMA UNIVERSITY</h2>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>HOD Executive Management &bull; Computer Engineering</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>Dr. K. S. Trivedi (HOD)</div>
            <div style={{ fontSize: "0.75rem", color: "#facc15" }}>Head of Department &bull; Computer Science & Eng.</div>
          </div>
          <Link href="/" style={{ background: "#ef4444", color: "#fff", textDecoration: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
            Sign Out
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginBottom: "28px" }}>
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Department Students</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>480</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Sem II, IV, VI & VIII</div>
          </div>
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Active Faculty Members</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>24</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>100% attendance today</div>
          </div>
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Avg Dept Attendance</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#facc15", marginTop: "4px" }}>87.6%</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Saraswati & Sanjeevani Wings</div>
          </div>
        </div>

        <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "16px" }}>Faculty Load & Subject Distribution</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "10px" }}>Faculty Name</th>
                <th style={{ padding: "10px" }}>Designation</th>
                <th style={{ padding: "10px" }}>Assigned Subject</th>
                <th style={{ padding: "10px" }}>Weekly Hours</th>
                <th style={{ padding: "10px" }}>Syllabus Covered</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Prof. Paresh Patel", role: "Sr. Lecturer", subject: "CE601 - Cloud Computing", hours: "16 hrs", progress: "74%" },
                { name: "Prof. M. R. Shah", role: "Assistant Prof.", subject: "CE603 - AI & ML Lab", hours: "18 hrs", progress: "68%" },
                { name: "Dr. D. V. Joshi", role: "Associate Prof.", subject: "CE604 - Compiler Design", hours: "14 hrs", progress: "80%" }
              ].map((f, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "12px 10px", fontWeight: 700, color: "#f8fafc" }}>{f.name}</td>
                  <td style={{ padding: "12px 10px", color: "#94a3b8" }}>{f.role}</td>
                  <td style={{ padding: "12px 10px", color: "#38bdf8" }}>{f.subject}</td>
                  <td style={{ padding: "12px 10px" }}>{f.hours}</td>
                  <td style={{ padding: "12px 10px", fontWeight: 700, color: "#10b981" }}>{f.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}