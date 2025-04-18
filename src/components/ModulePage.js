// ModulePage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaChartLine,
  FaBookOpen,
  FaQuestionCircle,
  FaCog,
  FaUserCircle,
  FaBackward,
  FaPlay,
  FaForward,
  FaPaperclip,
  FaMicrophone,
  FaPaperPlane,
  FaPencilAlt,
  FaHighlighter,
  FaUndo,
} from 'react-icons/fa';
import eduAppLogo from './edu-app-logo.jpg'; // Adjust path as needed
import './styles.css';

const ModulePage = ({ module = { title: 'Module Title' } }) => {
  // Board background color (can be changed from Settings)
  const [boardBgColor, setBoardBgColor] = useState('#ffffff');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [liveText, setLiveText] = useState('');

  // New states for drawing and color selection (for footer tools)
  const [drawingColor, setDrawingColor] = useState('#000000'); // Default drawing color
  const [showPenPicker, setShowPenPicker] = useState(false);
  const [showHighlighterPicker, setShowHighlighterPicker] = useState(false);
  const availableColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500'];

  // State for the accordion in the left sidebar
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  // Define the accordion items with titles and icons (including "Study Tips")
  const accordionItems = [
    { id: 1, title: "To-do", icon: "📋" },
    { id: 2, title: "Recommended", icon: "📚" },
    { id: 3, title: "Assignments", icon: "📝" },
    { id: 4, title: "Marks", icon: "📊" },
    { id: 5, title: "Study Tips", icon: "💡" },
    { id: 6, title: "Leaderboards", icon: "🏆" },
  ];

  // Define the available height for the accordion container.
  // Assuming header and footer are 60px each.
  const containerHeight = "calc(100vh - 120px)";

  // Use location to access state from navigation (e.g., module title)
  const location = useLocation();
  const moduleTitle = location.state?.title || module.title;

  // Settings for changing board background color
  const handleOpenSettings = () => {
    const newColor = prompt(
      'Enter a new board background color (e.g., #f0f0f0 or red):',
      boardBgColor
    );
    if (newColor) {
      setBoardBgColor(newColor);
    }
  };

  // Handle text changes in the message box
  const handleTextChange = (e) => {
    setLiveText(e.target.value);
  };

  // Submit logic on Enter for messaging
  const handleTextSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Message sent:', liveText);
      setLiveText('');
    }
  };

  // Placeholder undo function
  const handleUndo = () => {
    // Integrate your drawing history here to remove the last element.
    console.log('Undo last drawing element');
  };

  return (
    <div className="module-page" style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* ----- HEADER ----- */}
      <header className="module-header">
        <div className="module-header-left">
          <img src={eduAppLogo} alt="Logo" className="module-logo" />
          <div className="module-brand">BrightPath</div>
        </div>
        {/* Centered Module Title */}
        <div className="module-header-center">
          <h2 className="module-title">{moduleTitle}</h2>
        </div>
        <div className="module-header-right">
          <FaChartLine className="header-icon" style={{ color: '#FF5722' }} title="Progress" />
          <FaBookOpen className="header-icon" style={{ color: '#3F51B5' }} title="Library" />
          <FaQuestionCircle className="header-icon" style={{ color: '#009688' }} title="Help" />
          <FaCog
            className="header-icon"
            style={{ color: '#FFC107' }}
            title="Settings"
            onClick={handleOpenSettings}
          />
          <div
            className="profile-container"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <FaUserCircle className="header-icon" style={{ color: '#E91E63' }} title="Profile" />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => alert('Grades')}>Grades</button>
                <button onClick={() => alert('Check My Profile')}>Check My Profile</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ----- MODULE CONTENT ----- */}
      <div className="module-content" style={{ display: 'flex', overflow: 'hidden' }}>
        {/* Left: Accordion Sidebar attached to the far left */}
        <div
          className="module-dropdown"
          style={{
            width: '20%',
            backgroundColor: "#cfd8dc", // blue-gray tone
            height: containerHeight,
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        >
          {accordionItems.map((item) => {
            const isExpanded = expandedAccordion === item.id;
            return (
              <div
                key={item.id}
                onClick={() =>
                  setExpandedAccordion(expandedAccordion === item.id ? null : item.id)
                }
                style={{
                  flex: isExpanded ? 3 : 1,
                  overflow: 'hidden',
                  marginBottom: '8px',
                  cursor: 'pointer',
                  backgroundColor: isExpanded ? "#80cbc4" : "#b2dfdb",
                  transition: 'flex 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '8px',
                }}
              >
                {/* Accordion Header */}
                <div
                  style={{
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 10px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{item.icon}</span>
                  {item.title}
                </div>
                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#e0f2f1",
                      padding: '10px',
                      fontSize: '14px',
                      overflowY: 'auto',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                    }}
                  >
                    <p>Default data for {item.title}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Interactive Board with a small gap from the sidebar */}
        <div
          className="module-board"
          style={{
            flex: 1,
            marginLeft: "10px", // gap between sidebar and board
            backgroundColor: boardBgColor,
            padding: '20px',
            minHeight: containerHeight,
            borderRadius: '12px',
          }}
        >
          {/* Your interactive board content goes here */}
          {/* Use drawingColor as the current drawing color for drawing */}
        </div>
      </div>

      {/* ----- FOOTER ----- */}
      <footer className="module-footer" style={{ position: 'relative' }}>
        {/* Left Footer: Pen, Highlighter & Undo */}
        <div className="footer-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="tool-group" style={{ position: 'relative' }}>
            <FaPencilAlt
              className="footer-icon"
              title="Pen"
              onClick={() => {
                setShowPenPicker(!showPenPicker);
                setShowHighlighterPicker(false);
              }}
            />
            {showPenPicker && (
              <div
                className="color-picker"
                style={{
                  position: 'absolute',
                  top: '-45px',
                  left: 0,
                  display: 'flex',
                  gap: '5px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '5px',
                  borderRadius: '4px',
                  zIndex: 10,
                }}
              >
                {availableColors.map((color) => (
                  <div
                    key={color}
                    className="color-option"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: color,
                      cursor: 'pointer',
                      border: '1px solid #ccc',
                    }}
                    onClick={() => {
                      setDrawingColor(color);
                      setShowPenPicker(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="tool-group" style={{ position: 'relative' }}>
            <FaHighlighter
              className="footer-icon"
              title="Highlighter"
              onClick={() => {
                setShowHighlighterPicker(!showHighlighterPicker);
                setShowPenPicker(false);
              }}
            />
            {showHighlighterPicker && (
              <div
                className="color-picker"
                style={{
                  position: 'absolute',
                  top: '-45px',
                  left: 0,
                  display: 'flex',
                  gap: '5px',
                  background: '#fff',
                  border: '1px solid #ccc',
                  padding: '5px',
                  borderRadius: '4px',
                  zIndex: 10,
                }}
              >
                {availableColors.map((color) => (
                  <div
                    key={color}
                    className="color-option"
                    style={{
                      width: '20px',
                      height: '20px',
                      background: color,
                      cursor: 'pointer',
                      border: '1px solid #ccc',
                    }}
                    onClick={() => {
                      setDrawingColor(color);
                      setShowHighlighterPicker(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <FaUndo className="footer-icon" title="Undo" onClick={handleUndo} />
        </div>
        {/* Center Footer: Playback Controls */}
        <div
          className="footer-center"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          <FaBackward className="footer-icon" title="Previous" />
          <FaPlay className="footer-icon" title="Play/Pause" />
          <FaForward className="footer-icon" title="Forward" />
        </div>
        {/* Right Footer: Message Input */}
        <div className="footer-right">
          <div className="message-input-container">
            <FaPaperclip className="attachment-icon" title="Attach" />
            <textarea
              className="message-input"
              placeholder="Type message..."
              value={liveText}
              onChange={handleTextChange}
              onKeyDown={handleTextSubmit}
            />
            {liveText.trim() === '' ? (
              <FaMicrophone className="record-icon" title="Record" />
            ) : (
              <FaPaperPlane className="send-icon" title="Send" />
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModulePage;
