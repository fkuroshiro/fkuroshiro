// src/components/Wrapper.tsx

export default function Wrapper({ children } : {children : React.ReactNode }) {
  return (
    <div className="max-w-4xl w-full mx-2 px-4">
      {children}
    </div>
  )
}