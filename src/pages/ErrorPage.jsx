import React from "react";

function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "-50vh" }}>
        <h1>Error 404: Page not found</h1>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
