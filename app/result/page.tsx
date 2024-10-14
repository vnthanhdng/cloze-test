'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';



function calculateScore(originalText: string, userInput: string): number {
    const originalWords = originalText.split(' ');
    const userWords = userInput.split(' ');

    let correctCount = 0;
    originalWords.forEach((word, index) => {
        if (userWords[index] && userWords[index].toLowerCase() === word.toLowerCase()) {
            correctCount++;
        }
    });

    return (correctCount / originalWords.length) * 100;
}

function getReadingLevel(score: number): string {
    if (score < 1) return 'Below 1st grade';
    if (score >= 1 && score < 2) return '1st grade';
    if (score >= 2 && score < 3) return '2nd grade';
    if (score >= 3 && score < 4) return '3rd grade';
    if (score >= 4 && score < 5) return '4th grade';
    if (score >= 5 && score < 6) return '5th grade';
    if (score >= 6 && score < 7) return '6th grade';
    if (score >= 7 && score < 8) return '7th grade';
    if (score >= 8 && score < 9) return '8th grade';
    if (score >= 9 && score < 10) return '9th grade, freshman in high school';
    if (score >= 10 && score < 11) return '10th grade, sophomore in high school';
    if (score >= 11 && score < 12) return '11th grade, junior in high school';
    if (score >= 12 && score < 13) return '12th grade, high-school senior';
    if (score >= 13 && score < 14) return 'College freshman';
    if (score >= 14 && score < 15) return 'College sophomore';
    if (score >= 15 && score < 16) return 'College junior';
    if (score >= 16 && score < 17) return 'College senior';
    return 'College graduate or beyond';
}

function calculateFleschKincaid(text: string): number {
    const sentences = text.split(/[.?!]/).filter(Boolean).length;
    const words = text.split(' ').filter(Boolean).length;
    const syllables = text.split(/[^aeiouy]+/).filter(Boolean).length; // Approximate syllables

    const score = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;
    return score;  // Returns the float score.
}

export default function ResultPage() {
    const searchParams = useSearchParams();
    const originalText = searchParams.get('originalText') || '';
    const userInput = searchParams.get('userInput') || '';

    const score = calculateScore(originalText, userInput);
    const fkScore = calculateFleschKincaid(originalText);
    const readingLevel = getReadingLevel(fkScore);

    const [highlightedResult, setHighlightedResult] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const textWords = originalText.split(' ');
        const inputWords = userInput.split(' ');

        const highlighted = textWords.map((word, index) => {
            const userWord = inputWords[index] || '';

            // We only want to highlight the words that were part of the cloze test (blurred ones)
            if ((index + 1) % 6 === 0) {  // Example logic to choose which words were blurred
                const isCorrect = word === userWord;

                return (
                    <Box 
                        key={index} 
                        component="span" 
                        sx={{
                            backgroundColor: isCorrect ? 'green' : 'red',
                            color: 'white',
                            padding: '0.2rem 0.4rem',
                            borderRadius: '4px',
                            marginRight: '8px',
                            display: 'inline-block',
                            fontWeight: isCorrect ? 'bold' : 'normal'
                        }}
                    >
                        {userWord || word}
                    </Box>
                );
            }
            
            // For non-blurred words, just display them as normal text
            return (
                <Typography 
                    key={index} 
                    variant="body1" 
                    component="span" 
                    style={{ marginRight: '8px' }}
                >
                    {word}
                </Typography>
            );
        });

        setHighlightedResult(highlighted);
    }, [originalText, userInput]);

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Cloze Test Result
            </Typography>

            <Typography variant="body1" gutterBottom>
                Here are your results:
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={1}>
                {highlightedResult}
            </Box>

            <Typography variant="body1" gutterBottom>
                Your Score: <strong>{score.toFixed(2)}%</strong>
            </Typography>

            <Typography variant="body1" gutterBottom>
                Flesch-Kincaid Reading Level: <strong>{readingLevel}</strong>
            </Typography>

            <Button 
                onClick={() => window.location.href = '/'}
                variant="contained"
                color="primary"
                style={{ marginTop: '2rem', alignSelf: 'center' }}
            >
                Take Another Test
            </Button>
        </Container>
    );
}
