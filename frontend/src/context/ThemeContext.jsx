import { createContext, useState, useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();
export function ThemeProvider({children}){
    const[theme,setTheme]=useState('light');

    const applyTheme =(theme) =>{
        const root = document.documentElement;
        if(theme==='dark'){
            root.classList.add('dark');
        }else{
            root.classList.remove('dark');
        }
    };

    //theme du SI ou du localStorage

    useEffect(()=>{
        const saved = localStorage.getItem('theme');
        if(saved){
            setTheme(saved);
            applyTheme(saved);
        }else{
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(systemTheme);
            applyTheme(systemTheme);    
        }
    },[]);
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}