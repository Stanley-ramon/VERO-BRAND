export function Footer() {
  return (
    <footer className="border-t bg-neutral-50">
      <div className="max-w-1xl mx-auto px-4 pb-5">
        {/* Linha inferior */}
        <div className="pt-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} VERØ — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
