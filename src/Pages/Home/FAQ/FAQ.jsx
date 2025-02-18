import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { BiChevronDown } from "react-icons/bi";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Match Mate?",
      answer:
        "Match Mate is a platform designed to help individuals find compatible partners based on shared interests, values, and goals, promoting meaningful connections.",
    },
    {
      question: "Is Match Mate free to use?",
      answer:
        "Yes! Match Mate is free to access for all users. Premium features may be introduced in the future for enhanced experience.",
    },
    {
      question: "Who can use Match Mate?",
      answer:
        "Anyone looking for a compatible partner based on shared preferences, hobbies, and lifestyle can join Match Mate and start exploring potential matches.",
    },
    {
      question: "How do I create a profile on Match Mate?",
      answer:
        "To create a profile, simply sign up with your email or social media accounts, fill in your personal information, and start adding your interests and preferences.",
    },
    {
      question: "How are matches suggested?",
      answer:
        "Matches are suggested using an intelligent algorithm that considers your profile details, interests, preferences, and other compatibility factors.",
    },
    {
      question: "Can I message my matches?",
      answer:
        "Yes! Once you’ve matched with someone, you can send messages, start conversations, and get to know each other better.",
    },
    {
      question: "What happens if my profile is inactive for a long time?",
      answer:
        "If your profile remains inactive for an extended period, we may send a reminder email to encourage you to log back in and update your preferences.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="bg-background rounded-lg mt-24">
        <SectionTitle
          header={"Frequently Asked Questions"}
          subHeader={
            "Get quick answers to your queries and make the most of your Match Mate experience."
          }
        ></SectionTitle>

        <div className="space-y-4 mt-12 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-primary rounded-xl shadow-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg text-accent font-semibold">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BiChevronDown size={20} />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: openIndex === index ? 1 : 0,
                  height: openIndex === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-text overflow-hidden" // Added overflow-hidden to prevent content from showing outside while collapsing
              >
                {faq.answer}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
