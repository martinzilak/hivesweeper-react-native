export const getFlatHexagonPoints = (width, height) => {
    const halfHeight = height / 2;
    const sideOffset = (halfHeight / Math.sin(60 * (Math.PI / 180))) / 2;

    return [
        { x: 0, y: halfHeight },
        { x: sideOffset, y: 0 },
        { x: width - sideOffset , y: 0 },
        { x: width, y: halfHeight },
        { x: width - sideOffset, y: height },
        { x: sideOffset, y: height },
    ];
};
