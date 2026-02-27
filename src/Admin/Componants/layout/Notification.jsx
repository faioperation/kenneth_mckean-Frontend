import React from 'react'

export default function Notification() {
       const notifications = [
  {
    "message": "Profile updated successfully.",
    "time": "10:45 AM"
  },
  {
    "message": "Password changed successfully.",
    "time": "Yesterday"
  },
  {
    "message": "New login detected from Dhaka.",
    "time": "2 days ago"
  }
];
  return (
<div>
{notifications.map((note, index) => (
  <div key={index} className="flex justify-between p-3 border-b border-gray-800">
    <p className="text-sm text-gray-200">{note.message}</p>
    <span className="text-xs text-gray-500">{note.time}</span>
  </div>
))}
</div>
  )
}
