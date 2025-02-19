import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-16">
      <div className="py-10 max-w-screen-xl mx-auto px-4">
        {/* Content Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Our Story */}
          <div className="bg-primary shadow-lg hover:shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Story
            </h2>
            <p className="text-gray-600">
              Match Mate was founded with a simple goal: to create a space where
              meaningful relationships are nurtured and celebrated. We
              understand the importance of finding a partner who aligns with
              your values, aspirations, and life goals. That’s why we’ve
              combined cutting-edge technology with a personalized approach to
              help you find your forever connection.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-primary shadow-lg hover:shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To empower individuals in their search for lifelong companionship
              by providing a safe, inclusive, and user-friendly platform that
              bridges hearts and builds enduring relationships.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-primary shadow-lg hover:shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To be the most trusted and celebrated marriage media platform,
              fostering connections that last a lifetime and bringing happiness
              to countless lives.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-primary shadow-lg hover:shadow-xl rounded-lg p-6 flex items-center justify-center">
            <p className="text-xl font-medium text-gray-800">
              Ready to start your journey? <br />
              <span className="text-accent font-semibold">
                <Link to="/signup" className="underline text-secondary">
                  Join
                </Link>{" "}
                Match Mate today!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
