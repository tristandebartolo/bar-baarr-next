export const containerMax = (maxw: string): string => {
  switch (maxw) {
    case "max-w-xl":
      return "max-w-xl";
    case "max-w-3xl":
      return "max-w-3xl";
    case "max-w-5xl":
      return "max-w-5xl";
    case "max-w-7xl":
      return "max-w-7xl";
    case "max-w-full":
      return "max-w-full";
    default:
      return "max-w-7xl";
  }
};

export const containerCol = (col: string): string => {
  switch (col) {
    case "1":
      return "md:grid-cols-1";
    case "2":
      return "md:grid-cols-2";
    case "3":
      return "md:grid-cols-2";
    case "4":
      return "md:grid-cols-4";
    case "5":
      return "md:grid-cols-5";
    default:
      return "md:grid-cols-6";
  }
};

export const regionWidth = (width: string, med: string): string => {
  switch (width) {
    case "1":
      return med === "md" ? "md:col-span-1" : "lg:col-span-1";
    case "2":
      return med === "md" ? "md:col-span-2" : "lg:col-span-2";
    case "3":
      return med === "md" ? "md:col-span-3" : "lg:col-span-3";
    case "4":
      return med === "md" ? "md:col-span-4" : "lg:col-span-4";
    case "5":
      return med === "md" ? "md:col-span-5" : "lg:col-span-5";
    default:
      return med === "md" ? "md:col-span-6" : "lg:col-span-6";
  }
};

export const gap = (gp: string): string => {
  switch (gp) {
    case "1":
      return "gap-1";
    case "2":
      return "gap-2";
    case "3":
      return "gap-2";
    case "4":
      return "gap-4";
    case "5":
      return "gap-5";
    default:
      return "gap-6";
  }
};