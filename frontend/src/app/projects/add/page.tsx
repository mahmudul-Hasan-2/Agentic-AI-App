"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const AddNewProjectPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateAI = async () => {
    if (!formData.title) {
      toast.error("Please enter a title to generate AI content.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formData.title }),
      });
      const data = await response.json();

      if (response.ok) {
        setFormData((prev) => ({ ...prev, fullDescription: data.content }));
        toast.success("AI description generated successfully!");
      } else {
        toast.error("Failed to generate AI content.");
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Server connection error!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Project added successfully!");
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          imageUrl: "",
        });
      } else {
        toast.error("Failed to add project.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Add New Project
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Project Title"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          onChange={handleInputChange}
          value={formData.title}
          required
        />
        <input
          name="shortDescription"
          placeholder="Short Description"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          onChange={handleInputChange}
          value={formData.shortDescription}
          required
        />

        <div className="relative">
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            placeholder="Full Description"
            className="w-full border p-2 rounded h-32 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loading}
            className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          onChange={handleInputChange}
          value={formData.price}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="w-full border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          onChange={handleInputChange}
          value={formData.imageUrl}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit Project
        </button>
      </form>
    </div>
  );
};

export default AddNewProjectPage;
