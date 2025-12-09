"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // Style
// import "./MenuTheme.scss";
// Actions
const action_1 = require("@/lib/action");
// Component
async function NavbarTheme() {
    // Cookies
    const currentTheme = (await (0, action_1.ccCookies)("theme")) || "dark";
    const currentColor = (await (0, action_1.ccCookies)("color")) || "bleu";
    // const { theme, toogleTheme, toogleThemeColor } = useContext(FrontContext);
    const colors = ["bleu", "apple", "fushia", "red"];
    return (<div className="flex items-center gap-1">
      <form className="flex items-center gap-1">
        {colors.map((color) => (<div key={color} className="flex">
            <input onChange={async () => {
                "use server";
                // console.log("formData", formData);
                await (0, action_1.ccCookies)("color", color, "set");
            }} type="radio" name="color" className={`in-cl absolute opacity-0 cursor-pointer`} id={`cl-${color}`} value={color} checked={currentColor == color ? true : false}/>
            <label htmlFor={`cl-${color}`} className={`h-4 w-4 rounded-4xl kk-${color} cursor-pointer`}></label>
          </div>))}
      </form>
      <form action={async (formData) => {
            "use server";
            const theme = formData.get("theme");
            await (0, action_1.ccCookies)("theme", theme, "set");
        }}>
        <input name="theme" type="hidden" value={currentTheme === "light" ? "dark" : "light"}/>
        <button className="cursor-pointer">
          <span className={`i-gntl--${currentTheme === "light" ? "wb_sunny" : "bedtime"}`}></span>
        </button>
      </form>
    </div>);
}
exports.default = NavbarTheme;
