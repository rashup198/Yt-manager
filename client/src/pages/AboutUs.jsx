import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            About Our Project
          </h1>
          <p className="text-xl font-light">
            Transforming YouTube Content Management
          </p>
        </div>
      </div>

      {/* Project Overview Section */}
      <section className="py-20 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Vision</h2>
          <p className="text-lg font-light text-gray-300">
            Our project makes it easier for YouTubers to manage their content. We have tried to make a user-friendly platform for uploading videos, getting approvals, and working with editors, so creators can focus more on making great content.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-richblack-800 py-20 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Seamless Uploads</h3>
              <p className="text-gray-300">
                Upload your videos effortlessly with our integrations,
                ensuring security and reliability.
              </p>
            </div>
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Role-Based Access
              </h3>
              <p className="text-gray-300">
                Control who sees what with our robust role-based access for
                YouTubers and editors.
              </p>
            </div>
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Workspace Management</h3>
              <p className="text-gray-300">
                Manage multiple workspaces and collaborations with ease.
              </p>
            </div>
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Secure Authentication</h3>
              <p className="text-gray-300">
                Your data is safe with our top-notch security protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 lg:px-20 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Priyanshu Pandey</h3>
              <p className="text-gray-300">Developer</p>
              <p className="text-gray-400 mt-2">
                Priyanshu worked on developing the core functionality of the platform, ensuring smooth performance and robust features.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Abhay</h3>
              <p className="text-gray-300">UI/UX Designer</p>
              <p className="text-gray-400 mt-2">
                Abhay designed the user interface and user experience, making the platform intuitive and visually appealing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-4 text-center">
        <p className="text-gray-400">
          Built with <span className=" text-[#fb0202]">❤</span> by <a href="https://github.com/rashup198" className=" underline underline-offset-2" target="_black">Priyanshu Pandey</a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
