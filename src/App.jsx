import { useEffect, useState } from "react";
import AadhaarCardPrinter from "./components/AadhaarCardPrinter";
import "./Site.css";
import "./Palettes.css";

// Fixed colour palette (switcher removed)
const PALETTE = "minas";

const LINKS = [
  ["Tool", "#tool"],
  ["How it works", "#how"],
  ["Features", "#features"],
  ["FAQ", "#faq"],
  ["About", "#about"],
];

const FEATURES = [
  ["🔒", "100% private", "Files are read and edited inside your browser. Nothing is uploaded to a server."],
  ["✂️", "Auto split", "Front and back are cut out of the full-size PDF automatically. Drag the boxes to fine-tune the crop."],
  ["✨", "Smart enhance", "Brightness, contrast, sharpness and a clearer photo, with one click."],
  ["📄", "Print-ready Word file", "Front and back placed on an A4 page at real card size."],
  ["🖼️", "Merge two images", "Have separate front and back images of your Aadhaar, Voter ID or PAN? Merge them into one page."],
  ["📱", "Works on mobile", "Fully responsive. Use it from your phone or computer."],
];

const STEPS = [
  ["01", "Upload", "Choose your e-Aadhaar, e-Voter or e-PAN (PDF or image). For a protected PDF, enter the password when asked."],
  ["02", "Adjust", "Check the crop, rotate if needed and enhance the front, back and photo."],
  ["03", "Download", "Pick stacked or side-by-side layout and download the Word file for printing."],
];

const COMPARE = [
  ["Privacy (local processing)", "Yes, stays on your device", "Often uploads to a server"],
  ["Auto front / back split", "Yes", "Rarely supported"],
  ["Print-ready A4 Word file", "Yes", "Manual layout needed"],
  ["Photo enhance", "One click", "Manual editing"],
  ["Cost", "Free", "Free with limits, or paid"],
];

const FAQ = [
  ["Which documents can I convert?", "Full-size e-Aadhaar, e-Voter ID and e-PAN files, as a PDF or image. The tool cuts out the front and back and resizes them to a small ID-card size. You can also merge two separate front and back images into one page."],
  ["Is my document uploaded anywhere?", "No. The file is processed locally in your browser. It is not sent to any server."],
  ["What is the password of my PDF?", "For an e-Aadhaar PDF it is the first 4 letters of your name in CAPITALS followed by your birth year (YYYY), for example RAME1990. For an e-PAN PDF it is usually your date of birth as DDMMYYYY. Other documents: follow the instructions on the portal you downloaded it from."],
  ["The front and back were not cut properly. What now?", "The automatic split is tuned for the Aadhaar letter. For Voter ID or PAN, or any file with a different layout, drag the crop boxes (or their corners) over each card, then continue."],
  ["How do I print at the real card size?", "Choose the side-by-side layout (it keeps the real card size), download the Word file and print it on A4 at 100% scale."],
  ["Is it free?", "Yes. There is no sign-up and no watermark."],
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() =>
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.palette = PALETTE;
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".feat, .how, .faq details, .table-wrap, .step-card, .cta-banner");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("in"), io.unobserve(en.target))),
      { threshold: 0.12 }
    );
    els.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand"><span className="brand-mark">▣</span> ID Card Print</a>
          <nav className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map(([label, href]) => (
              <a key={href} href={href} onClick={close}>{label}</a>
            ))}
          </nav>
          <div className="nav-right">
            <a className="btn primary sm" href="#tool">Choose File</a>
            <button className="icon-btn" aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="icon-btn burger" aria-label="Menu" onClick={() => setOpen(!open)}>
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blob b1" /><div className="blob b2" />
          <div className="wrap hero-center">
            <div className="hero-copy">
              <span className="pill">✨ Free · Private · No sign-up</span>
              <h1>Aadhaar, Voter ID &amp; PAN to <span>Card Size</span> in Seconds</h1>
              <p>Turn your full-size e-Aadhaar, e-Voter and e-PAN into a small ID-card size. Split front and back, enhance the photo, merge them and download a Word file ready for A4 printing. Everything runs on your device.</p>
              <div className="hero-cta">
                <a className="btn primary big" href="#tool">Choose File <span aria-hidden>→</span></a>
                <a className="btn big" href="#how">See how it works</a>
              </div>
              <div className="drag-note">Or drag and drop your file in the box below</div>
            </div>

            <ol className="hero-steps">
              <li><b>1</b> Upload PDF or image</li>
              <li className="sep" aria-hidden>→</li>
              <li><b>2</b> Auto split &amp; enhance</li>
              <li className="sep" aria-hidden>→</li>
              <li><b>3</b> Print on A4</li>
            </ol>

            <div className="mock" aria-hidden>
              <div className="mock-pdf">
                <span className="mock-tag">Full-size PDF</span>
                <i style={{ width: "70%" }} /><i style={{ width: "92%" }} /><i style={{ width: "55%" }} />
                <div className="mock-rowcards"><em /><em /></div>
              </div>
              <div className="mock-arrow">→</div>
              <div className="mock-cards">
                <div className="mock-card front"><span className="ph" /><b /><b /><b /></div>
                <div className="mock-card back"><u /><u /><u /></div>
              </div>
              <span className="chip c1">🔒 On-device</span>
              <span className="chip c2">✓ A4 ready</span>
              <span className="chip c3">⚡ Instant</span>
            </div>

            <div className="badges">
              <span className="badge">🪪 Aadhaar · Voter · PAN</span>
              <span className="badge">🔒 Processed in your browser</span>
              <span className="badge">✓ No watermark</span>
              <span className="badge">📱 Mobile friendly</span>
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div className="wrap stats">
            {[["100%", "In your browser"], ["A4", "Print layout"], ["0", "Sign-ups needed"], ["Free", "No watermark"]].map(([n, l]) => (
              <div key={l}><b>{n}</b><span>{l}</span></div>
            ))}
          </div>
        </section>


        <section className="section wrap" style={{ paddingBottom: 10 }}>
          <div className="sec-head">
            <h2>Supported documents</h2>
            <p>Convert full-size downloads into a compact, card-size printout.</p>
          </div>
          <div className="grid3">
            {[["🪪", "e-Aadhaar", "Auto split of front and back from the Aadhaar letter."],
              ["🗳️", "e-Voter ID (EPIC)", "Cut out front and back, then resize to card size."],
              ["💳", "e-PAN", "Crop the PAN card from the PDF and print it small."]].map(([i, t, d]) => (
              <div className="feat" key={t}><div className="ico">{i}</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <section id="tool" className="section wrap" style={{ paddingTop: 30 }}>
          <div className="step-card">
            <div className="step-head"><b>1</b><h2>Upload & Process</h2></div>
            <div className="step-body">
              <div id="idcard" className="idcard-home-tool-section">
                <AadhaarCardPrinter />
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="section alt">
          <div className="wrap">
            <div className="sec-head">
              <h2>How it works</h2>
              <p>Get a printable card-size ID in 3 simple steps. No technical skills required.</p>
            </div>
            <div className="grid3">
              {STEPS.map(([n, t, d]) => (
                <div className="how" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{d}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section wrap">
          <div className="sec-head">
            <h2>Everything you need to print your card</h2>
            <p>Simple tools that run entirely on your device.</p>
          </div>
          <div className="grid3">
            {FEATURES.map(([i, t, d]) => (
              <div className="feat" key={t}><div className="ico">{i}</div><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <section className="section alt">
          <div className="wrap">
            <div className="sec-head">
              <h2>Why choose ID Card Print?</h2>
              <p>Privacy and ease of use come first.</p>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Feature</th><th>ID Card Print</th><th>Typical online tools</th></tr></thead>
                <tbody>
                  {COMPARE.map(([a, b, c]) => (
                    <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="faq" className="section wrap">
          <div className="sec-head">
            <h2>Frequently asked questions</h2>
            <p>Everything you need to know before you start.</p>
          </div>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>

        <section id="about" className="section alt">
          <div className="wrap center">
            <div className="sec-head" style={{ marginBottom: 0 }}>
              <h2>About</h2>
              <p>ID Card Print was built to make ID printing simple. It turns full-size e-Aadhaar, e-Voter and e-PAN files into clean, card-sized printouts, and merges separate front and back images, without design software and without uploading your personal documents. Please handle personal documents responsibly.</p>
            </div>
          </div>
        </section>
      </main>

      <section className="wrap cta-wrap">
        <div className="cta-banner">
          <div>
            <h2>Ready to print your card?</h2>
            <p>Upload your e-Aadhaar, e-Voter or e-PAN and get a clean, print-ready file in seconds.</p>
          </div>
          <a className="btn big light" href="#tool">Choose File →</a>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a href="#top" className="brand"><span className="brand-mark">▣</span> ID Card Print</a>
              <p>Free, private, print-ready ID cards from your full-size Aadhaar, Voter ID and PAN files. Built with privacy in mind.</p>
            </div>
            <div>
              <h4>Quick links</h4>
              {LINKS.slice(0, 3).map(([l, h]) => <a className="fl" key={h} href={h}>{l}</a>)}
            </div>
            <div>
              <h4>Help</h4>
              {LINKS.slice(3).map(([l, h]) => <a className="fl" key={h} href={h}>{l}</a>)}
            </div>
          </div>
          <div className="copy">© {new Date().getFullYear()} ID Card Print. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}