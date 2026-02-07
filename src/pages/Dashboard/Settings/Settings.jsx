import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "Azizul Hakim",
    email: "programmerazizulhakim@gmail.com",
    notifications: true,
    theme: "light",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);
    alert("Settings saved ✅");
  };

  return (
    <div className="my-8 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      {/* Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={settings.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={settings.email}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>

      {/* Notifications */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
        />
        <label className="font-medium">Enable Notifications</label>
      </div>

      {/* Theme */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Theme</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
