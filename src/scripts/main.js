// Apokályptos - Red Social Bíblica JavaScript

// Enhanced Biblical characters data with working placeholder images
const biblicalCharacters = [
    { name: 'David', emoji: '👑' },
    { name: 'Daniel', emoji: '🦁' },
    { name: 'Ester', emoji: '🌟' },
    { name: 'Sansón', emoji: '💪' },
    { name: 'Pablo', emoji: '🎭' },
    { name: 'María', emoji: '🕊️' },
    { name: 'Moisés', emoji: '⚡' },
    { name: 'Rut', emoji: '🌾' },
    { name: 'Noé', emoji: '🚢' },
    { name: 'Abraham', emoji: '🌟' },
    { name: 'Sara', emoji: '👸' },
    { name: 'José', emoji: '🌈' },
    { name: 'Débora', emoji: '⚔️' },
    { name: 'Samuel', emoji: '🎺' },
    { name: 'Juan', emoji: '📖' },
    { name: 'Pedro', emoji: '🎣' },
    { name: 'Isaías', emoji: '📜' },
    { name: 'Jeremías', emoji: '💧' },
    { name: 'Ezequiel', emoji: '👁️' },
    { name: 'Jonás', emoji: '🐋' },
    { name: 'Elías', emoji: '🔥' },
    { name: 'Eliseo', emoji: '✨' },
    { name: 'Caleb', emoji: '🏹' },
    { name: 'Josué', emoji: '🗡️' },
    { name: 'Gedeón', emoji: '🛡️' },
    { name: 'Rahab', emoji: '🏠' },
    { name: 'Ana', emoji: '🙏' },
    { name: 'Timoteo', emoji: '📚' }
];

let currentCharacterIndex = 0;
const charactersPerView = 4;
let selectedCharacter = null;
let likedVerses = new Set();

// Search data
const searchData = {
    "amor": [
        { reference: "Juan 3:16", text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito..." },
        { reference: "1 Corintios 13:4", text: "El amor es sufrido, es benigno; el amor no tiene envidia..." },
        { reference: "1 Juan 4:8", text: "El que no ama, no ha conocido a Dios; porque Dios es amor." }
    ],
    "paz": [
        { reference: "Juan 14:27", text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da..." },
        { reference: "Filipenses 4:7", text: "Y la paz de Dios, que sobrepasa todo entendimiento..." },
        { reference: "Isaías 26:3", text: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera..." }
    ],
    "esperanza": [
        { reference: "Romanos 15:13", text: "Y el Dios de esperanza os llene de todo gozo y paz en el creer..." },
        { reference: "Jeremías 29:11", text: "Porque yo sé los pensamientos que tengo acerca de vosotros..." },
        { reference: "1 Pedro 1:3", text: "Bendito el Dios y Padre de nuestro Señor Jesucristo..." }
    ],
    "fe": [
        { reference: "Hebreos 11:1", text: "Es, pues, la fe la certeza de lo que se espera..." },
        { reference: "Romanos 10:17", text: "Así que la fe es por el oír, y el oír, por la palabra de Dios." },
        { reference: "Marcos 11:22", text: "Respondiendo Jesús, les dijo: Tened fe en Dios." }
    ],
    "principio": [
        { reference: "Génesis 1:1", text: "En el principio creó Dios los cielos y la tierra." },
        { reference: "Juan 1:1", text: "En el principio era el Verbo, y el Verbo era con Dios..." },
        { reference: "Proverbios 9:10", text: "El temor de Jehová es el principio de la sabiduría..." }
    ]
};

// Translation data expandida
const translationData = {
    "Génesis 1:1": {
        spanish: "En el principio creó Dios los cielos y la tierra.",
        original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        pronunciation: "Be-re-shit ba-ra E-lo-him et ha-sha-ma-yim ve-et ha-a-retz",
        language: "Hebreo"
    },
    "Juan 3:16": {
        spanish: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
        original: "οὕτως γὰρ ἠγάπησεν ὁ θεὸς τὸν κόσμον, ὥστε τὸν υἱὸν τὸν μονογενῆ ἔδωκεν",
        pronunciation: "Hú-tos gar ē-ga-pē-sen ho the-ós ton kós-mon, hṓs-te ton hui-ón ton mo-no-ge-nē é-dō-ken",
        language: "Griego Koiné"
    },
    "Filipenses 4:13": {
        spanish: "Todo lo puedo en Cristo que me fortalece.",
        original: "πάντα ἰσχύω ἐν τῷ ἐνδυναμοῦντί με",
        pronunciation: "pán-ta is-khý-ō en tṓ en-dy-na-moûn-tí me",
        language: "Griego Koiné"
    },
    "1 Corintios 13:4": {
        spanish: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
        original: "ἡ ἀγάπη μακροθυμεῖ, χρηστεύεται· ἡ ἀγάπη οὐ ζηλοῖ, οὐ περπερεύεται",
        pronunciation: "hē a-gá-pē ma-kro-thy-meî, khrē-steú-e-tai; hē a-gá-pē ou zē-loî, ou per-pe-reú-e-tai",
        language: "Griego Koiné"
    },
    "1 Juan 4:8": {
        spanish: "El que no ama, no ha conocido a Dios; porque Dios es amor.",
        original: "ὁ μὴ ἀγαπῶν οὐκ ἔγνω τὸν θεόν, ὅτι ὁ θεὸς ἀγάπη ἐστίν",
        pronunciation: "ho mē a-ga-pṓn ouk é-gnō ton the-ón, hó-ti ho the-ós a-gá-pē es-tín",
        language: "Griego Koiné"
    },
    "Juan 14:27": {
        spanish: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.",
        original: "εἰρήνην ἀφίημι ὑμῖν, εἰρήνην τὴν ἐμὴν δίδωμι ὑμῖν",
        pronunciation: "ei-rḗ-nēn a-phí-ē-mi hy-mîn, ei-rḗ-nēn tēn e-mēn dí-dō-mi hy-mîn",
        language: "Griego Koiné"
    },
    "Filipenses 4:7": {
        spanish: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
        original: "καὶ ἡ εἰρήνη τοῦ θεοῦ ἡ ὑπερέχουσα πάντα νοῦν",
        pronunciation: "kai hē ei-rḗ-nē tou the-ou hē hy-pe-ré-khou-sa pán-ta noun",
        language: "Griego Koiné"
    },
    "Isaías 26:3": {
        spanish: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.",
        original: "יֵצֶר סָמוּךְ תִּצֹּר שָׁלוֹם שָׁלוֹם כִּי בְךָ בָטוּחַ",
        pronunciation: "Ye-tzer sa-mukh tit-zor sha-lom sha-lom ki ve-kha ba-tu-ah",
        language: "Hebreo"
    },
    "Romanos 15:13": {
        spanish: "Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.",
        original: "ὁ δὲ θεὸς τῆς ἐλπίδος πληρώσαι ὑμᾶς πάσης χαρᾶς καὶ εἰρήνης",
        pronunciation: "ho de the-ós tēs el-pí-dos plē-rṓ-sai hy-mâs pá-sēs kha-râs kai ei-rḗ-nēs",
        language: "Griego Koiné"
    },
    "Jeremías 29:11": {
        spanish: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
        original: "כִּי אָנֹכִי יָדַעְתִּי אֶת־הַמַּחֲשָׁבֹת אֲשֶׁר אָנֹכִי חֹשֵׁב עֲלֵיכֶם",
        pronunciation: "Ki a-no-khi ya-da-ti et-ha-ma-kha-sha-vot a-sher a-no-khi kho-shev a-lei-khem",
        language: "Hebreo"
    },
    "1 Pedro 1:3": {
        spanish: "Bendito el Dios y Padre de nuestro Señor Jesucristo, que según su grande misericordia nos hizo renacer para una esperanza viva.",
        original: "Εὐλογητὸς ὁ θεὸς καὶ πατὴρ τοῦ κυρίου ἡμῶν Ἰησοῦ Χριστοῦ",
        pronunciation: "Eu-lo-gē-tós ho the-ós kai pa-tēr tou ky-rí-ou hē-môn I-ē-sou Khris-tou",
        language: "Griego Koiné"
    },
    "Hebreos 11:1": {
        spanish: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
        original: "ἔστιν δὲ πίστις ἐλπιζομένων ὑπόστασις, πραγμάτων ἔλεγχος οὐ βλεπομένων",
        pronunciation: "és-tin de pís-tis el-pi-zo-mé-nōn hy-pós-ta-sis, prag-má-tōn é-leg-khos ou ble-po-mé-nōn",
        language: "Griego Koiné"
    },
    "Romanos 10:17": {
        spanish: "Así que la fe es por el oír, y el oír, por la palabra de Dios.",
        original: "ἄρα ἡ πίστις ἐξ ἀκοῆς, ἡ δὲ ἀκοὴ διὰ ῥήματος Χριστοῦ",
        pronunciation: "á-ra hē pís-tis ex a-ko-ês, hē de a-ko-ē di-à rhḗ-ma-tos Khris-tou",
        language: "Griego Koiné"
    },
    "Marcos 11:22": {
        spanish: "Respondiendo Jesús, les dijo: Tened fe en Dios.",
        original: "καὶ ἀποκριθεὶς ὁ Ἰησοῦς λέγει αὐτοῖς· ἔχετε πίστιν θεοῦ",
        pronunciation: "kai a-po-kri-theîs ho I-ē-sous lé-gei au-toîs: é-khe-te pís-tin the-ou",
        language: "Griego Koiné"
    },
    "Juan 1:1": {
        spanish: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
        original: "Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος",
        pronunciation: "En ar-khêi ên ho ló-gos, kai ho ló-gos ên pros ton the-ón, kai the-ós ên ho ló-gos",
        language: "Griego Koiné"
    },
    "Proverbios 9:10": {
        spanish: "El temor de Jehová es el principio de la sabiduría, y el conocimiento del Santísimo es la inteligencia.",
        original: "תְּחִלַּת חָכְמָה יִרְאַת יְהוָה וְדַעַת קְדֹשִׁים בִּינָה",
        pronunciation: "Te-khi-lat khokh-mah yir-at YHVH ve-da-at ke-do-shim bi-nah",
        language: "Hebreo"
    }
};

// Dynamic text animation for motivational message
const dynamicTexts = ['PAZ', 'ESPERANZA', 'AMOR', 'FORTALEZA', 'SABIDURÍA', 'LUZ'];
let currentTextIndex = 0;
let selectedVerse = null;
let currentEditingNote = null;
let textAnimationInterval;

function changeDynamicText() {
    const dynamicTextElements = document.querySelectorAll('#dynamicText, .dynamic-text');
    if (dynamicTextElements.length === 0) return;
    
    dynamicTextElements.forEach(element => {
        // Aplicar la animación
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = 'subtleSlideUp 1.5s ease-in-out';
        
        // Cambiar el texto después de un pequeño delay
        setTimeout(() => {
            element.textContent = dynamicTexts[currentTextIndex];
        }, 400);
    });
    
    currentTextIndex = (currentTextIndex + 1) % dynamicTexts.length;
}

// Initialize text animation
function startTextAnimation() {
    // Clear any existing interval
    if (textAnimationInterval) {
        clearInterval(textAnimationInterval);
    }
    // Start new interval - Change text every 4 seconds
    textAnimationInterval = setInterval(changeDynamicText, 4000);
}

// Navigation functionality
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
}

// Character selection functionality
function showCharacterSelection() {
    const characterSelection = document.getElementById('characterSelection');
    characterSelection.classList.add('show');
    loadCharacters();
}

function loadCharacters() {
    const grid = document.getElementById('characterGrid');
    grid.innerHTML = '';
    
    const start = currentCharacterIndex;
    const end = Math.min(start + charactersPerView, biblicalCharacters.length);
    
    for (let i = start; i < end; i++) {
        const character = biblicalCharacters[i];
        const card = document.createElement('div');
        card.className = 'character-card';
        card.onclick = () => selectCharacter(card, character);
        
        // Create gradient background for character image
        const gradients = [
            'linear-gradient(45deg, #FF6B35, #F39C12)',
            'linear-gradient(45deg, #9B59B6, #8E44AD)',
            'linear-gradient(45deg, #1ABC9C, #16A085)',
            'linear-gradient(45deg, #3498DB, #2980B9)',
            'linear-gradient(45deg, #E74C3C, #C0392B)'
        ];
        const gradient = gradients[i % gradients.length];
        
        card.innerHTML = `
            <div class="character-image" style="background: ${gradient}; display: flex; align-items: center; justify-content: center; font-size: 32px;">${character.emoji}</div>
            <div class="character-name">${character.name}</div>
        `;
        
        grid.appendChild(card);
    }
}

function selectCharacter(characterCard, character) {
    // Remove selection from all cards
    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    // Add selection to clicked card
    characterCard.classList.add('selected');
    selectedCharacter = character;
}

function previousCharacters() {
    if (currentCharacterIndex > 0) {
        currentCharacterIndex = Math.max(0, currentCharacterIndex - charactersPerView);
        loadCharacters();
    }
}

function nextCharacters() {
    if (currentCharacterIndex + charactersPerView < biblicalCharacters.length) {
        currentCharacterIndex = Math.min(biblicalCharacters.length - charactersPerView, currentCharacterIndex + charactersPerView);
        loadCharacters();
    }
}

// Login functionality
function loginUser(event) {
    event.preventDefault();
    setTimeout(() => {
        showSection('home');
    }, 1000);
    return false;
}

// Register functionality
function registerUser() {
    if (!selectedCharacter) {
        alert('Por favor selecciona un personaje bíblico');
        return;
    }
    
    setTimeout(() => {
        showSection('home');
    }, 1000);
}

// Like functionality
function toggleLike(button, verseId) {
    const icon = button.querySelector('.like-icon');
    const text = button.querySelector('.like-text');
    const participantsElement = button.closest('.verse-card').querySelector('.participants');
    
    if (likedVerses.has(verseId)) {
        // Unlike
        likedVerses.delete(verseId);
        button.classList.remove('liked');
        text.textContent = 'Like';
        
        // Decrease count
        const currentCount = parseInt(participantsElement.textContent.match(/\d+/)[0]);
        participantsElement.textContent = `${currentCount - 1} likes`;
    } else {
        // Like
        likedVerses.add(verseId);
        button.classList.add('liked');
        icon.classList.add('liked');
        text.textContent = 'Liked';
        
        // Increase count
        const currentCount = parseInt(participantsElement.textContent.match(/\d+/)[0]);
        participantsElement.textContent = `${currentCount + 1} likes`;
        
        setTimeout(() => {
            icon.classList.remove('liked');
        }, 600);
    }
}

// Comments functionality
function addComment(button, verseId) {
    const commentInput = button.previousElementSibling;
    const commentText = commentInput.value.trim();
    
    if (!commentText) return;
    
    const commentsContainer = document.getElementById(`comments-${verseId}`);
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    // Use selected character or default
    const authorName = selectedCharacter ? `${selectedCharacter.emoji} ${selectedCharacter.name}` : '🌟 Anónimo';
    
    newComment.innerHTML = `
        <div class="comment-author">${authorName}</div>
        <div class="comment-text">${commentText}</div>
        <div class="comment-actions">
            <button class="comment-action" onclick="likeComment(this)">👍 0</button>
            <button class="comment-action" onclick="replyComment(this)">💬 Responder</button>
        </div>
    `;
    
    commentsContainer.appendChild(newComment);
    commentInput.value = '';
}

function likeComment(button) {
    const currentLikes = parseInt(button.textContent.match(/\d+/)[0]);
    button.textContent = `👍 ${currentLikes + 1}`;
    button.style.color = 'var(--dorado)';
}

function replyComment(button) {
    const comment = button.closest('.comment');
    const replyInput = document.createElement('textarea');
    replyInput.className = 'comment-input';
    replyInput.placeholder = 'Escribe tu respuesta...';
    replyInput.style.marginTop = '10px';
    
    if (!comment.querySelector('.reply-input')) {
        replyInput.classList.add('reply-input');
        comment.appendChild(replyInput);
    }
}

// Search functionality
function performSearch() {
    const query = document.getElementById('searchQuery').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('searchResults');
    
    if (!query) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--turquesa);">Ingresa una palabra para buscar</p>';
        return;
    }
    
    const results = searchData[query] || [];
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <p style="text-align: center; color: var(--zapote);">No se encontraron resultados para "${query}"</p>
            <p style="text-align: center; color: var(--texto-oscuro); margin-top: 10px;">
                Intenta con palabras como: amor, paz, esperanza, fe, principio
            </p>
        `;
        return;
    }
    
    let resultsHTML = `<h3 style="color: var(--lila); margin-bottom: 20px;">Se encontraron ${results.length} resultados para "${query}":</h3>`;
    
    results.forEach(result => {
        resultsHTML += `
            <div class="result-item">
                <div class="result-content">
                    <div class="result-verse">${result.reference}</div>
                    <div class="result-text">${result.text}</div>
                </div>
                <button class="translate-btn" onclick="showTranslation('${result.reference}')">
                    🌐 Ver Traducción
                </button>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = resultsHTML;
}

function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function handleHomeSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value.trim();
        if (query) {
            document.getElementById('searchQuery').value = query;
            showSection('search');
            setTimeout(performSearch, 100);
        }
    }
}

function performHomeSearch() {
    const query = document.querySelector('#home .search-input').value.trim();
    if (query) {
        document.getElementById('searchQuery').value = query;
        showSection('search');
        setTimeout(performSearch, 100);
    }
}

// Translation functionality
function showTranslation(reference) {
    showSection('translations');
    
    const translation = translationData[reference];
    if (!translation) {
        document.getElementById('translationRef').textContent = `${reference} - Traducción no disponible`;
        return;
    }
    
    // Store selected verse for sharing and reference
    selectedVerse = {
        reference: reference,
        text: translation.spanish
    };
    
    document.getElementById('translationRef').textContent = reference;
    document.getElementById('spanishText').textContent = translation.spanish;
    document.getElementById('originalText').textContent = translation.original;
    document.getElementById('originalTitle').textContent = `📜 ${translation.language}`;
    document.getElementById('pronunciationText').textContent = `Pronunciación: ${translation.pronunciation}`;
}

// Synchronized scrolling
function setupSyncScroll() {
    const spanishPanel = document.getElementById('spanishPanel');
    const originalPanel = document.getElementById('originalPanel');
    
    if (spanishPanel && originalPanel) {
        spanishPanel.addEventListener('scroll', function() {
            originalPanel.scrollTop = this.scrollTop;
        });
        
        originalPanel.addEventListener('scroll', function() {
            spanishPanel.scrollTop = this.scrollTop;
        });
    }
}

// Audio play simulation
function playAudio(language) {
    const button = language === 'spanish' ? document.getElementById('playSpanish') : document.getElementById('playOriginal');
    if (!button) return;
    
    const originalText = button.textContent;
    
    button.textContent = '🔊 Reproduciendo...';
    button.classList.add('playing');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('playing');
    }, 3000);
}

// Share Modal Functionality
function openShareModal(verseId) {
    const verseCard = document.getElementById(verseId);
    const verseText = verseCard.querySelector('.verse-text').textContent;
    const verseRef = verseCard.querySelector('.verse-reference').textContent;
    
    // Update modal with verse info
    document.querySelector('.verse-preview-text').textContent = verseText;
    document.querySelector('.verse-preview-ref').textContent = verseRef;
    
    // Store current verse for sharing
    selectedVerse = {
        reference: verseRef,
        text: verseText
    };
    
    // Show modal
    document.getElementById('shareModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeShareModal() {
    document.getElementById('shareModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Deselect all contacts
    const contacts = document.querySelectorAll('.contact-item');
    contacts.forEach(contact => contact.classList.remove('selected'));
}

function toggleContact(contactElement) {
    contactElement.classList.toggle('selected');
}

function shareVerse() {
    const selectedContacts = document.querySelectorAll('.contact-item.selected');
    
    if (selectedContacts.length === 0) {
        alert('Por favor selecciona al menos un contacto');
        return;
    }
    
    const contactNames = Array.from(selectedContacts).map(contact => 
        contact.querySelector('.contact-name').textContent
    ).join(', ');
    
    // Simulate sharing
    alert(`¡Versículo compartido exitosamente con: ${contactNames}!`);
    closeShareModal();
}

// Edit Note Functionality
function editNote(buttonElement) {
    // Detener la propagación del evento
    event.stopPropagation();
    event.preventDefault();
    
    const noteElement = buttonElement.closest('.saved-note');
    const noteTitle = noteElement.querySelector('.note-title').textContent;
    const noteContent = noteElement.querySelector('.note-content').textContent;
    
    // Store reference to the note being edited
    currentEditingNote = noteElement;
    
    // Populate modal with current note data
    document.getElementById('editNoteTitle').value = noteTitle;
    document.getElementById('editNoteContent').value = noteContent;
    
    // Show edit modal
    document.getElementById('editModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on title input
    setTimeout(() => {
        document.getElementById('editNoteTitle').focus();
    }, 100);
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    currentEditingNote = null;
}

function saveEditedNote() {
    if (!currentEditingNote) return;
    
    const newTitle = document.getElementById('editNoteTitle').value.trim();
    const newContent = document.getElementById('editNoteContent').value.trim();
    
    if (!newTitle || !newContent) {
        alert('Por favor completa el título y contenido de la nota');
        return;
    }
    
    // Update the note in the DOM
    currentEditingNote.querySelector('.note-title').textContent = newTitle;
    currentEditingNote.querySelector('.note-content').textContent = newContent;
    currentEditingNote.querySelector('.note-date').textContent = 'Editada ahora';
    
    // Close modal
    closeEditModal();
    
    // Show success message
    alert('¡Nota editada exitosamente!');
}

function deleteNote(buttonElement) {
    // Detener la propagación del evento
    event.stopPropagation();
    event.preventDefault();
    
    const noteElement = buttonElement.closest('.saved-note');
    const noteTitle = noteElement.querySelector('.note-title').textContent;
    
    // Usar una confirmación más amigable
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar la nota "${noteTitle}"?\n\nEsta acción no se puede deshacer.`);
    
    if (confirmDelete) {
        // Agregar animación de salida
        noteElement.style.transition = 'all 0.3s ease';
        noteElement.style.transform = 'translateX(-100%)';
        noteElement.style.opacity = '0';
        
        // Eliminar después de la animación
        setTimeout(() => {
            if (noteElement && noteElement.parentNode) {
                noteElement.remove();
            }
            
            // Mostrar mensaje de éxito temporal
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 120px;
                right: 20px;
                background: var(--turquesa);
                color: var(--blanco);
                padding: 15px 25px;
                border-radius: 10px;
                font-weight: 600;
                z-index: 3000;
                animation: slideIn 0.3s ease;
            `;
            successMsg.textContent = '✅ Nota eliminada exitosamente';
            document.body.appendChild(successMsg);
            
            // Eliminar mensaje después de 3 segundos
            setTimeout(() => {
                if (successMsg && successMsg.parentNode) {
                    successMsg.remove();
                }
            }, 3000);
        }, 300);
    }
}

// Save note functionality
function saveNote() {
    const noteInput = document.getElementById('noteInput');
    const savedNotesContainer = document.getElementById('savedNotes');
    const noteText = noteInput.value.trim();
    
    if (noteText) {
        const noteElement = document.createElement('div');
        noteElement.className = 'saved-note';
        noteElement.onclick = () => toggleNote(noteElement);
        noteElement.innerHTML = `
            <div class="note-actions-icons">
                <button class="note-action-icon" onclick="editNote(this)" title="Editar">✏️</button>
                <button class="note-action-icon delete" onclick="deleteNote(this)" title="Eliminar">🗑️</button>
            </div>
            <div class="note-header">
                <div class="note-title">Nueva Reflexión</div>
                <button class="note-toggle">📖</button>
            </div>
            <div class="note-content">${noteText}</div>
            <div class="note-date">Guardada ahora</div>
        `;
        
        // Insert at the beginning (after the title)
        const title = savedNotesContainer.querySelector('h3');
        savedNotesContainer.insertBefore(noteElement, title.nextSibling);
        
        // Clear the input
        noteInput.value = '';
        
        // Show confirmation
        const saveButton = document.querySelector('.save-note-btn');
        const originalText = saveButton.textContent;
        saveButton.textContent = '✅ ¡Guardada!';
        saveButton.style.background = 'var(--turquesa)';
        
        setTimeout(() => {
            saveButton.textContent = originalText;
            saveButton.style.background = 'linear-gradient(45deg, var(--zapote), var(--lila))';
        }, 2000);
    }
}

// Toggle note functionality
function toggleNote(noteElement) {
    const content = noteElement.querySelector('.note-content');
    const toggle = noteElement.querySelector('.note-toggle');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        toggle.textContent = '📖';
    } else {
        content.classList.add('expanded');
        toggle.textContent = '📄';
    }
}

// Testament button functionality
document.addEventListener('DOMContentLoaded', function() {
    const testamentButtons = document.querySelectorAll('.testament-btn');
    testamentButtons.forEach(button => {
        button.addEventListener('click', function() {
            testamentButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Setup synchronized scrolling
    setupSyncScroll();
    
    // Add enter key functionality for note saving
    const noteInput = document.getElementById('noteInput');
    if (noteInput) {
        noteInput.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                saveNote();
            }
        });
    }

    // Close modals when clicking outside
    const shareModal = document.getElementById('shareModal');
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeShareModal();
            }
        });
    }

    const editModal = document.getElementById('editModal');
    if (editModal) {
        editModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditModal();
            }
        });
    }

    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (shareModal && shareModal.classList.contains('active')) {
                closeShareModal();
            }
            if (editModal && editModal.classList.contains('active')) {
                closeEditModal();
            }
        }
    });

    // Initialize text animation
    startTextAnimation();

    // Initialize with a default verse in translations if coming from search
    if (selectedVerse) {
        showTranslation(selectedVerse.reference);
    }
});