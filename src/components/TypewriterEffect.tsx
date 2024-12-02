import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts?: string[];
  text?: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  texts = [], 
  text = '', 
  speed = 50, 
  delay = 2000, 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const textToType = texts.length > 0 ? texts[currentTextIndex] : text;
    let i = 0;
    setDisplayText('');

    const typingEffect = setInterval(() => {
      if (i < textToType.length) {
        setDisplayText(prevText => prevText + textToType.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);

        // If multiple texts, cycle to next text after delay
        if (texts.length > 1) {
          setTimeout(() => {
            setCurrentTextIndex((prevIndex) => 
              (prevIndex + 1) % texts.length
            );
          }, delay);
        }
      }
    }, speed);

    return () => {
      clearInterval(typingEffect);
    };
  }, [text, texts, speed, delay, currentTextIndex]);

  return <span className={className}>{displayText}</span>;
};

export default TypewriterEffect;
