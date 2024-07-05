import React, { useState } from 'react';

const HelpCenter = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('General Inquiry');
//   const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send email)
    console.log('Email:', email);
    console.log('Message:', message);
    console.log({ firstName, lastName, phone, email, message, subject });
    // Reset form fields
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-primary w-full">
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto bg-white my-6 font-[sans-serif]">
        <div className="text-center px-6">
          <h2 className="text-gray-800 text-3xl font-extrabold">Contact Us</h2>
          <p className="text-sm text-gray-500 mt-4">Have some big idea or brand to develop and need help?</p>
        </div>

        <div className="grid lg:grid-cols-3 items-start gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-12">
          <div className="bg-[#011c2b] rounded-lg p-6 h-full max-lg:order-1">
            <h2 className="text-xl text-white">Contact Information</h2>
            <p className="text-sm text-gray-300 mt-4">Have some big idea or brand to develop and need help?</p>
            <ul className="mt-16 space-y-8">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" viewBox="0 0 479.058 479.058">
                  <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
                </svg>
                <a href="mailto:info@example.com" className="text-white text-sm text-gray-500 ml-4">
                  info@example.com
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" viewBox="0 0 482.6 482.6">
                  <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.5-61.9-86.7-78.6-131.2-10.4-28.4-14.3-51.9-12.5-72.9z" />
                </svg>
                <a href="tel:+911234567890" className="text-white text-sm text-gray-500 ml-4">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" viewBox="0 0 409.6 409.6">
                  <path d="M204.8 0C91.776 0 0 91.776 0 204.8s91.776 204.8 204.8 204.8 204.8-91.776 204.8-204.8S317.824 0 204.8 0zm0 376.32c-94.208 0-171.52-77.312-171.52-171.52S110.592 33.28 204.8 33.28 376.32 110.592 376.32 204.8 299.008 376.32 204.8 376.32z" />
                  <path d="M204.8 85.76c-66.432 0-120.32 53.888-120.32 120.32s53.888 120.32 120.32 120.32 120.32-53.888 120.32-120.32-53.888-120.32-120.32-120.32zm0 207.872c-48.896 0-87.552-39.168-87.552-87.552S155.904 118.528 204.8 118.528s87.552 39.168 87.552 87.552-39.168 87.552-87.552 87.552z" />
                  <path d="M301.056 65.024c0 14.72-11.968 26.688-26.688 26.688s-26.688-11.968-26.688-26.688 11.968-26.688 26.688-26.688 26.688 11.968 26.688 26.688z" />
                </svg>
                <a href="https://www.google.com/maps?q=Address" target="_blank" className="text-white text-sm text-gray-500 ml-4">
                  Your Address
                </a>
              </li>
            </ul>
          </div>

          <div className="p-4 lg:col-span-2">
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="px-2 py-3 bg-white w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
              <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
              <path
                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="relative flex items-center">
            <input
              type="number"
              placeholder="Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
            <svg fill="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 64 64">
              <path
                d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                data-original="#000000"
              ></path>
            </svg>
          </div>

          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 py-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path
                  fill="none"
                  stroke-miterlimit="10"
                  stroke-width="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <textarea
              placeholder="Write Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-2 pt-3 bg-white text-black w-full text-sm text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
              <defs>
                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                  <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                </clipPath>
              </defs>
              <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                <path
                  fill="none"
                  stroke-miterlimit="10"
                  stroke-width="40"
                  d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  data-original="#000000"
                ></path>
                <path
                  d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
          </div>

          <div className="col-span-full">
            <h6 className="text-sm text-gray-800">Select Subject</h6>
            <div className="flex max-lg:flex-col gap-6 mt-4">
              <div className="flex items-center">
                <input
                  id="radio1"
                  type="radio"
                  name="subject"
                  value="General Inquiry"
                  checked={subject === 'General Inquiry'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="radio1"
                  className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                >
                  <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                </label>
                <p className="text-sm text-gray-500 ml-4">General Inquiry</p>
              </div>

              <div className="flex items-center">
                <input
                  id="radio2"
                  type="radio"
                  name="subject"
                  value="Technical Support"
                  checked={subject === 'Technical Support'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="radio2"
                  className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                >
                  <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                </label>
                <p className="text-sm text-gray-500 ml-4">Technical Support</p>
              </div>

              <div className="flex items-center">
                <input
                  id="radio3"
                  type="radio"
                  name="subject"
                  value="Website Feedback"
                  checked={subject === 'Website Feedback'}
                  onChange={(e) => setSubject(e.target.value)}
                  className="hidden peer"
                />
                <label
                  htmlFor="radio3"
                  className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                >
                  <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full"></span>
                </label>
                <p className="text-sm text-gray-500 ml-4">Website Feedback</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded-lg px-4 py-3 tracking-wide text-white bg-blue-600 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill='#fff' className="mr-2" viewBox="0 0 548.244 548.244">
            <path
              fillRule="evenodd"
              d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
              clipRule="evenodd"
              data-original="#000000"
            />
          </svg>
          Send Message
        </button>
      </form>
    </div>
      </div>
      </div>
    </div>
  );
};

export default HelpCenter;
