import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [firstName, setFirstName]         = useState('');
  const [lastName, setLastName]           = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or error message
  const navigate = useNavigate();

  const availableModules = [
    'Physical Science', 'Life Sciences', 'Mathematics',
    'Accounting', 'English FAL', 'Economics',
    'Sepedi HL', 'Geography', 'Agricultural Sciences'
  ];

  const handleModuleSelection = (module) => {
    setSelectedModules((prevModules) =>
      prevModules.includes(module)
        ? prevModules.filter((m) => m !== module)
        : [...prevModules, module]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user using Firebase Authentication.
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Transform the selected modules to objects: { id, title }
      const modulesAsObjects = selectedModules.map((module, index) => ({
        id: index,
        title: module
      }));

      console.log('Modules to be saved:', modulesAsObjects);

      // Save user details to Firestore with modules as objects.
      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        modules: modulesAsObjects,
      });

      // Save user data locally for later use.
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);

      setSubmissionStatus('success');

      // Redirect to the login page after 2 seconds.
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setSubmissionStatus('User already registered');
      } else {
        setSubmissionStatus('Registration failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <fieldset>
        <legend>Select Modules:</legend>
        {availableModules.map((module) => (
          <label key={module}>
            <input
              type="checkbox"
              value={module}
              checked={selectedModules.includes(module)}
              onChange={() => handleModuleSelection(module)}
            />
            {module}
          </label>
        ))}
      </fieldset>
      {submissionStatus && (
        <p style={{ color: submissionStatus === 'success' ? 'green' : 'red' }}>
          {submissionStatus === 'success'
            ? 'Registration successful! Redirecting to login...'
            : submissionStatus}
        </p>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
