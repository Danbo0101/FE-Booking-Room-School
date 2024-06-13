const convertToLocalDateTime = (timeString) => {
    const date = new Date(timeString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}`;

    return dateTimeString;
};

export default convertToLocalDateTime;
