import React, { useState } from 'react';

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">FAQs</h1>
          <p className="mb-4">Find answers to your questions about shipping, returns, and sizing right here.</p>
          <a href="#" className="btn btn-dark my-3">Contact Us</a>
        </div>
      </div>
      <div className="accordion" id="faqAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className={`accordion-button ${activeIndex === 0 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(0)}
              aria-expanded={activeIndex === 0}
              aria-controls="collapseOne"
            >
              What are your shipping options?
            </button>
          </h2>
          <div
            id="collapseOne"
            className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`}
            aria-labelledby="headingOne"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping arrives within 2-3 business days. You can choose your preferred method at checkout.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={`accordion-button ${activeIndex === 1 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(1)}
              aria-expanded={activeIndex === 1}
              aria-controls="collapseTwo"
            >
              How do I return?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className={`accordion-collapse collapse ${activeIndex === 1 ? 'show' : ''}`}
            aria-labelledby="headingTwo"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>To initiate a return, please contact our customer service within 30 days of receiving your order. Ensure the items are unworn and in original packaging. We will provide you with a return shipping label.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className={`accordion-button ${activeIndex === 2 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(2)}
              aria-expanded={activeIndex === 2}
              aria-controls="collapseThree"
            >
              What size should I choose?
            </button>
          </h2>
          <div
            id="collapseThree"
            className={`accordion-collapse collapse ${activeIndex === 2 ? 'show' : ''}`}
            aria-labelledby="headingThree"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>We provide a detailed size chart on each product page. Measure yourself and compare your measurements to the chart for the best fit. If you're between sizes, we recommend sizing up.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className={`accordion-button ${activeIndex === 3 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(3)}
              aria-expanded={activeIndex === 3}
              aria-controls="collapseFour"
            >
              Do you offer exchanges?
            </button>
          </h2>
          <div
            id="collapseFour"
            className={`accordion-collapse collapse ${activeIndex === 3 ? 'show' : ''}`}
            aria-labelledby="headingFour"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>Yes, we do offer exchanges. If you need a different size or color, please contact us within 30 days of your purchase. We will guide you through the exchange process.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className={`accordion-button ${activeIndex === 4 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(4)}
              aria-expanded={activeIndex === 4}
              aria-controls="collapseFive"
            >
              How can I track?
            </button>
          </h2>
          <div
            id="collapseFive"
            className={`accordion-collapse collapse ${activeIndex === 4 ? 'show' : ''}`}
            aria-labelledby="headingFive"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>Once your order has shipped, you will receive a tracking number via email. You can use this number on our website to track your shipment. If you have any issues, feel free to reach out to our support team.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className={`accordion-button ${activeIndex === 5 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(5)}
              aria-expanded={activeIndex === 5}
              aria-controls="collapseSix"
            >
              What payment methods do you accept?
            </button>
          </h2>
          <div
            id="collapseSix"
            className={`accordion-collapse collapse ${activeIndex === 5 ? 'show' : ''}`}
            aria-labelledby="headingSix"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>We accept all major credit cards, PayPal, and Apple Pay. Your payment information is securely processed and encrypted to ensure the safety of your transaction.</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSeven">
            <button
              className={`accordion-button ${activeIndex === 6 ? '' : 'collapsed'}`}
              type="button"
              onClick={() => toggleAccordion(6)}
              aria-expanded={activeIndex === 6}
              aria-controls="collapseSeven"
            >
              Do you offer any discounts or promotions?
            </button>
          </h2>
          <div
            id="collapseSeven"
            className={`accordion-collapse collapse ${activeIndex === 6 ? 'show' : ''}`}
            aria-labelledby="headingSeven"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              <p>Yes, we offer various discounts and promotions throughout the year. Be sure to check our website or sign up for our newsletter to stay up-to-date on the latest deals and offers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
