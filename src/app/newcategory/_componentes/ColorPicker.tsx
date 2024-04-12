
const ColorPicker = ({ selectedColor, setSelectedColor, colors }:   {selectedColor: string,
    setSelectedColor: (color: string) => void, 
    colors: string[] }) => {

    const changeColor = (color: string) => {
        setSelectedColor(color)
    }

    return (
        <div className=" my-6 flex gap-3">
            {colors.map((color, index) => (
                <button key={index} onClick={() => changeColor(color)}
                    className={`w-6 h-6 rounded-full duration-200 ${selectedColor === color ? 'animate-bounce' : ''}`}
                    style={{ backgroundColor: color }}>
                </button>
            ))}
        </div>
    )
}

export default ColorPicker
