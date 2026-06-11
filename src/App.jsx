import { useEffect, useState } from 'react'
import {
  Binoculars,
  ChevronLeft,
  ChevronRight,
  Gem,
  Mail,
  Map,
  MapPin,
  MapPinned,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Send,
  SlidersHorizontal,
  UsersRound,
  X,
} from 'lucide-react'
import './App.css'

const PHONE_NUMBER = '255759047484'
const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
const LOGO_SRC = assetPath('/images/african-bold-safari-logo.svg')

const imageUrl = (id, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`

const whatsAppHref = (message) => `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Safari Packages', href: '#packages' },
  { label: 'Why Choose Us', href: '#why' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const destinations = [
  {
    title: 'Serengeti National Park',
    label: 'Great Migration Plains',
    image: imageUrl('33650586'),
    alt: 'Lion in Serengeti grassland',
    text: "Endless savanna, big cats, wildebeest herds, and one of Africa's most cinematic wildlife stages.",
  },
  {
    title: 'Mount Kilimanjaro',
    label: 'Roof of Africa',
    image: imageUrl('36841474'),
    alt: 'Mount Kilimanjaro under clear blue sky',
    text: 'A legendary trekking adventure through forest, moorland, alpine desert, and summit light.',
  },
  {
    title: 'Mikumi National Park',
    label: 'Accessible Wild Plains',
    image: imageUrl('37087534'),
    alt: 'Zebras in Mikumi National Park',
    text: 'Open horizons, relaxed game drives, and rewarding sightings for short or budget-friendly safaris.',
  },
  {
    title: 'Mount Meru',
    label: 'Volcanic Beauty',
    image: imageUrl('30521894'),
    alt: 'Mount Meru view in Arusha',
    text: 'A striking climb and scenic companion to Kilimanjaro, rising above the green landscapes of Arusha.',
  },
  {
    title: 'Lake Manyara National Park',
    label: 'Lake and Rift Valley',
    image: imageUrl('12573131'),
    alt: 'Zebras grazing near Lake Manyara with flamingos',
    text: 'Birdlife, lake views, groundwater forest, and classic northern circuit safari scenery.',
  },
  {
    title: 'Tarangire National Park',
    label: 'Elephant Country',
    image: imageUrl('30629456'),
    alt: 'Elephant herd in Tarangire National Park',
    text: 'Ancient baobabs, seasonal river life, large elephant herds, and golden dry-season drama.',
  },
  {
    title: 'Ngorongoro Crater',
    label: 'Natural Amphitheatre',
    image: imageUrl('30630770'),
    alt: 'Panoramic Ngorongoro Crater landscape',
    text: 'A wildlife-rich crater floor with sweeping rim views and unforgettable Big Five possibility.',
  },
  {
    title: 'Zanzibar',
    label: 'Indian Ocean Escape',
    image: imageUrl('30125136'),
    alt: 'Aerial view of Zanzibar coastline',
    text: 'White sand, turquoise water, spice culture, Stone Town charm, and post-safari relaxation.',
  },
  {
    title: 'Arusha National Park',
    label: 'Close to Arusha',
    image: imageUrl('33798297'),
    alt: 'African elephant in Arusha Region',
    text: "Forest, lakes, Mount Meru views, and an easy day safari close to northern Tanzania's gateway city.",
  },
  {
    title: 'Nyerere National Park',
    label: 'Southern Wilderness',
    image: imageUrl('16444277'),
    alt: 'Safari vehicle driving through African landscape',
    text: 'Remote river wilderness, big landscapes, boat safari possibilities, and quieter southern routes.',
  },
  {
    title: 'Ruaha National Park',
    label: 'Wild and Expansive',
    image: imageUrl('28838099'),
    alt: 'Vast Tanzanian crater landscape at dusk',
    text: 'A rugged southern icon known for remote wilderness, predators, elephants, and serious safari depth.',
  },
]

const packages = [
  {
    title: 'Serengeti Wildlife Safari',
    duration: '4-6 Days',
    image: imageUrl('4733585'),
    alt: 'Wildebeest herd in Serengeti',
    text: "Track lions, wildebeest, zebra, and open-plains drama across Tanzania's most famous park.",
    cta: 'Inquire Now',
  },
  {
    title: 'Ngorongoro Crater Day Trip',
    duration: '1 Day',
    image: imageUrl('20847563'),
    alt: 'Wildlife grazing in Ngorongoro landscape',
    text: "A compact, high-impact safari into one of the world's most remarkable natural wildlife bowls.",
    cta: 'View Details',
  },
  {
    title: 'Tarangire and Manyara Safari',
    duration: '2-4 Days',
    image: imageUrl('19986839'),
    alt: 'Elephants moving through Tarangire',
    text: 'Pair elephant country, baobab silhouettes, Rift Valley views, and lakeside birdlife.',
    cta: 'Inquire Now',
  },
  {
    title: 'Kilimanjaro Trekking Adventure',
    duration: '6-8 Days',
    image: imageUrl('31144648'),
    alt: 'Snow-capped Mount Kilimanjaro',
    text: 'A guided climb with careful pacing, scenic camps, and summit-focused preparation.',
    cta: 'View Details',
  },
  {
    title: 'Zanzibar Beach Holiday',
    duration: '3-7 Days',
    image: imageUrl('30125094'),
    alt: 'Traveler walking along Zanzibar beach',
    text: 'Soft sand, warm ocean, spice culture, and easy relaxation after time in the wild.',
    cta: 'Inquire Now',
  },
  {
    title: 'Tanzania Budget Safari',
    duration: '3-5 Days',
    image: imageUrl('4404524'),
    alt: 'Safari jeep on dusty Tanzania road',
    text: 'Smart routing, comfortable basics, and strong wildlife value without losing the magic.',
    cta: 'View Details',
  },
  {
    title: 'Tanzania Luxury Safari',
    duration: '5-9 Days',
    image: imageUrl('29865515'),
    alt: 'Hot air balloon over Serengeti plains',
    text: 'Polished lodges, private pacing, scenic transfers, and elevated comfort across iconic parks.',
    cta: 'Inquire Now',
  },
  {
    title: 'Honeymoon Safari',
    duration: '6-10 Days',
    image: imageUrl('34845589'),
    alt: 'Romantic crater landscape at dusk',
    text: 'Romantic lodges, private moments, sunset drives, and a seamless beach extension.',
    cta: 'View Details',
  },
  {
    title: 'Family Safari',
    duration: '4-7 Days',
    image: imageUrl('28812642'),
    alt: 'Family on safari in a green jeep',
    text: 'Friendly guides, manageable drive times, and child-aware pacing for shared discovery.',
    cta: 'Inquire Now',
  },
  {
    title: 'Big Five Safari Experience',
    duration: '5-8 Days',
    image: imageUrl('35413122'),
    alt: 'Rhinoceros grazing in Tanzania',
    text: 'A focused northern circuit safari shaped around lion, leopard, elephant, buffalo, and rhino sightings.',
    cta: 'View Details',
  },
]

const gallery = [
  { caption: 'Lion in Serengeti, Tanzania', image: imageUrl('32332419', 700), alt: 'Lion in Serengeti' },
  {
    caption: 'Elephant herd in Tarangire National Park',
    image: imageUrl('30629351', 700),
    alt: 'Elephant herd in Tarangire',
    className: 'tall',
  },
  { caption: 'Leopard resting in a Tanzanian tree', image: imageUrl('28838082', 700), alt: 'Leopard resting in tree' },
  {
    caption: 'Ngorongoro Crater landscape',
    image: imageUrl('30630770', 1000),
    alt: 'Ngorongoro Crater landscape',
    className: 'wide',
  },
  { caption: 'Cheetah portrait in Tanzania', image: imageUrl('10399172', 700), alt: 'Cheetah portrait' },
  { caption: 'Zebras and flamingos near Lake Manyara', image: imageUrl('12573131', 700), alt: 'Zebras near Lake Manyara' },
  { caption: 'African buffalo in Arusha National Park', image: imageUrl('19013275', 700), alt: 'African buffalo' },
  {
    caption: 'Mount Kilimanjaro in clear light',
    image: imageUrl('15994021', 1000),
    alt: 'Mount Kilimanjaro landscape',
    className: 'wide',
  },
  { caption: 'Giraffe in Tanzanian habitat', image: imageUrl('29771897', 700), alt: 'Giraffe in Tanzania' },
  { caption: 'Gazelles on the Serengeti plains', image: imageUrl('33650535', 700), alt: 'Gazelles on Serengeti plains' },
  { caption: 'Rhino grazing in Kilimanjaro Region', image: imageUrl('35413122', 700), alt: 'Rhino grazing' },
  { caption: 'Wildebeest herd in Tanzania', image: imageUrl('29833434', 700), alt: 'Wildebeest herd' },
]

const reasons = [
  { icon: MapPinned, title: 'Local Tanzania Expertise', text: 'Routes, timing, and destination advice shaped by people who understand the ground.' },
  { icon: SlidersHorizontal, title: 'Personalized Experiences', text: 'Trips can be adapted for pace, budget, comfort level, wildlife focus, and travel style.' },
  { icon: UsersRound, title: 'Trusted Friendly Guides', text: 'Warm, knowledgeable guiding makes the journey feel safe, human, and memorable.' },
  { icon: Mountain, title: 'Beautiful Destinations', text: 'From crater floors and savanna roads to Kilimanjaro trails and island coastlines.' },
  { icon: Binoculars, title: 'Wildlife Encounters', text: 'Designed around real safari rhythm: patience, movement, local knowledge, and wonder.' },
  { icon: Gem, title: 'Affordable and Luxury Options', text: 'Clean, launch-ready package choices for travelers at different comfort levels.' },
]

const testimonials = [
  {
    quote: 'The route felt thoughtful from the first call. Every day had a clear highlight, but nothing felt rushed.',
    source: 'Private safari guest',
  },
  {
    quote: 'Our guide made Tanzania feel alive. We saw incredible wildlife and still had time to slow down and enjoy it.',
    source: 'Family safari traveler',
  },
  {
    quote: 'Beautiful planning, honest advice, and a trip that balanced adventure with comfort.',
    source: 'Honeymoon safari couple',
  },
]

const faqs = [
  {
    question: 'What is the best time to visit Tanzania?',
    answer:
      'Tanzania is rewarding year-round. June to October is excellent for dry-season wildlife viewing, while January to March is strong for calving season and predator action in the Serengeti.',
  },
  {
    question: 'Do you offer budget and luxury safaris?',
    answer:
      'Yes. African Bold Safari can shape comfortable budget trips, classic mid-range safaris, and elevated luxury experiences depending on your travel style and priorities.',
  },
  {
    question: 'Can I combine safari with Zanzibar?',
    answer:
      'Absolutely. Many travelers pair Serengeti, Ngorongoro, Tarangire, or Lake Manyara with a Zanzibar beach extension for a balanced wildlife and coast itinerary.',
  },
  {
    question: 'Do you arrange Kilimanjaro trekking?',
    answer:
      'Yes. Kilimanjaro trekking can be planned with route guidance, pacing advice, and support for travelers who want to combine the mountain with safari or Zanzibar.',
  },
  {
    question: 'How do I contact African Bold Safari?',
    answer:
      'Use the WhatsApp button, contact form, phone placeholder, or email placeholder on this website. WhatsApp is the fastest way to start a conversation.',
  },
  {
    question: 'Can I request a custom itinerary?',
    answer:
      'Yes. Share your preferred dates, destinations, budget, group size, and comfort level, and the trip can be shaped into a custom Tanzania itinerary.',
  },
]

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [formStatus, setFormStatus] = useState('')
  const activeGalleryItem = activeGalleryIndex === null ? null : gallery[activeGalleryIndex]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setIsLoading(false), prefersReducedMotion ? 120 : 1300)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 18)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen)
    return () => document.body.classList.remove('nav-open')
  }, [navOpen])

  useEffect(() => {
    if (!activeGalleryItem) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveGalleryIndex(null)
      }
      if (event.key === 'ArrowLeft') {
        setActiveGalleryIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length))
      }
      if (event.key === 'ArrowRight') {
        setActiveGalleryIndex((current) => (current === null ? 0 : (current + 1) % gallery.length))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeGalleryItem])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' },
    )

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const parallaxItems = document.querySelectorAll('[data-parallax]')
    let ticking = false

    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        const rect = item.parentElement.getBoundingClientRect()
        const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight))
        item.style.transform = `translateY(${progress * -28}px) scale(1.04)`
      })
      ticking = false
    }

    const requestParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    updateParallax()
    window.addEventListener('scroll', requestParallax, { passive: true })
    window.addEventListener('resize', requestParallax)
    return () => {
      window.removeEventListener('scroll', requestParallax)
      window.removeEventListener('resize', requestParallax)
    }
  }, [])

  useEffect(() => {
    const alignHashTarget = () => {
      if (!window.location.hash) return
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (!target) return

      const header = document.querySelector('[data-header]')
      const headerOffset = (header?.offsetHeight || 0) + 24
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
      const previousBehavior = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
      window.requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = previousBehavior
      })
    }

    const scheduleHashAlignment = () => {
      ;[0, 200, 700, 1400, 2400].forEach((delay) => window.setTimeout(alignHashTarget, delay))
    }

    scheduleHashAlignment()
    window.addEventListener('hashchange', scheduleHashAlignment)
    return () => window.removeEventListener('hashchange', scheduleHashAlignment)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveTestimonialIndex((current) => (current + 1) % testimonials.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [])

  const closeNav = () => setNavOpen(false)

  const openGallery = (index) => setActiveGalleryIndex(index)

  const showPreviousGalleryImage = () => {
    setActiveGalleryIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length))
  }

  const showNextGalleryImage = () => {
    setActiveGalleryIndex((current) => (current === null ? 0 : (current + 1) % gallery.length))
  }

  const handleInquirySubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const formData = new FormData(form)
    const name = formData.get('name')?.toString().trim() || 'there'
    const destination = formData.get('destination')?.toString().trim() || 'Tanzania'
    const message = `Hello African Bold Safari, my name is ${name}. I am interested in ${destination}.`

    window.open(whatsAppHref(message), '_blank', 'noopener,noreferrer')
    setFormStatus('Inquiry noted. For the fastest response, continue on WhatsApp.')
    form.reset()
  }

  return (
    <>
      <div className={`page-loader${isLoading ? '' : ' is-hidden'}`} aria-hidden={!isLoading}>
        <div className="loader-mark">
          <img src={LOGO_SRC} alt="African Bold Safari Logo" />
          <span>RAW NATURE. BOLD VISION.</span>
        </div>
      </div>

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} data-header>
        <a className="brand" href="#home" aria-label="AFRICAN BOLD SAFARI home" onClick={closeNav}>
          <img src={LOGO_SRC} alt="African Bold Safari Logo" />
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={navOpen}
          onClick={() => setNavOpen((open) => !open)}
        >
          {navOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={closeNav}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero-bg"
            src={imageUrl('20179685', 2200)}
            alt="Safari vehicles and a hot air balloon crossing the Tanzanian savanna"
          />
          <div className="hero-shade" aria-hidden="true"></div>
          <div className="hero-sunlight" aria-hidden="true"></div>
          <div className="hero-dust" aria-hidden="true"></div>
          <div className="hero-birds" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="hero-content">
            <img className="hero-logo" src={LOGO_SRC} alt="African Bold Safari Logo" />
            <p className="eyebrow">RAW NATURE. BOLD VISION.</p>
            <h1 id="hero-title">Explore Tanzania with African Bold Safari</h1>
            <p className="hero-copy">
              Experience unforgettable safaris, iconic wildlife, breathtaking landscapes, and authentic Tanzanian
              adventures.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#destinations">
                <Map aria-hidden="true" />
                View Destinations
              </a>
              <a
                className="btn btn-ghost"
                href={whatsAppHref('Hello African Bold Safari, I would like to plan a Tanzania safari.')}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <ul className="hero-peek">
            <li>Serengeti Wildlife</li>
            <li>Mount Kilimanjaro</li>
            <li>Zanzibar Coast</li>
          </ul>
        </section>

        <section className="section intro-band reveal" aria-label="Company highlights">
          <div className="container intro-grid">
            <div>
              <p className="section-kicker">Tanzania, Designed With Care</p>
              <h2>Premium safari storytelling for a bold new travel brand.</h2>
            </div>
            <p>
              African Bold Safari brings travelers close to Tanzania's most powerful landscapes, from open savanna and
              crater floors to volcanic peaks and warm island shores.
            </p>
            <div className="intro-stat">
              <strong>11</strong>
              <span>Signature Destinations</span>
            </div>
          </div>
        </section>

        <section className="section" id="destinations" aria-labelledby="destinations-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-kicker">Destinations</p>
              <h2 id="destinations-title">Iconic Tanzania, Beautifully Curated</h2>
              <p>
                From legendary parks to mountain trails and island escapes, every destination is presented with a clear
                reason to go.
              </p>
            </div>

            <div className="card-grid destination-grid">
              {destinations.map((destination) => (
                <article className="destination-card reveal" key={destination.title}>
                  <img src={destination.image} alt={destination.alt} loading="lazy" />
                  <div>
                    <p>{destination.label}</p>
                    <h3>{destination.title}</h3>
                    <span>{destination.text}</span>
                    <a href="#contact">Explore</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section packages-section" id="packages" aria-labelledby="packages-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-kicker">Safari Packages</p>
              <h2 id="packages-title">Flexible Trips for Every Style of Adventure</h2>
              <p>
                Sample itineraries are simple, clear, and inquiry-focused so the company can launch without a booking
                engine.
              </p>
            </div>

            <div className="package-grid">
              {packages.map((tourPackage) => (
                <article className="package-card reveal" key={tourPackage.title}>
                  <img src={tourPackage.image} alt={tourPackage.alt} loading="lazy" />
                  <div className="package-body">
                    <span>{tourPackage.duration}</span>
                    <h3>{tourPackage.title}</h3>
                    <p>{tourPackage.text}</p>
                    <a className="text-link" href="#contact">
                      {tourPackage.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section why-section" id="why" aria-labelledby="why-title">
          <div className="container">
            <div className="split-heading reveal">
              <p className="section-kicker">Why Choose Us</p>
              <h2 id="why-title">Local Expertise, Natural Luxury, Bold Attention to Detail</h2>
            </div>
            <div className="why-grid">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article className="why-item reveal" key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="image-break" aria-label="Safari route inspiration">
          <img
            data-parallax
            src={imageUrl('33782125', 2200)}
            alt="Safari vehicle crossing a wide Mara landscape at soft morning light"
            loading="lazy"
          />
          <div className="container image-break-content reveal">
            <p>Private routes. Open horizons. Honest Tanzanian adventure.</p>
          </div>
        </section>

        <section className="section" id="gallery" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-kicker">Gallery</p>
              <h2 id="gallery-title">Wildlife, Landscapes, and Safari Atmosphere</h2>
              <p>A fast, elegant gallery with click-to-expand viewing for mobile and desktop visitors.</p>
            </div>

            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button
                  className={`gallery-item reveal${item.className ? ` ${item.className}` : ''}`}
                  type="button"
                  data-caption={item.caption}
                  key={item.caption}
                  onClick={() => openGallery(index)}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    sizes={item.className === 'wide' ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-media reveal">
              <img
                src={imageUrl('33650538', 1200)}
                alt="Travelers watching elephants from a safari vehicle in Tanzania"
                loading="lazy"
              />
            </div>
            <div className="about-copy reveal">
              <p className="section-kicker">About Us</p>
              <h2 id="about-title">African Bold Safari is built for raw beauty and confident travel.</h2>
              <p>
                African Bold Safari is a Tanzanian tour and travel company dedicated to creating unforgettable safari
                experiences across the country's most iconic destinations. From the vast plains of Serengeti to the
                majestic heights of Mount Kilimanjaro, we help travelers discover the raw beauty of Tanzania with bold
                vision, local expertise, and passion for adventure.
              </p>
              <ul className="route-line">
                <li>Arusha</li>
                <li>Tarangire</li>
                <li>Ngorongoro</li>
                <li>Serengeti</li>
                <li>Zanzibar</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section testimonials-section" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-kicker">Traveler Notes</p>
              <h2 id="testimonials-title">Stories From the Road</h2>
              <p>Warm guest notes help the new brand feel human, credible, and ready for real conversations.</p>
            </div>

            <div className="testimonial-grid">
              {testimonials.map((testimonial, index) => (
                <figure
                  className={`testimonial-card reveal${index === activeTestimonialIndex ? ' is-active' : ''}`}
                  key={testimonial.source}
                >
                  <blockquote>"{testimonial.quote}"</blockquote>
                  <figcaption>{testimonial.source}</figcaption>
                </figure>
              ))}
            </div>
            <div className="testimonial-dots" aria-label="Traveler note position">
              {testimonials.map((testimonial, index) => (
                <button
                  className={index === activeTestimonialIndex ? 'is-active' : ''}
                  type="button"
                  key={testimonial.source}
                  aria-label={`Show ${testimonial.source} note`}
                  aria-pressed={index === activeTestimonialIndex}
                  onClick={() => setActiveTestimonialIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div className="section-heading reveal">
              <p className="section-kicker">FAQ</p>
              <h2 id="faq-title">Helpful Answers Before You Travel</h2>
              <p>
                Clear first answers for travelers comparing safari routes, comfort levels, Zanzibar extensions, and
                custom Tanzania itineraries.
              </p>
            </div>

            <div className="faq-list" aria-label="Frequently asked questions">
              {faqs.map((faq) => (
                <details className="faq-item reveal" key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div className="contact-copy reveal">
              <p className="section-kicker">Contact</p>
              <h2 id="contact-title">Start Planning Your Tanzania Safari</h2>
              <p>
                Send a simple inquiry and African Bold Safari can shape the destination, duration, and budget into a
                practical first itinerary.
              </p>

              <div className="contact-actions">
                <a
                  className="btn btn-primary"
                  href={whatsAppHref('Hello African Bold Safari, I would like to inquire about a trip.')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle aria-hidden="true" />
                  WhatsApp Contact
                </a>
              </div>

              <ul className="contact-list">
                <li>
                  <Phone aria-hidden="true" />
                  <span>+255 759 047 484</span>
                </li>
                <li>
                  <Mail aria-hidden="true" />
                  <span>hello@africanboldsafari.com</span>
                </li>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>Arusha, Tanzania</span>
                </li>
              </ul>
            </div>

            <form className="contact-form reveal" onSubmit={handleInquirySubmit}>
              <label>
                Name
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Phone / WhatsApp
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                Destination of interest
                <select name="destination" required defaultValue="">
                  <option value="">Select a destination</option>
                  <option>Serengeti National Park</option>
                  <option>Mount Kilimanjaro</option>
                  <option>Ngorongoro Crater</option>
                  <option>Tarangire National Park</option>
                  <option>Lake Manyara National Park</option>
                  <option>Zanzibar</option>
                  <option>Custom Tanzania Safari</option>
                </select>
              </label>
              <label className="full">
                Message
                <textarea name="message" rows="5" required></textarea>
              </label>
              <button className="btn btn-dark full" type="submit">
                <Send aria-hidden="true" />
                Send Inquiry
              </button>
              <p className="form-status" role="status" aria-live="polite">
                {formStatus}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <a className="footer-brand" href="#home">
              <img src={LOGO_SRC} alt="African Bold Safari Logo" />
            </a>
            <p>Premium-feeling, simple-to-launch Tanzanian safari and travel experiences.</p>
          </div>
          <div>
            <h2>Quick Links</h2>
            <a href="#destinations">Destinations</a>
            <a href="#packages">Safari Packages</a>
            <a href="#why">Why Choose Us</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">About Us</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h2>Contact</h2>
            <p>+255 759 047 484</p>
            <p>hello@africanboldsafari.com</p>
            <p>Arusha, Tanzania</p>
          </div>
          <div>
            <h2>Social</h2>
            <a href="#contact">Instagram</a>
            <a href="#contact">Facebook</a>
            <a href="#contact">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AFRICAN BOLD SAFARI. All rights reserved.</p>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={whatsAppHref('Hello African Bold Safari, I would like to plan a trip.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
      </a>

      <div
        className={`lightbox${activeGalleryItem ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery image viewer"
        hidden={!activeGalleryItem}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveGalleryIndex(null)
        }}
      >
        {activeGalleryItem && (
          <>
            <button className="lightbox-close" type="button" aria-label="Close gallery" onClick={() => setActiveGalleryIndex(null)}>
              <X aria-hidden="true" />
            </button>
            <button className="lightbox-nav lightbox-prev" type="button" aria-label="Previous image" onClick={showPreviousGalleryImage}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <figure>
              <img src={activeGalleryItem.image.replace(/w=\d+/, 'w=1800')} alt={activeGalleryItem.alt} />
              <figcaption>{activeGalleryItem.caption}</figcaption>
            </figure>
            <button className="lightbox-nav lightbox-next" type="button" aria-label="Next image" onClick={showNextGalleryImage}>
              <ChevronRight aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </>
  )
}

export default App
