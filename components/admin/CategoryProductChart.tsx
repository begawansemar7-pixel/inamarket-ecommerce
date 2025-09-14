import React from 'react';

interface CategoryProductChartProps {
  data: { [key:string]: number };
}

const CategoryProductChart: React.FC<CategoryProductChartProps> = ({ data }) => {
    const sortedData = Object.entries(data).sort(([, a], [, b]) => b - a);
    const maxValue = Math.max(...Object.values(data));

    if (sortedData.length === 0) {
        return <p className="text-gray-500">Tidak ada data produk untuk ditampilkan.</p>;
    }

    return (
        <div className="space-y-4">
            {sortedData.map(([category, count]) => {
                const barWidth = maxValue > 0 ? (count / maxValue) * 100 : 0;
                return (
                    <div key={category} className="group">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{category}</span>
                            <span className="text-sm font-bold text-gray-800">{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-primary h-4 rounded-full transition-all duration-500 ease-out group-hover:bg-primary-dark"
                                style={{ width: `${barWidth}%` }}
                                role="progressbar"
                                aria-valuenow={count}
                                aria-valuemin={0}
                                aria-valuemax={maxValue}
                                aria-label={`${category}: ${count} produk`}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryProductChart;