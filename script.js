// 1. ACTIVE NAVIGATION HIGHLIGHT LOGIC
const sections = document.querySelectorAll('main, section');
const navLinks = document.querySelectorAll('.nav-link');

const activeClasses = ['font-semibold', 'bg-white/10', 'text-white', 'shadow-sm', 'hover:bg-white/20'];
const inactiveClasses = ['font-medium', 'text-zinc-400', 'hover:text-white'];

const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let currentId = entry.target.getAttribute('id');
            if (currentId === 'about') currentId = 'home';
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.remove(...inactiveClasses);
                    link.classList.add(...activeClasses);
                } else {
                    link.classList.remove(...activeClasses);
                    link.classList.add(...inactiveClasses);
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    if (section.id) observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 2. TECH STACK LOGIC
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techTiles = document.querySelectorAll('.tech-tile');
    const gridContainer = document.getElementById('tech-grid');
    
    const gridWrapper = document.getElementById('tech-grid-wrapper');
    const expandOverlay = document.getElementById('tech-expand-overlay');
    const expandBtn = document.getElementById('expand-stack-btn');
    const btnText = document.getElementById('expand-btn-text');
    const btnIcon = document.getElementById('expand-btn-icon');
    let isStackExpanded = false;

    function toggleStack() {
        if (!isStackExpanded) {
            isStackExpanded = true;
            gridWrapper.style.maxHeight = gridWrapper.scrollHeight + 100 + 'px';
            gridWrapper.classList.remove('stack-mask');
            expandOverlay.classList.remove('h-32');
            expandOverlay.classList.add('h-20');
            btnText.innerText = "Collapse Tech Stack";
            btnIcon.classList.add('rotate-180', 'group-hover:-translate-y-0.5');
            btnIcon.classList.remove('group-hover:translate-y-0.5');
            setTimeout(() => {
                if(isStackExpanded) gridWrapper.style.maxHeight = 'none';
            }, 1000); 
        } else {
            isStackExpanded = false;
            gridWrapper.style.maxHeight = gridWrapper.scrollHeight + 'px';
            void gridWrapper.offsetWidth; 
            gridWrapper.style.maxHeight = '440px';
            gridWrapper.classList.add('stack-mask');
            expandOverlay.classList.add('h-32');
            expandOverlay.classList.remove('h-20');
            btnText.innerText = "Reveal Full Stack";
            btnIcon.classList.remove('rotate-180', 'group-hover:-translate-y-0.5');
            btnIcon.classList.add('group-hover:translate-y-0.5');
            document.getElementById('techstack').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if(expandBtn) expandBtn.addEventListener('click', toggleStack);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            if (!isStackExpanded) toggleStack(); 

            filterBtns.forEach(b => {
                b.classList.remove('bg-purple-500/20', 'text-purple-300', 'border-purple-500/50', 'shadow-[0_0_15px_rgba(168,85,247,0.2)]', 'active');
                b.classList.add('bg-[#121216]/60', 'text-zinc-400', 'border-white/10');
            });
            
            btn.classList.remove('bg-[#121216]/60', 'text-zinc-400', 'border-white/10');
            btn.classList.add('bg-purple-500/20', 'text-purple-300', 'border-purple-500/50', 'shadow-[0_0_15px_rgba(168,85,247,0.2)]', 'active');

            const filterValue = btn.getAttribute('data-filter');
            gridContainer.style.minHeight = gridContainer.offsetHeight + 'px';

            techTiles.forEach(tile => {
                const category = tile.getAttribute('data-category');
                if (filterValue !== 'all' && category !== filterValue) {
                    tile.style.opacity = '0';
                    tile.style.transform = 'scale(0.9)';
                }
            });

            setTimeout(() => {
                techTiles.forEach(tile => {
                    const category = tile.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        tile.style.display = 'flex';
                    } else {
                        tile.style.display = 'none';
                    }
                });

                gridContainer.style.minHeight = 'auto';
                setTimeout(() => {
                    techTiles.forEach(tile => {
                        if (tile.style.display === 'flex') {
                            tile.style.opacity = '1';
                            tile.style.transform = 'scale(1)';
                        }
                    });
                }, 50);
            }, 300);
        });
    });

    //3. MODAL & PROJECT DATA LOGIC
    const projectDatabase = {
        'gradegaze': {
            title: 'GradeGaze',
            domain: 'Predictive ML & Regression Pipelines',
            toolkit: 'Python // XGBoost // Scikit-Learn // Matplotlib',
            problem: 'Academic performance evaluation is usually reactive, relying on past report cards rather than mathematically parsing multi-variable behaviors to forecast score trajectories before it’s too late.',
            summary: 'A clean, straightforward machine learning tool built to predict future academic marks before the final exams even arrive. By feeding past performance data into a high-performance XGBoost model, the system bypasses guesswork to spot scoring trends early. It handles all the backend data processing and translates complex machine learning predictions into simple, easy-to-read charts using Matplotlib, letting students and educators see exactly where their grades are heading.',
            image: 'images/gradegaze.png'
        },
        'summarease': {
            title: 'SummarEase',
            domain: 'NLP & Text Distillation',
            toolkit: 'Python // T5 Transformers // BeautifulSoup4 // FastAPI',
            problem: 'The internet is drowning in information. When you open a long-form article or research paper, the core insights are usually buried under thousands of words of fluff, ads, and page layout clutter, wasting massive amounts of reading time.',
            summary: 'An AI-powered reading assistant that instantly extracts the absolute core summary from any long-form web page. Under the hood, the system deploys automated web-scraping pipelines using BeautifulSoup4 to target a URL, bypass layout noise, and extract raw text across diverse web structures. This unstructured data is then cleaned and funneled into a fine-tuned, state-of-the-art T5 sequence-to-sequence Transformer model to generate human-grade neural text summaries. The entire engine is wrapped in a highly optimized FastAPI backend to ensure lightning-fast execution speeds.',
            image: 'images/summarease.png'
        },
        'rekord': {
            title: 'Rekord',
            domain: 'Web3 Data & Gasless Protocol',
            toolkit: 'EIP-712 // Soulbound Tokens (SBTs) // IPFS',
            problem: 'Traditional digital certificates are easily forged, while standard Web3 minting forces users to pay volatile network gas fees. Furthermore, virtual events suffer from massive badge fraud, as there is usually no automated way to prove someone actually stayed and paid attention.',
            summary: 'A decentralized protocol that turns event participation into permanent, on-chain Soulbound NFT credentials. It serves as a secure digital proxy for any real-world certificate, gamifying the experience with different tier levels. To prevent virtual event fraud, the backend features an automated verification pipeline that parses raw participant session data and enforces a strict attendance threshold. Eligible users can then claim their badges completely gas-free, thanks to an optimized EIP-712 meta-transaction layer that handles all minting fees server-side.',
            image: 'images/rekord.png'
        },
        'hopin': {
            title: 'Hop In',
            domain: 'Concurrent Backend Architecture',
            toolkit: 'Python // Django // PostgreSQL // State Optimization',
            problem: 'College students face a daily challenge: finding reliable transportation. Students spend hours arranging rides, dealing with inconsistent pricing, or relying on unsafe, unofficial arrangements, all while hundreds of vehicle seats go unused on campus every day.',
            summary: 'A lightweight, secure peer-to-peer ride-sharing network built exclusively for verified college students to share their daily commutes without corporate overhead or surge pricing. Built using a robust Django server architecture, the backend manages complex relational database logic via PostgreSQL to handle live user states without bottlenecking. It features streamlined spatial coordination logic to synchronize driver routes with passenger pickup demands in real-time, safely matching students heading along the same paths.',
            image: 'images/hopin.png'
        },
        'weatherornot': {
            title: 'WeatherOrNot',
            domain: 'Time-Series Predictive Pipelines',
            toolkit: 'Python // Pandas // NumPy // Scikit-Learn',
            problem: 'Most weather applications don\'t actually do any data science; they simply fetch pre-computed forecasts from a commercial API and display them. They rely entirely on external third-party engines rather than modeling raw historical data.',
            summary: 'A predictive climate tool that bypasses ready-made forecasts to calculate weather trajectories from scratch. The system continuously maintains a dynamic rolling window of the past 30 days of historical weather metrics, paired with live telemetry captured right up to the current moment. Using Pandas and NumPy to clean and stream this continuous data feed, the architecture pipes the real-time datasets into custom Scikit-Learn regression and classification pipelines to forecast immediate changes in the weather matrix.',
            image: 'images/weatherornot.png'
        },
        'credchain': {
            title: 'CredChain',
            domain: 'Web3 & Decentralized Reputation Infrastructure',
            toolkit: 'Solidity // Python (Web3.py) // Flask // MoonBase (Polkadot) // IPFS',
            problem: 'Centralized freelancing platforms completely control user reputation data, lock freelancers into their walled gardens, and charge massive service fees. Furthermore, these platforms lack an immutable, transparent way to prove code authorship or verify that a freelancer\'s portfolio isn\'t just copied and pasted from someone else.',
            summary: 'A decentralized professional identity network built on Polkadot’s MoonBase EVM layer that gives freelancers absolute ownership over their work history. To eliminate fake portfolios, the backend utilizes Web3.py and Solidity smart contracts to securely bind a cryptographic hash proof of a deliverable directly to the freelancer\'s on-chain identity. Once a client authenticates via MetaMask, their feedback is instantly committed to the blockchain, automatically minting verifiable milestone skill badges backed by decentralized IPFS metadata.',
            image: 'images/credchain.png'
        },
        'rollcall3': {
            title: 'RollCall3',
            domain: 'Web3 Integration & Automated Gatekeeping Pipelines',
            toolkit: 'Python // Flask // Pandas // POAP API',
            problem: 'Manually sorting through virtual meeting logs to check who actually attended an event and then sending out individual digital reward badges to hundreds of participants takes hours of administrative work. Organizers also struggle to filter out ghost users who join a stream for two minutes just to farm rewards.',
            summary: 'An automated attendance verification and Web3 incentive distribution engine designed to bridge real-world meeting data with digital rewards. Acting as an intelligent coordinator, the system uses Pandas to instantly parse raw Zoom CSV reports, normalize messy session timestamps, and enforce a strict 80% attendance duration threshold to weed out fraudulent claims. Qualified attendees are automatically mapped, and the backend hooks directly into the official POAP API to request mint links and distribute them via automated email queues.',
            image: 'images/rollcall3.png'
        },
        'ecommerce': {
            title: 'E-Commerce Linear Regression',
            domain: 'Foundational Analytics & Statistical Modeling',
            toolkit: 'Scikit-Learn // Pandas // Linear Modeling',
            problem: 'E-commerce companies burn through marketing budgets blindly without understanding exactly which digital user behaviors directly scale revenue.',
            summary: 'A targeted data science project built to analyze consumer purchasing behavior and isolate specific economic levers. Serving as a crucial milestone in my data science foundations, the project handles exploratory regression modeling over historical digital transactions. By leveraging Scikit-Learn to isolate feature coefficients and clear out multicollinearity, the model quantifies how platform session metrics directly affect final cart conversions, providing an empirical roadmap for platform revenue optimization.',
            image: 'images/ecommerce.png'
        },
        'pingpalm': {
            title: 'PingPalm',
            domain: 'Computer Vision & Human-Computer Interaction',
            toolkit: 'Python // OpenCV // MediaPipe // Pygame',
            problem: 'Traditional keyboard and mouse controls for local multiplayer games can feel static and disconnected. However, moving to touchless, gesture-based controls requires transforming raw webcam video frames into precise, real-time gaming inputs without introducing erratic tracking jitter or frame lag that breaks the gameplay physics.',
            summary: 'A real-time, gesture-controlled multiplayer Pong game that transforms your palms into digital game controllers. Built on top of Pygame, the backend leverages MediaPipe to isolate and track the coordinate vectors of both players\' index fingers simultaneously through a live webcam feed. The engine constantly maps these physical spatial data points into the digital game loop, handling dynamic ball physics, mid-game obstacle generation, and velocity scaling that spikes the ball\'s speed with every successful paddle collision.',
            image: 'images/pingpalm.png'
        },
        'dino': {
            title: 'Once a Dino, Always a Dino',
            domain: '2D Game Development & Interactive Storytelling',
            toolkit: 'Godot Engine // GDScript // 2D Art & Animation',
            problem: 'Most classic running games are basic, loop-based endless runners that lack narrative depth, level progression, or complex state management. Building a story-driven runner requires managing transitions across multiple environments, handling complex state logic for collectibles, and optimizing render performance.',
            summary: 'A narrative-driven, level-based 2D running simulator engineered from scratch within the Godot Engine. Written in GDScript, the game abandons predictable infinite loops to tell a dark, compelling story through state-controlled level progression and cinematic 2D cutscenes. The engine manages active collision systems across diverse biomes, keeps track of score-based food collectibles, and scales hurdle mechanics smoothly, fully optimized to execute at a high-performance 144Hz refresh rate.',
            image: 'images/dino.png'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalCard = document.getElementById('project-modal-card');
    const modalBg = document.getElementById('project-modal-bg');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    const elTitle = document.getElementById('modal-title');
    const elDomain = document.getElementById('modal-domain');
    const elToolkit = document.getElementById('modal-toolkit');
    const elProblem = document.getElementById('modal-problem');
    const elSummary = document.getElementById('modal-summary');
    const elImage = document.getElementById('modal-img');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projId = btn.getAttribute('data-id');
            const data = projectDatabase[projId];

            if(data) {
                elTitle.innerText = data.title;
                elDomain.innerText = data.domain;
                elToolkit.innerText = data.toolkit;
                elProblem.innerText = data.problem;
                elSummary.innerText = data.summary;
                elImage.src = data.image;

                modal.classList.remove('opacity-0', 'pointer-events-none');
                modalCard.classList.remove('scale-95');
                modalCard.classList.add('scale-100');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalCard.classList.remove('scale-100');
        modalCard.classList.add('scale-95');
        document.body.style.overflow = '';
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if(modalBg) modalBg.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('opacity-0')) {
            closeModal();
        }
    });

    //PROJECT COLLAPSE LOGIC
    const projGridWrapper = document.getElementById('projects-grid-wrapper');
    const projExpandOverlay = document.getElementById('projects-expand-overlay');
    const expandProjBtn = document.getElementById('expand-projects-btn');
    const projBtnText = document.getElementById('expand-projects-btn-text');
    const projBtnIcon = document.getElementById('expand-projects-btn-icon');
    let isProjExpanded = false;

    function toggleProjects() {
        if (!isProjExpanded) {
            isProjExpanded = true;
            projGridWrapper.style.maxHeight = projGridWrapper.scrollHeight + 100 + 'px';
            projGridWrapper.classList.remove('stack-mask');
            
            projExpandOverlay.classList.remove('h-32');
            projExpandOverlay.classList.add('h-20');
            
            projBtnText.innerText = "Collapse Projects";
            projBtnIcon.classList.add('rotate-180', 'group-hover:-translate-y-0.5');
            projBtnIcon.classList.remove('group-hover:translate-y-0.5');
            
            setTimeout(() => {
                if(isProjExpanded) projGridWrapper.style.maxHeight = 'none';
            }, 1000); 
        } else {
            isProjExpanded = false;
            projGridWrapper.style.maxHeight = projGridWrapper.scrollHeight + 'px';
            void projGridWrapper.offsetWidth; 
            
            projGridWrapper.style.maxHeight = '1100px'; 
            projGridWrapper.classList.add('stack-mask');
            
            projExpandOverlay.classList.add('h-32');
            projExpandOverlay.classList.remove('h-20');
            
            projBtnText.innerText = "Reveal All Projects";
            projBtnIcon.classList.remove('rotate-180', 'group-hover:-translate-y-0.5');
            projBtnIcon.classList.add('group-hover:translate-y-0.5');

            document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if(expandProjBtn) expandProjBtn.addEventListener('click', toggleProjects);

}); // END OF DOM CONTENT LOADED WRAPPER