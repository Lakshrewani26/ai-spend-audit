export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="bg-orb animate-pulse-slow"
        style={{
          width: "600px",
          height: "600px",
          top: "-200px",
          left: "-200px",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="bg-orb animate-pulse-slow"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />
      <div
        className="bg-orb animate-float"
        style={{
          width: "300px",
          height: "300px",
          top: "40%",
          left: "60%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />
    </div>
  )
}