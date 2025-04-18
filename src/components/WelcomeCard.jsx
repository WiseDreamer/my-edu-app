import React, { useState } from 'react';
import Modal from 'react-modal';
import './styles.css';

const WelcomeCard = ({ firstName }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
    },
    content: {
      position: 'fixed',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '300px',
      maxWidth: '300px',
      padding: '20px',
      background: '#2c3e50',
      color: '#ecf0f1',
      border: '1px solid #ccc',
      borderRadius: '8px',
    }
  };

  const openModal = (stepTitle, stepDesc) => {
    setCurrentStep({ title: stepTitle, description: stepDesc });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentStep(null);
  };

  return (
    <div className="welcome-card">
      <h2>Welcome {firstName ? firstName : 'User'}! Continue studying to reach milestones.</h2>
      
      <div className="step-indicator">
        <div className="step" onClick={() => openModal('Basics Completed', 'You have completed the basic modules...')}>
          <div className="step-circle completed">1</div>
          <div className="step-title">Basics</div>
        </div>
        <div className="step" onClick={() => openModal('Intermediate Mastery', 'You have moved on to intermediate modules...')}>
          <div className="step-circle">2</div>
          <div className="step-title">Intermediate</div>
        </div>
        <div className="step" onClick={() => openModal('Advanced Proficiency', 'You have completed advanced modules...')}>
          <div className="step-circle">3</div>
          <div className="step-title">Advanced</div>
        </div>
      </div>
      
      {currentStep && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          contentLabel="Step Details" 
          style={modalStyles}
        >
          <h2>{currentStep.title}</h2>
          <p>{currentStep.description}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default WelcomeCard;
