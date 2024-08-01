import ErrorBoundary from "./ErrorBoundary";

function Main({ children }) {
  return (
    <main className="main">
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
  );
}

export default Main;
