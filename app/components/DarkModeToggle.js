'use client';

export default function DarkModeToggle() {
  return (
    <button
      onClick={() => document.documentElement.classList.toggle('dark')}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      🌙
    </button>
  );
}
