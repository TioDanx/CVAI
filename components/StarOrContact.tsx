import { Github, Linkedin, Mail } from "lucide-react"; 

export default function StarOrContact() {
  return (
    <section className="relative w-full bg-black py-20">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_40%,black,transparent)]">
        <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full
                        bg-[var(--primary)]/30 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Do you like this website?
        </h2>
        <p className="mt-4 text-white/70 max-w-xl mx-auto">
          Star it on <span className="text-secondary font-semibold">GitHub</span> ⭐ or reach out to me —
          I’m always happy to connect!
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/tuusuario/tu-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
                       px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-95"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/tu-linkedin/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-white/10 backdrop-blur-md ring-1 ring-white/15
                       px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            <Linkedin className="h-4 w-4 text-secondary" />
            Contact via LinkedIn
          </a>

          <a
            href="mailto:tucorreo@ejemplo.com"
            className="inline-flex items-center gap-2 rounded-xl 
                       bg-white/10 backdrop-blur-md ring-1 ring-white/15
                       px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            <Mail className="h-4 w-4 text-primary" />
            Email Me
          </a>
        </div>
      </div>
    </section>
  );
}
