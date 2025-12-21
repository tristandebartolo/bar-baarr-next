// export const containerMax = (maxw : string) : string => {
// 	switch (maxw) {
// 		case "max-w-xl":
// 			return "max-w-xl";
// 		case "max-w-3xl":
// 			return "max-w-3xl";
// 		case "max-w-5xl":
// 			return "max-w-5xl";
// 		case "max-w-7xl":
// 			return "max-w-7xl";
// 		case "max-w-full":
// 			return "max-w-full";
// 		default:
// 			return "max-w-7xl";
// 	}
// };

// export const containerCol = (col : string) : string => {
// 	switch (col) {
// 		case "1":
// 			return "md:grid-cols-1";
// 		case "2":
// 			return "md:grid-cols-2";
// 		case "3":
// 			return "md:grid-cols-2";
// 		case "4":
// 			return "md:grid-cols-4";
// 		case "5":
// 			return "md:grid-cols-5";
// 		default:
// 			return "md:grid-cols-6";
// 	}
// };

// export const regionWidth = (width : string, med : string) : string => {
// 	switch (width) {
// 		case "1":
// 			return med === "md" ? "md:col-span-1" : "lg:col-span-1";
// 		case "2":
// 			return med === "md" ? "md:col-span-2" : "lg:col-span-2";
// 		case "3":
// 			return med === "md" ? "md:col-span-3" : "lg:col-span-3";
// 		case "4":
// 			return med === "md" ? "md:col-span-4" : "lg:col-span-4";
// 		case "5":
// 			return med === "md" ? "md:col-span-5" : "lg:col-span-5";
// 		default:
// 			return med === "md" ? "md:col-span-6" : "lg:col-span-6";
// 	}
// };

// export const gap = (gp : string) : string => {
// 	switch (gp) {
// 		case "4":
// 			return "gap-1";
// 		case "8":
// 			return "gap-8";
// 		case "12":
// 			return "gap-12";
// 		case "16":
// 			return "gap-16";
// 		case "24":
// 			return "gap-24";
// 		default:
// 			return "gap-0";
// 	}
// };


// export const minheight = (height : string) : string => {
// 	switch (height) {
// 		case "auto":
// 			return "min-h-auto";
// 		case "4":
// 			return "min-h-4";
// 		case "8":
// 			return "min-h-8";
// 		case "16":
// 			return "min-h-16";
// 		case "32":
// 			return "min-h-32";
// 		case "40":
// 			return "min-h-40";
// 		case "80":
// 			return "min-h-80";
// 		case "120":
// 			return "min-h-120";
// 		case "160":
// 			return "min-h-160";
// 		case "200":
// 			return "min-h-200";
// 		case "240":
// 			return "min-h-240";
// 		case "280":
// 			return "min-h-280";
// 		case "320":
// 			return "min-h-320";
// 		case "screen":
// 			return "min-h-screen";
// 		default:
// 			return "min-h-1";
// 	}
// };

// export const verticalAlign = (align : string) : string => {
// 	switch (align) {
// 		case "center":
// 			return "items-center";
// 		case "end":
// 			return "items-end";
// 		default:
// 			return "items-start";
// 	}
// };

// export const regionPadding = (padding : string) : string => {
// 	switch (padding) {
// 		case "4":
// 			return "p-4";
// 		case "8":
// 			return "p-8";
// 		case "12":
// 			return "p-12";
// 		case "16":
// 			return "p-16";
// 		case "24":
// 			return "p-24";
// 		default:
// 			return "p-0";
// 	}
// };

// export const sectionPadding = (padding : string) : string => {
// 	switch (padding) {
// 		case "4":
// 			return "py-4";
// 		case "8":
// 			return "py-8";
// 		case "12":
// 			return "py-12";
// 		case "16":
// 			return "py-16";
// 		case "24":
// 			return "py-24";
// 		default:
// 			return "py-0";
// 	}
// };

// export const regionMaxWidth = (width : string) : string => {
// 	switch (width) {
// 		case "1/2":
// 			return "w-1/1 md:w-1/2";
// 		case "2/3":
// 			return "w-1/1 md:w-2/3";
// 		case "1/3":
// 			return "w-1/1 md:w-1/3";
// 		default:
// 			return "w-1/1 md:w-1/1";
// 	}
// };

// export const regionJustify = (justify : string) : string => {
// 	switch (justify) {
// 		case "center":
// 			return "justify-center";
// 		case "end":
// 			return "justify-end";
// 		default:
// 			return "justify-start";
// 	}
// };

// export const regionSelfAlign = (selfAlign : string) : string => {
// 	switch (selfAlign) {
// 		case "center":
// 			return "self-center";
// 		case "end":
// 			return "self-end";
// 		default:
// 			return "self-start";
// 	}
// };


export const hnCChild = (hn : string = 'h2') : string => {
	switch (hn) {
		case "h2":
			return "h3";
		case "h3":
			return "h4";
		case "h4":
			return "h4";
		case "h5":
			return "h4";
		case "h6":
			return "strong";
		default:
			return "h2";
	}
};

export const fontSizeCChild = (fontSize : string = '2xl') : string => {
	switch (fontSize) {
		case "9xl":
			return "8xl";
		case "8xl":
			return "7xl";
		case "7xl":
			return "6xl";
		case "6xl":
			return "5xl";
		case "5xl":
			return "4xl";
		case "4xl":
			return "3xl";
		case "3xl":
			return "2xl";
		case "2xl":
			return "1xl";
		case "1xl":
			return "xl";
		case "xl":
			return "lg";
		case "lg":
			return "md";
		default:
			return "4xl";
	}
};