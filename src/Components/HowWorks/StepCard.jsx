import { CgProfile } from "react-icons/cg";
import { LuMessageCirclePlus } from "react-icons/lu";
import { MdPayment } from "react-icons/md";

const steps = [
  {
    icon: <CgProfile className="text-5xl text-secondary" />,
    title: "Sign up with Email",
    description: [
      "Register for yourself or your close one",
      "Give your full information",
      "Complete each step carefully",
    ],
  },
  {
    icon: <MdPayment className="text-5xl text-secondary" />,
    title: "Become a premium member",
    description: [
      "Make Payment",
      "Search bride/groom",
      "Send request to see full bio-data",
    ],
  },
  {
    icon: <LuMessageCirclePlus className="text-5xl text-secondary" />,
    title: "Communicate and marry",
    description: [
      "Send communication request",
      "Send message",
      "Meet and get married",
    ],
  },
];

const StepCard = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="w-full max-w-sm p-4 bg-white border border-dashed border-gray-300 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex justify-center my-3">{step.icon}</div>
          <h3 className="text-center mb-4 text-2xl font-medium text-gray-500 dark:text-gray-400">
            {step.title}
          </h3>
          <ul role="list" className="space-y-5 my-7">
            {step.description.map((text, idx) => (
              <li key={idx} className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-accent dark:text-accent"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StepCard;
