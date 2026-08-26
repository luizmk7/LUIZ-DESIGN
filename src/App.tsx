import React, { useState, useEffect, useRef, useTransition } from 'react';
import { CircularCarousel } from './components/ui/circular-carousel';
import {
  Search,
  ArrowRight,
  Menu,
  X,
  Calendar,
  MapPin,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Check,
  Compass,
  Sparkles,
  Sun,
  Layers,
  Eye
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: 'residencias' | 'interiores' | 'exteriores';
  location: string;
  year: string;
  area: string;
  image: string;
  images: string[];
  roomNames?: string[];
  description: string;
  tags: string[];
}

const ALL_PROJECTS: Project[] = [
  // Residências
  {
    id: 'casa-mata',
    name: 'Casa Mata',
    category: 'residencias',
    location: 'Vitória da Conquista, BA',
    year: '2025',
    area: '680 m²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
    ],
    roomNames: [
      '01. Fachada & Piscina de Borda Infinita',
      '02. Living & Área Social Integrada',
      '03. Cozinha Gourmet & Sala de Jantar',
      '04. Suíte Master Panorâmica'
    ],
    description: 'Inserida no relevo baiano, a Casa Mata harmoniza concreto aparente, brises de madeira cumaru e lâminas d’água que refletem a copa das árvores nativas.',
    tags: ['madeira', 'concreto', 'vitória da conquista', 'bahia', 'piscina', 'sustentável']
  },
  {
    id: 'casa-patio',
    name: 'Casa Pátio',
    category: 'residencias',
    location: 'Vitória da Conquista, BA',
    year: '2024',
    area: '540 m²',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ],
    roomNames: [
      '01. Pátio Central & Fachada Zenital',
      '02. Sala de Estar com Cobogós',
      '03. Área Gourmet & Varanda Verde',
      '04. Suíte Privativa Acolhedora'
    ],
    description: 'Organizada em torno de um pátio central verde, a residência utiliza luz zenital e cobogós de cerâmica para criar jogos dinâmicos e poéticos de sombra.',
    tags: ['pátio', 'luz', 'cobogó', 'vitória da conquista', 'bahia', 'modernismo', 'jardim']
  },
  {
    id: 'casa-brisa',
    name: 'Casa Brisa',
    category: 'residencias',
    location: 'Vitória da Conquista, BA',
    year: '2024',
    area: '420 m²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85'
    ],
    roomNames: [
      '01. Fachada Rústico-Contemporânea',
      '02. Varanda Social com Brisa Marítima',
      '03. Espaço Gourmet em Madeira Nativa',
      '04. Bangalô Suíte com Deck Externo'
    ],
    description: 'Refúgio praiano com pé-direito generoso, estrutura em madeira reflorestada e varandas fluidas totalmente abertas para a brisa constante do Atlântico.',
    tags: ['praia', 'trancoso', 'bahia', 'madeira', 'varanda', 'mar']
  },
  // Interiores
  {
    id: 'ap-terra',
    name: 'Apartamento Terra',
    category: 'interiores',
    location: 'Vitória da Conquista, BA',
    year: '2025',
    area: '310 m²',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Projeto de interiores focado no resgate do design autoral brasileiro, painéis de freijó ripado, mármore nacional e tecidos táteis em linho cru.',
    tags: ['interiores', 'são paulo', 'freijó', 'mármore', 'linho', 'design']
  },
  {
    id: 'loft-luz',
    name: 'Loft Luz',
    category: 'interiores',
    location: 'Vitória da Conquista, BA',
    year: '2024',
    area: '190 m²',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Integração contínua de ambientes sociais com marcenaria minimalista oculta, iluminação indireta cenográfica e paleta mineral aquecida.',
    tags: ['loft', 'curitiba', 'iluminação', 'minimalismo', 'marcenaria']
  },
  {
    id: 'refugio-sereno',
    name: 'Refúgio Sereno',
    category: 'interiores',
    location: 'Vitória da Conquista, BA',
    year: '2023',
    area: '280 m²',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Design de interiores acolhedor combinando pedra natural aquecida, lareira suspensa escultural e madeira de demolição com acabamento aveludado.',
    tags: ['gramado', 'lareira', 'pedra', 'aconchego', 'serra']
  },
  // Exteriores
  {
    id: 'piscina-vale',
    name: 'Piscina & Pátio Vale',
    category: 'exteriores',
    location: 'Vitória da Conquista, BA',
    year: '2025',
    area: '400 m²',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Deck em cumaru suspenso sobre espelho d’água e paisagismo nativo integrando a piscina de pedra Hijau ao horizonte infinito das montanhas.',
    tags: ['piscina', 'deck', 'cumaru', 'belo horizonte', 'paisagismo']
  },
  {
    id: 'jardim-secreto',
    name: 'Jardim Secreto',
    category: 'exteriores',
    location: 'Vitória da Conquista, BA',
    year: '2024',
    area: '350 m²',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Paisagismo tropical denso dialogando com pergolado em aço corten e percursos em pisadas de pedra rústica emolduradas por folhagens escultóricas.',
    tags: ['jardim', 'campinas', 'pergolado', 'corten', 'tropical']
  },
  {
    id: 'varanda-solarium',
    name: 'Varanda Solarium',
    category: 'exteriores',
    location: 'Vitória da Conquista, BA',
    year: '2023',
    area: '260 m²',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Área gourmet e solarium integrados à baía marítima com brises orientáveis em madeira e iluminação sutil pontual para o entardecer.',
    tags: ['angra', 'mar', 'gourmet', 'solarium', 'brises']
  }
];

const FEATURED_HOUSES = [
  {
    number: '01',
    title: 'Casa Alva',
    location: 'Vitória da Conquista, BA • 720 m²',
    year: '2025',
    desc: 'Residência manifesta do ateliê. Uma caixa permeável de concreto aparente e vidro estrutural emoldurada por jardim nativo com clima agradável da serra.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
  },
  {
    number: '02',
    title: 'Casa Bosque',
    location: 'Vitória da Conquista, BA • 580 m²',
    year: '2024',
    desc: 'Estrutura em madeira laminada colada (MLC) integrada ao relevo da Serra do Periperi em Vitória da Conquista, permitindo entrada contínua de luz filtrada pela vegetação.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
  },
  {
    number: '03',
    title: 'Casa Horizonte',
    location: 'Vitória da Conquista, BA • 810 m²',
    year: '2024',
    desc: 'Balanço arquitetônico suspenso sobre o planalto da Conquista, com caixilhos retráteis que convertem toda a área social em varanda panorâmica.',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
  }
];

const MATERIALS = [
  {
    num: '01',
    name: 'Madeira Cumaru',
    essence: 'calor',
    img: 'https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=500&q=80'
  },
  {
    num: '02',
    name: 'Pedra Quartzito',
    essence: 'permanência',
    img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=500&q=80'
  },
  {
    num: '03',
    name: 'Concreto Ripa',
    essence: 'textura',
    img: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=500&q=80'
  },
  {
    num: '04',
    name: 'Linho Natural',
    essence: 'suavidade',
    img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80'
  },
  {
    num: '05',
    name: 'Vegetação Nativa',
    essence: 'frescor',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=500&q=80'
  },
  {
    num: '06',
    name: 'Metal Dourado Fosco',
    essence: 'brilho sutil',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80'
  }
];

export default function App() {
  // Splash & Intro State
  const [showSplash, setShowSplash] = useState(true);
  const [splashCircleDrawn, setSplashCircleDrawn] = useState(false);

  // Navigation & Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Gallery Tabs State
  const [activeTab, setActiveTab] = useState<'residencias' | 'interiores' | 'exteriores'>('residencias');
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [galleryProgress, setGalleryProgress] = useState(33);

  // Featured Houses State
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isFeaturedTransitioning, setIsFeaturedTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Modals State
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalDragOffset, setModalDragOffset] = useState(0);
  const [isDraggingModal, setIsDraggingModal] = useState(false);
  const modalDragStartX = useRef(0);
  const isModalPointerDown = useRef(false);
  const [isImageZoomModalOpen, setIsImageZoomModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const zoomTouchStartX = useRef(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Reset modal image index & handle arrow key navigation for modal carousel & zoom lightbox
  useEffect(() => {
    setModalImageIndex(0);
    setModalDragOffset(0);
    setIsDraggingModal(false);
    isModalPointerDown.current = false;
    setIsImageZoomModalOpen(false);
    setZoomScale(1);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const images = selectedProject.images && selectedProject.images.length > 0
      ? selectedProject.images
      : [selectedProject.image];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageZoomModalOpen) {
          setIsImageZoomModalOpen(false);
          setZoomScale(1);
        } else {
          setSelectedProject(null);
        }
      } else if (e.key === 'ArrowRight') {
        setModalImageIndex((prev) => (prev + 1) % images.length);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
        setZoomScale(1);
      } else if (isImageZoomModalOpen && (e.key === '+' || e.key === '=')) {
        setZoomScale((prev) => Math.min(prev + 0.5, 3));
      } else if (isImageZoomModalOpen && e.key === '-') {
        setZoomScale((prev) => Math.max(prev - 0.5, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isImageZoomModalOpen]);

  // Process Scroll Progress
  const [processProgressMobile, setProcessProgressMobile] = useState(0);
  const processSectionRef = useRef<HTMLElement | null>(null);

  // Parallax Shift
  const [scrollY, setScrollY] = useState(0);

  // 1. Initial Splash Animation & Motion-Ready
  useEffect(() => {
    // Add motion-ready class to html after mount
    document.documentElement.classList.add('motion-ready');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowSplash(false);
      revealAllContent();
      return;
    }

    const timer1 = setTimeout(() => {
      setSplashCircleDrawn(true);
    }, 100);

    const timer2 = setTimeout(() => {
      setShowSplash(false);
      revealAllContent();
    }, 2200);

    // Safety fallback: ensure everything is visible
    const safetyTimer = setTimeout(() => {
      revealAllContent();
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Preload featured images
  useEffect(() => {
    FEATURED_HOUSES.forEach((item) => {
      const img = new Image();
      img.src = item.img;
    });
  }, []);

  // 2. Tab Indicator Positioning
  useEffect(() => {
    const currentBtn = tabRefs.current[activeTab];
    if (currentBtn) {
      setTabIndicatorStyle({
        left: currentBtn.offsetLeft,
        width: currentBtn.offsetWidth
      });
    }
  }, [activeTab]);

  // 3. Scroll Listener for Header, Parallax & Process Progress
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setScrollY(currentY);

          // Header Compact & Scrolled Styling
          if (currentY > 80) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }

          // Smart Hide Header on Mobile
          const delta = currentY - lastScrollY.current;
          if (window.innerWidth < 768 && currentY > 220 && !mobileDrawerOpen) {
            if (delta > 8) {
              setHideHeader(true);
            } else if (delta < -8) {
              setHideHeader(false);
            }
          } else {
            setHideHeader(false);
          }

          // Mobile Process Vertical Line Calculation
          if (processSectionRef.current) {
            const rect = processSectionRef.current.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
              const scrolledH = window.innerHeight * 0.6 - rect.top;
              const pct = Math.min(100, Math.max(0, (scrolledH / rect.height) * 100));
              setProcessProgressMobile(pct);
            }
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileDrawerOpen]);

  // 4. Scroll Reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const elements = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-mask-vert, .reveal-mask-horiz, .line-draw-h, .line-draw-v, .mask-line-inner'
    );
    elements.forEach((el) => observer.observe(el));

    // Mobile Gallery Cards Auto-Activation on Scroll
    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-card-active');
          } else {
            entry.target.classList.remove('is-card-active');
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.25
      }
    );

    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach((card) => galleryObserver.observe(card));

    return () => {
      observer.disconnect();
      galleryObserver.disconnect();
    };
  }, [activeTab]);

  // Safety Function to Reveal All
  function revealAllContent() {
    document
      .querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-mask-vert, .reveal-mask-horiz, .line-draw-h, .line-draw-v, .mask-line-inner'
      )
      .forEach((el) => {
        el.classList.add('is-revealed');
      });
  }

  // Keyboard Escape Handler for Modals and Drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (isContactModalOpen) setIsContactModalOpen(false);
        if (isSearchModalOpen) setIsSearchModalOpen(false);
        if (mobileDrawerOpen) setMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isContactModalOpen, isSearchModalOpen, mobileDrawerOpen]);

  // Body Scroll Lock when Modals or Drawer are open
  useEffect(() => {
    if (selectedProject || isContactModalOpen || isSearchModalOpen || mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject, isContactModalOpen, isSearchModalOpen, mobileDrawerOpen]);

  // Tab Switch handler
  const handleTabChange = (tab: 'residencias' | 'interiores' | 'exteriores') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setGalleryProgress(33);
  };

  // Featured Houses Switcher
  const handleFeaturedSwitch = (index: number) => {
    if (index === activeFeaturedIndex || isFeaturedTransitioning) return;
    setIsFeaturedTransitioning(true);
    setTimeout(() => {
      setActiveFeaturedIndex(index);
      setIsFeaturedTransitioning(false);
    }, 240);
  };

  // Featured Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchEndX.current < touchStartX.current - 45) {
      // Swipe left -> next
      const nextIdx = (activeFeaturedIndex + 1) % FEATURED_HOUSES.length;
      handleFeaturedSwitch(nextIdx);
    } else if (touchEndX.current > touchStartX.current + 45) {
      // Swipe right -> prev
      const prevIdx = (activeFeaturedIndex - 1 + FEATURED_HOUSES.length) % FEATURED_HOUSES.length;
      handleFeaturedSwitch(prevIdx);
    }
  };

  // Gallery Horizontal Scroll Progress & Active Card Detection
  const handleGalleryScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const max = target.scrollWidth - target.clientWidth;
    if (max > 0) {
      const pct = (target.scrollLeft / max) * 100;
      setGalleryProgress(Math.min(100, Math.max(30, pct)));
    }

    // On mobile horizontal swipe, also check the centered card
    const cards = target.querySelectorAll('.gallery-card');
    const containerCenter = target.getBoundingClientRect().left + target.clientWidth / 2;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      if (Math.abs(cardCenter - containerCenter) < rect.width * 0.45) {
        card.classList.add('is-card-active');
      } else {
        card.classList.remove('is-card-active');
      }
    });
  };

  // Search Filter
  const filteredProjects = ALL_PROJECTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
    );
  });

  // Handle Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setIsContactModalOpen(false);
    }, 2400);
  };

  const currentFeatured = FEATURED_HOUSES[activeFeaturedIndex];

  return (
    <div className="min-h-screen bg-alva-white text-graphite flex flex-col selection:bg-alva-red selection:text-warm-white">
      {/* 1. INITIAL ENTRANCE SPLASH (ALVA Emblem Gold Border Draw) */}
      {showSplash && (
        <div
          id="introSplash"
          aria-hidden="true"
          className={`fixed inset-0 z-[100] bg-wine flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${
            splashCircleDrawn ? 'opacity-100' : 'opacity-100'
          }`}
        >
          <div className="relative flex flex-col items-center px-6">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute inset-0 -m-8 bg-radial from-matte-gold/15 via-transparent to-transparent pointer-events-none blur-xl opacity-70" />

            {/* Logo Image */}
            <img
              src="https://res.cloudinary.com/lvl0nq3r/image/upload/v1787663687/jessica-roma-logo-dark-bg_slgoo2.webp"
              alt="Jéssica Roma Arquitetura"
              referrerPolicy="no-referrer"
              className={`relative z-10 w-48 sm:w-60 md:w-72 max-w-[80vw] h-auto object-contain transition-all duration-1000 transform ${
                splashCircleDrawn ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
              }`}
            />

            {/* Delicate Expanding Golden Accent Line */}
            <div className="mt-5 relative w-32 md:w-44 h-[1px] bg-matte-gold/20 overflow-hidden">
              <div
                className={`absolute inset-y-0 bg-gradient-to-r from-transparent via-matte-gold to-transparent w-full transition-all duration-1000 ${
                  splashCircleDrawn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. STICKY NAVIGATION HEADER */}
      <header
        id="mainHeader"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 ${
          isScrolled ? 'header-scrolled py-3' : 'py-6'
        } ${hideHeader ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between relative">
          {/* Left Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium"
            aria-label="Navegação Principal"
          >
            <a
              href="#galeria"
              className={`nav-link transition-colors duration-300 gold-underline ${
                isScrolled ? 'text-wine hover:text-alva-red' : 'text-white hover:text-light-gold'
              }`}
            >
              Projetos
            </a>
            <a
              href="#estudio"
              className={`nav-link transition-colors duration-300 gold-underline ${
                isScrolled ? 'text-wine hover:text-alva-red' : 'text-white hover:text-light-gold'
              }`}
            >
              Estúdio
            </a>
            <a
              href="#materiais"
              className={`nav-link transition-colors duration-300 gold-underline ${
                isScrolled ? 'text-wine hover:text-alva-red' : 'text-white hover:text-light-gold'
              }`}
            >
              Atmosferas
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobileMenuBtn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Abrir menu de navegação"
            className={`md:hidden flex items-center justify-center focus:outline-none touch-compress min-h-[44px] min-w-[44px] ${
              isScrolled ? 'text-wine' : 'text-white'
            }`}
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Center Logo */}
          <a
            href="#"
            className="group flex flex-col items-center justify-center focus:outline-none touch-compress"
            aria-label="Jéssica Roma - Página inicial"
          >
            <div
              className={`h-11 sm:h-12 md:h-14 px-2 py-1 flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? '' : 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              <img
                src="https://res.cloudinary.com/lvl0nq3r/image/upload/v1787663687/jessica-roma-logo-dark-bg_slgoo2.webp"
                alt="Jéssica Roma Arquitetura"
                className="h-8 sm:h-9 md:h-11 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Right Navigation & Action */}
          <div className="hidden md:flex items-center space-x-6 text-xs uppercase tracking-[0.2em] font-medium">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className={`nav-link transition-colors flex items-center gap-1.5 focus:outline-none gold-underline ${
                isScrolled ? 'text-wine hover:text-alva-red' : 'text-white hover:text-light-gold'
              }`}
              aria-label="Buscar projetos no portfólio"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Busca</span>
            </button>
            <a
              href="#contato"
              className={`nav-link transition-colors gold-underline ${
                isScrolled ? 'text-wine hover:text-alva-red' : 'text-white hover:text-light-gold'
              }`}
            >
              Contato
            </a>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-5 py-2.5 border border-matte-gold text-warm-white bg-alva-red/90 hover:bg-alva-red hover:border-light-gold transition-all duration-300 rounded-none tracking-[0.18em] btn-fill-red touch-compress shadow-sm"
            >
              Agendar conversa
            </button>
          </div>

          {/* Mobile Spacer to balance centered logo */}
          <div className="md:hidden w-[44px] h-[44px] pointer-events-none" aria-hidden="true" />
        </div>

        {/* Animated Gold Line across header on scroll */}
        <div className="header-line"></div>
      </header>

      {/* MOBILE DRAWER EDITORIAL MENU */}
      <div
        className={`fixed inset-0 bg-wine/80 backdrop-blur-md z-50 transition-opacity duration-300 md:hidden ${
          mobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileDrawerOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-wine z-50 flex flex-col justify-between p-8 text-warm-white transition-transform duration-300 transform md:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
      >
        <div className="flex justify-between items-center border-b border-matte-gold/30 pb-4">
          <span className="font-serif text-xl tracking-[0.2em] text-light-gold font-medium">
            JÉSSICA RAMOS
          </span>
          <button
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Fechar menu"
            className="text-warm-white p-2 focus:outline-none transition-transform duration-300 hover:rotate-90 touch-compress"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        <nav className="flex flex-col space-y-6 text-lg font-serif tracking-widest my-auto text-left">
          <a
            href="#galeria"
            onClick={() => setMobileDrawerOpen(false)}
            className="hover:text-light-gold transition-colors py-2 border-b border-matte-gold/20 gold-underline"
          >
            PROJETOS
          </a>
          <a
            href="#viver"
            onClick={() => setMobileDrawerOpen(false)}
            className="hover:text-light-gold transition-colors py-2 border-b border-matte-gold/20 gold-underline"
          >
            ATMOSFERAS
          </a>
          <a
            href="#estudio"
            onClick={() => setMobileDrawerOpen(false)}
            className="hover:text-light-gold transition-colors py-2 border-b border-matte-gold/20 gold-underline"
          >
            ESTÚDIO
          </a>
          <a
            href="#processo"
            onClick={() => setMobileDrawerOpen(false)}
            className="hover:text-light-gold transition-colors py-2 border-b border-matte-gold/20 gold-underline"
          >
            PROCESSO
          </a>
          <a
            href="#contato"
            onClick={() => setMobileDrawerOpen(false)}
            className="hover:text-light-gold transition-colors py-2 border-b border-matte-gold/20 gold-underline"
          >
            CONTATO
          </a>
        </nav>

        <div className="space-y-4 pt-4 border-t border-matte-gold/30">
          <button
            onClick={() => {
              setMobileDrawerOpen(false);
              setIsContactModalOpen(true);
            }}
            className="w-full py-3.5 bg-alva-red text-warm-white border border-matte-gold font-sans text-xs tracking-widest uppercase btn-fill-gold touch-compress"
          >
            Agendar conversa
          </button>
          <p className="text-[11px] text-center text-matte-gold tracking-widest uppercase font-light">
            Vitória da Conquista • Bahia
          </p>
        </div>
      </div>

      {/* 3. HERO CINEMATOGRÁFICO */}
      <section
        id="heroSection"
        className="relative w-full h-[92vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-wine"
      >
        {/* Layer 1: Parallax Background Photography */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-ivory">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Sala de estar contemporânea integrada ao jardim com luz natural e marcenaria em madeira brasileira"
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-[1.06] transition-transform duration-[1600ms] ease-out"
            style={{
              transform: `scale(1.05) translateY(${Math.min(36, scrollY * 0.12)}px)`
            }}
          />
          {/* Layer 2: Discreet Wine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-wine/90 via-wine/40 to-wine/30 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Layer 3: Independent Text Content */}
        <div
          id="heroContent"
          className="relative z-10 max-w-[1200px] mx-auto px-6 text-center text-warm-white flex flex-col items-center justify-center mt-12"
          style={{
            opacity: Math.max(0, 1 - scrollY / 380)
          }}
        >
          {/* Marker Tagline */}
          <div className="reveal-up mb-4">
            <span className="inline-block text-[11px] md:text-xs uppercase tracking-[0.35em] text-light-gold border-b border-matte-gold/50 pb-1 font-medium">
              ARQUITETURA RESIDENCIAL
            </span>
          </div>

          {/* Main Title with Vertical Mask Line-by-Line */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] mb-6 text-warm-white max-w-4xl">
            <span className="mask-line-container">
              <span className="mask-line-inner is-revealed">NOVAS FORMAS</span>
            </span>
            <span className="mask-line-container">
              <span className="mask-line-inner is-revealed">DE HABITAR</span>
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="reveal-up font-sans text-sm md:text-base tracking-wide text-ivory/90 max-w-xl font-light mb-8 leading-relaxed">
            Casas desenhadas para acolher luz, natureza e histórias.
          </p>

          {/* Action Button */}
          <div className="reveal-up">
            <a
              href="#galeria"
              className="inline-flex items-center space-x-3 border border-matte-gold px-8 py-3.5 text-xs tracking-[0.25em] uppercase text-warm-white hover:bg-alva-red hover:border-light-gold transition-all duration-300 shadow-lg group btn-hover-arrow touch-compress"
            >
              <span>Conhecer projetos</span>
              <ArrowRight className="w-4 h-4 text-light-gold" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center opacity-85 hover:opacity-100 transition-opacity">
          <span className="text-[9px] uppercase tracking-[0.3em] text-light-gold mb-2 font-medium">
            Explorar
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-matte-gold to-transparent scroll-indicator-anim"></div>
        </div>
      </section>

      {/* 4. GALERIA COM ABAS (PORTFÓLIO) */}
      <section id="galeria" className="py-24 px-6 md:px-12 bg-alva-white w-full border-b border-ivory">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 reveal-up">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-alva-red font-semibold block mb-2">
                Coleção de Projetos
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-graphite font-light tracking-tight">
                Atmosferas Autorais
              </h2>
            </div>

            {/* Functional Tab Buttons with Animated Gold Indicator */}
            <div
              className="relative flex items-center space-x-6 border-b border-ivory pb-2"
              role="tablist"
              aria-label="Categorias de projetos"
            >
              {(['residencias', 'interiores', 'exteriores'] as const).map((tabKey) => {
                const label =
                  tabKey === 'residencias'
                    ? 'Residências'
                    : tabKey === 'interiores'
                    ? 'Interiores'
                    : 'Exteriores';
                const isSelected = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    ref={(el) => {
                      tabRefs.current[tabKey] = el;
                    }}
                    onClick={() => handleTabChange(tabKey)}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${tabKey}`}
                    className={`font-serif text-lg md:text-xl pb-1 transition-colors focus:outline-none touch-compress ${
                      isSelected
                        ? 'text-alva-red font-medium'
                        : 'text-warm-gray hover:text-graphite'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <div
                className="tab-indicator"
                style={{
                  left: `${tabIndicatorStyle.left}px`,
                  width: `${tabIndicatorStyle.width}px`
                }}
              ></div>
            </div>
          </div>

          {/* Tab Content Gallery */}
          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            className="transition-all duration-300 ease-out"
          >
            {/* Desktop Grid / Mobile Horizontal Scroll */}
            <div
              onScroll={handleGalleryScroll}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 flex md:grid overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 md:pb-0"
            >
              {ALL_PROJECTS.filter((p) => p.category === activeTab).map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="gallery-card snap-center min-w-[85vw] sm:min-w-[60vw] md:min-w-0 group relative bg-warm-white overflow-hidden cursor-pointer border-b border-ivory transition-all duration-500 touch-compress"
                >
                  <div className="aspect-[3/4] overflow-hidden relative bg-ivory">
                    <img
                      src={proj.image}
                      alt={proj.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="gallery-img w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                    />
                    <div className="gallery-overlay absolute inset-0 bg-wine/0 md:group-hover:bg-wine/25 transition-all duration-500 flex items-center justify-center p-6 text-center opacity-0 md:group-hover:opacity-100">
                      <span className="gallery-btn text-xs uppercase tracking-[0.25em] text-light-gold border border-matte-gold px-4 py-2 bg-wine/80 transform translate-y-2 md:group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                        Explorar projeto
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-baseline">
                    <div>
                      <h3 className="gallery-title font-serif text-2xl text-graphite group-hover:text-alva-red transition-colors duration-300">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-warm-gray tracking-wider uppercase mt-1">
                        {proj.location}
                      </p>
                    </div>
                    <span className="font-serif text-sm text-matte-gold">{proj.year}</span>
                  </div>
                  <div className="gallery-bar h-0.5 bg-matte-gold transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Link */}
          <div className="mt-12 text-center reveal-up">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="inline-flex items-center space-x-2 font-serif text-xl text-alva-red hover:text-wine transition-colors group btn-hover-arrow touch-compress"
            >
              <span className="gold-underline font-light">Ver acervo completo do ateliê</span>
              <ArrowRight className="w-5 h-5 text-alva-red" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO "VIVER" */}
      <section id="viver" className="py-20 px-6 md:px-12 bg-warm-white w-full">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Ambient Photography with Horizontal Mask Reveal */}
          <div className="lg:col-span-7 relative group overflow-hidden bg-ivory reveal-mask-horiz">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
                alt="Sala de estar ampla integrada ao jardim externo"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/80 via-transparent to-transparent hidden md:block"></div>

              <div className="absolute bottom-8 left-8 right-8 text-warm-white hidden md:block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-light-gold block mb-2 font-medium">
                  Capítulo 01
                </span>
                <h3 className="font-serif text-4xl md:text-5xl font-light mb-3 transform transition-transform duration-500 group-hover:-translate-y-1">
                  Viver
                </h3>
                <p className="font-sans text-xs md:text-sm text-ivory/90 max-w-md font-light mb-6 leading-relaxed">
                  Espaços que aproximam rotina, conforto e paisagem.
                </p>
                <a
                  href="#galeria"
                  onClick={() => handleTabChange('interiores')}
                  className="inline-block text-xs uppercase tracking-[0.2em] border-b border-matte-gold text-light-gold pb-1 hover:text-warm-white transition-colors gold-underline"
                >
                  Explorar interiores →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Editorial Panels */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            {/* Panel 1: Luz */}
            <div className="editorial-panel reveal-right bg-alva-white p-8 border border-ivory hover:border-matte-gold transition-all duration-500 flex items-center space-x-6 group shadow-sm hover:shadow-md">
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-warm-white border border-matte-gold/40 flex flex-col items-center justify-center p-4 text-matte-gold group-hover:bg-alva-red group-hover:border-alva-red group-hover:text-warm-white transition-all duration-500 rounded-sm relative overflow-hidden">
                <Sun className="w-9 h-9 stroke-[1.25] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-radial from-matte-gold/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.25em] text-matte-gold font-semibold block mb-1">
                  01 — Filosofia
                </span>
                <h4 className="font-serif text-2xl text-graphite mb-2 group-hover:text-alva-red transition-colors">
                  Luz
                </h4>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Iluminação natural desenhada como elemento estrutural, projetando sombras dinâmicas ao longo do dia.
                </p>
              </div>
            </div>

            {/* Panel 2: Matéria */}
            <div className="editorial-panel reveal-right bg-alva-white p-8 border border-ivory hover:border-matte-gold transition-all duration-500 flex items-center space-x-6 group shadow-sm hover:shadow-md">
              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-warm-white border border-matte-gold/40 flex flex-col items-center justify-center p-4 text-matte-gold group-hover:bg-alva-red group-hover:border-alva-red group-hover:text-warm-white transition-all duration-500 rounded-sm relative overflow-hidden">
                <Layers className="w-9 h-9 stroke-[1.25] transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-radial from-matte-gold/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="relative">
                <span className="text-[10px] uppercase tracking-[0.25em] text-matte-gold font-semibold block mb-1">
                  02 — Sensorial
                </span>
                <h4 className="font-serif text-2xl text-graphite mb-2 group-hover:text-alva-red transition-colors">
                  Matéria
                </h4>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Texturas táteis escolhidas para envelhecer com nobreza: madeira maciça, pedras brutas e linho denso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO "COZINHAR E ENCONTRAR" */}
      <section className="py-24 px-6 md:px-12 bg-alva-white w-full border-t border-ivory overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & Editorial Callouts */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <span className="reveal-up text-xs uppercase tracking-[0.3em] text-alva-red font-semibold block mb-3">
              Convivência Autêntica
            </span>

            <h2 className="font-serif text-4xl md:text-6xl text-graphite font-light leading-tight mb-6">
              <span className="mask-line-container">
                <span className="mask-line-inner">Cozinhar</span>
              </span>
              <span className="mask-line-container">
                <span className="mask-line-inner">e encontrar</span>
              </span>
            </h2>

            <p className="reveal-up text-sm text-warm-gray leading-relaxed font-light mb-10 max-w-md">
              Ambientes pensados para os encontros cotidianos, onde a preparação do alimento se integra à conversa e à paisagem exterior.
            </p>

            <div className="space-y-6 border-l-2 border-alva-red/20 pl-6">
              <div className="reveal-up flex items-center space-x-4">
                <span className="font-serif text-xl text-matte-gold font-semibold">01</span>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-graphite font-semibold">
                    Pedra Quartzito Escovada
                  </h4>
                  <p className="text-xs text-warm-gray">
                    Bancada central resistente a altas temperaturas com acabamento aveludado.
                  </p>
                </div>
              </div>
              <div className="reveal-up flex items-center space-x-4">
                <span className="font-serif text-xl text-matte-gold font-semibold">02</span>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-graphite font-semibold">
                    Marcenaria em Pau-Ferro
                  </h4>
                  <p className="text-xs text-warm-gray">
                    Painéis ocultos com portas camarão e gaveteiros em acionamento sutil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Kitchen Photo with Vertical Mask */}
          <div className="lg:col-span-7 order-1 lg:order-2 reveal-mask-vert">
            <div className="aspect-[16/10] relative overflow-hidden shadow-xl bg-ivory">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
                alt="Cozinha integrada contemporânea com ilha em pedra e marcenaria em madeira"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-wine/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO PANORÂMICA EXTERNA ("ABRIR PARA A PAISAGEM") */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-wine text-warm-white overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden bg-ivory">
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2000&q=85"
            alt="Varanda e área externa com piscina integrada ao jardim tropical"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-[1.04] transition-transform duration-[2000ms] ease-out reveal-scale"
          />
          <div className="absolute inset-0 bg-wine/75 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <span className="reveal-up text-xs uppercase tracking-[0.35em] text-light-gold block mb-4 font-medium">
            Integração Externa
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
            <span className="mask-line-container">
              <span className="mask-line-inner">ABRIR A CASA</span>
            </span>
            <span className="mask-line-container">
              <span className="mask-line-inner">PARA A PAISAGEM</span>
            </span>
          </h2>
          <p className="reveal-up font-sans text-sm md:text-base text-ivory/90 max-w-xl mx-auto font-light mb-10 leading-relaxed">
            Arquitetura que deixa o clima, a luz e a vegetação nativa participarem ativamente do viver diário.
          </p>
          <div className="reveal-up">
            <a
              href="#galeria"
              onClick={() => handleTabChange('exteriores')}
              className="btn-hover-arrow px-8 py-3.5 bg-alva-white text-wine font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-light-gold hover:text-wine transition-all shadow-lg inline-flex items-center space-x-3 touch-compress"
            >
              <span>Ver áreas externas</span>
              <ArrowRight className="w-4 h-4 text-wine" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. CURATORIA DE MATERIAIS */}
      <section id="materiais" className="py-24 px-6 md:px-12 bg-warm-white w-full border-b border-ivory">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-up">
            <span className="text-xs uppercase tracking-[0.3em] text-alva-red font-semibold block mb-2">
              Matéria-Prima Autêntica
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-graphite font-light tracking-tight">
              UMA PALETA PARA CADA CASA
            </h2>
            <p className="text-xs md:text-sm text-warm-gray mt-4 font-light">
              Composição física de texturas nobres selecionadas para harmonizar com a luz tropical brasileira.
            </p>
          </div>

          {/* Mobile Circular Carousel */}
          <div className="block md:hidden my-4">
            <CircularCarousel
              autoPlayInterval={3500}
              items={MATERIALS.map((mat) => ({
                id: mat.num,
                title: mat.name,
                description: mat.essence,
                tag: `Nº ${mat.num}`,
                image: mat.img,
              }))}
            />
          </div>

          {/* Desktop Material Board Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {MATERIALS.map((mat) => (
              <div
                key={mat.num}
                className="material-card reveal-up group bg-alva-white p-4 border border-ivory hover:border-matte-gold transition-all duration-300 relative shadow-sm w-full"
              >
                <div className="aspect-square overflow-hidden mb-4 bg-warm-white">
                  <img
                    src={mat.img}
                    alt={mat.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                </div>
                <span className="font-serif text-lg text-matte-gold font-medium block">{mat.num}</span>
                <h3 className="text-xs uppercase tracking-wider text-graphite font-semibold mt-1">
                  {mat.name}
                </h3>
                <span className="text-[11px] text-warm-gray italic font-serif mt-0.5 block group-hover:translate-x-1 transition-transform">
                  {mat.essence}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-matte-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PROJETOS EM DESTAQUE (CASAS SELECIONADAS) */}
      <section className="py-24 px-6 md:px-12 bg-deep-red text-warm-white w-full">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-up">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-light-gold font-semibold block mb-2">
                Seleção Especial
              </span>
              <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-warm-white">
                CASAS SELECIONADAS
              </h2>
            </div>

            {/* Interactive Selector Tabs */}
            <div className="flex items-center space-x-4 mt-6 md:mt-0" role="tablist">
              {FEATURED_HOUSES.map((house, idx) => (
                <button
                  key={house.number}
                  onClick={() => handleFeaturedSwitch(idx)}
                  role="tab"
                  aria-selected={activeFeaturedIndex === idx}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border-b-2 transition-colors touch-compress ${
                    activeFeaturedIndex === idx
                      ? 'border-matte-gold text-light-gold font-semibold'
                      : 'border-transparent text-warm-white/70 hover:text-warm-white'
                  }`}
                >
                  {house.number}. {house.title}
                </button>
              ))}
            </div>
          </div>

          {/* Screen Reader Region */}
          <div className="sr-only" aria-live="polite">
            Exibindo {currentFeatured.title}
          </div>

          {/* Featured Display Container with Swipe Gesture on Mobile */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-alva-white p-8 md:p-12 border border-matte-gold/40 shadow-2xl transition-all duration-500 relative"
          >
            {/* Large Image */}
            <div className="lg:col-span-8 overflow-hidden aspect-[16/10] relative bg-ivory">
              <img
                src={currentFeatured.img}
                alt={currentFeatured.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  isFeaturedTransitioning ? 'opacity-40 scale-[0.985]' : 'opacity-100 scale-100'
                }`}
              />
            </div>

            {/* Project Specs */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div
                className={`transition-opacity duration-300 ${
                  isFeaturedTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="font-serif text-3xl text-matte-gold block mb-2">
                  {currentFeatured.number}
                </span>
                <h3 className="font-serif text-4xl text-graphite mb-2">{currentFeatured.title}</h3>
                <p className="text-xs uppercase tracking-widest text-alva-red font-medium mb-6">
                  {currentFeatured.location}
                </p>
                <p className="text-xs md:text-sm text-warm-gray leading-relaxed font-light mb-8">
                  {currentFeatured.desc}
                </p>
              </div>
              <div>
                <button
                  onClick={() =>
                    setSelectedProject({
                      id: `feat-${currentFeatured.title}`,
                      name: currentFeatured.title,
                      category: 'residencias',
                      location: currentFeatured.location,
                      year: currentFeatured.year,
                      area: '720 m²',
                      image: currentFeatured.img,
                      images: [
                        currentFeatured.img,
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'
                      ],
                      description: currentFeatured.desc,
                      tags: ['destaque', 'autoral']
                    })
                  }
                  className="w-full py-3.5 border border-matte-gold bg-alva-red hover:bg-wine text-warm-white text-xs uppercase tracking-[0.25em] transition-all btn-fill-gold touch-compress shadow-md"
                >
                  Descobrir a casa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PROCESSO DE ROLAGEM */}
      <section
        id="processo"
        ref={processSectionRef}
        className="py-24 px-6 md:px-12 bg-alva-white w-full relative"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto reveal-up">
            <span className="text-xs uppercase tracking-[0.3em] text-alva-red font-semibold block mb-2">
              Metodologia Sensorial
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-graphite font-light tracking-tight">
              DO PRIMEIRO TRAÇO À CASA VIVIDA
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Horizontal Line Draw */}
            <div className="hidden md:block w-full h-[2px] bg-ivory mb-8 relative">
              <div className="h-full bg-matte-gold line-draw-h"></div>
            </div>

            {/* Mobile Vertical Line Draw */}
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-ivory">
              <div
                className="w-full bg-matte-gold transition-all duration-300"
                style={{ height: `${processProgressMobile}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pl-10 md:pl-0">
              <div className="process-step reveal-up relative">
                <span className="step-num font-serif text-3xl text-matte-gold font-semibold block mb-3">
                  01
                </span>
                <h3 className="font-serif text-2xl text-graphite mb-2">Escuta</h3>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Entendemos o lugar, a orientação solar, a topografia e a rotina afetiva dos moradores.
                </p>
              </div>

              <div className="process-step reveal-up relative">
                <span className="step-num font-serif text-3xl text-matte-gold font-semibold block mb-3">
                  02
                </span>
                <h3 className="font-serif text-2xl text-graphite mb-2">Conceito</h3>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Definimos forma, volumetria, matéria e atmosfera sensorial inicial do espaço.
                </p>
              </div>

              <div className="process-step reveal-up relative">
                <span className="step-num font-serif text-3xl text-matte-gold font-semibold block mb-3">
                  03
                </span>
                <h3 className="font-serif text-2xl text-graphite mb-2">Projeto</h3>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Desenvolvemos cada solução técnica, detalhamento executivo e compatibilizações.
                </p>
              </div>

              <div className="process-step reveal-up relative">
                <span className="step-num font-serif text-3xl text-matte-gold font-semibold block mb-3">
                  04
                </span>
                <h3 className="font-serif text-2xl text-graphite mb-2">Acompanhamento</h3>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Preservamos a intenção arquitetônica e o esmero estético até a entrega das chaves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SOBRE O ESTÚDIO (HELENA ALVA) */}
      <section id="estudio" className="py-24 px-6 md:px-12 bg-warm-white w-full border-t border-b border-ivory">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Architect Photo with Slow Vertical Mask */}
          <div className="lg:col-span-6 reveal-mask-vert">
            <div className="aspect-[4/5] relative overflow-hidden bg-ivory">
              <img
                src="https://res.cloudinary.com/lvl0nq3r/image/upload/v1787666259/jessica-roma-foto_orblru.webp"
                alt="Arquiteta Jéssica Ramos em seu estúdio de criação"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-alva-white/90 p-4 border-l-2 border-matte-gold backdrop-blur-sm">
                <span className="text-[10px] uppercase tracking-widest text-alva-red font-semibold block">
                  Direção Criativa
                </span>
                <span className="font-serif text-lg text-graphite">Jéssica Ramos</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="reveal-up text-xs uppercase tracking-[0.3em] text-alva-red font-semibold block mb-3">
              O Estúdio
            </span>

            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light mb-6 leading-tight">
              <span className="mask-line-container">
                <span className="mask-line-inner">“Projetar é transformar</span>
              </span>
              <span className="mask-line-container">
                <span className="mask-line-inner">necessidades em atmosferas.”</span>
              </span>
            </h2>

            <p className="reveal-up text-sm text-warm-gray leading-relaxed font-light mb-8">
              O Ateliê Alva nasce da busca por uma arquitetura residencial brasileira atemporal, onde a sobriedade das linhas encontra o aconchego da matéria natural. Liderado por Jéssica Ramos, o estúdio assina residências exclusivas que privilegiam a luz natural, a ventilação cruzada e o diálogo com o jardim.
            </p>

            <div className="reveal-up relative pb-6 mb-6">
              <div className="w-24 h-[1px] bg-matte-gold line-draw-h"></div>
            </div>

            <div className="reveal-up">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center space-x-3 border border-alva-red text-alva-red px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:text-warm-white transition-all duration-300 btn-fill-red btn-hover-arrow touch-compress"
              >
                <span>Conhecer o ateliê</span>
                <ArrowRight className="w-4 h-4 text-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA FINAL */}
      <section className="relative w-full py-28 px-6 md:px-12 bg-wine text-warm-white overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden bg-ivory">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85"
            alt="Residência iluminada ao anoitecer"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform scale-[1.05] transition-transform duration-[2000ms] ease-out"
          />
          <div className="absolute inset-0 bg-wine/85 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <span className="reveal-up text-xs uppercase tracking-[0.35em] text-light-gold block mb-4 font-medium">
            Inicie seu projeto
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
            <span className="mask-line-container">
              <span className="mask-line-inner">QUAL ATMOSFERA</span>
            </span>
            <span className="mask-line-container">
              <span className="mask-line-inner">VOCÊ DESEJA PARA</span>
            </span>
            <span className="mask-line-container">
              <span className="mask-line-inner">A SUA CASA?</span>
            </span>
          </h2>

          <div className="reveal-up">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="btn-hover-arrow px-10 py-4 bg-matte-gold text-wine font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-light-gold transition-all shadow-xl mb-4 inline-flex items-center space-x-3 btn-fill-gold touch-compress"
            >
              <span>Começar um projeto</span>
              <ArrowRight className="w-4 h-4 text-wine" />
            </button>
          </div>

          <p className="reveal-up text-xs uppercase tracking-[0.2em] text-ivory/70 block mt-3 font-light">
            Atendimento presencial e remoto em todo o Brasil.
          </p>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer id="contato" className="bg-alva-white text-graphite border-t-2 border-matte-gold pt-16 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Col 1 */}
            <div className="reveal-up md:col-span-5">
              <span className="font-serif text-2xl tracking-[0.2em] text-alva-red font-semibold block mb-4">
                JÉSSICA RAMOS
              </span>
              <p className="text-xs text-warm-gray leading-relaxed max-w-sm font-light mb-6">
                Estúdio de arquitetura residencial, interiores e paisagismo focado no habitar autêntico e na poética dos materiais brasileiros.
              </p>
              <p className="text-xs text-warm-gray">Vitória da Conquista, Bahia</p>
            </div>

            {/* Col 2: Nav */}
            <div className="reveal-up md:col-span-3">
              <h4 className="text-xs uppercase tracking-[0.2em] text-matte-gold font-semibold mb-4">
                Navegação
              </h4>
              <ul className="space-y-2 text-xs uppercase tracking-widest text-warm-gray">
                <li>
                  <a href="#galeria" className="hover:text-alva-red transition-colors gold-underline">
                    Projetos
                  </a>
                </li>
                <li>
                  <a href="#viver" className="hover:text-alva-red transition-colors gold-underline">
                    Atmosferas
                  </a>
                </li>
                <li>
                  <a href="#estudio" className="hover:text-alva-red transition-colors gold-underline">
                    Estúdio
                  </a>
                </li>
                <li>
                  <a href="#processo" className="hover:text-alva-red transition-colors gold-underline">
                    Processo
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div className="reveal-up md:col-span-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-matte-gold font-semibold mb-4">
                Contato & Redes
              </h4>
              <ul className="space-y-2 text-xs tracking-wider text-warm-gray">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alva-red transition-colors inline-flex items-center gap-1.5 gold-underline"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3 text-matte-gold" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alva-red transition-colors inline-flex items-center gap-1.5 gold-underline"
                  >
                    <span>WhatsApp Direct</span>
                    <ExternalLink className="w-3 h-3 text-matte-gold" />
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:contato@ateliealva.com.br"
                    className="text-graphite hover:text-alva-red font-medium gold-underline"
                  >
                    contato@ateliealva.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-warm-gray border-t border-ivory pt-8">
            <p>© 2026 Jéssica Ramos Arquitetura. Todos os direitos reservados.</p>
            <p className="mt-2 sm:mt-0">Arquitetura Residencial Brasileira</p>
          </div>
        </div>

        {/* Giant Typography Banner "JÉSSICA" */}
        <div className="w-full overflow-hidden select-none pointer-events-none leading-none mt-2 sm:mt-0 mb-2 sm:-mb-16 md:-mb-24 opacity-90 text-center">
          <span
            id="giantFooterText"
            className="font-serif text-[16vw] sm:text-[18vw] md:text-[20vw] font-bold text-alva-red tracking-tight inline-block transform translate-y-0 sm:translate-y-1/6 md:translate-y-1/4 transition-transform duration-300 whitespace-nowrap"
          >
            JÉSSICA
          </span>
        </div>
      </footer>

      {/* MODAL 1: Lightbox Project Details */}
      {selectedProject && (() => {
        const images = selectedProject.images && selectedProject.images.length > 0
          ? selectedProject.images
          : [selectedProject.image];
        const activeImg = images[modalImageIndex] || images[0];

        const handlePrevImage = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
          setModalDragOffset(0);
        };

        const handleNextImage = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setModalImageIndex((prev) => (prev + 1) % images.length);
          setModalDragOffset(0);
        };

        // Touch handlers for swipe
        const handleTouchStart = (e: React.TouchEvent) => {
          if (images.length <= 1) return;
          modalDragStartX.current = e.touches[0].clientX;
          isModalPointerDown.current = true;
          setIsDraggingModal(true);
        };

        const handleTouchMove = (e: React.TouchEvent) => {
          if (!isModalPointerDown.current || images.length <= 1) return;
          const currentX = e.touches[0].clientX;
          const diff = currentX - modalDragStartX.current;
          if ((modalImageIndex === 0 && diff > 0) || (modalImageIndex === images.length - 1 && diff < 0)) {
            setModalDragOffset(diff * 0.3);
          } else {
            setModalDragOffset(diff);
          }
        };

        const handleTouchEnd = () => {
          if (!isModalPointerDown.current) return;
          isModalPointerDown.current = false;
          setIsDraggingModal(false);
          if (modalDragOffset < -40) {
            setModalImageIndex((prev) => (prev + 1) % images.length);
          } else if (modalDragOffset > 40) {
            setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
          }
          setModalDragOffset(0);
        };

        // Mouse drag handlers for desktop
        const handleMouseDown = (e: React.MouseEvent) => {
          if (e.button !== 0) return;
          modalDragStartX.current = e.clientX;
          isModalPointerDown.current = true;
          setIsDraggingModal(true);
        };

        const handleMouseMove = (e: React.MouseEvent) => {
          if (!isModalPointerDown.current || images.length <= 1) return;
          e.preventDefault();
          const currentX = e.clientX;
          const diff = currentX - modalDragStartX.current;
          if ((modalImageIndex === 0 && diff > 0) || (modalImageIndex === images.length - 1 && diff < 0)) {
            setModalDragOffset(diff * 0.3);
          } else {
            setModalDragOffset(diff);
          }
        };

        const handleMouseUp = () => {
          if (!isModalPointerDown.current) return;
          const diff = modalDragOffset;
          isModalPointerDown.current = false;
          setIsDraggingModal(false);
          if (diff < -40) {
            setModalImageIndex((prev) => (prev + 1) % images.length);
          } else if (diff > 40) {
            setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
          } else if (Math.abs(diff) < 5) {
            // Click without drag opens zoom lightbox
            setIsImageZoomModalOpen(true);
            setZoomScale(1);
          }
          setModalDragOffset(0);
        };

        const handleMouseLeave = () => {
          if (isModalPointerDown.current) {
            const diff = modalDragOffset;
            isModalPointerDown.current = false;
            setIsDraggingModal(false);
            if (diff < -40) {
              setModalImageIndex((prev) => (prev + 1) % images.length);
            } else if (diff > 40) {
              setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
            }
            setModalDragOffset(0);
          }
        };

        return (
          <div
            className="fixed inset-0 z-50 dialog-backdrop is-open flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="modal-panel bg-alva-white border border-matte-gold max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-alva-white/90 hover:bg-alva-white text-graphite hover:text-alva-red p-2 rounded-full border border-matte-gold/40 shadow-sm focus:outline-none touch-compress transition-colors"
                aria-label="Fechar janela"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* 1. Main Project Image Carousel with Real-time Drag and Swipe */}
              <div className="mb-6">
                <div
                  className={`aspect-[16/10] overflow-hidden bg-warm-white relative border border-ivory select-none ${
                    images.length > 1
                      ? isDraggingModal
                        ? 'cursor-grabbing'
                        : 'cursor-grab'
                      : 'cursor-zoom-in'
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Sliding Reel of all images */}
                  <div
                    className="w-full h-full flex"
                    style={{
                      transform: `translateX(calc(-${modalImageIndex * 100}% + ${modalDragOffset}px))`,
                      transition: isDraggingModal ? 'none' : 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {images.map((img, idx) => (
                      <div
                        key={img + idx}
                        className="w-full h-full flex-shrink-0 relative overflow-hidden bg-warm-white"
                      >
                        <img
                          src={img}
                          alt={`${selectedProject.name} - Vista ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          draggable={false}
                          className="w-full h-full object-cover pointer-events-none select-none"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Zoom/Expand Badge Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsImageZoomModalOpen(true);
                      setZoomScale(1);
                    }}
                    className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite/75 hover:bg-alva-red text-warm-white text-[11px] uppercase tracking-wider backdrop-blur-md border border-matte-gold/40 shadow-md transition-all duration-300 touch-compress hover:scale-105"
                    title="Ampliar imagem (Tela Cheia)"
                    aria-label="Ampliar imagem"
                  >
                    <Maximize2 className="w-3.5 h-3.5 stroke-[2]" />
                    <span className="hidden sm:inline font-medium">Ampliar</span>
                  </button>

                  {/* Instagram-style Pagination Dots */}
                  {images.length > 1 && (
                    <div
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-graphite/70 backdrop-blur-md border border-white/10 z-10 shadow-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setModalImageIndex(idx);
                            setModalDragOffset(0);
                          }}
                          className={`transition-all duration-300 rounded-full ${
                            modalImageIndex === idx
                              ? 'w-5 h-2 bg-matte-gold shadow-sm'
                              : 'w-2 h-2 bg-warm-white/50 hover:bg-warm-white/90'
                          }`}
                          aria-label={`Ir para foto ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Project Information & Metadata (Below Image) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ivory pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-alva-red font-semibold block mb-1">
                      Projeto Autoral • {selectedProject.category === 'residencias' ? 'Residência' : selectedProject.category === 'interiores' ? 'Interiores' : 'Exteriores'}
                    </span>
                    <h2 id="modalTitle" className="font-serif text-3xl md:text-4xl text-graphite">
                      {selectedProject.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-matte-gold uppercase tracking-widest font-medium">
                    <span>{selectedProject.location}</span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                    <span>•</span>
                    <span>{selectedProject.area}</span>
                  </div>
                </div>

                <p className="text-sm text-warm-gray leading-relaxed font-light py-1">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                {selectedProject.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 pb-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-warm-white border border-ivory text-warm-gray"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Action Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-ivory mt-4">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-alva-red text-warm-white text-xs uppercase tracking-widest hover:bg-wine transition-colors btn-fill-gold touch-compress shadow-md"
                >
                  Solicitar projeto semelhante
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs uppercase tracking-widest text-warm-gray hover:text-graphite touch-compress"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* FULLSCREEN IMAGE ZOOM & LIGHTBOX MODAL */}
      {isImageZoomModalOpen && selectedProject && (() => {
        const images = selectedProject.images && selectedProject.images.length > 0
          ? selectedProject.images
          : [selectedProject.image];
        const activeImg = images[modalImageIndex] || images[0];

        const handleZoomIn = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setZoomScale((prev) => Math.min(prev + 0.5, 3));
        };

        const handleZoomOut = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setZoomScale((prev) => Math.max(prev - 0.5, 1));
        };

        const handleResetZoom = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setZoomScale(1);
        };

        const handleToggleZoom = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setZoomScale((prev) => (prev > 1 ? 1 : 2));
        };

        const handlePrevImg = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
          setZoomScale(1);
        };

        const handleNextImg = (e?: React.MouseEvent) => {
          e?.stopPropagation();
          setModalImageIndex((prev) => (prev + 1) % images.length);
          setZoomScale(1);
        };

        return (
          <div
            className="fixed inset-0 z-[70] bg-graphite/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada da imagem"
            onClick={() => {
              setIsImageZoomModalOpen(false);
              setZoomScale(1);
            }}
          >
            {/* Top Navigation & Toolbar */}
            <div
              className="w-full flex items-center justify-between gap-3 text-warm-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.25em] text-matte-gold font-semibold">
                  {selectedProject.name} • Vista {modalImageIndex + 1} de {images.length}
                </span>
                <span className="text-xs text-warm-white/70 hidden sm:inline">
                  {selectedProject.location} • {selectedProject.area}
                </span>
              </div>

              {/* Zoom Actions Toolbar */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-alva-white/10 backdrop-blur-md border border-matte-gold/30 rounded-full px-2.5 py-1.5 shadow-lg">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-alva-white/20 disabled:opacity-30 disabled:hover:bg-transparent text-warm-white transition-all touch-compress"
                  title="Reduzir zoom (-)"
                  aria-label="Reduzir zoom"
                >
                  <ZoomOut className="w-4 h-4 stroke-[2]" />
                </button>

                <span className="text-[11px] font-mono tracking-wider px-1.5 min-w-[42px] text-center font-medium text-matte-gold">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-alva-white/20 disabled:opacity-30 disabled:hover:bg-transparent text-warm-white transition-all touch-compress"
                  title="Aumentar zoom (+)"
                  aria-label="Aumentar zoom"
                >
                  <ZoomIn className="w-4 h-4 stroke-[2]" />
                </button>

                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-alva-white/20 text-warm-white transition-all touch-compress"
                  title="Restaurar tamanho original"
                  aria-label="Restaurar tamanho"
                >
                  <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
                </button>

                <div className="w-[1px] h-4 bg-matte-gold/40 mx-1" />

                <button
                  type="button"
                  onClick={() => {
                    setIsImageZoomModalOpen(false);
                    setZoomScale(1);
                  }}
                  className="p-1.5 sm:p-2 rounded-full bg-alva-red/80 hover:bg-alva-red text-warm-white transition-all touch-compress"
                  title="Fechar ampliação (Esc)"
                  aria-label="Fechar ampliação"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Center Main Zoomed Canvas */}
            <div
              className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-3"
              onTouchStart={(e) => {
                zoomTouchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                const diff = zoomTouchStartX.current - e.changedTouches[0].clientX;
                if (diff > 50 && images.length > 1) {
                  handleNextImg();
                } else if (diff < -50 && images.length > 1) {
                  handlePrevImg();
                }
              }}
            >
              {/* Navigation arrows in Zoom mode */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImg}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-graphite/80 hover:bg-alva-red text-warm-white backdrop-blur-md border border-matte-gold/50 flex items-center justify-center transition-all duration-300 touch-compress hover:scale-110 shadow-2xl focus:outline-none z-30"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImg}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-graphite/80 hover:bg-alva-red text-warm-white backdrop-blur-md border border-matte-gold/50 flex items-center justify-center transition-all duration-300 touch-compress hover:scale-110 shadow-2xl focus:outline-none z-30"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2]" />
                  </button>
                </>
              )}

              {/* Interactive Zoomable Image */}
              <div
                className="max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ease-out"
                onClick={handleToggleZoom}
                style={{
                  transform: `scale(${zoomScale})`,
                  cursor: zoomScale > 1 ? 'zoom-out' : 'zoom-in'
                }}
              >
                <img
                  src={activeImg}
                  alt={`${selectedProject.name} - Ampliação ${modalImageIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[72vh] sm:max-h-[80vh] max-w-[94vw] w-auto h-auto object-contain rounded shadow-2xl select-none"
                />
              </div>
            </div>

            {/* Bottom Thumbnails & Controls */}
            <div
              className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-warm-white/80 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[11px] tracking-wider text-warm-white/60 text-center sm:text-left order-2 sm:order-1">
                Toque ou clique para alternar zoom • Teclas <kbd className="px-1.5 py-0.5 bg-alva-white/10 rounded text-[10px] text-matte-gold">+</kbd> / <kbd className="px-1.5 py-0.5 bg-alva-white/10 rounded text-[10px] text-matte-gold">-</kbd> • <kbd className="px-1.5 py-0.5 bg-alva-white/10 rounded text-[10px] text-matte-gold">Esc</kbd> fechar
              </p>

              {/* Mini thumbnails strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 order-1 sm:order-2">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => {
                        setModalImageIndex(idx);
                        setZoomScale(1);
                      }}
                      className={`relative w-12 h-10 sm:w-14 sm:h-11 rounded overflow-hidden border transition-all duration-300 touch-compress flex-shrink-0 ${
                        modalImageIndex === idx
                          ? 'border-matte-gold ring-2 ring-matte-gold/40 scale-105'
                          : 'border-white/20 opacity-50 hover:opacity-100'
                      }`}
                      aria-label={`Ver foto ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* MODAL 2: Agendar Conversa / Contact Modal */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 dialog-backdrop is-open flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contactModalTitle"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="modal-panel bg-warm-white border border-matte-gold max-w-xl w-full p-8 md:p-10 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-6 right-6 text-graphite hover:text-alva-red p-2 focus:outline-none touch-compress"
              aria-label="Fechar janela"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-alva-red font-semibold block mb-2">
              Atendimento Exclusivo
            </span>
            <h2 id="contactModalTitle" className="font-serif text-3xl text-graphite mb-2">
              AGENDAR CONVERSA
            </h2>
            <p className="text-xs text-warm-gray mb-6">
              Preencha os dados abaixo para alinharmos os primeiros traços da sua futura residência com o ateliê.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-graphite font-semibold mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="w-full p-3 bg-alva-white border border-ivory text-xs focus:border-matte-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-graphite font-semibold mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full p-3 bg-alva-white border border-ivory text-xs focus:border-matte-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-graphite font-semibold mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full p-3 bg-alva-white border border-ivory text-xs focus:border-matte-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-graphite font-semibold mb-1">
                  Local do Projeto & Cidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Vitória da Conquista - BA"
                  className="w-full p-3 bg-alva-white border border-ivory text-xs focus:border-matte-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-graphite font-semibold mb-1">
                  Mensagem ou Detalhes do Terreno
                </label>
                <textarea
                  rows={3}
                  placeholder="Conte-nos brevemente sobre suas expectativas..."
                  className="w-full p-3 bg-alva-white border border-ivory text-xs focus:border-matte-gold focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-alva-red text-warm-white text-xs uppercase tracking-[0.25em] font-semibold border border-matte-gold hover:bg-wine transition-all btn-fill-gold touch-compress shadow-md"
              >
                Enviar solicitação
              </button>
            </form>

            {contactSubmitted && (
              <div className="mt-4 p-3 bg-green-900/20 text-green-800 text-xs text-center border border-green-800/30 flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-700" />
                <span>Solicitação enviada com sucesso! Entraremos em contato em breve.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Search Portfolio Dialog */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-50 dialog-backdrop is-open flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="searchModalTitle"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div
            className="modal-panel bg-alva-white border border-matte-gold max-w-lg w-full p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="absolute top-6 right-6 text-graphite hover:text-alva-red p-2 focus:outline-none touch-compress"
              aria-label="Fechar busca"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.3em] text-alva-red font-semibold block mb-2">
              Acervo Ateliê
            </span>
            <h2 id="searchModalTitle" className="font-serif text-2xl text-graphite mb-4">
              BUSCAR NO PORTFÓLIO
            </h2>

            <div className="relative mb-4">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite localização, material ou estilo (ex: Vitória da Conquista, Madeira, Mármore)..."
                className="w-full p-3 pl-9 bg-warm-white border border-matte-gold text-xs focus:outline-none"
              />
              <Search className="w-4 h-4 text-matte-gold absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
              {filteredProjects.length === 0 ? (
                <p className="text-warm-gray italic p-3">Nenhum projeto encontrado para esta busca.</p>
              ) : (
                filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      setSelectedProject(p);
                    }}
                    className="p-3 border-b border-ivory hover:bg-warm-white cursor-pointer flex justify-between items-center touch-compress transition-colors"
                  >
                    <div>
                      <span className="font-serif text-base font-medium text-graphite block">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-warm-gray uppercase tracking-wider">
                        {p.area} • {p.year}
                      </span>
                    </div>
                    <span className="text-matte-gold uppercase text-[10px] tracking-widest font-medium">
                      {p.location}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
