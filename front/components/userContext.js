// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// UserContext를 사용하는 커스텀 훅
const useUser = () => {
  return useContext(UserContext);
};

module.exports = {
    UserProvider,
    useUser
}