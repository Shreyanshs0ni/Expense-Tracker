import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-50 flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Manage Your Expense.
              <strong className="font-extrabold text-primary sm:block">
                {" "}
                Control Your Money{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Manage your finances with ease—add, view, and analyze your
              expenses anytime, anywhere.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                href="#"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        <Image
          src="/dashboard.jpg"
          alt="dashboard"
          width={800}
          height={600}
          className="rounded-xl border-2 -mt-5 mb-5 "
        />
      </section>
    </div>
  );
};

export default Hero;
