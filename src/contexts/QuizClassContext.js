import React, { createContext, useState, useContext } from 'react';

const QuizClassContext = createContext();

export const QuizClassProvider = ({ children }) => {
  const [quizCode, setQuizCode] = useState('');
  const [classCode, setClassCode] = useState('');

  return (
    <QuizClassContext.Provider value={{ quizCode, setQuizCode, classCode, setClassCode }}>
      {children}
    </QuizClassContext.Provider>
  );
};

export const useQuizClass = () => {
  return useContext(QuizClassContext);
};
