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
            Our project is designed to transform how YouTubers manage their
            content. By providing an intuitive platform for video uploads,
            approvals, and collaboration with editors, we're helping creators
            streamline their workflow and focus on what they do best—creating
            amazing content.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-richblack-800 py-20 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Seamless Uploads</h3>
              <p className="text-gray-300">
                Upload your videos effortlessly with our AWS S3 integration,
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
              <h3 className="text-2xl font-semibold mb-4">Real-Time Alerts</h3>
              <p className="text-gray-300">
                Stay in the loop with instant notifications and streamlined
                approval workflows.
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
            <div className="p-6 bg-richblack-600 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
              <p className="text-gray-300">
                Gain insights into your content performance with detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals Section */}
      <section className="py-20 px-4 lg:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Future Goals</h2>
          <p className="text-lg font-light text-gray-300">
            As we continue to develop this project, our goal is to expand its
            capabilities to support more creators and offer advanced analytics,
            AI-driven content suggestions, and enhanced collaboration tools.
            We're committed to evolving with the needs of our users and staying
            at the forefront of digital content management.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
