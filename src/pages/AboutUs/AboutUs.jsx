import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Story");

  const content = {
    Story:
      "We started our journey to make food sharing easy and accessible for everyone.",
    Mission:
      "Our mission is to reduce food waste and help communities in need.",
    Success:
      "We've helped thousands of people and saved tons of food across the country.",
    Team: "Our dedicated team works day and night to make this possible.",
    Others:
      "Other initiatives include workshops, partnerships, and community events.",
  };

  return (
    <div className="md:max-w-6xl mx-auto my-8 sm:my-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-6 sm:mb-8 text-center">
        About Us
      </h1>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {Object.keys(content).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-semibold transition-colors
              ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-secondary hover:bg-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6 border rounded-xl shadow-md bg-white min-h-25">
        <p className="text-secondary text-base sm:text-lg text-center">
          {content[activeTab]}
        </p>
      </div>

      {/* Description Section */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl">
        <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
          Our journey began with a simple yet powerful idea: to reduce food
          waste and bring it to those who truly need it. What started as a small
          initiative soon grew into a mission to make food sharing easy,
          efficient, and impactful.
          <br />
          <br />
          In the early days, our team worked tirelessly with local communities,
          restaurants, and volunteers to collect surplus food and deliver it to
          those in need. The first few months were challenging, but every small
          success inspired us to do even more.
          <br />
          <br />
          Today, we proudly serve thousands of people, and numerous communities
          have joined us in our mission to reduce food waste and provide for
          those in need. Every volunteer, partner, and supporter is part of our
          story—and our journey continues, one meal at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
