import React from 'react';

const TermsAndConditions = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="https://merchant.razorpay.com/policy/P98FQhsaw1v0sO/terms"
        title="Razorpay Terms and Conditions"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default TermsAndConditions;
