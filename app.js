/**
 * ============================================================================
 * CONFIGURAZIONE GENERALE & CONTENUTI DELLE 24 CASELLE
 * ============================================================================
 * Per usare le tue immagini locali:
 * 1. Inserisci le foto nella cartella /assets/ (consigliato formato .webp o .jpg, 800x600px)
 * 2. Sostituisci il campo `image` con "./assets/day-1.jpg"
 * 3. Se un giorno non prevede un codice alfanumerico, imposta `code: ""` o `code: null`
 *    e il box del codice verrà nascosto automaticamente nel modal.
 */

const CONFIG = {
  TARGET_YEAR: 2026,
  TARGET_MONTH: 11, // Nota JS Date: 0 = Gennaio, 11 = Dicembre
  STORAGE_KEY: 'advent_calendar_2026_opened_days'
};

const CALENDAR_DATA = [
  { day: 1,  title: "Si comincia!", image: "./assets/01.jpg",  message: "Buon 1° Dicembre! Inizia il conto alla rovescia verso il Natale con il primo piccolo pensiero per te.", code: "NATALE-01" },
  { day: 2,  title: "Dolce pausa", image: "./assets/02.jpg",  message: "Oggi ti meriti cinque minuti tutti per te prima di iniziare la giornata.", code: "PAUSA-02" },
  { day: 3,  title: "Piccola magia", image: "./assets/03.jpg",  message: "Un dettaglio speciale per strapparti un sorriso anche a metà settimana.", code: "SORRISO-03" },
  { day: 4,  title: "Ricarica di energia", image: "https://picsum.photos/seed/adv4/600/450",  message: "Manca poco al weekend! Ecco il tuo indizio per il regalo di oggi.", code: "ENERGIA-04" },
  { day: 5,  title: "Spirito di festa", image: "https://picsum.photos/seed/adv5/600/450",  message: "Le luci iniziano ad accendersi: apri il pacchetto numero 5!", code: "LUCI-05" },
  { day: 6,  title: "Coccola invernale", image: "https://picsum.photos/seed/adv6/600/450",  message: "Perfetto per una giornata fredda di dicembre.", code: "COCCOLA-06" },
  { day: 7,  title: "Un tocco di colore", image: "https://picsum.photos/seed/adv7/600/450",  message: "Qualcosa di utile e super colorato per le tue giornate.", code: "COLORE-07" },
  { day: 8,  title: "Festa dell'Immacolata", image: "https://picsum.photos/seed/adv8/600/450",  message: "Giornata di festa e relax! Goditi la sorpresa numero 8.", code: "FESTA-08" },
  { day: 9,  title: "Piccolo pensiero", image: "https://picsum.photos/seed/adv9/600/450",  message: "Non servono grandi occasioni per festeggiare insieme.", code: "PENSIERO-09" },
  { day: 10, title: "Siamo in doppia cifra!", image: "https://picsum.photos/seed/adv10/600/450", message: "Giorno 10 sbloccato: riscatta il tuo premio con questo codice!", code: "DECIMO-10" },
  { day: 11, title: "Sorpresa del venerdì", image: "https://picsum.photos/seed/adv11/600/450", message: "Per chiudere la settimana nel modo migliore possibile.", code: "VENERDI-11" },
  { day: 12, title: "Metà percorso!", image: "https://picsum.photos/seed/adv12/600/450", message: "Siamo esattamente a metà del nostro Calendario dell'Avvento!", code: "META-12" },
  { day: 13, title: "Santa Lucia", image: "https://picsum.photos/seed/adv13/600/450", message: "Il giorno più corto che ci sia... ma con una sorpresa in più.", code: "LUCIA-13" },
  { day: 14, title: "Nuova settimana", image: "https://picsum.photos/seed/adv14/600/450", message: "Un boost di buonumore per affrontare questo lunedì di dicembre.", code: "LUNEDI-14" },
  { day: 15, title: "Meno dieci a Natale", image: "https://picsum.photos/seed/adv15/600/450", message: "Il conto alla rovescia entra nel vivo!", code: "MENODIECI-15" },
  { day: 16, title: "Dettaglio prezioso", image: "https://picsum.photos/seed/adv16/600/450", message: "Un piccolo accessorio pensato appositamente per te.", code: "PREZIOSO-16" },
  { day: 17, title: "Quasi vacanza", image: "https://picsum.photos/seed/adv17/600/450", message: "Tieni duro, le vacanze di Natale sono dietro l'angolo!", code: "VACANZA-17" },
  { day: 18, title: "Serata speciale", image: "https://picsum.photos/seed/adv18/600/450", message: "Questo codice vale per un momento speciale insieme.", code: "SERATA-18" },
  { day: 19, title: "Ultimo weekend prima di Natale", image: "https://picsum.photos/seed/adv19/600/450", message: "Atmosfera natalizia al 100%: scopri cosa ti aspetta oggi.", code: "WEEKEND-19" },
  { day: 20, title: "Domenica d'Avvento", image: "https://picsum.photos/seed/adv20/600/450", message: "Mancano solo 4 giorni alla Vigilia!", code: "DOMENICA-20" },
  { day: 21, title: "Solstizio d'Inverno", image: "https://picsum.photos/seed/adv21/600/450", message: "Inizia ufficialmente l'inverno, scaldiamolo con il regalo n. 21.", code: "INVERNO-21" },
  { day: 22, title: "Ultime sorprese", image: "https://picsum.photos/seed/adv22/600/450", message: "Ormai ci siamo quasi, goditi il regalo di oggi!", code: "ULTIME-22" },
  { day: 23, title: "Antivigilia", image: "https://picsum.photos/seed/adv23/600/450", message: "Domani è la Vigilia! Preparati con la penultima casella.", code: "VIGILIA-23" },
  { day: 24, title: "Buona Vigilia di Natale! 🎄", image: "https://picsum.photos/seed/adv24/600/450", message: "Siamo arrivati all'ultima casella! Buon Natale amore mio ❤️", code: "GRANFINALE-24" }
];

/**
 * ============================================================================
 * STATO DELL'APPLICAZIONE & ENGINE DELLA DATA
 * ============================================================================
 */
class AdventApp {
  constructor() {
    this.openedDays = this.loadOpenedDays();
    this.debugConfig = this.parseUrlDebugParams();
    this.effectiveDate = this.getEffectiveDate();
    this.activeToastTimeout = null;

    // Riferimenti DOM
    this.gridEl = document.getElementById('calendar-grid');
    this.dateDisplayEl = document.getElementById('current-date-display');
    this.progressCounterEl = document.getElementById('progress-counter');
    this.progressFillEl = document.getElementById('progress-fill');
    
    // Modal DOM
    this.modalEl = document.getElementById('reward-modal');
    this.modalCloseBtn = document.getElementById('modal-close');
    this.modalBadgeEl = document.getElementById('modal-day-badge');
    this.modalTitleEl = document.getElementById('modal-day-title');
    this.modalImageEl = document.getElementById('modal-image');
    this.modalMessageEl = document.getElementById('modal-message');
    this.modalCodeSectionEl = document.getElementById('modal-code-section');
    this.modalCodeValueEl = document.getElementById('modal-code-value');
    this.copyCodeBtn = document.getElementById('btn-copy-code');

    this.init();
  }

  init() {
    this.setupDebugBanner();
    this.updateHeaderInfo();
    this.renderGrid();
    this.bindEvents();
    this.registerServiceWorker();
  }

  /**
   * Legge i parametri URL per abilitare la modalità Debug:
   * - ?debug=true         -> Sblocca tutte le 24 caselle
   * - ?date=2026-12-05    -> Simula che oggi sia il 5 Dicembre 2026
   */
  parseUrlDebugParams() {
    const params = new URLSearchParams(window.location.search);
    const unlockAll = params.get('debug') === 'true';
    const customDateStr = params.get('date'); // Formato atteso: YYYY-MM-DD
    return { unlockAll, customDateStr };
  }

  /**
   * Restituisce l'oggetto Date corrente (oppure simulato se in modalità debug)
   */
  getEffectiveDate() {
    if (this.debugConfig.unlockAll) {
      return new Date(CONFIG.TARGET_YEAR, CONFIG.TARGET_MONTH, 24, 12, 0, 0);
    }
    if (this.debugConfig.customDateStr) {
      const parsed = new Date(`${this.debugConfig.customDateStr}T12:00:00`);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    return new Date();
  }

  /**
   * Verifica se una specifica casella (1-24) è sbloccabile rispetto alla data effettiva
   */
  isDayUnlockable(dayNumber) {
    if (this.debugConfig.unlockAll) return true;

    const year = this.effectiveDate.getFullYear();
    const month = this.effectiveDate.getMonth();
    const currentDay = this.effectiveDate.getDate();

    // Se siamo in un anno successivo al 2026, tutto è sbloccato
    if (year > CONFIG.TARGET_YEAR) return true;
    // Se siamo prima del 2026 o prima di Dicembre 2026, tutto è bloccato
    if (year < CONFIG.TARGET_YEAR || month < CONFIG.TARGET_MONTH) return false;

    // Siamo a Dicembre 2026: sblocca se il giorno della casella è <= al giorno corrente
    return dayNumber <= currentDay;
  }

  /**
   * Gestione Persistenza in window.localStorage
   */
  loadOpenedDays() {
    try {
      const raw = window.localStorage.getItem(CONFIG.STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Impossibile leggere localStorage:', e);
      return [];
    }
  }

  saveOpenedDay(dayNumber) {
    if (!this.openedDays.includes(dayNumber)) {
      this.openedDays.push(dayNumber);
      try {
        window.localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.openedDays));
      } catch (e) {
        console.warn('Impossibile salvare in localStorage:', e);
      }
    }
  }

  resetOpenedDays() {
    this.openedDays = [];
    window.localStorage.removeItem(CONFIG.STORAGE_KEY);
    this.renderGrid();
    this.updateHeaderInfo();
    this.showToast('🔄 Stato caselle azzerato!');
  }

  /**
   * Mostra la barra di Debug se sono attivi parametri URL
   */
  setupDebugBanner() {
    if (this.debugConfig.unlockAll || this.debugConfig.customDateStr) {
      const banner = document.getElementById('debug-banner');
      const status = document.getElementById('debug-status');
      const resetBtn = document.getElementById('btn-reset-storage');

      banner.classList.remove('hidden');
      const formattedDate = this.effectiveDate.toLocaleDateString('it-IT', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
      status.textContent = `🔧 DEBUG (${formattedDate})`;

      resetBtn.addEventListener('click', () => this.resetOpenedDays());
    }
  }

  /**
   * Aggiorna il sottotitolo con la data e la barra di progresso
   */
  updateHeaderInfo() {
    const formattedToday = this.effectiveDate.toLocaleDateString('it-IT', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    this.dateDisplayEl.textContent = `Oggi è ${formattedToday}`;

    const openedCount = this.openedDays.length;
    this.progressCounterEl.textContent = `${openedCount} / 24`;
    const percentage = Math.min(100, Math.round((openedCount / 24) * 100));
    this.progressFillEl.style.width = `${percentage}%`;
  }

  /**
   * Renderizza le 24 caselle nella griglia coi 3 stati visivi:
   * - locked: Giorno futuro
   * - unlockable: Giorno corrente o passato non ancora aperto
   * - opened: Già aperta (salvata in LocalStorage)
   */
  renderGrid() {
    this.gridEl.innerHTML = '';

    CALENDAR_DATA.forEach((item) => {
      const isOpened = this.openedDays.includes(item.day);
      const canUnlock = this.isDayUnlockable(item.day);

      let stateClass = 'locked';
      let icon = '🔒';
      let statusLabel = 'Bloccata';

      if (isOpened) {
        stateClass = 'opened';
        icon = '✨';
        statusLabel = 'Aperta';
      } else if (canUnlock) {
        stateClass = 'unlockable';
        icon = '🎁';
        statusLabel = 'Apri ora';
      }

      const card = document.createElement('button');
      card.type = 'button';
      card.className = `day-card ${stateClass}`;
      card.setAttribute('aria-label', `Casella giorno ${item.day} - ${statusLabel}`);
      card.dataset.day = item.day;

      card.innerHTML = `
        <span class="day-number">${item.day}</span>
        <span class="day-icon" aria-hidden="true">${icon}</span>
        <span class="day-status-label">${statusLabel}</span>
      `;

      card.addEventListener('click', () => this.handleCardClick(item, card, canUnlock, isOpened));
      this.gridEl.appendChild(card);
    });
  }

  /**
   * Gestisce il tocco su una casella
   */
  handleCardClick(item, cardEl, canUnlock, wasAlreadyOpened) {
    if (!canUnlock) {
      // Feedback aptico su Android (ignorato silenziosamente su iOS)
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

      // Ri-triggera l'animazione CSS di shake
      cardEl.classList.remove('shake');
      void cardEl.offsetWidth; // Forza reflow per riavviare l'animazione
      cardEl.classList.add('shake');

      this.showToast(`⏳ Pazienza! Questa casella si sbloccherà il ${item.day} Dicembre.`);
      return;
    }

    // Se è la prima volta che viene aperta, salva su LocalStorage e lancia i coriandoli
    if (!wasAlreadyOpened) {
      if (navigator.vibrate) navigator.vibrate(80);
      this.saveOpenedDay(item.day);
      this.updateHeaderInfo();
      this.renderGrid();
      this.triggerConfetti();
    }

    this.openModal(item);
  }

  /**
   * Popola e apre il Modal Popup
   */
  openModal(item) {
    this.modalBadgeEl.textContent = `${item.day} DICEMBRE 2026`;
    this.modalTitleEl.textContent = item.title;
    this.modalImageEl.src = item.image;
    this.modalImageEl.alt = item.title;
    this.modalMessageEl.textContent = item.message;

    if (item.code && item.code.trim() !== '') {
      this.modalCodeSectionEl.classList.remove('hidden');
      this.modalCodeValueEl.textContent = item.code;
      this.copyCodeBtn.textContent = 'Copia';
    } else {
      this.modalCodeSectionEl.classList.add('hidden');
    }

    this.modalEl.classList.remove('hidden');
  }

  closeModal() {
    this.modalEl.classList.add('hidden');
  }

  /**
   * Event Listeners per chiusura Modal e copia Codice Regalo
   */
  bindEvents() {
    this.modalCloseBtn.addEventListener('click', () => this.closeModal());

    // Chiudi cliccando fuori dalla card del modal
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.closeModal();
    });

    // Chiudi con tasto ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modalEl.classList.contains('hidden')) {
        this.closeModal();
      }
    });

    // Copia negli appunti il codice regalo
    this.copyCodeBtn.addEventListener('click', async () => {
      const code = this.modalCodeValueEl.textContent;
      try {
        await navigator.clipboard.writeText(code);
        this.copyCodeBtn.textContent = 'Copiato! ✓';
        this.showToast('📋 Codice regalo copiato negli appunti!');
      } catch (err) {
        this.showToast(`Codice: ${code}`);
      }
    });
  }

  /**
   * Lancia l'effetto coriandoli natalizi (oro, rosso, verde) alla prima apertura
   */
  triggerConfetti() {
    if (typeof window.confetti === 'function') {
      window.confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#dc2626', '#16a34a', '#ffffff']
      });
    }
  }

  /**
   * Mostra una notifica Toast temporanea (con debounce per evitare spam)
   */
  showToast(message) {
    const container = document.getElementById('toast-container');
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    if (this.activeToastTimeout) clearTimeout(this.activeToastTimeout);
    this.activeToastTimeout = setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  /**
   * Registra il Service Worker per rendere la Web App installabile (PWA)
   */
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('./sw.js')
          .catch((err) => console.warn('Service Worker non registrato:', err));
      });
    }
  }
}

// Avvia l'applicazione al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  new AdventApp();
});