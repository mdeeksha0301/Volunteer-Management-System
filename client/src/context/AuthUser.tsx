// // import React, { useState } from 'react'
// // import { createContext } from 'react'

// // export const Context = createContext({isAuthorised:false});

// // const AuthUser = () => {
// //     const [isAuthorised, setIsAuthorised] = useState(false);
// //     const[user, setUser] = useState({});

// //   return (
// //     <Context.Provider value={{isAuthorised, setIsAuthorised, user, setUser}}></Context.Provider>
// //   )
// // }

// // export default AuthUser

// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// // Define the shape of the context data
// interface AuthContextProps {
//   isAuthorized: boolean;
//   setIsAuthorized: (value: boolean) => void;
//   user: any;
//   setUser: (user: any) => void;
//   token: string | null;
//   setToken: (token: string | null) => void;
  
// }

// // Create the context with default values
// export const Context = createContext<AuthContextProps>({
//   isAuthorized: false,
//   setIsAuthorized: () => {},
//   user: null,
//   setUser: () => {},
//   token: null,
//   setToken: () => {},
// });

// const AuthUser: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // State to track if the user is authorized
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   // State to store user data
//   const [user, setUser] = useState({});
//     // State to store the token
//     const [token, setToken] = useState<string | null>(null);

//   // Effect to fetch the current user data on component mount
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const response = await axios.get('/api/current-user', { withCredentials: true });
// //         setUser(response.data);
// //         setIsAuthorized(true);
// //       } catch (error) {
// //         setIsAuthorized(false);
// //         setUser(null);
// //       }
// //     };

// //     fetchUser();
// //   }, []);

//   return (
//     <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken  }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default AuthUser;


// AuthUser.tsx

// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import axios from 'axios';

// // Define the shape of the context data
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

// // Create the context with default values
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

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
// }

// const AuthUser: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // State to track if the user is authorized
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   // State to store user data
//   const [user, setUser] = useState<any>(null);
//   // State to store the token
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

//   const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);

//   const fetchParticipatedEvents = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/event/participated/${user._id}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setParticipatedEvents(response.data.events);
//     } catch (error) {
//       console.error('Error fetching participated events:', error);
//     }
//   };
//   // Effect to fetch the current user data on component mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//           const response = await axios.get('http://localhost:5000/auth/current-user', {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           });
//           setUser(response.data.user);
//           setIsAuthorized(true);
//           fetchParticipatedEvents();
//         } else {
//           setIsAuthorized(false);
//           setUser(null);
//         }
//       } catch (error) {
//         setIsAuthorized(false);
//         setUser(null);
//         console.error('Error fetching user:', error);
//       }
//     };

//     if (isAuthorized && user && token) {
//       fetchParticipatedEvents(); // Fetch participated events if authorized and user details are set
//     }

//     fetchUser();
//   }, [isAuthorized, user, token])

//   return (
//     <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken, participatedEvents, fetchParticipatedEvents }}>
//       {children}
//     </Context.Provider>
//   );
// };

// export default AuthUser;

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
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);

//   const fetchParticipatedEvents = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/event/participated/${user._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setParticipatedEvents(response.data.events);
//     } catch (error) {
//       console.error('Error fetching participated events:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//           setToken(storedToken);
//           const response = await axios.get('http://localhost:5000/auth/current-user', {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           });
//           setUser(response.data.user);
//           setIsAuthorized(true);
//         } else {
//           setIsAuthorized(false);
//           setUser(null);
//         }
//       } catch (error) {
//         setIsAuthorized(false);
//         setUser(null);
//         console.error('Error fetching user:', error);
//       }
//     };

//     // if (isAuthorized && user && token) {
//     //   fetchParticipatedEvents();
//     // }
//     // Only fetch user data if authorized status changes or token changes
//   if (isAuthorized !== null && token !== null) {
//     fetchUser();
//   }

//     fetchUser();
//   }, [isAuthorized, token]);

//   return (
//     <Context.Provider
//       value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken, participatedEvents, fetchParticipatedEvents}}
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
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([]);

  const fetchParticipatedEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/event/participated/${user._id}`, {
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
        const response = await axios.get('http://localhost:5000/auth/current-user', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Cache-Control': 'no-cache',
          },
        });
        setUser(response.data.user);
        setIsAuthorized(true); // Set isAuthorized to true when user is fetched
      } else {
        setIsAuthorized(false); // Set isAuthorized to false if no token found
        setUser(null);
      }
    } catch (error) {
      setIsAuthorized(false);
      setUser(null);
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    // Fetch user data on mount
    fetchUser();
  }, []); // Only fetch user on initial mount

  useEffect(() => {
    // Fetch user data whenever isAuthorized or token changes
    if (isAuthorized && token) {
      fetchUser();
    }
  }, [isAuthorized, token]);

  return (
    <Context.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser, token, setToken, participatedEvents, fetchParticipatedEvents }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthUser;
