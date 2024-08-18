export const formattedDate = (date) => {
    try {
      const inputDate = new Date(date);
      
      if (isNaN(inputDate)) {
        throw new Error("Invalid date");
      }
  
      const formatted = inputDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  
      return formatted;
    } catch (error) {
      console.error("Error formatting date:", error.message);
      
      // If date is invalid, return a default date of 2004
      const defaultDate = new Date(2004, 0, 1).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
  
      return defaultDate;
    }
  };
  