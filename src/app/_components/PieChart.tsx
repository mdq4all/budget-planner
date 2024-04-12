import { Category, dataPieChart } from '@/types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

const CircularChart = ({ categoryList }: {
    categoryList: Category[] | null
}) => {

    const [data, setData] = useState<dataPieChart[]>([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (categoryList && categoryList.length > 0) {
            updateCircularChart()
            updateTotalCost()
        }
    }, [categoryList]);

    const updateTotalCost = () => {
        let total = 0
        data.forEach(element => {
            total += element.value
        });
        setTotalCost(total)
    }

    const updateCircularChart = () => {
        if (categoryList) {
            const newData: dataPieChart[] = categoryList.map(element => {
                let itemTotalCost = 0;
                element.CategoryItem.forEach(item => {
                    itemTotalCost += item.cost;
                });
                return {
                    id: element.id,
                    value: itemTotalCost,
                    label: element.name.slice(0, 1).toUpperCase() + element.name.slice(1),
                    color: element.color
                };
            });
            setData(newData);
        }
    }

    return (
        <div className='flex flex-col items-center mt-2 h-[200px] shadow-lg rounded-md border-[1px] border-[rgb(203,205,208)] w-full md:w-1/2'>
            <h2 className='mt-2 text-xl'>Total estimated: <span className='text-primary font-bold'>${totalCost}</span></h2>
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 64,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 10,
                        startAngle: -90,
                        endAngle: 300,
                        cx: 60,
                        cy: 120,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                width={350}
                height={250}
            />
        </div>
    )
}

export default CircularChart
