import { useTranslation } from 'react-i18next'

export function SetStyle(props: any) {
    const { t } = useTranslation()
    const { currentColor, setCurrentColor } = props
    const themes = {
        light: {
            'color-body-bg': '#ffffff',
            'color-text': '#000',
            'color-primary': '#335eea',
            'color-primary-bg': '#eaeffd',
            'color-secondary': '#7a7a7b',
            'color-secondary-bg': '#f5f5f7',
            'color-navbar-bg': 'rgba(255, 255, 255, 0.86)',
            'color-primary-bg-for-transparent': 'rgba(189, 207, 255, 0.28)',
            'color-secondary-bg-for-transparent': 'rgba(209, 209, 214, 0.28)',
            'html-overflow-y': 'overlay',
        },
        dark: {
            'color-body-bg': '#222222',
            'color-text': '#ffffff',
            'color-primary': '#335eea',
            'color-primary-bg': '#bbcdff',
            'color-secondary': '#7a7a7b',
            'color-secondary-bg': '#323232',
            'color-navbar-bg': 'rgba(34, 34, 34, 0.86)',
            'color-primary-bg-for-transparent': 'rgba(255, 255, 255, 0.12)',
            'color-secondary-bg-for-transparent': 'rgba(255, 255, 255, 0.08)',
            // 如果需要保持html-overflow-y在暗色模式下也有值，可以添加
        },
    }
    const setThemeColors = (colors: any) => {
        Object.entries(colors).forEach(([variable, value]) => {
            return document.documentElement.style.setProperty(`--${variable}`, value as string)
        })
    }

    const applyTheme = (themeName: 'dark' | 'light') => {
        const theme = themes[themeName]
        if (theme) {
            setThemeColors(theme)
        }
    }
    return (
        <div className="item">
            <div className="left">
                <div className="title">{t('外观')}</div>
            </div>
            <div className="right">
                <select
                    value={currentColor}
                    onChange={(e) => {
                        setCurrentColor(e.target.value)
                        applyTheme(e.target.value === 'light' ? 'light' : 'dark')
                        localStorage.setItem('theme-preference', e.target.value)
                    }}
                >
                    <option value="auto">{t('自动')}</option>
                    <option value="light">
                        🌞
                        {t('浅色')}
                    </option>
                    <option value="dark">
                        🌚
                        {t('深色')}
                    </option>
                </select>
            </div>
        </div>
    )
}
