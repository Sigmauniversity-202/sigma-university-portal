"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0b1120", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Left Sidebar */}
      <aside style={{ width: "260px", backgroundColor: "#0f172a", borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px", paddingLeft: "8px" }}>
          <img src="/images/sigma-logo.jpg" alt="Sigma Crest" style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "#38bdf8", letterSpacing: "0.5px" }}>SIGMA ERP</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Academic Session 2025-26</div>
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          {[
            { id: "overview", label: "Dashboard", icon: "📊" },
            { id: "assignments", label: "My Assignments", icon: "📝" },
            { id: "attendance", label: "Attendance Record", icon: "📅" },
            { id: "results", label: "Results & Ledger", icon: "📑" },
            { id: "profile", label: "Institutional Profile", icon: "🏛️" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "none",
                background: activeNav === item.id ? "#1e293b" : "transparent",
                color: activeNav === item.id ? "#38bdf8" : "#94a3b8",
                fontWeight: activeNav === item.id ? 700 : 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease"
              }}
            >
              <span>{item.icon}</span>
              <span style={{ fontSize: "0.9rem" }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Card */}
        <div style={{ padding: "12px", background: "#1e293b", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#38bdf8", color: "#0f172a", display: "grid", placeItems: "center", fontWeight: 800 }}>D</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: "0.82rem", fontWeight: 700, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>Dharm Koshiya</div>
            <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Enr: 210101001</div>
          </div>
          <Link href="/" style={{ color: "#ef4444", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700 }}>✕</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>Student Academic Overview</h1>
            <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "0.85rem" }}>Department of Computer Engineering &bull; Semester VI (Sanjeevani Bhavan)</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <span style={{ background: "#064e3b", color: "#6ee7b7", padding: "6px 14px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }}></span> Exam Status: Eligible
            </span>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Cumulative Attendance</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>87.4%</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>Threshold: 75.0% Required</div>
          </div>

          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Latest Grade Metric</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#facc15", marginTop: "4px" }}>8.85 <span style={{ fontSize: "1rem", color: "#94a3b8" }}>SPI</span></div>
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>Cumulative CPI: 8.72</div>
          </div>

          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Registered Subjects</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>6 Courses</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>24 Total Assigned Credits</div>
          </div>

          <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Tuition Ledger</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>CLEARED</div>
            <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px" }}>Receipt #SIG-2026-6819</div>
          </div>
        </div>

        {/* Deliverables & Timetable Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px" }}>
          {/* Active Assignments */}
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 16px 0" }}>Active Assignments & Lab Submissions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Lab 04: Cloud Architecture Scalability on AWS", course: "Cloud Computing (CE601)", deadline: "Tomorrow, 11:59 PM", status: "Pending Upload", color: "#f59e0b" },
                { title: "Term Work: AES-256 Cryptographic Implementation", course: "Network Security (CE602)", deadline: "Sep 18, 2026", status: "Submitted", color: "#10b981" },
                { title: "Experiment 05: LLM Tokenization and Embeddings", course: "AI & ML Lab (CE603)", deadline: "Sep 22, 2026", status: "In Review", color: "#38bdf8" }
              ].map((task, i) => (
                <div key={i} style={{ padding: "14px", background: "#0b1120", borderRadius: "8px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{task.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{task.course} &bull; Due: {task.deadline}</div>
                  </div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: task.color, border: `1px solid ${task.color}`, padding: "4px 8px", borderRadius: "4px" }}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 16px 0" }}>Today's Lectures</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { time: "09:30 - 10:30", sub: "CE601 Cloud Computing", room: "Lab 304" },
                { time: "10:30 - 11:30", sub: "CE602 Network Security", room: "Hall B-12" },
                { time: "12:00 - 02:00", sub: "CE603 AI & ML Lab", room: "AI Lab 1" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px", background: "#0b1120", borderRadius: "6px" }}>
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{item.sub}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.room}</div>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#38bdf8", fontWeight: 700 }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}