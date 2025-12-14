export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-sm text-muted-foreground">
              Games, renders, and animations crafted with passion and creativity.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-cyan-400">Navigation</h3>
            <div className="space-y-2 text-sm">
              <a href="#showcase" className="text-muted-foreground hover:text-cyan-400 transition-colors block">
                Work
              </a>
              <a href="#resume" className="text-muted-foreground hover:text-cyan-400 transition-colors block">
                Resume
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-cyan-400 transition-colors block">
                Contact
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-purple-400">Social</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors block">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors block">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Rajath K. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
