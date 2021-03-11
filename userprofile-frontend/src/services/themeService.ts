export enum Theme {
    Light = 'light',
    Dark = 'dark'
}

class ThemeService {
    setThemeFromString(theme: string) {
        this.setTheme(this.stringToTheme(theme));
    }

    setTheme(theme: Theme) {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('theme', theme);
    }

    initTheme() {
        const theme = localStorage.getItem('theme');

        this.setTheme(this.stringToTheme(theme || ''));
    }

    getTheme() {
        const theme = localStorage.getItem('theme');
        
        return this.stringToTheme(theme || '');
    }

    private stringToTheme(theme: string) {
        if (theme == 'light') {
            return Theme.Light;
        } else {
            return Theme.Dark;
        }
    }
}

const themeService = new ThemeService();

export default themeService;