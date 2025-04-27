export default function Footer() {
    return (
      <footer className="py-10 bg-zinc-950 text-center text-zinc-400">
        <p>© {new Date().getFullYear()} LOOTIX. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    );
  }
  