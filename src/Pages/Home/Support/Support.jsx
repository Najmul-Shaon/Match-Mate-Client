import React from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 text-black text-center mt-24">
      <SectionTitle header={"Find Your Perfect Match Today!"} />
      <p className="text-lg mb-6 mt-3 max-w-2xl mx-auto">
        Join thousands of happy members who found their ideal match. Don't wait
        — start your journey to a meaningful connection now!
      </p>
      <Link to='signup' className="btn-gradient">Sign Up Now</Link>
    </section>
  );
};

export default Support;
