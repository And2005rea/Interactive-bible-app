import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  // Estados principales
  const [currentSection, setCurrentSection] = useState('login');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [currentEditingNote, setCurrentEditingNote] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [savedNotes, setSavedNotes] = useState([
    {
      id: 1,
      title: "Reflexión sobre Juan 3:16",
      content: "Hoy medité sobre el amor incondicional de Dios. Es increíble pensar que su amor es tan grande que dio a su único hijo por nosotros. Esta verdad me llena de gratitud y paz. El versículo Juan 3:16 nos recuerda que el amor de Dios no tiene límites y que a través de Cristo tenemos vida eterna...",
      date: "Guardada hace 2 días"
    },
    {
      id: 2,
      title: "Oración de la mañana",
      content: "Señor, te entrego este nuevo día. Que tu voluntad se haga en mi vida y que pueda ser luz para otros. Ayúdame a caminar en tus caminos y a confiar en tu plan perfecto. Dame sabiduría para tomar decisiones correctas y amor para servir a quienes me rodean...",
      date: "Guardada hace 1 semana"
    },
    {
      id: 3,
      title: "Versículos de fortaleza",
      content: "Filipenses 4:13 - 'Todo lo puedo en Cristo que me fortalece'\nIsaías 40:31 - 'Pero los que esperan a Jehová tendrán nuevas fuerzas'\nSalmo 46:1 - 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones'\nEstos versículos me dan fuerza en momentos difíciles y me recuerdan que con Cristo todo es posible...",
      date: "Guardada hace 3 días"
    }
  ]);
  const [expandedNotes, setExpandedNotes] = useState(new Set());
  const [noteInput, setNoteInput] = useState('');
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Referencias
  const spanishPanelRef = useRef(null);
  const originalPanelRef = useRef(null);

  // Datos
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
    }
  };

  const contacts = [
    { id: 1, name: "David Rodríguez", emoji: "👑", status: "En línea", gradient: "linear-gradient(45deg, #FF6B35, #F39C12)" },
    { id: 2, name: "María González", emoji: "🌟", status: "Hace 5 min", gradient: "linear-gradient(45deg, #9B59B6, #8E44AD)" },
    { id: 3, name: "Pablo Martínez", emoji: "🎭", status: "En línea", gradient: "linear-gradient(45deg, #1ABC9C, #16A085)" },
    { id: 4, name: "Ana López", emoji: "🕊️", status: "Hace 2 horas", gradient: "linear-gradient(45deg, #3498DB, #2980B9)" },
    { id: 5, name: "José Sánchez", emoji: "💪", status: "Hace 1 día", gradient: "linear-gradient(45deg, #E74C3C, #C0392B)" },
    { id: 6, name: "Daniel Fernández", emoji: "🦁", status: "En línea", gradient: "linear-gradient(45deg, #F39C12, #E67E22)" }
  ];

  const dynamicTexts = ['PAZ', 'ESPERANZA', 'AMOR', 'FORTALEZA', 'SABIDURÍA', 'LUZ'];
  const [currentDynamicText, setCurrentDynamicText] = useState(0);

  // Efectos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDynamicText(prev => (prev + 1) % dynamicTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Sincronización de scroll
    const handleSpanishScroll = () => {
      if (originalPanelRef.current && spanishPanelRef.current) {
        originalPanelRef.current.scrollTop = spanishPanelRef.current.scrollTop;
      }
    };

    const handleOriginalScroll = () => {
      if (spanishPanelRef.current && originalPanelRef.current) {
        spanishPanelRef.current.scrollTop = originalPanelRef.current.scrollTop;
      }
    };

    if (spanishPanelRef.current) {
      spanishPanelRef.current.addEventListener('scroll', handleSpanishScroll);
    }

    if (originalPanelRef.current) {
      originalPanelRef.current.addEventListener('scroll', handleOriginalScroll);
    }

    return () => {
      if (spanishPanelRef.current) {
        spanishPanelRef.current.removeEventListener('scroll', handleSpanishScroll);
      }
      if (originalPanelRef.current) {
        originalPanelRef.current.removeEventListener('scroll', handleOriginalScroll);
      }
    };
  }, [currentSection]);

  // Funciones
  const handleLogin = (e) => {
    e.preventDefault();
    setTimeout(() => setCurrentSection('home'), 1000);
  };

  const handleRegister = () => {
    if (!selectedCharacter) {
      alert('Por favor selecciona un personaje bíblico');
      return;
    }
    setTimeout(() => setCurrentSection('home'), 1000);
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const nextCharacters = () => {
    const maxIndex = biblicalCharacters.length - 4;
    setCurrentCharacterIndex(prev => Math.min(prev + 4, maxIndex));
  };

  const previousCharacters = () => {
    setCurrentCharacterIndex(prev => Math.max(prev - 4, 0));
  };

  const toggleLike = (verseId) => {
    setLikedVerses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(verseId)) {
        newSet.delete(verseId);
      } else {
        newSet.add(verseId);
      }
      return newSet;
    });
  };

  const performSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    const results = searchData[query] || [];
    setSearchResults(results);
  };

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const showTranslation = (reference) => {
    const translation = translationData[reference];
    if (translation) {
      setSelectedVerse({
        reference,
        ...translation
      });
      setCurrentSection('translations');
    }
  };

  const openShareModal = (verseData) => {
    setSelectedVerse(verseData);
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setSelectedContacts(new Set());
  };

  const toggleContact = (contactId) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  };

  const shareVerse = () => {
    if (selectedContacts.size === 0) {
      alert('Por favor selecciona al menos un contacto');
      return;
    }

    const contactNames = Array.from(selectedContacts)
      .map(id => contacts.find(c => c.id === id)?.name)
      .join(', ');

    alert(`¡Versículo compartido exitosamente con: ${contactNames}!`);
    closeShareModal();
  };

  const saveNote = () => {
    if (!noteInput.trim()) return;

    const newNote = {
      id: Date.now(),
      title: "Nueva Reflexión",
      content: noteInput,
      date: "Guardada ahora"
    };

    setSavedNotes(prev => [newNote, ...prev]);
    setNoteInput('');
  };

  const editNote = (note) => {
    setCurrentEditingNote(note);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
    setEditModalOpen(true);
  };

  const saveEditedNote = () => {
    if (!editNoteTitle.trim() || !editNoteContent.trim()) {
      alert('Por favor completa el título y contenido de la nota');
      return;
    }

    setSavedNotes(prev => prev.map(note => 
      note.id === currentEditingNote.id 
        ? { ...note, title: editNoteTitle, content: editNoteContent, date: 'Editada ahora' }
        : note
    ));

    setEditModalOpen(false);
    setCurrentEditingNote(null);
    alert('¡Nota editada exitosamente!');
  };

  const deleteNote = (noteId) => {
    const note = savedNotes.find(n => n.id === noteId);
    if (window.confirm(`¿Estás seguro de que quieres eliminar la nota "${note.title}"?\n\nEsta acción no se puede deshacer.`)) {
      setSavedNotes(prev => prev.filter(n => n.id !== noteId));
    }
  };

  const toggleNote = (noteId) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  const charactersPerView = 4;
  const currentCharacters = biblicalCharacters.slice(currentCharacterIndex, currentCharacterIndex + charactersPerView);

  const gradients = [
    'linear-gradient(45deg, #FF6B35, #F39C12)',
    'linear-gradient(45deg, #9B59B6, #8E44AD)',
    'linear-gradient(45deg, #1ABC9C, #16A085)',
    'linear-gradient(45deg, #3498DB, #2980B9)',
    'linear-gradient(45deg, #E74C3C, #C0392B)'
  ];

  return (
    <div className="App">
      {/* Biblical floating animations */}
      <div className="biblical-animation" style={{fontSize: '60px'}}>🕊️</div>
      <div className="biblical-animation" style={{fontSize: '50px'}}>⭐</div>
      <div className="biblical-animation" style={{fontSize: '45px'}}>✝️</div>
      <div className="biblical-animation" style={{fontSize: '55px'}}>🙏</div>

      {/* Navigation */}
      <nav className="nav-header">
        <div className="nav-content">
          <div className="logo-container">
            <div className="logo" onClick={() => setCurrentSection('home')}>Apokályptos</div>
            <div className="logo-cross" onClick={() => setCurrentSection('home')}>✝</div>
          </div>
          <div className="nav-icons">
            <div className="nav-icon" onClick={() => setCurrentSection('login')} title="Iniciar Sesión">👤</div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Login Section */}
        {currentSection === 'login' && (
          <div className="section active">
            <div className="auth-section">
              <div className="auth-card">
                <h1 className="auth-title">Apokályptos</h1>
                <p className="motivational-text">
                  Es ver por fin lo que siempre estuvo ahí. Cuando Dios llega a nuestra vida, todo cobra sentido: 
                  el miedo se convierte en <span className="dynamic-text">{dynamicTexts[currentDynamicText]}</span>.
                </p>
                <h2 className="welcome-title">Bienvenidos</h2>
                
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-input" placeholder="tu.correo@ejemplo.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-input" placeholder="Tu contraseña" required />
                  </div>
                  <button type="submit" className="btn-primary">Iniciar Sesión</button>
                </form>
                
                <p className="auth-switch">
                  ¿No tienes cuenta? <a href="#" onClick={() => setCurrentSection('register')}>Regístrate aquí</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Register Section */}
        {currentSection === 'register' && (
          <div className="section active">
            <div className="auth-section">
              <div className="auth-card">
                <h1 className="auth-title">Apokályptos</h1>
                <p className="motivational-text">
                  Es ver por fin lo que siempre estuvo ahí. Cuando Dios llega a nuestra vida, todo cobra sentido: 
                  el miedo se convierte en <span className="dynamic-text">{dynamicTexts[currentDynamicText]}</span>.
                </p>
                
                <form>
                  <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-input" placeholder="Tu nombre" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-input" placeholder="tu.correo@ejemplo.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-input" placeholder="Tu contraseña" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input type="password" className="form-input" placeholder="Confirma tu contraseña" required />
                  </div>
                  <button type="button" className="btn-primary" onClick={() => setCurrentSection('characterSelection')}>Continuar</button>
                </form>
                
                <p className="auth-switch">
                  ¿Ya tienes cuenta? <a href="#" onClick={() => setCurrentSection('login')}>Inicia sesión</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Character Selection */}
        {currentSection === 'characterSelection' && (
          <div className="section active">
            <div className="auth-section">
              <div className="auth-card">
                <h3 style={{color: 'var(--lila)', marginBottom: '20px', fontSize: '24px', fontWeight: '600'}}>
                  Elige tu personaje bíblico
                </h3>
                
                <div className="character-navigation">
                  <button className="nav-arrow" onClick={previousCharacters} disabled={currentCharacterIndex === 0}>‹</button>
                  <div className="character-container">
                    <div className="character-grid">
                      {currentCharacters.map((character, index) => (
                        <div 
                          key={character.name}
                          className={`character-card ${selectedCharacter?.name === character.name ? 'selected' : ''}`}
                          onClick={() => selectCharacter(character)}
                        >
                          <div 
                            className="character-image" 
                            style={{
                              background: gradients[(currentCharacterIndex + index) % gradients.length],
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '32px'
                            }}
                          >
                            {character.emoji}
                          </div>
                          <div className="character-name">{character.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="nav-arrow" onClick={nextCharacters} disabled={currentCharacterIndex >= biblicalCharacters.length - 4}>›</button>
                </div>
                
                <button type="button" className="btn-primary" onClick={handleRegister} style={{marginTop: '25px'}}>
                  Crear Cuenta
                </button>
                
                <p className="auth-switch">
                  ¿Ya tienes cuenta? <a href="#" onClick={() => setCurrentSection('login')}>Inicia sesión</a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Home Section */}
        {currentSection === 'home' && (
          <div className="section active">
            <div className="container">
              <div className="search-input-group">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Busca versículos, palabras, temas..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setSearchQuery(e.target.value);
                      setCurrentSection('search');
                    }
                  }}
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="verse-card">
                <div className="verse-text">
                  "En el principio creó Dios los cielos y la tierra."
                </div>
                <div className="verse-reference">Génesis 1:1</div>
                <div className="participants">{likedVerses.has('verse1') ? '1025' : '1024'} likes</div>
                <div className="verse-actions">
                  <button 
                    className={`action-btn btn-like ${likedVerses.has('verse1') ? 'liked' : ''}`}
                    onClick={() => toggleLike('verse1')}
                  >
                    <span className="like-icon">⭐</span> 
                    <span className="like-text">{likedVerses.has('verse1') ? 'Liked' : 'Like'}</span>
                  </button>
                  <button className="action-btn btn-etiquetar">🏷️ Etiquetar</button>
                  <button className="action-btn btn-proverbio">💡 Proverbio</button>
                  <button 
                    className="action-btn btn-compartir"
                    onClick={() => openShareModal({
                      reference: "Génesis 1:1",
                      text: "En el principio creó Dios los cielos y la tierra."
                    })}
                  >
                    📤 Compartir
                  </button>
                </div>
              </div>

              <div className="verse-card">
                <div className="verse-text">
                  "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
                </div>
                <div className="verse-reference">Juan 3:16</div>
                <div className="participants">{likedVerses.has('verse2') ? '2848' : '2847'} likes</div>
                <div className="verse-actions">
                  <button 
                    className={`action-btn btn-like ${likedVerses.has('verse2') ? 'liked' : ''}`}
                    onClick={() => toggleLike('verse2')}
                  >
                    <span className="like-icon">⭐</span> 
                    <span className="like-text">{likedVerses.has('verse2') ? 'Liked' : 'Like'}</span>
                  </button>
                  <button className="action-btn btn-etiquetar">🏷️ Etiquetar</button>
                  <button className="action-btn btn-proverbio">💡 Proverbio</button>
                  <button 
                    className="action-btn btn-compartir"
                    onClick={() => openShareModal({
                      reference: "Juan 3:16",
                      text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
                    })}
                  >
                    📤 Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Section */}
        {currentSection === 'search' && (
          <div className="section active">
            <div className="container">
              <div className="search-container">
                <div className="search-input-group">
                  <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Buscar en las escrituras..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchEnter}
                  />
                  <span className="search-icon" onClick={performSearch}>🔍</span>
                </div>
                
                <div className="search-filters">
                  <div className="filter-group">
                    <input type="checkbox" id="letras-parciales" className="filter-checkbox" />
                    <label htmlFor="letras-parciales">Letras parciales</label>
                  </div>
                  <div className="filter-group">
                    <input type="checkbox" id="palabras-exactas" className="filter-checkbox" defaultChecked />
                    <label htmlFor="palabras-exactas">Palabras exactas</label>
                  </div>
                  <div className="filter-group">
                    <input type="checkbox" id="frases-consecutivas" className="filter-checkbox" />
                    <label htmlFor="frases-consecutivas">Frases consecutivas</label>
                  </div>
                </div>
                
                <div className="testament-buttons">
                  <button className="testament-btn active">TODO</button>
                  <button className="testament-btn">AT - Antiguo Testamento</button>
                  <button className="testament-btn">NT - Nuevo Testamento</button>
                </div>
                
                <div className="search-results">
                  {searchResults.length === 0 ? (
                    <p style={{textAlign: 'center', color: 'var(--turquesa)', fontSize: '18px'}}>
                      {searchQuery ? `No se encontraron resultados para "${searchQuery}"` : 'Ingresa una palabra o frase para buscar en las escrituras'}
                    </p>
                  ) : (
                    <>
                      <h3 style={{color: 'var(--lila)', marginBottom: '20px'}}>
                        Se encontraron {searchResults.length} resultados para "{searchQuery}":
                      </h3>
                      {searchResults.map((result, index) => (
                        <div key={index} className="result-item">
                          <div className="result-content">
                            <div className="result-verse">{result.reference}</div>
                            <div className="result-text">{result.text}</div>
                          </div>
                          <button className="translate-btn" onClick={() => showTranslation(result.reference)}>
                            🌐 Ver Traducción
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Translations Section */}
        {currentSection === 'translations' && (
          <div className="section active">
            <div className="container">
              <div className="translation-container">
                <div className="translation-header">
                  <div className="translation-title">Traducciones Bíblicas</div>
                  <div className="translation-reference">
                    {selectedVerse ? selectedVerse.reference : 'Selecciona un versículo para ver su traducción'}
                  </div>
                </div>
                
                {selectedVerse && (
                  <div className="translation-panels">
                    <div className="translation-panel sync-scroll" ref={spanishPanelRef}>
                      <div className="panel-title">📖 Español</div>
                      <div className="panel-text">{selectedVerse.spanish}</div>
                      <div className="audio-controls">
                        <button className="play-btn">🔊 Escuchar en Español</button>
                      </div>
                    </div>
                    
                    <div className="translation-panel sync-scroll" ref={originalPanelRef}>
                      <div className="panel-title">📜 {selectedVerse.language}</div>
                      <div className="panel-text">{selectedVerse.original}</div>
                      <div className="pronunciation">Pronunciación: {selectedVerse.pronunciation}</div>
                      <div className="audio-controls">
                        <button className="play-btn">🔊 Escuchar Original</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notebook Section */}
        {currentSection === 'notebook' && (
          <div className="section active">
            <div className="container">
              <div className="notebook-container">
                <div className="notebook-content">
                  <h2 className="notebook-title">✝️ Block de Notas Espiritual</h2>
                  
                  <div className="note-input-container">
                    <textarea 
                      className="note-input" 
                      placeholder="Escribe tus reflexiones, oraciones, versículos favoritos o pensamientos espirituales aquí..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                    />
                  </div>
                  
                  <div className="note-actions">
                    <button className="save-note-btn" onClick={saveNote}>💾 Guardar Nota</button>
                    <div style={{color: 'var(--texto-oscuro)', fontWeight: '500'}}>
                      <strong>Palabras favoritas guardadas: </strong>
                      <span style={{color: 'var(--turquesa)'}}>Paz, Amor, Fe, Esperanza, Gracia</span>
                    </div>
                  </div>

                  <div className="saved-notes">
                    <h3 style={{color: 'var(--lila)', marginBottom: '20px', fontSize: '24px'}}>📝 Mis Notas Guardadas</h3>
                    
                    {savedNotes.map(note => (
                      <div key={note.id} className="saved-note" onClick={() => toggleNote(note.id)}>
                        <div className="note-actions-icons">
                          <button 
                            className="note-action-icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              editNote(note);
                            }}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button 
                            className="note-action-icon delete" 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNote(note.id);
                            }}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                        <div className="note-header">
                          <div className="note-title">{note.title}</div>
                          <button className="note-toggle">
                            {expandedNotes.has(note.id) ? '📄' : '📖'}
                          </button>
                        </div>
                        <div className={`note-content ${expandedNotes.has(note.id) ? 'expanded' : ''}`}>
                          {note.content}
                        </div>
                        <div className="note-date">{note.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Notebook Button */}
      <div className="floating-notebook" onClick={() => setCurrentSection('notebook')} title="Abrir Block de Notas">
        📝
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="modal-overlay active" onClick={closeShareModal}>
          <div className="share-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">📤 Compartir Versículo</h3>
              <button className="modal-close" onClick={closeShareModal}>×</button>
            </div>
            
            <div className="verse-preview">
              <div className="verse-preview-text">{selectedVerse?.text}</div>
              <div className="verse-preview-ref">{selectedVerse?.reference}</div>
            </div>
            
            <h4 style={{color: 'var(--lila)', marginBottom: '15px'}}>Selecciona contactos:</h4>
            <div className="contacts-list">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`contact-item ${selectedContacts.has(contact.id) ? 'selected' : ''}`}
                  onClick={() => toggleContact(contact.id)}
                >
                  <div className="contact-avatar" style={{background: contact.gradient}}>
                    {contact.emoji}
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-status">{contact.status}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="share-buttons">
              <button className="share-btn share-btn-secondary" onClick={closeShareModal}>Cancelar</button>
              <button className="share-btn share-btn-primary" onClick={shareVerse}>Compartir</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editModalOpen && (
        <div className="modal-overlay active" onClick={() => setEditModalOpen(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">✏️ Editar Nota</h3>
              <button className="modal-close" onClick={() => setEditModalOpen(false)}>×</button>
            </div>
            
            <input 
              type="text" 
              className="edit-note-title" 
              placeholder="Título de la nota"
              value={editNoteTitle}
              onChange={(e) => setEditNoteTitle(e.target.value)}
            />
            <textarea 
              className="edit-note-input" 
              placeholder="Contenido de la nota..."
              value={editNoteContent}
              onChange={(e) => setEditNoteContent(e.target.value)}
            />
            
            <div className="share-buttons">
              <button className="share-btn share-btn-secondary" onClick={() => setEditModalOpen(false)}>Cancelar</button>
              <button className="share-btn share-btn-primary" onClick={saveEditedNote}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;