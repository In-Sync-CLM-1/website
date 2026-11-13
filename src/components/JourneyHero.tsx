import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoRequestModal from "./DemoRequestModal";
import type { JourneyHandle } from "./journey/engine";
import "./journey/journey.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap";
const ICON_FONT =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,500,1,0&icon_names=account_balance_wallet,account_tree,api,approval,badge,calculate,call,campaign,chat,checklist,cloud,confirmation_number,credit_score,dashboard,database,description,devices,document_scanner,event,event_available,face,group_add,key,language,link,location_on,lock,mail,memory,mic,payments,person_add,policy,quiz,receipt,receipt_long,record_voice_over,savings,school,settings,share,shopping_cart,smart_toy,support_agent,upload_file,verified_user&display=block";
const CARDS_QUERY = "(orientation: portrait) and (max-width: 760px)";

function addStylesheet(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

function useMatch(query: string) {
  const [on, setOn] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const fn = () => setOn(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, [query]);
  return on;
}

/**
 * Home page hero: the In-Sync build journey. The opening question is the page heading (pre-rendered for search engines);
 * "Show me" plays the 3D build in place. The 3D code loads after the page text, so the page opens as fast as before.
 */
const JourneyHero = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const handle = useRef<JourneyHandle | null>(null);
  const wantStart = useRef(false);
  const demoTrigger = useRef<HTMLButtonElement>(null);
  const [intro, setIntro] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cards = useMatch(CARDS_QUERY);

  useEffect(() => {
    addStylesheet(FONTS);
    if (!window.matchMedia(CARDS_QUERY).matches) addStylesheet(ICON_FONT);
  }, []);

  useEffect(() => {
    // The build-time pre-render captures the page heading only; the 3D build is for real visitors.
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;
    let cancelled = false;
    const load = () =>
      import("./journey/engine").then(({ mountJourney }) => {
        if (cancelled || !stageRef.current) return;
        if (!cards) addStylesheet(ICON_FONT);
        handle.current = mountJourney(stageRef.current, {
          cards,
          onIntro: (show) => {
            wantStart.current = !show;
            setIntro(show);
          },
          onOpenPage: (href) => navigate(href),
          onRequestDemo: () => demoTrigger.current?.click(),
        });
        setLoading(false);
        if (wantStart.current) handle.current.start();
      });
    const id = window.setTimeout(load, 400);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      handle.current?.destroy();
      handle.current = null;
    };
  }, [cards, navigate]);

  const showMe = () => {
    wantStart.current = true;
    if (handle.current) handle.current.start();
    else setLoading(true);
  };

  return (
    <section aria-label="How In-Sync builds your platform">
      <div ref={stageRef} className="isj">
        <div className="intro" hidden={!intro}>
          <div className="intro-card">
            <h1>
              <span className="intro-q">Are you ready for</span>
              <span className="intro-words">
                <span className="w1">SPEED</span>
                <span className="w2">PRECISION</span>
                <span className="w3">
                  ZERO BUILD COST<em>?</em>
                </span>
              </span>
            </h1>
            <p className="intro-sub">
              See how a business platform goes from signed-off requirements to live on Day 3, built from 37 ready
              blocks by experts and AI.
            </p>
            <div className="intro-ctas">
              <button type="button" className="btn primary intro-go" onClick={showMe} disabled={loading}>
                {loading ? "Loading…" : "Show me ›"}
              </button>
              <DemoRequestModal
                trigger={
                  <button type="button" className="btn intro-go">
                    Request Demo
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* opened from the products pop-up for products that have no page of their own */}
      <DemoRequestModal
        trigger={
          <button type="button" ref={demoTrigger} hidden aria-hidden="true" tabIndex={-1}>
            Request a demo
          </button>
        }
      />
    </section>
  );
};

export default JourneyHero;
