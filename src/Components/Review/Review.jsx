import React, { useState, useEffect } from 'react';

const Review = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const content = [
        { avatar: '👤', name: 'John Doe', country: 'USA', text: 'Content 1' },
        { avatar: '👤', name: 'Jane Smith', country: 'Canada', text: 'Content 2' },
        { avatar: '👤', name: 'Alice Johnson', country: 'UK', text: 'Content 3' },
        { avatar: '👤', name: 'Bob Brown', country: 'Australia', text: 'Content 4' },
        { avatar: '👤', name: 'Charlie Davis', country: 'Germany', text: 'Content 5' },
        { avatar: '👤', name: 'Diana Evans', country: 'France', text: 'Content 6' },
        { avatar: '👤', name: 'Evan Harris', country: 'Italy', text: 'Content 7' },
        { avatar: '👤', name: 'Fiona Green', country: 'Spain', text: 'Content 8' },
        { avatar: '👤', name: 'George Hill', country: 'Netherlands', text: 'Content 9' }
    ];

    const itemsPerSlide = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000); // Change slide every 10 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % content.length);
            setIsAnimating(false);
        }, 500); // Animation duration
    };

    const prevSlide = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - itemsPerSlide + content.length) % content.length);
            setIsAnimating(false);
        }, 500); // Animation duration
    };

    const getCurrentSlideContent = () => {
        const start = currentIndex;
        const end = start + itemsPerSlide;
        return content.slice(start, end).concat(content.slice(0, Math.max(0, end - content.length)));
    };

    const getDots = () => {
        const dots = [];
        for (let i = 0; i < Math.ceil(content.length / itemsPerSlide); i++) {
            dots.push(
                <span
                    key={i}
                    style={{
                        height: '10px',
                        width: '10px',
                        margin: '0 5px',
                        backgroundColor: currentIndex / itemsPerSlide === i ? '#333' : '#bbb',
                        borderRadius: '50%',
                        display: 'inline-block',
                        cursor: 'pointer'
                    }}
                    onClick={() => goToSlide(i)}
                ></span>
            );
        }
        return dots;
    };

    const goToSlide = (index) => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index * itemsPerSlide);
            setIsAnimating(false);
        }, 500); // Animation duration
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                    opacity: isAnimating ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            >
                {getCurrentSlideContent().map((item, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', width: '30%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ marginRight: '10px' }}>{item.avatar}</div>
                            <div>
                                <div>{item.name}</div>
                                <div>{item.country}</div>
                            </div>
                        </div>
                        <div style={{ maxHeight: '4em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginTop: '20px' }}>{getDots()}</div>
            </div>
        </div>
    );
};

export default Review;