'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputPage() {
    const [text, setText] = useState('');
    const [nValue, setNValue] = useState(6);
    const router = useRouter();

    const handleSubmit = () => {
        router.push(`/test?text=${encodeURIComponent(text)}&nValue=${nValue}`);
    };

    return (
        <div>
            <h1>Input Text for Cloze Test</h1>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter your paragraphs here..."
            />
            <input 
                type="number" 
                value={nValue} 
                onChange={(e) => setNValue(parseInt(e.target.value))} 
                placeholder="Enter N value"
            />
            <button onClick={handleSubmit}>Start Test</button>
        </div>
    );
}
