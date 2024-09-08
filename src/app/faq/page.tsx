"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { architype_bayer } from "../fonts/config";
import { faqs } from "@/data/faqs";
import { Accordion } from "@mantine/core";

export default function FAQ() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        <h2
          className={`${architype_bayer.className} text-center text-2xl md:text-4xl font-bold mb-6`}
          aria-label="Frequently Asked Questions Heading"
        >
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto">
          <Accordion
            chevronPosition="right"
            classNames={{
              control: "text-xl font-semibold",
              item: "mb-4",
              content: "mt-2 text-gray-600 dark:text-gray-400",
            }}
          >
            {faqs && faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <Accordion.Item key={index} value={`faq-${index}`}>
                  <Accordion.Control>
                    {faq.question}
                  </Accordion.Control>
                  <Accordion.Panel>
                    {faq.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No FAQs available at the moment.
              </p>
            )}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
