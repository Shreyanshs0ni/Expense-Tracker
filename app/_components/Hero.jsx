import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="flex flex-col items-center bg-gray-50">
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
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-primary sm:w-auto"
                href="/sign-in"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        <Image
          src="/dashboard.png"
          alt="dashboard"
          width={1000}
          height={800}
          className="-mt-5 mb-5 rounded-xl border-2"
        />
      </section>
    </div>
  );
};

export default Hero;
