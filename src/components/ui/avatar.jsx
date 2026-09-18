import React from 'react'

export function Avatar({ src, alt, size = 40, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  )
}

export function AvatarFallback({ initials = '', size = 40 }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-700"
    >
      {initials}
    </div>
  )
}

export default Avatar
