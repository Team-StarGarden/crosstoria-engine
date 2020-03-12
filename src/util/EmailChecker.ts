const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// Original Code:
// https://github.com/manishsaraan/email-validator/blob/master/index.js
export const validate = (email: string): boolean => {
  if (!email) return false;

  if (email.length > 256) return false;

  if (!tester.test(email)) return false;

  // Further checking of some things regex can't handle
  const [account, address] = email.split('@');
  if (account.length > 64) return false;

  const domainParts = address.split('.');
  return !domainParts.some(part => {
    return part.length > 63;
  });
};
