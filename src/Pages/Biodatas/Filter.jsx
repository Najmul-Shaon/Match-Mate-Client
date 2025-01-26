import React, { useState } from "react";

const Filter = ({ filters, setFilters, refetch }) => {
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => {
      if (type === "checkbox") {
        // Handle checkbox changes
        const group = name in prev.biodataType ? "biodataType" : "divisions";
        return {
          ...prev,
          [group]: {
            ...prev[group],
            [name]: checked,
          },
        };
      } else {
        // Handle number inputs
        return {
          ...prev,
          ageRange: {
            ...prev.ageRange,
            [name]: value,
          },
        };
      }
    });
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      {/* Age Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Age Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="min"
            value={filters.ageRange.min}
            min="0"
            onChange={handleFilterChange}
            placeholder="Min"
            className="w-16 p-2 border rounded-md"
          />
          <span className="font-semibold">-</span>
          <input
            type="number"
            name="max"
            value={filters.ageRange.max}
            min="0"
            onChange={handleFilterChange}
            placeholder="Max"
            className="w-16 p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Biodata Type Filter */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Biodata Type</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="male"
              checked={filters.biodataType.male}
              onChange={handleFilterChange}
              className="form-checkbox"
            />
            <span>Male</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="female"
              checked={filters.biodataType.female}
              onChange={handleFilterChange}
              className="form-checkbox"
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      {/* Division Filter */}
      <div>
        <h3 className="font-semibold mb-2">Division</h3>
        <div className="space-y-2">
          {Object.keys(filters.divisions).map((division) => (
            <label key={division} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={division}
                checked={filters.divisions[division]}
                onChange={handleFilterChange}
                className="form-checkbox"
              />
              <span>{division}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
