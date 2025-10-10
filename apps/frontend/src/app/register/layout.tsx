export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <footer>
        <div className="text-center font-medium">
          <p>InvoiceNext &copy; 2023</p>
        </div>
      </footer>
    </div>
  );
}