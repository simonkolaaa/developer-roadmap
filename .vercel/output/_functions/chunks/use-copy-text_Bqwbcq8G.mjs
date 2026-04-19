import { useState, useEffect } from 'react';

function useCopyText() {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = (text) => {
    navigator.clipboard.writeText(text).then();
    setIsCopied(true);
  };
  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2e3);
    }
    return () => clearTimeout(timeout);
  }, [isCopied]);
  return { isCopied, copyText };
}

export { useCopyText as u };
