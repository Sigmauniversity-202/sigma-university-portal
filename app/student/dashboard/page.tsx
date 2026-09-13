"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "attendance" | "results" | "fees">("overview");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Top Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #334155", background: "#1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img src="/images/sigma-logo.jpg" alt="Logo" style={{ height: "42px", borderRadius: "6px" }} />
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0, color: "#facc15" }}>SIGMA UNIVERSITY</h2>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Student Self-Service Portal &bull; ERP v3.4</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 700 }}>Dharm Paresh Koshiya</div>
            <div style={{ fontSize: "0.75rem", color: "#38bdf8" }}>Enrollment: 210101001 &bull; Sem VI (CE)</div>
          </div>
          <Link href="/" style={{ background: "#ef4444", color: "#fff", textDecoration: "none", padding: "6px 14px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700 }}>
            Sign Out
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px" }}>
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
          {[
            { id: "overview", label: "📊 Academic Overview" },
            { id: "attendance", label: "📅 Subject Attendance" },
            { id: "results", label: "📑 Grade Cards & SPI" },
            { id: "fees", label: "💳 Fees & Receipts" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                background: activeTab === tab.id ? "#facc15" : "#1e293b",
                color: activeTab === tab.id ? "#0f172a" : "#94a3b8"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <div>
            {/* Quick Metrics Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginBottom: "28px" }}>
              <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Overall Attendance</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>89.4%</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Above 75% required threshold</div>
              </div>

              <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Current CGPA / CPI</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#facc15", marginTop: "4px" }}>8.72</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Last Semester SPI: 9.10</div>
              </div>

              <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Registered Credits</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>24 Credits</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Computer Engineering &bull; Regular</div>
              </div>

              <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px" }}>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Fee Clearance</div>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#10b981", marginTop: "4px" }}>PAID</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "6px" }}>Sem VI dues cleared</div>
              </div>
            </div>

            {/* Daily Schedule & Notices */}
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "24px" }}>
              <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "20px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px", color: "#f8fafc" }}>Today's Class Schedule (Sanjeevani Bhavan)</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { time: "09:30 AM - 10:30 AM", subject: "Cloud Computing (CE601)", room: "Lab 304", staff: "Prof. Paresh Patel" },
                    { time: "10:30 AM - 11:30 AM", subject: "Network Security (CE602)", room: "Hall B-12", staff: "Dr. K. S. Trivedi" },
                    { time: "12:00 PM - 02:00 PM", subject: "AI & Deep Learning Practical", room: "AI Lab 1", staff: "Prof. M. R. Shah" },
                    { time: "02:30 PM - 03:30 PM", subject: "Compiler Design (CE604)", room: "Hall B-14", staff: "Dr. D. V. Joshi" }
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#0f172a", borderRadius: "8px" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#e2e8f0" }}>{item.subject}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{item.staff} &bull; {item.room}</div>
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "#facc15", fontWeight: 700 }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "20px" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "16px", color: "#f8fafc" }}>Campus Circulars</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ borderLeft: "3px solid #facc15", paddingLeft: "12px" }}>
                    <div style={{ fontSize: "0.84rem", fontWeight: 700 }}>Mid-Semester Theory Examination Dates</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Begins next Monday across all departments.</div>
                  </div>
                  <div style={{ borderLeft: "3px solid #38bdf8", paddingLeft: "12px" }}>
                    <div style={{ fontSize: "0.84rem", fontWeight: 700 }}>Campus Hackathon 2026 Registration</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Organized at Saraswati Bhavan auditorium.</div>
                  </div>
                  <div style={{ borderLeft: "3px solid #ef4444", paddingLeft: "12px" }}>
                    <div style={{ fontSize: "0.84rem", fontWeight: 700 }}>Server Maintenance Window</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>Nightly ERP backup from 11:50 PM to 12:30 AM.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "18px" }}>Semester VI Subject-wise Attendance</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                  <th style={{ padding: "10px" }}>Code</th>
                  <th style={{ padding: "10px" }}>Course Title</th>
                  <th style={{ padding: "10px" }}>Total Conducted</th>
                  <th style={{ padding: "10px" }}>Attended</th>
                  <th style={{ padding: "10px" }}>Percentage</th>
                  <th style={{ padding: "10px" }}>Eligibility</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "CE601", title: "Cloud Computing Architecture", total: 42, attended: 39, pct: "92.8%" },
                  { code: "CE602", title: "Network Security & Cryptography", total: 40, attended: 35, pct: "87.5%" },
                  { code: "CE603", title: "AI & Machine Learning Laboratory", total: 24, attended: 22, pct: "91.6%" },
                  { code: "CE604", title: "Compiler Design Principles", total: 38, attended: 32, pct: "84.2%" },
                  { code: "CE605", title: "Mobile Application Dev (Android)", total: 36, attended: 34, pct: "94.4%" }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "14px 10px", fontWeight: 700, color: "#facc15" }}>{row.code}</td>
                    <td style={{ padding: "14px 10px" }}>{row.title}</td>
                    <td style={{ padding: "14px 10px" }}>{row.total}</td>
                    <td style={{ padding: "14px 10px" }}>{row.attended}</td>
                    <td style={{ padding: "14px 10px", fontWeight: 700, color: "#10b981" }}>{row.pct}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ background: "#064e3b", color: "#6ee7b7", padding: "4px 8px", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 700 }}>Eligible</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === "results" && (
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "18px" }}>Academic Transcript / Grade Card</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              {["Semester I: SPI 8.40", "Semester II: SPI 8.65", "Semester III: SPI 8.80", "Semester IV: SPI 8.95", "Semester V: SPI 9.10"].map((sem, i) => (
                <div key={i} style={{ background: "#0f172a", border: "1px solid #334155", padding: "16px", borderRadius: "8px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e2e8f0" }}>{sem}</div>
                  <div style={{ fontSize: "0.75rem", color: "#10b981", marginTop: "4px" }}>Status: First Class with Distinction</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fees Tab */}
        {activeTab === "fees" && (
          <div style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "18px" }}>Tuition & Exam Fee Records</h3>
            <div style={{ padding: "16px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700 }}>Academic Year 2025-26 (Sem VI)</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>Receipt No: SIGMA-2026-67891 &bull; Mode: Net Banking</div>
              </div>
              <button style={{ background: "#38bdf8", color: "#0f172a", border: "none", padding: "8px 14px", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }}>
                Download Receipt PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}