// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
// }

// interface AuthContextProps {
//   isAuthorized: boolean;
//   setIsAuthorized: (value: boolean) => void;
//   user: any;
//   setUser: (user: any) => void;
//   token: string | null;
//   setToken: (token: string | null) => void;
//   participatedEvents: Event[];
//   fetchParticipatedEvents: () => void;
// }

// export const Context = createContext<AuthContextProps>({
//   isAuthorized: false,
//   setIsAuthorized: () => {},
//   user: null,
//   setUser: () => {},
//   token: null,
//   setToken: () => {},
//   participatedEvents: [],
//   fetchParticipatedEvents: () => {},
// });

// const AuthUser: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   // const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);

//   const fetchParticipatedEvents = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/event/participated/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Cache-Control': 'no-cache',
//         },
//       });
//       setParticipatedEvents(response.data.events);
//     } catch (error) {
//       console.error('Error fetching participated events:', error);
//     }
//   };
  

//   const fetchUser = async () => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       if (storedToken) {
//         setToken(storedToken);
//         const response = await axios.get('http://localhost:5000/auth/current-user', {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//             'Cache-Control': 'no-cache',
//           },
//         });
//         setUser(response.data.user);
//         setIsAuthorized(true); // Set isAuthorized to true when user is fetched
//       } else {
//         setIsAuthorized(false); // Set isAuthorized to false if no token found
//         setUser(null);
//       }
//     } catch (error) {
//       setIsAuthorized(false);
//       setUser(null);
//       console.error('Error fetching user:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch user data on mount
//     fetchUser();
//   }, []); // Only fetch user on initial mount

//   useEffect(() => {
//     // Fetch user data whenever isAuthorized or token changes
//     if (isAuthorized && token) {
//       fetchUser();
//     }
//   }, [isAuthorized, token]);

//   return (
//     <Context.Provider
//       value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken, participatedEvents, fetchParticipatedEvents }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };

// export default AuthUser;

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
}

interface AuthContextProps {
  isAuthorized: boolean;
  setIsAuthorized: (value: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  participatedEvents: Event[];
  fetchParticipatedEvents: () => void;
}

export const Context = createContext<AuthContextProps>({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  participatedEvents: [],
  fetchParticipatedEvents: () => {},
});

const AuthUser: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchParticipatedEvents = async () => {
    try {
      const response = await axios.get(`https://volunteer-management-system-ybtz.onrender.com/event/participated/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });
      setParticipatedEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching participated events:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const response = await axios.get('https://volunteer-management-system-ybtz.onrender.com/auth/current-user', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Cache-Control': 'no-cache',
          },
        });
        setUser(response.data.user);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setUser(null);
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching user
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken, participatedEvents, fetchParticipatedEvents }}
    >
      {isLoading ? <div className="flex justify-center items-center h-screen"><p>Loading...</p></div> : children} {/* Show loading state */}
    </Context.Provider>
  );
};

export default AuthUser;
