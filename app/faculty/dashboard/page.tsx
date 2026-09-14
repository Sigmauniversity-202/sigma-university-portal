"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FacultyDashboard() {
  const [selectedExam, setSelectedExam] = useState("Mid-Sem Theory");
  const [marks, setMarks] = useState({
    "210101001": 28,
    "210101002": 26,
    "210101003": 24,
    "210101004": 29
  });
  const [saved, setSaved] = useState(false);

  const handleMarkChange = (enr: string, val: number) => {
    setMarks(prev => ({ ...prev, [enr]: val }));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b1120", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", backgroundColor: "#0f172a", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", paddingLeft: "8px" }}>
          <img src="/images/sigma-logo.jpg" alt="Sigma Crest" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#38bdf8" }}>FACULTY ERP</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Academic Staff Workspace</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {[
            { label: "Internal Marks Entry", icon: "✏️", active: true },
            { label: "Assignment Evaluator", icon: "📋", active: false },
            { label: "Lecture Attendance", icon: "👥", active: false },
            { label: "Syllabus Coverage", icon: "📚", active: false }
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
                color: item.active ? "#38bdf8" : "#94a3b8",
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
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#facc15", color: "#0f172a", display: "grid", placeItems: "center", fontWeight: 800 }}>P</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>Prof. Paresh Patel</div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Sr. Lecturer &bull; CE</div>
          </div>
          <Link href="/" style={{ color: "#ef4444", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>✕</Link>
        </div>
      </aside>

      {/* Main Terminal */}
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Faculty Evaluation & Marks Ledger</h1>
            <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>CE601: Cloud Computing Architecture &bull; Class: Sem VI - Div A</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
              style={{ background: "#10b981", color: "#0f172a", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}
            >
              {saved ? "✓ Ledger Saved to University DB" : "Save & Sync Marks"}
            </button>
          </div>
        </div>

        {/* Ledger Table */}
        <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontWeight: 700, fontSize: "1rem" }}>Batch Enrollment Roll (Total 4 Enrolled)</div>
            <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Max Score: 30 Marks</div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "12px" }}>Enrollment No</th>
                <th style={{ padding: "12px" }}>Student Full Name</th>
                <th style={{ padding: "12px" }}>Semester Attendance</th>
                <th style={{ padding: "12px" }}>Continuous Eval</th>
                <th style={{ padding: "12px" }}>Mid-Sem Marks (/30)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { enr: "210101001", name: "Dharm Paresh Koshiya", att: "92.8%", ce: "22/25" },
                { enr: "210101002", name: "Kavya R. Patel", att: "88.4%", ce: "20/25" },
                { enr: "210101003", name: "Aarav S. Joshi", att: "84.2%", ce: "19/25" },
                { enr: "210101004", name: "Neha D. Mehta", att: "94.5%", ce: "24/25" }
              ].map((row) => (
                <tr key={row.enr} style={{ borderBottom: "1px solid #334155" }}>
                  <td style={{ padding: "14px 12px", fontWeight: 700, color: "#38bdf8" }}>{row.enr}</td>
                  <td style={{ padding: "14px 12px" }}>{row.name}</td>
                  <td style={{ padding: "14px 12px", color: "#10b981", fontWeight: 700 }}>{row.att}</td>
                  <td style={{ padding: "14px 12px" }}>{row.ce}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <input
                      type="number"
                      max={30}
                      min={0}
                      value={marks[row.enr as keyof typeof marks]}
                      onChange={(e) => handleMarkChange(row.enr, Number(e.target.value))}
                      style={{ width: "80px", padding: "6px 10px", borderRadius: "6px", background: "#0b1120", border: "1px solid #475569", color: "#f8fafc", fontWeight: 700 }}
                    />
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