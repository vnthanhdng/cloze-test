'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Typography, TextField, Box, Button } from '@mui/material';

// Function to blur words, keeping the first 1-2 characters
function blurWord(word: string): string {
    if (word.length <= 2) {
        return '_'.repeat(word.length);
    } else if (word.length <= 4) {
        return word[0] + '_'.repeat(word.length - 1);
    } else {
        return word.slice(0, 2) + '_'.repeat(word.length - 2);
    }
}

export default function TestPage() {
    const searchParams = useSearchParams();
    const text = searchParams.get('text') || '';
    const nValue = parseInt(searchParams.get('nValue') || '6', 10);
    const [userInput, setUserInput] = useState<string[]>([]);
    const router = useRouter();

    const words = text.split(' ');

    const handleInputChange = (index: number, value: string) => {
        let inputs = [...userInput];
        inputs[index] = value;
        setUserInput(inputs);
    };

    const handleSubmit = () => {
        router.push(`/result?originalText=${encodeURIComponent(text)}&userInput=${encodeURIComponent(userInput.join(' '))}`);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Cloze Test
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
                    {words.map((word, index) => {
                        if ((index + 1) % nValue === 0) {
                            return (
                                <TextField
                                    key={index}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    placeholder={blurWord(word)}
                                    variant="outlined"
                                    size="small"
                                    style={{ 
                                        marginRight: '4px', 
                                        marginBottom: '4px', 
                                        width: `${Math.max(80, word.length * 10)}px`,
                                    }}
                                    InputProps={{
                                        style: {
                                            height: '30px', // Set the height of the input box
                                            padding: '2px', // Ensure proper padding inside the input
                                            textAlign: 'left'  // Align text centrally in the input
                                        }
                                    }}
                                />
                            );
                        }
                        return (
                            <Typography key={index} variant="body1" component="span" style={{ marginRight: '8px', marginBottom: '8px', lineHeight: '40px' }}>
                                {word}
                            </Typography>
                        );
                    })}
                </Box>

                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    style={{ marginTop: '2rem', alignSelf: 'center' }}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
}
