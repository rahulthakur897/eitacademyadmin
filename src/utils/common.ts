export const colorizeTitle = (title) => {
    const words = title.split(" ");
    const colors = ["#E8774D", "#FFD740", "#FF5722", "#FFD740", "#E8774D"];

    return words.reduce((acc, word, index) => {
        const color = colors[Math.floor(index / 2) % colors.length];
        return acc + `<span style="color:${color}">${word} </span>`;
    }, "");
};

export const downloadHandout = () => {
    const link = document.createElement("a");
    link.href = "/assets/images/parentHandbook.pdf";
    link.download = "parentHandbook.pdf";
    link.click();
};
