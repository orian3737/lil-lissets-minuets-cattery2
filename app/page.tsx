import { BlogPreview, KittenBoard } from "./components";
import { starterKittens, starterPosts } from "./data";

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top">
          <span>Lil Lisset's</span>
          <strong>Minuets</strong>
        </a>
        <div>
          <a href="#kittens">Kittens</a>
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
          <a href="/studio">Owner login</a>
        </div>
      </nav>

      <section id="top" className="hero">
        <img src="/wix/homepage.jpg" alt="A Lil Lisset's Minuets cat in a home setting" />
        <div className="hero-copy">
          <p className="eyebrow">TICA registered family cattery · Litchfield County, CT</p>
          <h1>Lil Lisset's Minuets</h1>
          <p>
            Elegant companions raised with love, social confidence, and refined
            feline beauty, one Minuet at a time.
          </p>
          <div className="hero-actions">
            <a className="button" href="#kittens">Choose your kitten</a>
            <a className="button secondary" href="#contact">Join the waiting list</a>
          </div>
        </div>
      </section>

      <section id="about" className="section split">
        <div>
          <p className="eyebrow">Established 2015</p>
          <h2>Small, ethical, and home-raised</h2>
          <p>
            Lil Lisset's Minuets is a family-owned cattery focused on Minuet
            standard short-leg and tall kittens with calm, affectionate
            temperaments. Kittens are raised in the home around kids, grandkids,
            dogs, and the everyday rhythm of family life.
          </p>
        </div>
        <div className="proof-grid">
          <article><strong>TICA</strong><span>Registered cattery and kitten records</span></article>
          <article><strong>Health</strong><span>Vet check, shots, parasite treatment, and guarantee</span></article>
          <article><strong>Delivery</strong><span>Local pickup or personally coordinated travel</span></article>
          <article><strong>Support</strong><span>Deposits, updates, and after-placement guidance</span></article>
        </div>
      </section>

      <KittenBoard initialKittens={starterKittens} />

      <section className="section care-band">
        <div>
          <p className="eyebrow">What families receive</p>
          <h2>Paperwork, preparation, and a smoother first week</h2>
        </div>
        <ul>
          <li>TICA registration details and purchase contract</li>
          <li>Vaccination, parasite treatment, and vet health check notes</li>
          <li>One-year genetic health guarantee</li>
          <li>Waiting list updates for upcoming litters, retirees, and shows</li>
        </ul>
      </section>

      <BlogPreview initialPosts={starterPosts} />

      <section id="contact" className="section contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Ask about availability or join the waiting list</h2>
          <p>
            Tell us what you are looking for: short-leg or tall, companion or
            show prospect, timeline, and your family environment.
          </p>
        </div>
        <form action="mailto:longwi.2288@gmail.com" method="post" encType="text/plain">
          <label><span>Name</span><input name="name" required /></label>
          <label><span>Email</span><input name="email" type="email" required /></label>
          <label><span>Message</span><textarea name="message" required /></label>
          <button className="button" type="submit">Send inquiry</button>
        </form>
      </section>

      <footer>
        <strong>Lil Lisset's Minuets</strong>
        <span>Litchfield County, CT · longwi.2288@gmail.com · (860) 736-386</span>
      </footer>
    </main>
  );
}
