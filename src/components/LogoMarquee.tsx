const CLIENT_LOGOS = [
  { src: '/logos/quess.png', alt: 'Quess Corp' },
  { src: '/logos/motherson.jpg', alt: 'Motherson' },
  { src: '/logos/hiranandani.png', alt: 'Hiranandani' },
  { src: '/logos/audi.png', alt: 'Audi' },
  { src: '/logos/college-dekho.jpg', alt: 'College Dekho' },
  { src: '/logos/zolve.webp', alt: 'Zolve' },
  { src: '/logos/capital-india.webp', alt: 'Capital India' },
  { src: '/logos/ecofy.png', alt: 'Ecofy' },
  { src: '/logos/zopper.png', alt: 'Zopper' },
  { src: '/logos/alice-blue.png', alt: 'Alice Blue' },
  { src: '/logos/ezeepay.png', alt: 'Ezeepay' },
  { src: '/logos/incred.png', alt: 'InCred' },
  { src: '/logos/seeds.png', alt: 'Seeds' },
  { src: '/logos/growthvine.png', alt: 'GrowthVine' },
  { src: '/logos/uhc.png', alt: 'UHC' },
  { src: '/logos/car-trends.webp', alt: 'Car Trends' },
  { src: '/logos/legitquest.png', alt: 'LegitQuest' },
  { src: '/logos/evco.jpg', alt: 'EV Co' },
  { src: '/logos/bluspring.png', alt: 'BluSpring' },
  { src: '/logos/cubit.jpeg', alt: 'Cubit' },
  { src: '/logos/smb-connect.jpg', alt: 'SMB Connect' },
  { src: '/logos/rb.jpg', alt: 'RB' },
];

export function LogoMarquee({ className = '' }: { className?: string }) {
  return (
    <section className={`relative border-t border-border/50 bg-muted/30 py-14 sm:py-16 ${className}`}>
      <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trusted by 100+ businesses across India
      </p>
      <div className="space-y-5 overflow-hidden">
        {[0, 1].map((row) => {
          const rowLogos =
            row === 0
              ? CLIENT_LOGOS.slice(0, Math.ceil(CLIENT_LOGOS.length / 2))
              : CLIENT_LOGOS.slice(Math.ceil(CLIENT_LOGOS.length / 2));
          const doubled = [...rowLogos, ...rowLogos];
          return (
            <div key={row} className="relative flex overflow-hidden">
              <div
                className={`flex shrink-0 items-center gap-8 ${
                  row === 0 ? 'animate-marquee' : 'animate-marquee-reverse'
                }`}
              >
                {doubled.map((logo, i) => (
                  <div key={`${row}-${i}`} className="flex h-12 w-28 shrink-0 items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-full max-w-full object-contain grayscale opacity-55 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
