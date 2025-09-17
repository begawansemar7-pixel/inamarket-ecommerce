import React, { useState, useEffect } from 'react';

const useCountUp = (endValue: number, duration: number = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (startTimestamp === undefined) {
                startTimestamp = timestamp;
            }
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            const currentCount = Math.floor(progress * endValue);
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);

    }, [endValue, duration]);

    return count;
};

const formatNumber = (num: number) => new Intl.NumberFormat('id-ID').format(num);

interface StatCardProps {
  title: string;
  value: string | number; // Terima angka untuk animasi
  icon: React.ElementType;
  prefix?: string; // Untuk simbol mata uang
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, prefix = '' }) => {
    const isNumber = typeof value === 'number';
    const endValue = isNumber ? value : 0;
    const animatedCount = useCountUp(endValue);
    
    // Tampilkan nilai yang dianimasikan jika berupa angka, jika tidak, tampilkan nilai string asli.
    const displayValue = isNumber ? `${prefix}${formatNumber(animatedCount)}` : value;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="bg-primary-light/20 p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary-dark" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{displayValue}</p>
          </div>
        </div>
    );
};

export default StatCard;
