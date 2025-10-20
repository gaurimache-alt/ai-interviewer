// src/components/Dashboard/RoleGrid.jsx
import React from "react";
import RoleCard from "./RoleCard";

const roles = [
  { company: "Google", role: "Software Engineer" },
  { company: "Amazon", role: "Backend Developer" },
  { company: "Microsoft", role: "Frontend Engineer" },
  { company: "Meta", role: "Full Stack Developer" },
  { company: "Apple", role: "iOS Developer" },
  { company: "Netflix", role: "Data Analyst" },
  { company: "Tesla", role: "AI Engineer" },
  { company: "Adobe", role: "UX Designer" },
  { company: "Oracle", role: "DevOps Engineer" },
  { company: "Intel", role: "System Programmer" },
];

export default function RoleGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {roles.map((r) => (
        <RoleCard
          key={r.company + r.role}
          company={r.company}
          role={r.role}
          onClick={() => onSelect(r.company, r.role)}
        />
      ))}
    </div>
  );
}
